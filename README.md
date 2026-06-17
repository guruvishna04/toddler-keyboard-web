# Dada Keyboard

A deployable static browser app for a 3-year-old practicing the word `dada`.

## What It Does

- Shows a large target word and a large typed word in one copy-practice stage
- Lets you edit the practice word up to 8 letters
- Includes a scrollable baby word list, including `dada`, `Dada`, `DADA`, `mama`, `papa`, `Baby`, `cat`, `Dog`, `cashew`, `banana`, and `cookie`
- Lets you type a custom word and press `Use`
- Lets the child type with big on-screen keys or the physical keyboard
- Lets a parent or child choose basic letter colors before typing
- Shows typed letters in a large display and scales longer words to stay readable
- Preserves the target word's capital/small-case pattern while typing
- Includes Caps mode for uppercase practice while still accepting lowercase/uppercase as correct
- Includes rainbow color choices, plus a rainbow mode that changes color per letter
- Shows an original animated helper tow truck for encouragement and retry feedback
- The helper truck can type the remaining letters when `Help type` is pressed
- Has a `Full` button for fullscreen practice
- Plays short generated tones with a sound on/off button
- Celebrates when the typed word matches the selected practice word

## Run Locally

Option 1: open `index.html` directly in a browser.

Option 2: serve the folder locally:

```bash
cd toddler-keyboard-app
python3 -m http.server 4173
```

Then visit:

```text
http://127.0.0.1:4173
```

## Deploy With Vercel

This is a static app. **No build step** is required.

Deploy these files as the site root:

```text
index.html
styles.css
app.js
vercel.json
README.md
```

Recommended Vercel setup:

1. Push this folder to a GitHub repository.
2. Open [Vercel](https://vercel.com/).
3. Choose `Add New > Project`.
4. Import the GitHub repository.
5. If asked for framework, choose `Other`.
6. Leave `Build Command` empty.
7. Leave `Output Directory` empty or use `.`.
8. Click `Deploy`.

Vercel will auto-deploy every push to the main branch.

## Other Cheap Static Hosts

- Cloudflare Pages: very good free limits for static sites, including unlimited static requests and bandwidth on the free plan.
- Netlify: easiest drag-and-drop deploy if you do not care about Git auto-deploy.
- Vercel: easiest if your code is already in GitHub and you want automatic deploy previews.
- S3/static web server: cheap at scale, but more setup.

After deployment, open the site URL and press `Full` for a cleaner child-facing screen.
