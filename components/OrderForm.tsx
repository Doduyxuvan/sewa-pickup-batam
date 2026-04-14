'use client'
import { useState, useEffect } from 'react'

export default function OrderForm() {
  const [WA, setWA] = useState(process.env.NEXT_PUBLIC_WHATSAPP || '6281234567890')
  const [selected, setSelected] = useState('pickup')

  useEffect(() => {
    const saved = localStorage.getItem('admin_settings')
    if (saved) {
      const s = JSON.parse(saved)
      if (s.whatsapp) setWA(s.whatsapp)
    }
  }, [])

  const vehicles = [
    { id: 'pickup',       icon: '🚛', label: 'Pickup Kecil', desc: 'Furniture & barang sedang', price: '200rb' },
    { id: 'pickup_besar', icon: '🚚', label: 'Pickup Besar', desc: 'Pindahan rumah lengkap',    price: '350rb' },
    { id: 'truk',         icon: '🚜', label: 'Truk Besar',   desc: 'Material & muatan berat',   price: '600rb' },
  ]

  const selectedVehicle = vehicles.find(v => v.id === selected)
  const waMsg = encodeURIComponent(
    `Halo! Saya ingin pesan jasa angkut barang di Batam.\n\nKendaraan: ${selectedVehicle?.icon} ${selectedVehicle?.label}\n\nMohon infokan harga dan ketersediaannya. Terima kasih!`
  )

  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ color: '#8892A4', fontSize: 15, marginBottom: 32 }}>
        Pilih jenis kendaraan lalu langsung chat WhatsApp kami — kami akan bantu hitung harga terbaik untuk kamu!
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, maxWidth: 560, margin: '0 auto 32px', textAlign: 'left' }}>
        {vehicles.map(v => (
          <button
            key={v.id}
            onClick={() => setSelected(v.id)}
            style={{
              background: selected === v.id ? 'rgba(255,87,34,0.15)' : 'rgba(255,255,255,0.04)',
              border: `1.5px solid ${selected === v.id ? '#FF5722' : 'rgba(255,255,255,0.08)'}`,
              borderRadius: 12, padding: '16px', cursor: 'pointer', textAlign: 'left',
              transition: 'all 0.2s', color: '#F0F0F0',
            }}
          >
            <div style={{ fontSize: 28, marginBottom: 6 }}>{v.icon}</div>
            <div style={{ fontWeight: 700, fontSize: 13 }}>{v.label}</div>
            <div style={{ fontSize: 11, color: '#8892A4', marginTop: 2 }}>{v.desc}</div>
            <div style={{ fontSize: 12, color: '#FF5722', fontWeight: 700, marginTop: 6 }}>Mulai {v.price}</div>
          </button>
        ))}
      </div>

      <a
        href={`https://wa.me/${WA}?text=${waMsg}`}
        target="_blank"
        style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 12,
          background: 'linear-gradient(135deg,#25D366,#128C7E)',
          color: 'white', padding: '16px 40px', borderRadius: 14,
          fontSize: 16, fontWeight: 700, textDecoration: 'none',
          boxShadow: '0 6px 24px rgba(37,211,102,0.35)',
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        Chat WhatsApp Sekarang
      </a>

      <p style={{ color: '#8892A4', fontSize: 12, marginTop: 16 }}>
        Biasanya dibalas dalam 5 menit · 24 jam siap melayani
      </p>
    </div>
  )
}