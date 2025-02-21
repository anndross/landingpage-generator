// lib/firebase.ts
import admin from "firebase-admin";
import { getFirestore, setLogFunction } from "firebase-admin/firestore";
import jsonConfig from "./firebase-admin.json";

const config = {
  credential: admin.credential.cert(jsonConfig),
};

setLogFunction(console.log);

export const firebase = admin.apps.length
  ? admin.app()
  : admin.initializeApp(config);

export const db = getFirestore("landingpages");
