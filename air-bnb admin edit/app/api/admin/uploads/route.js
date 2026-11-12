import { NextResponse } from 'next/server';
import { createHash } from 'node:crypto';
import { requireAdmin } from '../../../../lib/admin-auth';

export const runtime = 'nodejs';
export const maxDuration = 60;

function cloudinaryConfig() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) throw new Error('Cloudinary is not configured. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET to .env.local.');
  return { cloudName, apiKey, apiSecret };
}

function signature(params, apiSecret) {
  const canonical = Object.keys(params).sort().map((key) => `${key}=${params[key]}`).join('&');
  return createHash('sha1').update(canonical + apiSecret).digest('hex');
}

export async function POST(request) {
  const { response } = await requireAdmin();
  if (response) return response;
  try {
    const { cloudName, apiKey, apiSecret } = cloudinaryConfig();
    const form = await request.formData();
    const files = form.getAll('files').filter((item) => item && typeof item.arrayBuffer === 'function');
    if (!files.length) return NextResponse.json({ error: 'Choose at least one image.' }, { status: 400 });
    if (files.length > 15) return NextResponse.json({ error: 'Upload up to 15 images at a time.' }, { status: 400 });
    const uploaded = [];
    for (const file of files) {
      if (!['image/jpeg', 'image/png', 'image/webp', 'image/avif'].includes(file.type)) return NextResponse.json({ error: `${file.name || 'A file'} must be JPG, PNG, WEBP or AVIF.` }, { status: 400 });
      if (file.size > 10 * 1024 * 1024) return NextResponse.json({ error: `${file.name || 'An image'} exceeds the 10 MB limit.` }, { status: 400 });
      const timestamp = Math.floor(Date.now() / 1000);
      const params = { folder: 'modern-hospitality/properties', timestamp };
      const data = new FormData();
      data.append('file', new Blob([await file.arrayBuffer()], { type: file.type }), file.name || 'property-image');
      data.append('api_key', apiKey);
      data.append('timestamp', String(timestamp));
      data.append('folder', params.folder);
      data.append('signature', signature(params, apiSecret));
      const result = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { method: 'POST', body: data });
      const json = await result.json();
      if (!result.ok) throw new Error(json.error?.message || 'Cloudinary upload failed.');
      uploaded.push({ url: json.secure_url, publicId: json.public_id, width: json.width, height: json.height, format: json.format });
    }
    return NextResponse.json({ images: uploaded }, { status: 201 });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return NextResponse.json({ error: error.message || 'Image upload failed.' }, { status: 500 });
  }
}

export async function DELETE(request) {
  const { response } = await requireAdmin();
  if (response) return response;
  try {
    const { cloudName, apiKey, apiSecret } = cloudinaryConfig();
    const { publicId } = await request.json();
    if (typeof publicId !== 'string' || !publicId.startsWith('modern-hospitality/properties/')) {
      return NextResponse.json({ error: 'Invalid image reference.' }, { status: 400 });
    }
    const timestamp = Math.floor(Date.now() / 1000);
    const params = { public_id: publicId, timestamp };
    const data = new FormData();
    data.append('public_id', publicId);
    data.append('api_key', apiKey);
    data.append('timestamp', String(timestamp));
    data.append('signature', signature(params, apiSecret));
    const result = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, { method: 'POST', body: data });
    const json = await result.json();
    if (!result.ok || (json.result !== 'ok' && json.result !== 'not found')) throw new Error(json.error?.message || 'Could not delete image from Cloudinary.');
    return NextResponse.json({ ok: true, result: json.result });
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    return NextResponse.json({ error: error.message || 'Image deletion failed.' }, { status: 500 });
  }
}
