# Eunhee Cho — Portfolio

Personal portfolio website built with React + Vite. Inspired by [gazijarin.com](https://gazijarin.com).

## Setup

```bash
npm install
npm run dev
```

## Deploy to Netlify

1. Push this repo to GitHub
2. Go to [netlify.com](https://netlify.com) → New site from Git
3. Select your repo
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Site name: `eunhee-cho` → gives you `eunhee-cho.netlify.app`

## Deploy to GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts: `"deploy": "gh-pages -d dist"`
3. `npm run build && npm run deploy`
