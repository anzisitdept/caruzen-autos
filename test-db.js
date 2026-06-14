const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');

initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: privateKey,
  }),
});

const db = getFirestore();

async function checkDB() {
  const cars = await db.collection('cars').limit(5).get();
  console.log("Cars:");
  cars.forEach(doc => console.log(doc.id, doc.data()));

  const brands = await db.collection('brands').limit(5).get();
  console.log("Brands:");
  brands.forEach(doc => console.log(doc.id, doc.data()));
}

checkDB().catch(console.error);
