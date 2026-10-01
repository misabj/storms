# STORMS

Premium real-estate / property development platform built with Next.js App Router, TypeScript and MySQL/MariaDB.

## Local development

1. Copy `.env.example` to `.env.local` and fill in the database and security values.
2. Run `database/schema.sql`, then optionally `database/seed.sql` in MySQL/MariaDB.
3. Generate the admin password hash:

   ```bash
   node -e "require('bcryptjs').hash('replace-this-password',12).then(console.log)"
   ```

4. Install and start:

   ```bash
   npm install
   npm run dev
   ```

When database variables are absent, public pages use an in-code preview dataset so design review remains possible. All admin mutations require a configured database.

## Production / cPanel

Set the environment variables from `.env.example`, run the schema, and deploy with Node.js 20+. Build using `npm run build`. The project emits Next.js standalone output; start it with `node .next/standalone/server.js`. Copy `public` and `.next/static` alongside the standalone bundle when the hosting panel does not do this automatically.

Uploaded files are validated and stored under `public/uploads/projects`. Configure persistent storage and backups for that directory. The upload route is isolated so it can later be replaced with S3 or Cloudinary without changing project data.

## Bilingual content

Public pages are available under `/sr` and `/en`. Run `database/migrations/001_bilingual_content.sql` on an existing installation; fresh installations already include the English project columns in `database/schema.sql`. Serbian and English project copy can be edited in the same admin project form.

## Client project list

The approved Word content is stored in `src/lib/client-content.json`. To apply it to a configured database, run:

```bash
npm run db:migrate -- --import-client-content
```

This adds completion fields, imports 11 completed projects and seven team members, and updates contact settings. Existing completed projects are archived as drafts, previous team members are deactivated, and active projects are unchanged. The content import runs once per database; subsequent runs preserve admin edits. Schema-only updates still use `npm run db:migrate`. For another environment, set `ENV_FILE` to its local environment file before running the command. Deploy the new assets and code together with the migration.

Project photos extracted from the Word document live at `public/images/projects/<slug>/hero.webp`. They retain the document's original resolution; replace them with higher-resolution WebP photos at the same paths when available. Additional gallery images can be added through project administration. Team portraits are intentionally omitted until real photos arrive; upload them under **Admin > Team**. Names and contact numbers are transcribed from the approved document, including `Magadalena Mladenović` and `+381 65 30 7577`.
