# Chisomo Moleni — Portfolio

A responsive editorial portfolio with locally bundled images, project notes, keyboard-accessible dialogs, email copy, and reduced-motion support.

## Run locally

Serve the `dist` directory using any static server, for example:

```sh
python3 -m http.server 8000 --directory dist
```

No build step or dependencies are required. Edit `dist/index.html`, `dist/styles.css`, and `dist/script.js` directly. Project dialog content lives in `script.js`.

## Content and imagery

Project information was checked against the owner's GitHub repositories on 2026-10-13. DreamTracks and Malawi Abroad are explicitly described as front-end prototypes. Palacio de Mewic describes the current lodge website, with online payment marked as planned.

- `assets/lodge.webp`: actual room photography from the owner's Palacio de Mewic project.
- `assets/dream.webp`: existing racing imagery from the owner's DreamTracks repository; original asset rights remain with their respective holders.
- `assets/form-study.webp`: AI-generated decorative artwork for this portfolio; not represented as the owner's photography or physical sculpture.
- Malawi Abroad cover: original typographic composition in CSS.

Hero artwork brief: a sculptural black satin ribbon with a copper-red edge over a warm travertine plinth, photographed as a minimal editorial still life. Generated with the built-in image tool.

## Hosting

Static output is `dist/`. The Sites manifest is in `.openai/hosting.json`. For other static hosts, publish the contents of `dist/`. No environment variables or credentials are required.

## Verification

JavaScript syntax, HTML structure, local asset references, section anchors, and project data are checked before publication. Browser-based visual QA was unavailable in the build environment.
