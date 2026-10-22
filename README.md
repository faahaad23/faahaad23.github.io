# Fahad Portfolio — Bordo, Green & Cream Edition

This is an updated version of the existing portfolio, using the Bordo (`#6C151E`), Deep Green (`#0F3D3A`), and Cream (`#F5DABF`) palette. It uses plain HTML, CSS and JavaScript; no framework or build tools are required.

## Files
- `index.html` — content and section structure.
- `style.css` — colors, layout, responsive rules, and motion.
- `script.js` — mobile navigation, scroll reveals, expandable project case studies, and photo lightbox.
- Your existing image files — keep these alongside `index.html`.

## Add your images
Keep your current filenames in the same directory as `index.html`:
- `profile.jpg`
- `photography-01.JPG` through `photography-15.JPG`

Filenames are case-sensitive on GitHub Pages. If a photo does not load, compare its exact spelling and capitalization with the `src` attribute in `index.html`.

## Preview locally
1. Download/extract this folder.
2. Keep the image files in the same folder.
3. Open `index.html` in your browser.

## Publish with GitHub Pages
1. Back up the current repository first.
2. Upload `index.html`, `style.css`, and `script.js` to the repository folder currently used by GitHub Pages (often the repository root).
3. Keep the existing image assets in that same folder.
4. Commit the changes and wait for GitHub Pages to rebuild.
5. Open the live site and hard-refresh if the browser shows cached CSS.

## Customize the orange
In `style.css`, find `:root` near the top. The main accent is `--accent: #B84A16;`. For a darker orange, try `#A84313`; for a warmer copper, try `#A94F2A`. Keep the accent dark enough for readable text.

## Notes
- All original sections and existing content are retained from the supplied HTML file.
- The project case-study text is starter copy; update it to reflect your actual contribution and verified results.
- The LinkedIn link is unchanged because a specific profile URL was not supplied. The GitHub link points to `https://github.com/faahaad23`.
- The photography viewer supports click/tap, keyboard arrows, and Escape.
- Motion respects `prefers-reduced-motion`.
