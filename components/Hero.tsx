'use client'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [stats, setStats] = useState({ totalOrders: 2847, happyCustomers: 2690, avgRating: 4.9 })
  const WA = process.env.NEXT_PUBLIC_WHATSAPP || '6281234567890'

  useEffect(() => {
    fetch('/api/stats').then(r => r.json()).then(setStats).catch(() => {})
  }, [])

  return (
    <section className="hero-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '100px 24px 60px', position: 'relative', overflow: 'hidden' }}>
      {/* BG Decorations */}
      <div style={{ position: 'absolute', top: '15%', right: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'rgba(255,87,34,0.06)', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', left: '-10%', width: 400, height: 400, borderRadius: '50%', background: 'rgba(255,87,34,0.04)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }} className="hero-grid">
          {/* Left */}
          <div>
            <div className="section-tag" style={{ marginBottom: 24 }}>
              <span>🟢</span> Tersedia 24 Jam — Siap Antar ke Seluruh Batam
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 58px)', fontWeight: 800, lineHeight: 1.15, margin: '0 0 20px', color: '#F0F0F0' }}>
              Jasa Angkut Barang{' '}
              <span className="gradient-text">Pickup Batam</span>{' '}
              Murah & Amanah
            </h1>
            <p style={{ fontSize: 17, color: '#8892A4', lineHeight: 1.7, margin: '0 0 36px', maxWidth: 480 }}>
              Solusi angkut barang terpercaya di Batam. Pindahan rumah, kirim barang besar, atau angkut apapun — kami siap melayani dengan cepat, aman, dan harga terjangkau.
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 44 }}>
              <a href="#pesan" className="btn-primary" style={{ textDecoration: 'none' }}>
                📦 Pesan Sekarang
              </a>
              <a href={`https://wa.me/${WA}?text=Halo, saya ingin tanya jasa angkut barang`} target="_blank" className="btn-whatsapp" style={{ textDecoration: 'none' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Chat WhatsApp
              </a>
            </div>

            {/* Stats Row */}
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
              {[
                { value: `${stats.totalOrders.toLocaleString()}+`, label: 'Pesanan Selesai' },
                { value: `${stats.avgRating}⭐`, label: 'Rating Rata-rata' },
                { value: '24 Jam', label: 'Siap Melayani' },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ fontFamily: 'Space Grotesk', fontSize: 26, fontWeight: 800, color: '#FF5722' }}>{s.value}</div>
                  <div style={{ fontSize: 13, color: '#8892A4', marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Trust Strip */}
            <div className="trust-strip">
              {[
                { icon: '✅', text: 'Terpercaya di Batam' },
                { icon: '🏆', text: 'Sudah Terbukti 2.800+ Order' },
                { icon: '⭐', text: 'Rating 4.9 / 5.0' },
                { icon: '🔒', text: 'Barang Dijamin Aman' },
              ].map((t, i) => (
                <div key={i} className="trust-strip-item">
                  <span className="dot" />
                  <span>{t.icon} {t.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Visual Card */}
          <div style={{ display: 'flex', justifyContent: 'center' }} className="hero-visual">
            <div style={{ position: 'relative', width: '100%', maxWidth: 420 }}>
              {/* Main Card */}
              <div className="card-dark animate-float" style={{ padding: 28, borderColor: 'rgba(255,87,34,0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: 'linear-gradient(135deg,#FF5722,#FF8A65)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>🚛</div>
                  <div>
                    <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 16 }}>Pickup Batam</div>
                    <div style={{ fontSize: 12, color: '#4ADE80', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ADE80', display: 'inline-block' }}/>
                      Online & Siap Antar
                    </div>
                  </div>
                </div>



                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {[
                    { icon: '⚡', label: 'Respon Cepat', sub: '< 5 menit' },
                    { icon: '🔒', label: 'Barang Aman', sub: 'Bergaransi' },
                    { icon: '💰', label: 'Harga Murah', sub: 'Mulai 50rb' },
                    { icon: '📸', label: 'Foto Bukti', sub: 'Pickup & Delivery' },
                  ].map(f => (
                    <div key={f.label} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: 12 }}>
                      <div style={{ fontSize: 20, marginBottom: 4 }}>{f.icon}</div>
                      <div style={{ fontSize: 12, fontWeight: 600 }}>{f.label}</div>
                      <div style={{ fontSize: 11, color: '#8892A4' }}>{f.sub}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badge */}
              <div style={{
                position: 'absolute', top: -16, right: -16,
                background: 'linear-gradient(135deg,#FFD600,#FF8A65)',
                borderRadius: 12, padding: '8px 14px', fontSize: 12, fontWeight: 700, color: '#1A1A2E',
              }}>
                ✅ Terpercaya #1 Batam
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .hero-visual { display: none !important; }
        }
      `}</style>
    </section>
  )
}