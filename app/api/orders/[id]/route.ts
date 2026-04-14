import { NextRequest, NextResponse } from 'next/server'

const orders: any[] = [
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
]

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  const order = orders.find(o => o.id === id)
  if (!order) return NextResponse.json({ error: 'Pesanan tidak ditemukan' }, { status: 404 })
  return NextResponse.json(order)
}

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params
    const body = await req.json()
    const index = orders.findIndex(o => o.id === id)
    if (index === -1) return NextResponse.json({ error: 'Pesanan tidak ditemukan' }, { status: 404 })
    orders[index] = { ...orders[index], ...body, updatedAt: new Date().toISOString() }
    return NextResponse.json(orders[index])
  } catch {
    return NextResponse.json({ error: 'Gagal update pesanan' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  const index = orders.findIndex(o => o.id === id)
  if (index === -1) return NextResponse.json({ error: 'Pesanan tidak ditemukan' }, { status: 404 })
  orders.splice(index, 1)
  return NextResponse.json({ success: true })
}
