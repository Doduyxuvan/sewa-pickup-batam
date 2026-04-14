import { NextRequest, NextResponse } from 'next/server'
import { generateOrderNumber } from '@/lib/utils'

// In-memory store (replaces DB for deployment)
let orders: any[] = [
  {
    id: 'demo-1', orderNumber: 'PBM-250101-1234',
    customerName: 'Budi Santoso', phone: '08123456789',
    origin: 'Batam Centre', destination: 'Nagoya',
    itemDesc: 'Kulkas 2 pintu + mesin cuci', weight: 80,
    vehicleType: 'pickup', status: 'delivered',
    notes: 'Hati-hati barang mudah pecah', totalPrice: 250000,
    createdAt: new Date('2025-01-10').toISOString(),
    updatedAt: new Date('2025-01-10').toISOString(),
  },
  {
    id: 'demo-2', orderNumber: 'PBM-250115-5678',
    customerName: 'Siti Rahayu', phone: '08234567890',
    origin: 'Sekupang', destination: 'Batu Aji',
    itemDesc: 'Pindahan rumah (perabotan)', weight: 500,
    vehicleType: 'pickup_besar', status: 'done',
    notes: '', totalPrice: 650000,
    createdAt: new Date('2025-01-15').toISOString(),
    updatedAt: new Date('2025-01-15').toISOString(),
  },
]

export async function GET() {
  return NextResponse.json(orders.sort((a,b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ))
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { customerName, phone, origin, destination, itemDesc, weight, vehicleType, notes } = body

    if (!customerName || !phone || !origin || !destination || !itemDesc) {
      return NextResponse.json({ error: 'Field wajib tidak lengkap' }, { status: 400 })
    }

    // Price calculation
    const basePrices: Record<string, number> = {
      motor: 50000, pickup: 150000, pickup_besar: 350000, truk: 600000
    }
    const basePrice = basePrices[vehicleType] || 150000
    const weightSurcharge = weight && weight > 100 ? Math.floor(weight / 100) * 25000 : 0
    const totalPrice = basePrice + weightSurcharge

    const order = {
      id: `order-${Date.now()}`,
      orderNumber: generateOrderNumber(),
      customerName, phone, origin, destination, itemDesc,
      weight: weight ? parseFloat(weight) : null,
      vehicleType: vehicleType || 'pickup',
      status: 'pending',
      notes: notes || '',
      totalPrice,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    orders.unshift(order)
    return NextResponse.json(order, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'Gagal membuat pesanan' }, { status: 500 })
  }
}
