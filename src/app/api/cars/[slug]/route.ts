import { NextResponse } from 'next/server';
import { newCarsCollection } from '@/lib/firebase-admin';

export async function GET(request: Request, context: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await context.params;

    const brandsSnapshot = await newCarsCollection.get();

    for (const brandDoc of brandsSnapshot.docs) {
      const carsRef = brandDoc.ref.collection('cars');
      const carQuery = await carsRef.where('slug', '==', slug).limit(1).get();

      if (!carQuery.empty) {
        const carDoc = carQuery.docs[0];
        const carData = carDoc.data();
        
        // Format basic fields for CarCard/Page compatibility
        let parsedPrice = 0;
        if (typeof carData.min_price === 'string') {
          const match = carData.min_price.match(/[\d.]+/);
          if (match) parsedPrice = parseFloat(match[0]) * 100000;
        } else if (typeof carData.min_price === 'number') {
          parsedPrice = carData.min_price;
        }

        const make = carData.brand_name || carData.brand_slug || '';
        const model = carData.name?.replace(new RegExp(`^${make}\\s*`, 'i'), '') || carData.name || '';

        const carFormatted = {
          ...carData,
          id: carDoc.id,
          make,
          model,
          year: new Date().getFullYear(),
          condition: "new",
          price: parsedPrice,
          mileage: "0 km",
          engine: "N/A",
          transmission: "Automatic",
          fuelType: "Petrol",
          city: "N/A",
          featured: false,
          images: Array.isArray(carData.images) 
            ? (carData.images.map((img: any) => typeof img === 'string' ? img : img.url).filter((url: any) => url && typeof url === 'string' && url.trim() !== '').length > 0
               ? carData.images.map((img: any) => typeof img === 'string' ? img : img.url).filter((url: any) => url && typeof url === 'string' && url.trim() !== '')
               : [carData.thumbnail_url || "/placeholder.jpg"])
            : [carData.thumbnail_url || "/placeholder.jpg"],
          slug: carData.slug,
        };

        // Fetch variants
        const variantsSnapshot = await carDoc.ref.collection('variants').get();
        const variants = variantsSnapshot.docs.map(v => {
          const vData = v.data();
          let vPrice = 0;
          if (typeof vData.price === 'string') {
             const m = vData.price.match(/[\d.]+/);
             if (m) vPrice = parseFloat(m[0]) * 100000;
          } else if (typeof vData.price === 'number') {
             vPrice = vData.price;
          }
          return { id: v.id, ...vData, parsedPrice: vPrice };
        });

        // Fetch related cars (2 Suzuki, 2 Toyota)
        let relatedCars: any[] = [];
        try {
          const excludedSlugs = [carDoc.id, 'coaster', 'aerio'];
          const getDocs = async (brand: string) => {
             const docs = await newCarsCollection.doc(brand).collection('cars').limit(10).get();
             return docs.docs.filter(d => !excludedSlugs.includes(d.id)).slice(0, 2);
          };
          const suzukiDocs = await getDocs('suzuki');
          const toyotaDocs = await getDocs('toyota');
          const allRelatedDocs = [...suzukiDocs, ...toyotaDocs];
          
          relatedCars = allRelatedDocs.map(d => {
             const data = d.data();
             let parsedPrice = 0;
             if (typeof data.min_price === 'string') {
               const match = data.min_price.match(/[\d.]+/);
               if (match) parsedPrice = parseFloat(match[0]) * 100000;
             } else if (typeof data.min_price === 'number') {
               parsedPrice = data.min_price;
             }
             const make = data.brand_name || data.brand_slug || '';
             const model = data.name?.replace(new RegExp(`^${make}\\s*`, 'i'), '') || data.name || '';
             
             return {
               ...data,
               id: d.id,
               make,
               model,
               year: new Date().getFullYear(),
               condition: "new",
               price: parsedPrice,
               mileage: "0 km",
               engine: "N/A",
               transmission: "Automatic",
               fuelType: "Petrol",
               city: "N/A",
               featured: false,
               images: Array.isArray(data.images) 
                 ? (data.images.map((img: any) => typeof img === 'string' ? img : img.url).filter((url: any) => url && typeof url === 'string' && url.trim() !== '').length > 0
                    ? data.images.map((img: any) => typeof img === 'string' ? img : img.url).filter((url: any) => url && typeof url === 'string' && url.trim() !== '')
                    : [data.thumbnail_url || "/placeholder.jpg"])
                 : [data.thumbnail_url || "/placeholder.jpg"],
               slug: data.slug,
             };
          });
        } catch (e) {
          console.error("Error fetching related cars", e);
        }

        return NextResponse.json({ car: carFormatted, variants, relatedCars });
      }
    }

    return NextResponse.json({ error: 'Car not found' }, { status: 404 });
  } catch (error) {
    console.error('Error fetching car:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
