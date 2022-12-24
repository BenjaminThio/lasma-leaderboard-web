import * as admin from 'firebase-admin';
import serviceaccount from "./lasma-leaderboard-firebase-adminsdk-gxewc-34ce14255f.json";

admin.initializeApp({
    credential: admin.credential.cert(serviceaccount as any)
});
const firestore = admin.firestore();

const db = firestore
const FieldValue = admin.firestore.FieldValue;

export {db, FieldValue};