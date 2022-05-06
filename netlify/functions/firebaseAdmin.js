let firebaseAdmin = require('firebase-admin');

if (!firebaseAdmin.apps.length) {
  console.log(process.env.FIREBASE_CLIENT_EMAIL);
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    }),
  });
}

const dbAdmin = firebaseAdmin.firestore();
const app = firebaseAdmin.app();

module.exports = { firebaseAdmin, dbAdmin, app };
