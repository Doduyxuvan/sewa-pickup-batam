'use client'
export default function Services() {
  const services = [
    { icon: '🏠', title: 'Pindahan Rumah', desc: 'Pindah rumah jadi mudah dan bebas stres. Kami tangani semua barang dengan hati-hati dan profesional.', features: ['Packing & Unpacking', 'Furniture besar', 'Barang pecah belah', 'Tim berpengalaman'] },
    { icon: '🏢', title: 'Pindahan Kantor', desc: 'Relokasi kantor tanpa gangguan operasional. Cepat, rapi, dan terjadwal sesuai kebutuhan bisnis Anda.', features: ['Peralatan kantor', 'Dokumen penting', 'Weekend & malam', 'Asuransi barang'] },
    { icon: '📦', title: 'Kirim Paket Besar', desc: 'Kirim barang ukuran besar yang tidak muat di ojek online. Aman sampai tujuan dengan bukti foto.', features: ['Kulkas & AC', 'Mesin cuci', 'Sofa & kasur', 'Foto dokumentasi'] },
    { icon: '🏗️', title: 'Angkut Material', desc: 'Angkut material bangunan, pasir, batu, semen, dan kebutuhan konstruksi ke lokasi proyek Anda.', features: ['Material bangunan', 'Tonase besar', 'Ke lokasi proyek', 'Bisa borongan'] },
    { icon: '🛒', title: 'Antar Belanja', desc: 'Beli barang di toko atau pasar dan langsung diantar ke rumah. Tidak perlu repot bawa sendiri.', features: ['Toko furniture', 'Pasar tradisional', 'Mall & toko besar', 'Hari yang sama'] },
    { icon: '🚨', title: 'Darurat 24 Jam', desc: 'Butuh angkut barang mendadak tengah malam? Kami siap 24 jam termasuk hari libur dan Lebaran.', features: ['Respon < 15 menit', 'Tidak ada biaya extra', 'Hari libur nasional', 'Chat WhatsApp'] },
  ]

  return (
    <section id="layanan" style={{ padding: '100px 24px', background: 'rgba(22,33,62,0.3)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div className="section-tag" style={{ marginBottom: 16, display: 'inline-flex' }}>🚀 Layanan Kami</div>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, margin: '0 0 16px', color: '#F0F0F0' }}>
            Semua Kebutuhan Angkut{' '}
            <span className="gradient-text">Kami Tangani</span>
          </h2>
          <p style={{ color: '#8892A4', fontSize: 17, maxWidth: 520, margin: '0 auto' }}>
            Dari pindahan rumah hingga kirim barang mendadak — satu platform untuk semua kebutuhan angkut Anda di Batam
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
          {services.map((s, i) => (
            <div key={i} className="card-dark" style={{ padding: 28 }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>{s.icon}</div>
              <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 20, fontWeight: 700, margin: '0 0 10px', color: '#F0F0F0' }}>{s.title}</h3>
              <p style={{ color: '#8892A4', fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>{s.desc}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {s.features.map((f, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#B0BAC8' }}>
                    <span style={{ color: '#4ADE80', fontWeight: 700 }}>✓</span> {f}
                  </div>
                ))}
              </div>
              <a href="#pesan" style={{
                display: 'block', marginTop: 24, textAlign: 'center',
                background: 'rgba(255,87,34,0.1)', border: '1px solid rgba(255,87,34,0.3)',
                color: '#FF8A65', padding: '10px', borderRadius: 10, fontSize: 13, fontWeight: 600,
                textDecoration: 'none', transition: 'all 0.3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background='rgba(255,87,34,0.2)' }}
                onMouseLeave={e => { e.currentTarget.style.background='rgba(255,87,34,0.1)' }}
              >Pesan Layanan Ini →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}