import { NextResponse } from 'next/server';
import { newCarsCollection } from '@/lib/firebase-admin';

export async function GET(request: Request, context: { params: Promise<{ slug: string, variantId: string }> }) {
  try {
    const { slug, variantId } = await context.params;

    const brandsSnapshot = await newCarsCollection.get();

    for (const brandDoc of brandsSnapshot.docs) {
      const carsRef = brandDoc.ref.collection('cars');
      const carQuery = await carsRef.where('slug', '==', slug).limit(1).get();

      if (!carQuery.empty) {
        const carDoc = carQuery.docs[0];
        
        // Fetch the specific variant
        const variantDoc = await carDoc.ref.collection('variants').doc(variantId).get();
        if (variantDoc.exists) {
            const vData = variantDoc.data()!;
            let vPrice = 0;
            if (typeof vData.price === 'string') {
                 const m = vData.price.match(/[\d.]+/);
                 if (m) vPrice = parseFloat(m[0]) * 100000;
            } else if (typeof vData.price === 'number') {
                 vPrice = vData.price;
            }
            const variantFormatted = { id: variantDoc.id, ...vData, parsedPrice: vPrice };
            
            // Return car basic info + variant info
            const carData = carDoc.data();
            const make = carData.brand_name || carData.brand_slug || '';
            const model = carData.name?.replace(new RegExp(`^${make}\\s*`, 'i'), '') || carData.name || '';
            const carBasic = {
              ...carData,
              id: carDoc.id,
              make,
              model,
              images: Array.isArray(carData.images) 
                ? (carData.images.map((img: any) => typeof img === 'string' ? img : img.url).filter((url: any) => url && typeof url === 'string' && url.trim() !== '').length > 0
                   ? carData.images.map((img: any) => typeof img === 'string' ? img : img.url).filter((url: any) => url && typeof url === 'string' && url.trim() !== '')
                   : [carData.thumbnail_url || "/placeholder.jpg"])
                : [carData.thumbnail_url || "/placeholder.jpg"],
              slug: carData.slug
            };

            return NextResponse.json({ variant: variantFormatted, car: carBasic });
        } else {
            return NextResponse.json({ error: 'Variant not found' }, { status: 404 });
        }
      }
    }

    return NextResponse.json({ error: 'Car not found' }, { status: 404 });
  } catch (error) {
    console.error('Error fetching variant:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
