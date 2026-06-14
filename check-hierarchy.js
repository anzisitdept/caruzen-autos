
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

async function checkHierarchy() {
  console.log("Checking 'new_cars' hierarchy...");
  const brandsSnap = await db.collection('new_cars').get();
  for (const brandDoc of brandsSnap.docs) {
    console.log(`Brand: ${brandDoc.id}`);
    const modelsSnap = await brandDoc.ref.collection('models').get();
    for (const modelDoc of modelsSnap.docs) {
      console.log(`  Model: ${modelDoc.id}`);
      const variantsSnap = await modelDoc.ref.collection('variants').get();
      for (const variantDoc of variantsSnap.docs) {
        console.log(`    Variant: ${variantDoc.id} -`, variantDoc.data());
      }
    }
  }
}

checkHierarchy().catch(console.error);
