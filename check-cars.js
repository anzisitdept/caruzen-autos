const { initializeApp, cert, getApps } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: privateKey,
    }),
  });
}

const db = getFirestore();

async function checkDB() {
  const brands = ['suzuki', 'toyota', 'honda'];
  for (const brand of brands) {
    const cars = await db.collection('new_cars').doc(brand).collection('cars').get();
    console.log(`Brand ${brand}: ${cars.size} cars`);
    cars.forEach(c => console.log(c.id, c.data()));
  }
}

checkDB().catch(console.error);
