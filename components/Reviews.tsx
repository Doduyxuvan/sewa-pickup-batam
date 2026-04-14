'use client'
import { useEffect, useState } from 'react'

function Stars({ rating, size = 16 }: { rating: number, size?: number }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ fontSize: size, color: i <= rating ? '#FFD600' : '#3A3A4A' }}>★</span>
      ))}
    </div>
  )
}

export default function Reviews() {
  const [reviews, setReviews] = useState<any[]>([])
  const [form, setForm] = useState({ name: '', rating: 5, comment: '', service: '' })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [hoverRating, setHoverRating] = useState(0)
  const [avgRating, setAvgRating] = useState(4.9)

  useEffect(() => {
    fetch('/api/reviews').then(r => r.json()).then(data => {
      setReviews(data)
      if (data.length > 0) {
        const avg = data.reduce((a: number, r: any) => a + r.rating, 0) / data.length
        setAvgRating(Math.round(avg * 10) / 10)
      }
    }).catch(() => {})
  }, [])

  const submit = async () => {
    if (!form.name || !form.comment) return
    setLoading(true)
    try {
      const res = await fetch('/api/reviews', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (res.ok) {
        setReviews(r => [data, ...r])
        setSubmitted(true)
        setForm({ name:'', rating:5, comment:'', service:'' })
      }
    } catch {}
    setLoading(false)
  }

  const services = ['Pindahan Rumah','Pindahan Kantor','Kirim Barang','Angkut Material','Antar Belanja']

  return (
    <section id="ulasan" style={{ padding: '100px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div className="section-tag" style={{ marginBottom: 16, display: 'inline-flex' }}>⭐ Ulasan Pelanggan</div>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, margin: '0 0 16px' }}>
            Apa Kata <span className="gradient-text">Pelanggan Kami</span>
          </h2>

          {/* Summary */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 20, background: '#16213E', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '20px 32px', marginTop: 8 }}>
            <div>
              <div style={{ fontFamily: 'Space Grotesk', fontSize: 52, fontWeight: 800, color: '#FF5722', lineHeight: 1 }}>{avgRating}</div>
              <Stars rating={Math.round(avgRating)} size={20} />
              <div style={{ fontSize: 13, color: '#8892A4', marginTop: 4 }}>{reviews.length} ulasan</div>
            </div>
            <div style={{ width: 1, height: 80, background: 'rgba(255,255,255,0.08)' }}/>
            <div style={{ textAlign: 'left' }}>
              {[5,4,3,2,1].map(s => {
                const cnt = reviews.filter(r => r.rating === s).length
                const pct = reviews.length > 0 ? (cnt / reviews.length * 100) : (s >= 4 ? 80 : 10)
                return (
                  <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 12, color: '#8892A4', width: 16 }}>{s}</span>
                    <span style={{ color: '#FFD600', fontSize: 12 }}>★</span>
                    <div style={{ width: 100, height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{ width: `${pct}%`, height: '100%', background: '#FFD600', borderRadius: 3, transition: 'width 1s ease' }}/>
                    </div>
                    <span style={{ fontSize: 11, color: '#8892A4' }}>{cnt || (s >= 4 ? '★' : '')}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20, marginBottom: 60 }}>
          {reviews.map((r) => (
            <div key={r.id} className="card-dark" style={{ padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg,#FF5722,#FF8A65)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 18 }}>
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{r.name}</div>
                    <div style={{ fontSize: 12, color: '#8892A4' }}>
                      {r.service || 'Angkut Barang'}
                      {r.verified && <span style={{ color: '#4ADE80', marginLeft: 6 }}>✓ Terverifikasi</span>}
                    </div>
                  </div>
                </div>
                <Stars rating={r.rating} size={14} />
              </div>
              <p style={{ color: '#B0BAC8', fontSize: 14, lineHeight: 1.7, margin: 0 }}>"{r.comment}"</p>
              <div style={{ fontSize: 12, color: '#8892A4', marginTop: 12 }}>
                {new Date(r.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
            </div>
          ))}
        </div>

        {/* Write Review */}
        <div className="card-dark" style={{ padding: 36, borderColor: 'rgba(255,87,34,0.15)', maxWidth: 600, margin: '0 auto' }}>
          <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>✍️ Tulis Ulasan</h3>
          <p style={{ color: '#8892A4', fontSize: 14, marginBottom: 24 }}>Bagikan pengalaman Anda menggunakan jasa kami</p>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🙏</div>
              <h4 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, marginBottom: 8 }}>Terima Kasih!</h4>
              <p style={{ color: '#8892A4', fontSize: 14 }}>Ulasan Anda berhasil dikirim dan sangat berarti bagi kami.</p>
              <button className="btn-outline" onClick={() => setSubmitted(false)} style={{ marginTop: 16 }}>Tulis Lagi</button>
            </div>
          ) : (
            <div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: '#B0BAC8' }}>Rating Anda</label>
                <div style={{ display: 'flex', gap: 6 }}>
                  {[1,2,3,4,5].map(s => (
                    <button key={s} onClick={() => setForm(f => ({ ...f, rating: s }))}
                      onMouseEnter={() => setHoverRating(s)} onMouseLeave={() => setHoverRating(0)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 36, color: s <= (hoverRating || form.rating) ? '#FFD600' : '#3A3A4A', transition: 'all 0.2s', transform: s <= (hoverRating || form.rating) ? 'scale(1.2)' : 'scale(1)' }}>★</button>
                  ))}
                  <span style={{ fontSize: 14, color: '#8892A4', alignSelf: 'center', marginLeft: 8 }}>
                    {['','Buruk','Kurang','Cukup','Bagus','Sangat Bagus!'][hoverRating || form.rating]}
                  </span>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }} className="review-form-grid">
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: '#B0BAC8' }}>Nama *</label>
                  <input className="input-dark" placeholder="Nama Anda" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: '#B0BAC8' }}>Layanan</label>
                  <select className="input-dark" value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))} style={{ cursor: 'pointer' }}>
                    <option value="">Pilih layanan</option>
                    {services.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: '#B0BAC8' }}>Ulasan *</label>
                <textarea className="input-dark" rows={4} placeholder="Ceritakan pengalaman Anda menggunakan jasa kami..." value={form.comment} onChange={e => setForm(f => ({ ...f, comment: e.target.value }))} style={{ resize: 'vertical' }} />
              </div>
              <button className="btn-primary" onClick={submit} disabled={loading || !form.name || !form.comment} style={{ width: '100%', justifyContent: 'center', opacity: (!form.name || !form.comment) ? 0.5 : 1 }}>
                {loading ? '⏳ Mengirim...' : '⭐ Kirim Ulasan'}
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .review-form-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
