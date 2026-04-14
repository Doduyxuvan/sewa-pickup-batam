'use client'
import { useState, useEffect } from 'react'

export default function Pricing() {
  const [WA, setWA] = useState(process.env.NEXT_PUBLIC_WHATSAPP || '6281234567890')

  useEffect(() => {
    const saved = localStorage.getItem('admin_settings')
    if (saved) {
      const s = JSON.parse(saved)
      if (s.whatsapp) setWA(s.whatsapp)
    }
  }, [])

  const fmt = (n: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n)

  const vehicles = [
    { id: 'pickup',       icon: '🚛', name: 'Pickup Kecil', desc: 'Furniture & barang sedang', price: 200000, color: '#FF5722', popular: true },
    { id: 'pickup_besar', icon: '🚚', name: 'Pickup Besar', desc: 'Pindahan rumah lengkap',    price: 350000, color: '#A78BFA' },
    { id: 'truk',         icon: '🚜', name: 'Truk Besar',   desc: 'Material & muatan berat',   price: 600000, color: '#34D399' },
  ]

  return (
    <section id="harga" style={{ padding: '100px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div className="section-tag" style={{ marginBottom: 16, display: 'inline-flex' }}>💰 Harga Transparan</div>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, margin: '0 0 16px' }}>
            Tarif <span className="gradient-text">Terjangkau & Jelas</span>
          </h2>
          <p style={{ color: '#8892A4', fontSize: 17, maxWidth: 500, margin: '0 auto' }}>
            Harga mulai dari yang tertera — hubungi kami via WhatsApp untuk harga terbaik sesuai kebutuhan kamu
          </p>
        </div>

        {/* Card grid — max 3 kolom, selalu tengah */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 24,
          alignItems: 'stretch',
        }}>
          {vehicles.map(v => (
            <div key={v.id} className="card-dark" style={{
              padding: 32,
              position: 'relative',
              border: `1px solid ${v.popular ? v.color + '50' : 'rgba(255,255,255,0.07)'}`,
              transform: v.popular ? 'translateY(-8px)' : undefined,
              boxShadow: v.popular ? `0 8px 32px ${v.color}20` : undefined,
              flex: '1 1 260px',
              maxWidth: 320,
              display: 'flex',
              flexDirection: 'column',
            }}>
              {v.popular && (
                <div style={{
                  position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
                  background: 'linear-gradient(135deg,#FF5722,#FF8A65)',
                  color: 'white', fontSize: 11, fontWeight: 700, padding: '5px 16px',
                  borderRadius: 999, whiteSpace: 'nowrap', letterSpacing: 0.5,
                }}>⭐ Paling Populer</div>
              )}

              <div style={{ fontSize: 44, marginBottom: 16 }}>{v.icon}</div>
              <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 20, fontWeight: 700, margin: '0 0 6px', color: v.color }}>{v.name}</h3>
              <p style={{ color: '#8892A4', fontSize: 14, marginBottom: 24, lineHeight: 1.5 }}>{v.desc}</p>

              <div style={{ marginBottom: 28, flex: 1 }}>
                <div style={{ fontSize: 12, color: '#8892A4', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>Mulai dari</div>
                <div style={{ fontSize: 32, fontWeight: 800, color: '#F0F0F0', letterSpacing: -1 }}>{fmt(v.price)}</div>
                <div style={{ fontSize: 12, color: '#8892A4', marginTop: 6 }}>*harga final via negosiasi</div>
              </div>

              <a
                href={`https://wa.me/${WA}?text=Halo! Saya ingin tanya harga ${v.name} untuk angkut barang di Batam`}
                target="_blank"
                style={{
                  display: 'block', textAlign: 'center', padding: '12px',
                  background: `${v.color}22`, border: `1px solid ${v.color}50`,
                  color: v.color, borderRadius: 10, fontSize: 14, fontWeight: 700,
                  textDecoration: 'none', transition: 'all 0.2s',
                }}
              >
                Tanya Harga via WA
              </a>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 48, background: 'rgba(255,87,34,0.05)', border: '1px solid rgba(255,87,34,0.15)', borderRadius: 16, padding: '20px 28px', display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <span style={{ fontSize: 24 }}>💡</span>
          <div>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>Catatan Harga</div>
            <div style={{ color: '#8892A4', fontSize: 14, lineHeight: 1.6 }}>
              Harga di atas adalah tarif mulai (starting price). Harga final tergantung jarak, berat barang, dan medan pengiriman. Hubungi kami via WhatsApp untuk penawaran terbaik!
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}