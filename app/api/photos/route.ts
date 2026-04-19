import { NextRequest, NextResponse } from 'next/server'
import { put, del, list } from '@vercel/blob'

export async function GET() {
  try {
    const { blobs } = await list({ prefix: 'pickup-batam/' })
    const photos = blobs.map((blob) => {
      // decode metadata dari filename
      // format: pickup-batam/TIMESTAMP__TYPE__CAPTION__ORDERID__filename.jpg
      const filename = blob.pathname.replace('pickup-batam/', '')
      const parts = filename.split('__')
      const type = parts[1] || 'pickup'
      const caption = parts[2] ? decodeURIComponent(parts[2]) : ''
      const orderId = parts[3] ? decodeURIComponent(parts[3]) : ''
      return {
        id: blob.pathname,
        url: blob.url,
        type,
        caption,
        orderId,
        createdAt: blob.uploadedAt,
      }
    })
    return NextResponse.json(photos)
  } catch (err) {
    console.error('List error:', err)
    return NextResponse.json([])
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    const orderId = (formData.get('orderId') as string) || ''
    const type = (formData.get('type') as string) || 'pickup'
    const caption = (formData.get('caption') as string) || ''

    if (!file) {
      return NextResponse.json({ error: 'File tidak ditemukan' }, { status: 400 })
    }

    // encode metadata ke dalam filename
    const safeName = `${Date.now()}__${type}__${encodeURIComponent(caption)}__${encodeURIComponent(orderId)}__${file.name}`
    const blob = await put(`pickup-batam/${safeName}`, file, {
      access: 'public',
    })

    const photo = {
      id: blob.pathname,
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
