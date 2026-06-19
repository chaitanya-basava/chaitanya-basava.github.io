# Personal Website

This is Chaitanya Basava's personal portfolio site, hosted with GitHub Pages.

The site is built with [Eleventy](https://www.11ty.dev/) and outputs plain static HTML, CSS, JavaScript, and assets into `dist/`.

## Content updates

Most site content lives in `src/_data/`:

- `profile.json` for sidebar profile, contacts, and social links.
- `about.json` for about text, services, and testimonials.
- `resume.json` for education, experience, publications, skills, and resume URL.
- `projects.json` for project categories and project cards.
- `blogs.json` for external blog cards.
- `contact.json` for the map, contact message, and contact actions.

Reusable page markup lives in `src/_includes/partials/`.

## Commands

```sh
npm run dev
npm run validate:content
npm run build
npm test
```

`npm run dev` starts a local Eleventy server. `npm test` validates content, builds the static site, and runs a smoke test against `dist/index.html`.

This code base was extended from [codewithsadee](https://github.com/codewithsadee/)'s [vcard-personal-portfolio](https://github.com/codewithsadee/vcard-personal-portfolio).
