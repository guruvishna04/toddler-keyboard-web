# Dada Keyboard

A deployable static browser app for a 3-year-old practicing the word `dada`.

## What It Does

- Shows a large target word and a large typed word in one copy-practice stage
- Lets you edit the practice word up to 8 letters
- Includes quick word buttons for `dada`, `Dada`, `DADA`, `mama`, `papa`, `Baby`, `cat`, and `Dog`
- Lets you type a custom word and press `Use`
- Lets the child type with big on-screen keys or the physical keyboard
- Lets a parent or child choose basic letter colors before typing
- Shows typed letters in a large display
- Preserves the target word's capital/small-case pattern while typing
- Includes rainbow color choices, plus a rainbow mode that changes color per letter
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

## Deploy

This is a static app. There is no build step.

Deploy these files as the site root:

```text
index.html
styles.css
app.js
README.md
```

Common deployment options:

- Netlify: create a new site and drag the `toddler-keyboard-app` folder into the deploy screen.
- Vercel: create a new project, set the project/root directory to `toddler-keyboard-app`, and leave build command/output blank.
- GitHub Pages: put these files on the published branch/folder and set Pages to serve that location.
- S3/static web server: upload `index.html`, `styles.css`, and `app.js` with public read access.

After deployment, open the site URL and press `Full` for a cleaner child-facing screen.

## GitHub Pages Pipeline

This repository includes `.github/workflows/deploy.yml`.

To deploy with GitHub Pages:

1. Create an empty GitHub repository.
2. Push this folder to the repository's `main` branch.
3. In GitHub, open the repository settings.
4. Go to `Pages`.
5. Set `Source` to `GitHub Actions`.
6. Push to `main` again, or run the workflow manually from the `Actions` tab.

The workflow runs:

```bash
python -m unittest tests/test_keyboard_app.py -v
```

If tests pass, it deploys the static site to GitHub Pages.
