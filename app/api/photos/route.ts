import { NextRequest, NextResponse } from 'next/server'
import { put, del } from '@vercel/blob'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    const orderId = (formData.get('orderId') as string) || 'manual'
    const type = (formData.get('type') as string) || 'pickup'
    const caption = (formData.get('caption') as string) || ''

    if (!file) {
      return NextResponse.json({ error: 'File tidak ditemukan' }, { status: 400 })
    }

    const blob = await put(`pickup-batam/${Date.now()}-${file.name}`, file, {
      access: 'public',
    })

    const photo = {
      id: `p${Date.now()}`,
      orderId,
      url: blob.url,
      type,
      caption,
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json(photo, { status: 201 })
  } catch (err) {
    console.error('Upload error:', err)
    return NextResponse.json({ error: 'Gagal upload foto' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { url } = await req.json()
    if (url) await del(url)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Gagal hapus foto' }, { status: 500 })
  }
}