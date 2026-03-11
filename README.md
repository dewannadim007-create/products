# Dev Portfolio Template

A clean, interactive, and fully customizable personal portfolio template for developers. Built with **pure HTML, CSS, and JavaScript** — no frameworks, no npm, no build steps.

## Features

- **Interactive Terminal** — A working CLI on the home screen. Visitors can type commands like `help`, `skills`, or `about` to explore your site.
- **Animated Background** — A floating node network built with `particles.js`.
- **Dark / Light Mode** — Toggle between themes.
- **Contact Form** — Fully functional email form powered by `EmailJS`. No backend or server required.
- **Zero Dependencies** — Pure HTML, CSS, and JavaScript. Fast and lightweight.
- **Fully Responsive** — Works on mobile, tablet, and desktop.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 (custom properties for theming) |
| Logic | JavaScript ES6 |
| Background | `particles.js` |
| Contact Form | `EmailJS` |
| Icons | `Font Awesome` |

---

## Deploy to GitHub Pages

This repository includes a GitHub Actions workflow that automatically deploys the site to GitHub Pages whenever you push to the `main` branch.

### Steps to enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Build and deployment**, set the **Source** to **GitHub Actions**
4. Push any change to the `main` branch (or manually trigger the workflow from the **Actions** tab)
5. Your portfolio will be live at `https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPO_NAME/`

---

## Run Locally

No installs needed:

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

Then open `index.html` in your browser. That's it.

---

## Customization Guide

Every section that needs your personal info is marked with an `TEMPLATE:` comment in `index.html`. Open the file and search for that tag to jump to each one.

### Things to replace

| What | Where | Example |
|---|---|---|
| Your name | `<title>`, hero section, footer | `Jane Doe` |
| Role / tagline | Hero subtitle | `Full Stack Developer` |
| About paragraph | `#about` section | Your bio |
| Skill cards | `#skills` section | Add/remove cards |
| Featured projects | `#projects` section | Title, description, image, tags |
| Archive projects | `#archive` section | Repo links, descriptions |
| Social links | `#links` section | GitHub, LinkedIn, etc. |
| Email & location | `#contact` section | Your contact details |
| EmailJS credentials | `<script>` in `<head>` + form handler | See below |
| Footer year & name | `<footer>` | `2025 Jane Doe` |

### Setting up the contact form (EmailJS)

The contact form works without a backend using [EmailJS](https://www.emailjs.com) (free tier available):

1. Sign up at [emailjs.com](https://www.emailjs.com)
2. Create an **Email Service** (connect Gmail, Outlook, etc.) and copy your `SERVICE_ID`
3. Create an **Email Template** and copy your `TEMPLATE_ID`
4. Go to **Account > API Keys** and copy your `PUBLIC_KEY`
5. Replace the three placeholders in `index.html`:

```js
// In the <head> script
emailjs.init({ publicKey: "YOUR_EMAILJS_PUBLIC_KEY" });

// In the form submit handler
emailjs.sendForm("YOUR_EMAILJS_SERVICE_ID", "YOUR_EMAILJS_TEMPLATE_ID", this, {
    publicKey: "YOUR_EMAILJS_PUBLIC_KEY"
});
```

### Updating skill icons

Skill icons are sourced from [devicons](https://github.com/devicons/devicon). The URL pattern is:

```
https://cdn.jsdelivr.net/gh/devicons/devicon/icons/TECH_NAME/TECH_NAME-original.svg
```

Browse available icons at the [devicon gallery](https://devicon.dev).

---

## Project Structure

```
/
├── index.html        # All content and structure — main file to edit
├── style.css         # All styling and theme variables
├── script.js         # Terminal logic, particles config, scroll behavior
├── favicon.svg       # Browser tab icon
└── /images           # Place your project screenshots here
```

---

## License

This template is open source under the [MIT License](LICENSE). Feel free to use it, modify it, and make it your own. A credit or star is appreciated but not required.
