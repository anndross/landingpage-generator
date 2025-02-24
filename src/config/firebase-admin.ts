// lib/firebase.ts
import admin from "firebase-admin";
import { getFirestore, setLogFunction } from "firebase-admin/firestore";

const config = {
  credential: admin.credential.cert(
    JSON.parse(
      JSON.stringify({
        type: process.env.FIREBASE_CONFIG_TYPE,
        project_id: process.env.FIREBASE_CONFIG_PROJECT_ID,
        private_key_id: process.env.FIREBASE_CONFIG_PRIVATE_KEY_ID,
        private_key: process.env.FIREBASE_CONFIG_PRIVATE_KEY,
        client_email: process.env.FIREBASE_CONFIG_CLIENT_EMAIL,
        client_id: process.env.FIREBASE_CONFIG_CLIENT_ID,
        auth_uri: process.env.FIREBASE_CONFIG_AUTH_URI,
        token_uri: process.env.FIREBASE_CONFIG_TOKEN_URI,
        auth_provider_x509_cert_url:
          process.env.FIREBASE_CONFIG_AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.FIREBASE_CONFIG_CLIENT_X509_CERT_URL,
        universe_domain: process.env.FIREBASE_CONFIG_UNIVERSE_DOMAIN,
      })
    )
  ),
};

// setLogFunction(console.log);

export const firebase = admin.apps.length
  ? admin.app()
  : admin.initializeApp(config);

export const db = getFirestore("landingpages");
