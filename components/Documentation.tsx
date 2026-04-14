'use client'
import { useEffect, useState } from 'react'

export default function Documentation() {
  const [photos, setPhotos] = useState<any[]>([])
  const [selected, setSelected] = useState<any>(null)
  const [filter, setFilter] = useState('all')

  const demoPhotos = [
    { id:'d1', url:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', type:'pickup', caption:'Proses loading barang - Batam Centre', orderId:'PBM-250101-1234' },
    { id:'d2', url:'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&q=80', type:'delivery', caption:'Barang tiba di tujuan dengan aman', orderId:'PBM-250101-1234' },
    { id:'d3', url:'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&q=80', type:'pickup', caption:'Packing sofa 3 dudukan', orderId:'PBM-250115-5678' },
    { id:'d4', url:'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80', type:'delivery', caption:'Pindahan kantor selesai', orderId:'PBM-250115-5678' },
    { id:'d5', url:'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80', type:'before', caption:'Kondisi rumah sebelum pindahan', orderId:'PBM-250120-9012' },
    { id:'d6', url:'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&q=80', type:'pickup', caption:'Angkut kulkas & mesin cuci', orderId:'PBM-250125-3456' },
    { id:'d7', url:'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80', type:'delivery', caption:'Pengiriman furniture ke Nagoya', orderId:'PBM-250130-7890' },
    { id:'d8', url:'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=600&q=80', type:'before', caption:'Material bangunan siap angkut', orderId:'PBM-250205-2345' },
    { id:'d9', url:'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80', type:'pickup', caption:'Angkut barang elektronik', orderId:'PBM-250210-6789' },
  ]

  useEffect(() => {
    fetch('/api/photos').then(r => r.json()).then(data => {
      setPhotos([...demoPhotos, ...data])
    }).catch(() => setPhotos(demoPhotos))
  }, [])

  const filtered = filter === 'all' ? photos : photos.filter(p => p.type === filter)
  const filterBtns = [
    { key: 'all', label: '🖼️ Semua' },
    { key: 'pickup', label: '📦 Penjemputan' },
    { key: 'delivery', label: '✅ Pengiriman' },
    { key: 'before', label: '📋 Sebelum' },
  ]
  const typeLabel: Record<string,string> = { pickup:'Penjemputan', delivery:'Pengiriman', before:'Sebelum', after:'Sesudah' }
  const typeColor: Record<string,string> = { pickup:'#60A5FA', delivery:'#4ADE80', before:'#FBBF24', after:'#A78BFA' }

  return (
    <section id="dokumentasi" style={{ padding: '100px 24px', background: 'rgba(22,33,62,0.3)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="section-tag" style={{ marginBottom: 16, display: 'inline-flex' }}>📸 Foto Dokumentasi</div>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, margin: '0 0 16px' }}>
            Bukti <span className="gradient-text">Nyata Pekerjaan Kami</span>
          </h2>
          <p style={{ color: '#8892A4', fontSize: 16, maxWidth: 500, margin: '0 auto' }}>
            Setiap pengiriman didokumentasikan dengan foto untuk ketenangan pikiran Anda
          </p>
        </div>

        {/* Filter */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 36, flexWrap: 'wrap' }}>
          {filterBtns.map(b => (
            <button key={b.key} onClick={() => setFilter(b.key)} style={{
              background: filter === b.key ? 'rgba(255,87,34,0.2)' : 'rgba(255,255,255,0.05)',
              border: `1.5px solid ${filter === b.key ? '#FF5722' : 'rgba(255,255,255,0.08)'}`,
              color: filter === b.key ? '#FF8A65' : '#8892A4', padding: '8px 20px',
              borderRadius: 999, cursor: 'pointer', fontSize: 13, fontWeight: 600, transition: 'all 0.2s',
            }}>{b.label}</button>
          ))}
        </div>

        {/* Photo Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
          {filtered.map((p) => (
            <div key={p.id} onClick={() => setSelected(p)} style={{ cursor: 'pointer', borderRadius: 14, overflow: 'hidden', position: 'relative', aspectRatio: '4/3', background: '#16213E', border: '1px solid rgba(255,255,255,0.08)', transition: 'all 0.3s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.02)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,87,34,0.4)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.08)' }}>
              <img src={p.url} alt={p.caption} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 14 }}>
                <div style={{ display: 'inline-flex', alignSelf: 'flex-start', background: `${typeColor[p.type] || '#FF5722'}25`, border: `1px solid ${typeColor[p.type] || '#FF5722'}50`, color: typeColor[p.type] || '#FF8A65', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999, marginBottom: 6 }}>
                  {typeLabel[p.type] || p.type}
                </div>
                {p.caption && <div style={{ fontSize: 13, color: '#F0F0F0', fontWeight: 500 }}>{p.caption}</div>}
                {p.orderId && <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{p.orderId}</div>}
              </div>
              <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.5)', borderRadius: 8, padding: '4px 8px', fontSize: 16 }}>🔍</div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selected && (
          <div onClick={() => setSelected(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 9998, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
            <div onClick={e => e.stopPropagation()} style={{ maxWidth: 800, width: '100%', borderRadius: 16, overflow: 'hidden', background: '#16213E', border: '1px solid rgba(255,255,255,0.1)' }}>
              <img src={selected.url} alt={selected.caption} style={{ width: '100%', maxHeight: '65vh', objectFit: 'contain', display: 'block', background: '#0F0F1A' }} />
              <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>{selected.caption}</div>
                  <div style={{ fontSize: 13, color: '#8892A4' }}>{selected.orderId}</div>
                </div>
                <button onClick={() => setSelected(null)} style={{ background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.3)', color: '#F87171', padding: '8px 16px', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>✕ Tutup</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
