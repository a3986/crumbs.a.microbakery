Firebase Setup Guide for Bakery Website

This guide details the steps to create a Firebase project, configure authentication, and connect both your React Frontend and Node.js Backend.

Part 1: Firebase Console Setup

Create a Project

Go to the Firebase Console.

Click "Add project".

Name your project (e.g., crumbs-bakery-auth) and follow the setup steps (Google Analytics is optional).

Enable Authentication

In the left sidebar, click Build -> Authentication.

Click "Get Started".

Select the "Sign-in method" tab.

Click on "Email/Password".

Toggle Enable to "On". (Leave "Email link (passwordless sign-in)" off for now).

Click Save.

Register Your Web App (Frontend Config)

Click the Project Overview (gear icon) in the top left sidebar -> Project settings.

Scroll down to the "Your apps" section.

Click the Web icon (</>).

Register app nickname: Bakery Website.

Click Register app.

IMPORTANT: Copy the firebaseConfig object shown on the screen (apiKey, authDomain, etc.). You will need this for Part 2.

Generate Service Account (Backend Config)

Stay in Project settings.

Click the "Service accounts" tab.

Under "Firebase Admin SDK", make sure "Node.js" is selected.

Click "Generate new private key".

Click "Generate key" to confirm.

A .json file will download to your computer. Keep this file secure. This contains the credentials your Node.js backend needs to verify tokens.

Part 2: Frontend (Bakery Website) Changes

Open your bakery_app_v2.jsx file.

Locate the firebaseConfig constant near the top of the file (lines 35-42).

Replace the placeholder values with the config you copied in Part 1, Step 3.

// REPLACE with your actual config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyD...",
  authDomain: "crumbs-bakery.firebaseapp.com",
  projectId: "crumbs-bakery",
  storageBucket: "crumbs-bakery.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};


Part 3: Backend (Node.js Service) Changes

Open your bakery-backend folder.

Open the downloaded .json file from Part 1, Step 4 using a text editor.

Copy the entire content of the JSON file.

Open your .env file in the backend root directory.

Add a new variable named FIREBASE_SERVICE_ACCOUNT.

Paste the JSON content as a single string.

Crucial: The JSON must be on a single line if possible, or wrapped in single quotes.

Tip for Vercel: When deploying to Vercel, copy the JSON content directly into the Environment Variable value field.

Example .env file:

DATABASE_URL="postgres://..."
EMAIL_USER="..."
EMAIL_PASS="..."
OWNER_EMAIL="..."
# Paste the full JSON content inside single quotes
FIREBASE_SERVICE_ACCOUNT='{"type": "service_account", "project_id": "crumbs-bakery", ...}'


Part 4: Setting Up Admin Users

By default, new users are just "users". To access the Admin Dashboard, you need to assign a custom claim or use a specific email pattern.

Option A: Simple Email Check (Used in current code)

The code currently checks if the email contains the word "admin".

Simply register a user with an email like admin@crumbs.com or siddhi.admin@gmail.com.

They will automatically see the Admin tab.

Option B: Custom Claims (Production approach)
If you want to strictly use Firebase Roles (Custom Claims):

You need to run a script once to promote a user.

Create a file setAdmin.js in your backend:

const admin = require('firebase-admin');
const serviceAccount = require('./path-to-your-service-account.json');

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const uid = "USER_UID_FROM_FIREBASE_CONSOLE"; 

admin.auth().setCustomUserClaims(uid, { admin: true })
  .then(() => console.log('User promoted to admin'))
  .catch(err => console.error(err));


Run node setAdmin.js.