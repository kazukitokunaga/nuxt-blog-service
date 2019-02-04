import firebase from 'firebase'

const API_KEY = process.env.API_KEY;
const AUTH_DOMAIN = process.env.AUTH_DOMAIN;
const DATABASE_URL = process.env.DATABASE_URL;
const PROJECT_ID = process.env.PROJECT_ID;
const STRAGE_BUCKET = process.env.STRAGE_BUCKET;
const MESSAGING_SENDER_ID = process.env.MESSAGING_SENDER_ID;

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    databaseURL: DATABASE_URL,
    projectId: PROJECT_ID,
    storageBucket: STRAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID
  })
}
export default firebase
