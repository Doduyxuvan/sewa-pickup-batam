'use client'
const WA = process.env.NEXT_PUBLIC_WHATSAPP || '6281234567890'

export default function Contact() {
  const areas = ['Batam Centre','Nagoya','Sekupang','Batu Ampar','Batu Aji','Bengkong','Sagulung','Batuaji','Tanjung Pinang*','Bintan*']

  return (
    <section id="kontak" style={{ padding: '100px 24px', background: 'rgba(22,33,62,0.3)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' }} className="contact-grid">
          <div>
            <div className="section-tag" style={{ marginBottom: 20, display: 'inline-flex' }}>📞 Hubungi Kami</div>
            <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, margin: '0 0 20px' }}>
              Siap <span className="gradient-text">Melayani Anda</span>
            </h2>
            <p style={{ color: '#8892A4', fontSize: 16, lineHeight: 1.8, marginBottom: 36 }}>
              Tim kami siap 24 jam setiap hari termasuk hari libur. Hubungi kami sekarang untuk konsultasi gratis dan penawaran harga terbaik.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 36 }}>
              {[
                { icon: '📱', title: 'WhatsApp (Utama)', val: '+62 812-XXXX-XXXX', link: `https://wa.me/${WA}?text=Halo, saya ingin tanya jasa angkut barang` },
                { icon: '📞', title: 'Telepon', val: '+62 812-XXXX-XXXX', link: `tel:+${WA}` },
                { icon: '🕐', title: 'Jam Operasional', val: '24 Jam, 7 Hari Seminggu', link: null },
                { icon: '📍', title: 'Area Layanan', val: 'Seluruh Kota Batam', link: null },
              ].map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(255,87,34,0.1)', border: '1px solid rgba(255,87,34,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{c.icon}</div>
                  <div>
                    <div style={{ fontSize: 12, color: '#8892A4', marginBottom: 2 }}>{c.title}</div>
                    {c.link ? (
                      <a href={c.link} target="_blank" style={{ fontSize: 16, fontWeight: 600, color: '#FF8A65', textDecoration: 'none' }}>{c.val}</a>
                    ) : (
                      <div style={{ fontSize: 16, fontWeight: 600 }}>{c.val}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <a href={`https://wa.me/${WA}?text=Halo! Saya ingin konsultasi jasa angkut barang di Batam`} target="_blank" className="btn-whatsapp" style={{ textDecoration: 'none', display: 'inline-flex' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Chat WhatsApp Sekarang
            </a>
          </div>

          <div>
            <div className="card-dark" style={{ padding: 28, marginBottom: 20 }}>
              <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>📍 Area Layanan Kami</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {areas.map((a, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: a.includes('*') ? '#8892A4' : '#B0BAC8' }}>
                    <span style={{ color: a.includes('*') ? '#8892A4' : '#4ADE80' }}>{a.includes('*') ? '○' : '✓'}</span>
                    {a.replace('*', '')} {a.includes('*') && <span style={{ fontSize: 11, color: '#8892A4' }}>(extra)</span>}
                  </div>
                ))}
              </div>
            </div>

            <div className="card-dark" style={{ padding: 28 }}>
              <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>❓ FAQ</h3>
              {[
                { q: 'Berapa lama barang tiba?', a: 'Tergantung jarak. Dalam kota Batam biasanya 30-90 menit setelah pickup.' },
                { q: 'Apakah ada asuransi barang?', a: 'Kami bertanggung jawab penuh jika ada kerusakan akibat kelalaian kami.' },
                { q: 'Bisa pesan malam hari?', a: 'Bisa! Kami beroperasi 24 jam termasuk malam dan hari libur nasional.' },
                { q: 'Bagaimana cara pembayaran?', a: 'Cash, transfer bank, atau e-wallet (GoPay, OVO, Dana) diterima.' },
              ].map((f, i) => (
                <div key={i} style={{ marginBottom: 16, paddingBottom: 16, borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>❓ {f.q}</div>
                  <div style={{ color: '#8892A4', fontSize: 13, lineHeight: 1.6 }}>{f.a}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  )
}
