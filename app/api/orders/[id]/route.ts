import { NextRequest, NextResponse } from 'next/server'

// Shared in-memory store reference (simplified for demo)
const statusFlow = ['pending','confirmed','pickup','onway','delivered','done']

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  // Return mock for track demo
  return NextResponse.json({
    id, orderNumber: id,
    customerName: 'Demo Customer', phone: '08123456789',
    origin: 'Batam Centre', destination: 'Nagoya',
    itemDesc: 'Barang Demo', status: 'onway',
    totalPrice: 250000,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    return NextResponse.json({ ...body, id: params.id, updatedAt: new Date().toISOString() })
  } catch {
    return NextResponse.json({ error: 'Gagal update' }, { status: 500 })
  }
}
