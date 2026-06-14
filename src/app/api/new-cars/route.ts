import { NextResponse } from 'next/server';
import { newCarsCollection } from '@/lib/firebase-admin';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const brandParam = searchParams.get('brand');

    const allCars = [];
    const brandsSnapshot = await newCarsCollection.get();

    for (const brandDoc of brandsSnapshot.docs) {
      if (brandParam && brandDoc.id !== brandParam) continue;

      const carsSnapshot = await brandDoc.ref.collection('cars').get();
      for (const carDoc of carsSnapshot.docs) {
        const data = carDoc.data();
        
        let parsedPrice = 0;
        if (typeof data.min_price === 'string') {
          const match = data.min_price.match(/[\d.]+/);
          if (match) {
            // "lacs" implies multiplier of 100,000
            parsedPrice = parseFloat(match[0]) * 100000;
          }
        } else if (typeof data.min_price === 'number') {
          parsedPrice = data.min_price;
        }

        const make = data.brand_name || data.brand_slug || '';
        const model = data.name?.replace(new RegExp(`^${make}\\s*`, 'i'), '') || data.name || '';

        allCars.push({
          id: carDoc.id,
          make: make,
          model: model,
          year: new Date().getFullYear(),
          condition: "new",
          price: parsedPrice,
          mileage: "0 km",
          engine: "N/A",
          transmission: "Automatic", // Fallbacks for UI
          fuelType: "Petrol",
          city: "N/A",
          featured: false,
          images: Array.isArray(data.images) ? data.images.map((img: any) => img.url) : [data.thumbnail_url || "/placeholder.jpg"],
          slug: data.slug,
        });
      }
    }

    return NextResponse.json({ cars: allCars });
  } catch (error) {
    console.error('Error fetching new cars:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
