'use client'
export default function WhyUs() {
  const reasons = [
    { icon: '⚡', title: 'Respon Super Cepat', desc: 'Driver tersedia 24 jam. Respon WhatsApp dalam 5 menit, pickup dalam 30 menit di seluruh Batam.', color: '#FFD600' },
    { icon: '🛡️', title: 'Barang Terjamin Aman', desc: 'Setiap pengiriman dilindungi dengan foto bukti pickup dan delivery. Barang rusak? Kami tanggung jawab.', color: '#4ADE80' },
    { icon: '💸', title: 'Harga Paling Bersaing', desc: 'Tarif transparan tanpa biaya tersembunyi. Kami jamin harga terbaik atau kami samakan!', color: '#FF5722' },
    { icon: '📍', title: 'Jangkauan Seluruh Batam', desc: 'Dari Batam Centre, Nagoya, Batu Ampar, Sekupang, Batu Aji hingga Bengkong — kami ada.', color: '#60A5FA' },
    { icon: '👷', title: 'Tim Profesional', desc: 'Driver terlatih, ramah, berpengalaman. Semua driver telah melalui seleksi dan pelatihan ketat.', color: '#A78BFA' },
    { icon: '📱', title: 'Tracking Real-time', desc: 'Lacak posisi barang Anda secara real-time langsung dari website. Tranparansi penuh.', color: '#FB923C' },
  ]

  return (
    <section style={{ padding: '100px 24px', background: '#0F0F1A' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="why-grid">
          <div>
            <div className="section-tag" style={{ marginBottom: 20, display: 'inline-flex' }}>🏆 Kenapa Pilih Kami</div>
            <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, margin: '0 0 20px', lineHeight: 1.2 }}>
              Bukan Sekadar{' '}
              <span className="gradient-text">Jasa Angkut Biasa</span>
            </h2>
            <p style={{ color: '#8892A4', fontSize: 16, lineHeight: 1.8, marginBottom: 36 }}>
              Kami hadir untuk memberikan pengalaman angkut barang terbaik di Batam — cepat, aman, terpercaya, dan harga yang bersahabat. Lebih dari 2.800 pelanggan telah mempercayai kami.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
              {[
                { num: '2800+', label: 'Pesanan' },
                { num: '98%', label: 'On-Time' },
                { num: '4.9★', label: 'Rating' },
              ].map(s => (
                <div key={s.label} style={{ textAlign: 'center', background: '#16213E', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: '20px 12px' }}>
                  <div style={{ fontFamily: 'Space Grotesk', fontSize: 26, fontWeight: 800, color: '#FF5722' }}>{s.num}</div>
                  <div style={{ fontSize: 12, color: '#8892A4', marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {reasons.map((r, i) => (
              <div key={i} className="card-dark" style={{ padding: 20 }}>
                <div style={{ fontSize: 32, marginBottom: 12, filter: 'drop-shadow(0 0 10px currentColor)' }}>{r.icon}</div>
                <h4 style={{ fontFamily: 'Space Grotesk', fontSize: 15, fontWeight: 700, color: r.color, margin: '0 0 8px' }}>{r.title}</h4>
                <p style={{ color: '#8892A4', fontSize: 13, lineHeight: 1.6, margin: 0 }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .why-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  )
}