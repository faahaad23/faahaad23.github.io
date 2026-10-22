# Sharif Abdulla Al Fahad — Portfolio Upgrade

A plain HTML, CSS and JavaScript refresh of the existing portfolio. No build tools or framework are required.

## Files
- `index.html` — content and page sections
- `style.css` — visual design, responsive layout, and animation styles
- `script.js` — mobile navigation, scroll reveals, project case-study toggles, and photography lightbox

## Add your images
Keep the existing image names in the same folder as `index.html` for this version:
- `profile.jpg`
- `photography-01.JPG` through `photography-15.JPG`

Image names are case-sensitive on GitHub Pages. For example, `photography-01.JPG` is different from `photography-01.jpg`. If your repository stores images in a folder, update each matching `src` in `index.html`.

## Customize
1. Open `style.css` and change the CSS variables near the top to adjust colors. The electric-lime accent is `--accent: #c6f36b`.
2. Edit text and links in `index.html`. Replace placeholder or generic project links only with real repository/demo URLs.
3. In `script.js`, update the `caseStudies` entries with verified project details and outcomes.
4. If you do not have a CV file in the repository, check any CV download link before publishing.

## Preview locally
Open `index.html` in a browser. For a closer local website preview, use VS Code's Live Server extension, or run a local static server. No compilation is needed.

## Publish with GitHub Pages
1. Upload `index.html`, `style.css`, and `script.js` to the root of the existing repository (or merge them into the current site files).
2. Upload the image files with their exact names.
3. In GitHub, open **Settings → Pages** and select the correct branch and folder (usually `main` and `/ (root)`).
4. Wait for the deployment to finish, then open the Pages URL and test mobile navigation, image loading, and contact links.

## Notes
- This is a static portfolio. A contact form needs a separate form service or backend to submit messages.
- The case-study notes are editable prompts, not claimed metrics or publication results. Replace them with accurate details before sharing publicly.
- Reduced-motion preferences are respected.
