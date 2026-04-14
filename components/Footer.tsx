'use client'
export default function Footer() {
  const year = new Date().getFullYear()
  const WA = process.env.NEXT_PUBLIC_WHATSAPP || '6281234567890'

  return (
    <footer style={{ background: '#0A0A16', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '60px 24px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }} className="footer-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg,#FF5722,#FF8A65)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🚛</div>
              <div>
                <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 16 }}>PickupBatam</div>
                <div style={{ fontSize: 10, color: '#FF8A65', fontWeight: 600 }}>Murah • Amanah • 24 Jam</div>
              </div>
            </div>
            <p style={{ color: '#8892A4', fontSize: 14, lineHeight: 1.8, maxWidth: 280 }}>
              Jasa angkut barang terpercaya di Batam. Melayani pindahan rumah, kirim barang, dan angkut material ke seluruh Batam.
            </p>
            <a href={`https://wa.me/${WA}`} target="_blank" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#25D366', color: 'white', padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: 'none', marginTop: 16 }}>
              💬 WhatsApp Kami
            </a>
          </div>

          <div>
            <h4 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 15, marginBottom: 16, color: '#F0F0F0' }}>Layanan</h4>
            {['Pindahan Rumah','Pindahan Kantor','Kirim Paket Besar','Angkut Material','Darurat 24 Jam'].map(s => (
              <a key={s} href="#layanan" style={{ display: 'block', color: '#8892A4', textDecoration: 'none', fontSize: 14, marginBottom: 10, transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#FF8A65')}
                onMouseLeave={e => (e.currentTarget.style.color = '#8892A4')}>{s}</a>
            ))}
          </div>

          <div>
            <h4 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 15, marginBottom: 16, color: '#F0F0F0' }}>Informasi</h4>
            {[['#harga','Tarif & Harga'],['#ulasan','Ulasan Pelanggan'],['#dokumentasi','Foto Dokumentasi'],['#lacak','Lacak Pesanan'],['#kontak','Hubungi Kami']].map(([href, label]) => (
              <a key={label} href={href} style={{ display: 'block', color: '#8892A4', textDecoration: 'none', fontSize: 14, marginBottom: 10, transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#FF8A65')}
                onMouseLeave={e => (e.currentTarget.style.color = '#8892A4')}>{label}</a>
            ))}
          </div>

          <div>
            <h4 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 15, marginBottom: 16, color: '#F0F0F0' }}>Area Layanan</h4>
            {['Batam Centre','Nagoya','Sekupang','Batu Ampar','Batu Aji','Bengkong'].map(a => (
              <div key={a} style={{ color: '#8892A4', fontSize: 14, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: '#FF5722', fontSize: 10 }}>●</span> {a}
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ color: '#8892A4', fontSize: 13 }}>
            © {year} PickupBatam. Semua hak dilindungi undang-undang.
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {['⚡ Cepat','🔒 Aman','💰 Murah'].map(b => (
              <span key={b} style={{ background: 'rgba(255,87,34,0.1)', border: '1px solid rgba(255,87,34,0.2)', color: '#FF8A65', padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 600 }}>{b}</span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}