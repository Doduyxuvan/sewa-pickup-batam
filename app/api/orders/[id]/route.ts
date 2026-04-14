import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
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

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await req.json()
    return NextResponse.json({ ...body, id, updatedAt: new Date().toISOString() })
  } catch {
    return NextResponse.json({ error: 'Gagal update' }, { status: 500 })
  }
}