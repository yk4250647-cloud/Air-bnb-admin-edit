# Modern Hospitality

Next.js 15 website with MongoDB-backed property management and guest enquiries.

## Requirements

- Node.js 20.19+ or 22.12+ (Node 24 is also supported by current Next.js releases)
- MongoDB Community Server running locally for local development
- MongoDB Compass is optional; it is a desktop interface for viewing the database

## 1. Install dependencies

From the project root (the folder containing `package.json`):

```bash
npm install
```

## 2. Configure environment

Copy `.env.example` to `.env.local` in the project root. Edit `.env.local` and set:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/modern_hospitality
ADMIN_EMAIL=your-admin-email@example.com
ADMIN_PASSWORD=choose-a-strong-unique-password
ADMIN_SESSION_SECRET=use-a-long-random-secret-at-least-32-characters
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

Never commit `.env.local` or share its values. `.env.local` is ignored by Git.

## 3. Start MongoDB

Make sure MongoDB Community Server is running on your computer. In Compass, connect to:

```text
mongodb://localhost:27017
```

Compass itself is not the database server; the MongoDB Community Server service must be running.

## 4. Run the website

```bash
npm run dev
```

Open http://localhost:3000.

## 5. Set up the admin account

Open http://localhost:3000/admin. On the first successful sign-in, the app creates the first administrator in the `admins` collection using `ADMIN_EMAIL` and `ADMIN_PASSWORD` from `.env.local`, and stores a salted password hash. Later sign-ins are checked against the stored hash.

Do not manually insert an admin document in Compass. Leave the `admins` collection empty before first sign-in.

## MongoDB collections

The app uses these collections in `modern_hospitality`:

- `properties`: created from the existing `data/properties.js` seed data the first time the database is read while this collection is empty. Admin can create, edit, publish/unpublish and delete listings.
- `enquiries`: automatically created when a visitor submits the enquiry form. Admin can view enquiries and update their status.
- `admins`: created on first admin sign-in. Passwords are stored as salted scrypt hashes, not plaintext.
- `users`: reserved for a future customer-account feature; it is not currently used.

## Property image uploads

The admin property editor uploads images directly through a server-side signed Cloudinary API request. Add your Cloudinary cloud name, API key and API secret to `.env.local`; never expose the API secret in browser code or commit it to Git. Create a free Cloudinary account at https://cloudinary.com/ and find these values in the Cloudinary Console dashboard. Images are stored under `modern-hospitality/properties` in Cloudinary. MongoDB stores each image's secure URL, public ID, dimensions and format. The editor supports multiple uploads (up to 15 per request, 10 MB each), previews, selecting the cover image, reordering and deletion. Existing local image URLs are retained as legacy entries until you replace them.

Cloudinary credentials are required for uploads and remote deletion; other property editing can continue without them. After adding or changing these values, stop and restart the Next.js development server so the environment variables are reloaded. In Cloudinary Console, copy the Cloud name, API Key and API Secret from the dashboard; do not use an unsigned upload preset for this implementation.

The website reads published properties from MongoDB and falls back to the bundled seed data if MongoDB is unavailable. Admin edits are saved in MongoDB and appear on the public property pages.

## Important deployment note

A MongoDB server running on your personal PC is only reachable from your own computer by default. A website deployed to Vercel cannot connect to `localhost` on your PC. Before production deployment, create a hosted MongoDB Atlas cluster (or another secured remote MongoDB deployment), set its network access and database user, then add the remote `MONGODB_URI` and the admin secrets as Vercel environment variables. Never expose the database URI in client-side code.

The admin session uses an HttpOnly, SameSite=Lax cookie and a signed 12-hour session. For a public production launch, also configure HTTPS, backups, monitoring and rate limiting for login/enquiry endpoints.
