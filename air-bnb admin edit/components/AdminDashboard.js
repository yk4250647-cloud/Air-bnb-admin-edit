'use client';

import { useEffect, useMemo, useState } from 'react';

const blankProperty = { name: '', slug: '', type: 'Apartment', beds: '', baths: '', guests: '', tag: '', description: '', cover: '', galleryText: '', highlightsText: '', imageAssets: [], isPublished: true };

export default function AdminDashboard() {
  const [auth, setAuth] = useState('checking');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [tab, setTab] = useState('overview');
  const [properties, setProperties] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(blankProperty);
  const [notice, setNotice] = useState('');
  const [uploading, setUploading] = useState(false);

  async function loadData() {
    const [p, e] = await Promise.all([fetch('/api/admin/properties'), fetch('/api/admin/enquiries')]);
    if (p.status === 401 || e.status === 401) { setAuth('signedout'); return; }
    const [pj, ej] = await Promise.all([p.json(), e.json()]);
    if (p.ok) setProperties(pj); else setError(pj.error || 'Could not load properties.');
    if (e.ok) setEnquiries(ej); else setError(ej.error || 'Could not load enquiries.');
    setAuth('signedin');
  }

  useEffect(() => {
    fetch('/api/admin/me').then(async (r) => { if (r.ok) { const me = await r.json(); setEmail(me.email || ''); await loadData(); } else setAuth('signedout'); }).catch(() => setAuth('signedout'));
  }, []);

  async function login(event) {
    event.preventDefault(); setBusy(true); setError('');
    try {
      const response = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Sign in failed.');
      setPassword(''); await loadData();
    } catch (e) { setError(e.message); }
    finally { setBusy(false); }
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    setAuth('signedout'); setProperties([]); setEnquiries([]); setTab('overview');
  }

  function startNew() { setEditing(null); setForm(blankProperty); setError(''); setNotice(''); }
  function startEdit(p) {
    setEditing(p._id);
    const savedAssets = Array.isArray(p.imageAssets) && p.imageAssets.length ? p.imageAssets : [...new Set([p.cover, ...(p.gallery || [])].filter(Boolean))].map((url) => ({ url, publicId: '' }));
    setForm({ ...p, imageAssets: savedAssets, galleryText: (p.gallery || []).join('\n'), highlightsText: (p.highlights || []).join('\n') });
    setError(''); setNotice('');
  }

  async function uploadImages(event) {
    const files = Array.from(event.target.files || []);
    event.target.value = '';
    if (!files.length) return;
    setUploading(true); setError(''); setNotice('');
    try {
      const body = new FormData();
      files.forEach((file) => body.append('files', file));
      const response = await fetch('/api/admin/uploads', { method: 'POST', body });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Image upload failed.');
      const next = [...(form.imageAssets || []), ...result.images];
      setForm((current) => ({ ...current, imageAssets: next, cover: current.cover || result.images[0]?.url || '', galleryText: next.map((image) => image.url).join('\n') }));
      setNotice(`${result.images.length} image${result.images.length === 1 ? '' : 's'} uploaded to Cloudinary.`);
    } catch (e) { setError(e.message); }
    finally { setUploading(false); }
  }

  async function removeImage(index) {
    const image = (form.imageAssets || [])[index];
    if (!image) return;
    if (!window.confirm('Remove this image from the property?')) return;
    setError(''); setNotice('');
    try {
      if (image.publicId) {
        const response = await fetch('/api/admin/uploads', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ publicId: image.publicId }) });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Could not delete image.');
      }
      const next = form.imageAssets.filter((_, i) => i !== index);
      const nextCover = form.cover === image.url ? (next[0]?.url || '') : form.cover;
      setForm((current) => ({ ...current, imageAssets: next, cover: nextCover, galleryText: next.map((item) => item.url).join('\n') }));
    } catch (e) { setError(e.message); }
  }

  function chooseCover(index) {
    const image = form.imageAssets[index];
    if (!image) return;
    setForm((current) => ({ ...current, cover: image.url, imageAssets: [image, ...current.imageAssets.filter((_, i) => i !== index)], galleryText: [image, ...current.imageAssets.filter((_, i) => i !== index)].map((item) => item.url).join('\n') }));
    setNotice('Cover image selected.');
  }

  function moveImage(index, direction) {
    const next = [...(form.imageAssets || [])];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setForm((current) => ({ ...current, imageAssets: next, galleryText: next.map((item) => item.url).join('\n') }));
  }

  async function saveProperty(event) {
    event.preventDefault(); setBusy(true); setError(''); setNotice('');
    const payload = { ...form, cover: form.cover || form.imageAssets?.[0]?.url || '', gallery: (form.imageAssets || []).map((image) => image.url), imageAssets: form.imageAssets || [], highlights: form.highlightsText.split('\n').map((x) => x.trim()).filter(Boolean) };
    delete payload.galleryText; delete payload.highlightsText;
    if (!payload.slug) payload.slug = payload.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    try {
      const response = await fetch(editing ? `/api/admin/properties/${editing}` : '/api/admin/properties', { method: editing ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Could not save property.');
      await loadData(); setTab('properties'); setNotice(editing ? 'Property updated.' : 'Property created.'); setEditing(null);
    } catch (e) { setError(e.message); }
    finally { setBusy(false); }
  }

  async function deleteProperty(id) {
    if (!window.confirm('Delete this property permanently?')) return;
    const response = await fetch(`/api/admin/properties/${id}`, { method: 'DELETE' });
    const result = await response.json();
    if (!response.ok) { setError(result.error || 'Delete failed.'); return; }
    setProperties((items) => items.filter((p) => p._id !== id)); setNotice('Property deleted.');
  }

  async function updateStatus(id, status) {
    const response = await fetch('/api/admin/enquiries', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status }) });
    const result = await response.json();
    if (!response.ok) { setError(result.error || 'Could not update enquiry.'); return; }
    setEnquiries((items) => items.map((item) => item._id === id ? { ...item, status } : item));
  }

  const newEnquiries = useMemo(() => enquiries.filter((e) => e.status === 'new').length, [enquiries]);
  if (auth === 'checking') return <div className="mh-admin-shell"><p>Checking admin session…</p></div>;

  if (auth === 'signedout') return (
    <div className="mh-admin-shell"><div className="mh-admin-login"><div className="eyebrow"><span/> PRIVATE WORKSPACE</div><h1>Welcome <em>back.</em></h1><p>Sign in to manage Modern Hospitality properties and guest enquiries.</p>
      <form onSubmit={login} className="mh-admin-form"><label>Admin email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" required placeholder="admin@example.com"/></label><label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required placeholder="Your password"/></label><button className="button button-dark full-button" disabled={busy}>{busy ? 'Signing in…' : 'Sign in securely ↗'}</button>{error && <p className="mh-error" role="alert">{error}</p>}</form>
      <small>First-time setup: use the ADMIN_EMAIL and ADMIN_PASSWORD values from your private .env.local file.</small>
    </div></div>
  );

  return (
    <div className="mh-admin-shell">
      <div className="mh-admin-top"><div><div className="eyebrow"><span/> OPERATIONS</div><h1>Property <em>management.</em></h1><p>Signed in as {email || 'administrator'}. Your changes are saved to MongoDB.</p></div><button className="mh-logout" onClick={logout}>Sign out ↗</button></div>
      <div className="mh-admin-tabs">{[['overview','Overview'],['properties','Properties'],['enquiries','Enquiries']].map(([key,label]) => <button key={key} className={tab === key ? 'active' : ''} onClick={() => { setTab(key); setError(''); setNotice(''); }}>{label}{key === 'enquiries' && newEnquiries > 0 ? ` (${newEnquiries})` : ''}</button>)}</div>
      {error && <p className="mh-error" role="alert">{error}</p>}{notice && <p className="mh-notice" role="status">{notice}</p>}
      {tab === 'overview' && <><div className="mh-admin-stats"><article><span>LISTINGS</span><strong>{properties.length}</strong><small>{properties.filter((p) => p.isPublished).length} published</small></article><article><span>TOTAL ENQUIRIES</span><strong>{enquiries.length}</strong><small>All customer submissions</small></article><article><span>NEW ENQUIRIES</span><strong>{newEnquiries}</strong><small>Awaiting follow-up</small></article></div><section className="mh-admin-panel"><div><span className="eyebrow"><span/> QUICK ACTIONS</span><h2>Keep things in order.</h2><p>Add a new residence or follow up with a guest enquiry.</p></div><div className="mh-quick-actions"><button className="button button-dark" onClick={() => { startNew(); setTab('properties'); }}>Add a property +</button><button className="button button-outline" onClick={() => setTab('enquiries')}>View enquiries ↗</button></div></section></>}
      {tab === 'properties' && <section className="mh-admin-panel"><div className="mh-panel-heading"><div><span className="eyebrow"><span/> YOUR COLLECTION</span><h2>Properties</h2></div><button className="button button-dark" onClick={() => { startNew(); setTab('editor'); }}>Add property +</button></div><div className="mh-admin-list">{properties.map((p) => <article className="mh-property-row" key={p._id}><img src={p.cover || '/images/studio-1.png'} alt=""/><div className="mh-property-info"><strong>{p.name}</strong><span>{p.type} · {p.slug}</span><small className={p.isPublished ? 'published' : 'unpublished'}>{p.isPublished ? 'Published' : 'Unpublished'}</small></div><button onClick={() => { startEdit(p); setTab('editor'); }}>Edit</button><button className="danger" onClick={() => deleteProperty(p._id)}>Delete</button></article>)}</div></section>}
      {tab === 'editor' && <section className="mh-admin-panel"><div className="mh-panel-heading"><div><span className="eyebrow"><span/> LISTING DETAILS</span><h2>{editing ? 'Edit property' : 'Add a property'}</h2></div><button className="mh-logout" onClick={() => setTab('properties')}>← Back</button></div><form className="mh-property-form" onSubmit={saveProperty}><label>Property name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="The Garden Residence"/></label><label>URL slug<input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="the-garden-residence"/></label><label>Property type<input value={form.type || ''} onChange={(e) => setForm({ ...form, type: e.target.value })}/></label><label>Bedrooms<input value={form.beds || ''} onChange={(e) => setForm({ ...form, beds: e.target.value })}/></label><label>Bathrooms<input value={form.baths || ''} onChange={(e) => setForm({ ...form, baths: e.target.value })}/></label><label>Guests<input value={form.guests || ''} onChange={(e) => setForm({ ...form, guests: e.target.value })}/></label><label className="wide">Short tagline<input value={form.tag || ''} onChange={(e) => setForm({ ...form, tag: e.target.value })}/></label><label className="wide">Description<textarea rows="4" value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })}/></label><div className="wide mh-image-manager"><div className="mh-image-manager-heading"><div><strong>Property photographs</strong><p>Upload JPG, PNG, WEBP or AVIF images. Maximum 10 MB each, up to 15 per upload.</p></div><label className="button button-outline mh-upload-button">{uploading ? 'Uploading…' : '＋ Upload images'}<input type="file" accept="image/jpeg,image/png,image/webp,image/avif" multiple onChange={uploadImages} disabled={uploading}/></label></div>{(form.imageAssets || []).length ? <div className="mh-image-grid">{form.imageAssets.map((image, index) => <article className="mh-image-card" key={`${image.publicId || image.url}-${index}`}><img src={image.url} alt={`Property photo ${index + 1}`}/><div className="mh-image-card-actions"><span>{form.cover === image.url || (!form.cover && index === 0) ? 'Cover image' : `Photo ${index + 1}`}</span><div><button type="button" onClick={() => chooseCover(index)} disabled={form.cover === image.url}>Set cover</button><button type="button" onClick={() => moveImage(index, -1)} disabled={index === 0} aria-label="Move image left">←</button><button type="button" onClick={() => moveImage(index, 1)} disabled={index === form.imageAssets.length - 1} aria-label="Move image right">→</button><button type="button" className="danger" onClick={() => removeImage(index)}>Remove</button></div></div></article>)}</div> : <div className="mh-image-empty">No photographs added yet. Upload images to build this property's gallery.</div>}</div><label className="wide">Highlights (one per line)<textarea rows="4" value={form.highlightsText ?? (form.highlights || []).join('\n')} onChange={(e) => setForm({ ...form, highlightsText: e.target.value })}/></label><label className="mh-check wide"><input type="checkbox" checked={form.isPublished !== false} onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}/> Publish this property on the website</label><div className="wide"><button className="button button-dark" disabled={busy}>{busy ? 'Saving…' : 'Save property ↗'}</button></div></form></section>}
      {tab === 'enquiries' && <section className="mh-admin-panel"><div className="mh-panel-heading"><div><span className="eyebrow"><span/> GUEST MESSAGES</span><h2>Enquiries</h2></div><span className="mh-count">{enquiries.length} total</span></div>{!enquiries.length ? <p className="mh-empty">No enquiries yet. New website submissions will appear here automatically.</p> : <div className="mh-enquiry-list">{enquiries.map((e) => <article className="mh-enquiry" key={e._id}><div className="mh-enquiry-head"><div><strong>{e.name}</strong><span>{new Date(e.createdAt).toLocaleString()}</span></div><select value={e.status} onChange={(event) => updateStatus(e._id, event.target.value)} aria-label={`Status for ${e.name}`}><option value="new">New</option><option value="contacted">Contacted</option><option value="closed">Closed</option></select></div><div className="mh-enquiry-details"><a href={`mailto:${e.email}`}>{e.email}</a><a href={`tel:${e.phone}`}>{e.phone}</a><span>{e.property || 'No property selected'}</span>{e.arrival && <span>{e.arrival} → {e.departure}</span>}<span>{e.guests ? `${e.guests} guests` : ''}</span></div>{e.message && <p>{e.message}</p>}</article>)}</div>}</section>}
    </div>
  );
}
