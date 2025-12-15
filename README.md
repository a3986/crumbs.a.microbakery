# Crumbs A Microbakery Website

## Setup Instructions

1. **Install Dependencies:**
   ```bash
   npm install2. **Run Locally:**
   ```bash
   npm start
   ```

## Deployment to GitHub Pages

1. Create a repository on GitHub.
2. Open `package.json` and change the `"homepage"` field to match your GitHub URL:
   `"homepage": "http://{username}.github.io/{repo-name}"`
3. Initialize git and push:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin [https://github.com/](https://github.com/){username}/{repo-name}.git
   git push -u origin main
   ```
4. Deploy:
   ```bash
   npm run deploy
   ```
