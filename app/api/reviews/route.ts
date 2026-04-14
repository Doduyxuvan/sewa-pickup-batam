import { NextRequest, NextResponse } from 'next/server'

let reviews: any[] = [
  { id: 'r1', name: 'Andi Wijaya', rating: 5, comment: 'Pelayanan super cepat dan ramah! Barang sampai dengan selamat, tidak ada yang rusak sedikitpun. Harga juga sangat terjangkau. Recommended banget!', service: 'Angkut Furniture', verified: true, createdAt: new Date('2025-02-10').toISOString() },
  { id: 'r2', name: 'Dewi Lestari', rating: 5, comment: 'Sudah 3x pakai jasa ini, selalu puas! Driver tepat waktu, komunikatif, dan barang ditangani dengan hati-hati. Harga bersaing di Batam.', service: 'Pindahan Rumah', verified: true, createdAt: new Date('2025-02-15').toISOString() },
  { id: 'r3', name: 'Rizky Pratama', rating: 4, comment: 'Pindahan kantor berjalan lancar. Tim kerja cepat dan profesional. Sedikit terlambat dari jadwal tapi dikomunikasikan dengan baik.', service: 'Pindahan Kantor', verified: true, createdAt: new Date('2025-03-01').toISOString() },
  { id: 'r4', name: 'Margaretha S.', rating: 5, comment: 'Kirim barang elektronik dari Batam Centre ke Batu Ampar. Packing sangat aman, sampai tanpa kerusakan apapun. Terima kasih!', service: 'Kirim Elektronik', verified: true, createdAt: new Date('2025-03-12').toISOString() },
  { id: 'r5', name: 'Hendra Gunawan', rating: 5, comment: 'Murah, amanah, dan 24 jam. Saya pakai tengah malam dan langsung ada yang respon. Luar biasa pelayanannya!', service: 'Angkut Barang', verified: false, createdAt: new Date('2025-03-20').toISOString() },
  { id: 'r6', name: 'Fitri Handayani', rating: 4, comment: 'Sangat membantu saat pindahan mendadak. Proses cepat dan harga sesuai. Pasti pakai lagi kalau butuh.', service: 'Pindahan Rumah', verified: true, createdAt: new Date('2025-04-01').toISOString() },
]

export async function GET() {
  return NextResponse.json(reviews.sort((a,b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ))
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, rating, comment, service } = body
    if (!name || !rating || !comment) {
      return NextResponse.json({ error: 'Nama, rating, dan komentar wajib diisi' }, { status: 400 })
    }
    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating harus antara 1-5' }, { status: 400 })
    }
    const review = {
      id: `r${Date.now()}`, name, rating: parseInt(rating),
      comment, service: service || 'Angkut Barang',
      verified: false, createdAt: new Date().toISOString()
    }
    reviews.unshift(review)
    return NextResponse.json(review, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Gagal menyimpan ulasan' }, { status: 500 })
  }
}
