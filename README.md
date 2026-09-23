# Cheatham Street Music Foundation — Setup Guide

This is the same system as your festival site: five plain web pages that read their
words and photos from `.json` files, plus a private editor at `/admin` that only
you can log into. No visible login button anywhere on the public site.

## Pages

| File | What it covers |
|---|---|
| `index.html` | Home |
| `about.html` | Mission Statement, History (Foundation + Warehouse), Board of Directors |
| `programs.html` | Songwriter Circle, Weekly Early Shows, Showcase Series, Young Songwriters Workshop, DreamerFest, Soldier Songs and Voices, Redbird Listening Room, Past Programs — all on one page with jump-to tabs |
| `media.html` | Gallery, Live Audio, Press Releases, Social |
| `support.html` | Donate (PayPal), Merchandise, Guidestar profile, Contact |

Each page has a matching `.json` file with the same name (e.g. `programs.html` ↔
`programs.json`) — that's what you edit through `/admin`, never the `.html` files
directly.

## About the photos

Several photos (Kent Finlay, board member headshots) are currently pulled directly
from your existing WordPress site's media library, since that's where the only
copies of them live. This works, but it depends on that WordPress site staying
online. **Once you're set up, go through `/admin` and re-upload each of these
photos yourself** (just drag the same picture back in) — that copies it into
your new site permanently and removes the dependency on the old site.

## One-time setup

Follow the exact same steps as your festival site:

**1. GitHub** — create a free account, make a new repository (e.g.
`cheatham-street-foundation`), and upload everything in this folder.

⚠️ **Upload the `admin` folder correctly** — this is what broke the last deploy.
Upload the loose files first (`index.html`, `about.html`, `programs.html`,
`media.html`, `support.html`, all the `.json` files, `styles.css`, `site.js`,
`netlify.toml`, `README.md`) in one batch. Then, separately, use **Add file →
Create new file**, type the filename as `admin/index.html` (the slash creates
the folder), and paste in that file's contents. Repeat for `admin/config.yml`.

**2. Netlify** — free account, "Import an existing project," connect GitHub,
pick the repository, deploy. Leave build command and publish directory empty.

**3. Domain** — Site configuration → Domain management → point your existing
domain here the same way as before.

**4. Identity** — Site configuration → Identity → Enable → set Registration to
**Invite only** → enable **Git Gateway** under Services → invite yourself under
Identity → Invite users.

**5. Edit** — go to `yourdomain.com/admin`, log in, edit away.

## Editing day-to-day

Every list (board members, timeline entries, programs, press releases, gallery
photos) has drag handles to reorder and Add/Delete buttons — so you can add a
new board member, a new press release, or next year's DreamerFest without
touching any code.

**Programs & Events page:** each program has an `id` field and there's a
separate list of tabs at the top that also use `id`. If you add a brand-new
program, give it an `id` with no spaces (e.g. `holiday-showcase`), then add a
matching tab entry with the same `id` so the jump-to link works. If you just
edit an existing program's text, you don't need to touch the tabs at all.

## Donate button

The PayPal button currently points to a placeholder link
(`REPLACE_WITH_YOUR_HOSTED_BUTTON_ID`). Log into PayPal, get your real hosted
donate button URL, and paste it into the "PayPal donate link" field in
`/admin` under the Support & Contact page.

## If something looks wrong

Same troubleshooting as your festival site:
- **Homepage blank / shows a directory listing or login box** → the `admin`
  folder got flattened during upload. Check your GitHub repo for a stray
  `config.yml` sitting loose in the main file list.
- **Build fails** → a build command got typed into the Netlify UI somewhere.
  Clear it under Build & deploy → Build settings; `netlify.toml` should
  prevent this but doesn't hurt to check.
- **Edits don't show up** → make sure you clicked **Publish**, not just saved
  a draft, and that Git Gateway is enabled.
