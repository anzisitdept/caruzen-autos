import { NextResponse } from 'next/server';
import { newCarsCollection } from '@/lib/firebase-admin';

export async function GET() {
  try {
    const snapshot = await newCarsCollection.get();
    const brands = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return NextResponse.json({ brands });
  } catch (error) {
    console.error('Error fetching brands:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
