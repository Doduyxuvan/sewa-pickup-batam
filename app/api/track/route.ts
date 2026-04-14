import { NextRequest, NextResponse } from 'next/server'

const demoOrders: Record<string, any> = {
  'PBM-250101-1234': {
    id: 'demo-1', orderNumber: 'PBM-250101-1234',
    customerName: 'Budi Santoso', phone: '0812****6789',
    origin: 'Batam Centre', destination: 'Nagoya',
    itemDesc: 'Kulkas 2 pintu + mesin cuci', weight: 80,
    vehicleType: 'pickup', status: 'delivered',
    totalPrice: 250000, driverName: 'Pak Rudi',
    driverPhone: '0813****4567', vehiclePlate: 'BP 1234 AB',
    timeline: [
      { status: 'pending', time: '2025-01-10 08:00', note: 'Pesanan diterima' },
      { status: 'confirmed', time: '2025-01-10 08:15', note: 'Dikonfirmasi admin' },
      { status: 'pickup', time: '2025-01-10 09:00', note: 'Driver menuju lokasi penjemputan' },
      { status: 'onway', time: '2025-01-10 09:45', note: 'Barang sudah diambil, menuju tujuan' },
      { status: 'delivered', time: '2025-01-10 10:30', note: 'Barang tiba di tujuan' },
    ],
    createdAt: '2025-01-10T08:00:00.000Z',
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const orderNumber = searchParams.get('orderNumber')
  
  if (!orderNumber) {
    return NextResponse.json({ error: 'Nomor pesanan diperlukan' }, { status: 400 })
  }

  const order = demoOrders[orderNumber.toUpperCase()]
  if (!order) {
    // Return a "not found" that still shows UI nicely
    return NextResponse.json({ error: 'Pesanan tidak ditemukan. Coba: PBM-250101-1234' }, { status: 404 })
  }
  return NextResponse.json(order)
}
