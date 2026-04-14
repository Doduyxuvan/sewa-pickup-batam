'use client'
import { useState } from 'react'
import { getStatusLabel } from '@/lib/utils'
import { formatCurrency } from '@/lib/utils'

const statusSteps = ['pending','confirmed','pickup','onway','delivered','done']
const statusIcons: Record<string,string> = {
  pending:'⏳', confirmed:'✅', pickup:'🚛', onway:'🛣️', delivered:'📦', done:'🎉'
}

export default function TrackOrder() {
  const [orderNum, setOrderNum] = useState('')
  const [loading, setLoading] = useState(false)
  const [order, setOrder] = useState<any>(null)
  const [error, setError] = useState('')

  const track = async () => {
    if (!orderNum.trim()) { setError('Masukkan nomor pesanan'); return }
    setLoading(true); setError(''); setOrder(null)
    try {
      const res = await fetch(`/api/track?orderNumber=${encodeURIComponent(orderNum.trim())}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setOrder(data)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const currentIdx = order ? statusSteps.indexOf(order.status) : -1

  return (
    <section id="lacak" style={{ padding: '100px 24px', background: 'rgba(22,33,62,0.3)' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="section-tag" style={{ marginBottom: 16, display: 'inline-flex' }}>📍 Lacak Pesanan</div>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, margin: '0 0 16px' }}>
            Status <span className="gradient-text">Real-time</span>
          </h2>
          <p style={{ color: '#8892A4', fontSize: 16 }}>Masukkan nomor pesanan untuk melihat status pengiriman barang Anda</p>
        </div>

        {/* Search Box */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 32 }} className="track-search">
          <input className="input-dark" placeholder="Contoh: PBM-250101-1234" value={orderNum}
            onChange={e => setOrderNum(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && track()}
            style={{ flex: 1, fontSize: 15 }} />
          <button className="btn-primary" onClick={track} disabled={loading} style={{ whiteSpace: 'nowrap', padding: '12px 24px' }}>
            {loading ? '⏳' : '🔍 Lacak'}
          </button>
        </div>

        {error && (
          <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 12, padding: '16px 20px', color: '#F87171', marginBottom: 20 }}>
            ⚠️ {error}
          </div>
        )}

        {order && (
          <div className="card-dark" style={{ padding: 32, borderColor: 'rgba(255,87,34,0.2)' }}>
            {/* Order Info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 32 }}>
              <div>
                <div style={{ fontSize: 13, color: '#8892A4', marginBottom: 4 }}>Nomor Pesanan</div>
                <div style={{ fontFamily: 'Space Grotesk', fontSize: 22, fontWeight: 800, color: '#FF5722' }}>{order.orderNumber}</div>
                <div style={{ fontSize: 14, color: '#B0BAC8', marginTop: 4 }}>
                  {order.origin} → {order.destination}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className={`status-badge status-${order.status}`}>{statusIcons[order.status]} {getStatusLabel(order.status)}</div>
                {order.totalPrice && <div style={{ fontSize: 18, fontWeight: 800, color: '#FF5722', marginTop: 8 }}>{formatCurrency(order.totalPrice)}</div>}
              </div>
            </div>

            {/* Progress Tracker */}
            <div style={{ marginBottom: 32, overflowX: 'auto' }}>
              <div style={{ display: 'flex', minWidth: 480, position: 'relative', paddingBottom: 8 }}>
                {statusSteps.map((step, i) => (
                  <div key={step} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                    {/* Connector */}
                    {i < statusSteps.length - 1 && (
                      <div style={{
                        position: 'absolute', top: 20, left: '50%', width: '100%', height: 3,
                        background: i < currentIdx ? '#FF5722' : 'rgba(255,255,255,0.08)',
                        transition: 'background 0.5s', zIndex: 0,
                      }}/>
                    )}
                    {/* Circle */}
                    <div style={{
                      width: 40, height: 40, borderRadius: '50%', zIndex: 1,
                      background: i <= currentIdx ? '#FF5722' : 'rgba(255,255,255,0.08)',
                      border: i === currentIdx ? '3px solid #FF8A65' : '3px solid transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 16, transition: 'all 0.3s',
                      boxShadow: i === currentIdx ? '0 0 20px rgba(255,87,34,0.5)' : 'none',
                    }}>
                      {statusIcons[step]}
                    </div>
                    <div style={{ marginTop: 8, fontSize: 11, textAlign: 'center', color: i <= currentIdx ? '#F0F0F0' : '#8892A4', fontWeight: i === currentIdx ? 700 : 400 }}>
                      {getStatusLabel(step).split(' ')[0]}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            {order.timeline && (
              <div>
                <h4 style={{ fontFamily: 'Space Grotesk', fontSize: 16, fontWeight: 700, marginBottom: 16 }}>📋 Riwayat Aktivitas</h4>
                {order.timeline.map((t: any, i: number) => (
                  <div key={i} style={{ display: 'flex', gap: 16, marginBottom: 16, opacity: i === order.timeline.length - 1 ? 1 : 0.6 }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,87,34,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {statusIcons[t.status]}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{getStatusLabel(t.status)}</div>
                      <div style={{ fontSize: 13, color: '#8892A4' }}>{t.note}</div>
                      <div style={{ fontSize: 12, color: '#FF8A65', marginTop: 2 }}>{t.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Driver Info */}
            {order.driverName && (
              <div style={{ background: 'rgba(255,87,34,0.08)', border: '1px solid rgba(255,87,34,0.2)', borderRadius: 12, padding: '16px 20px', marginTop: 20, display: 'flex', gap: 16, alignItems: 'center' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#FF5722', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🧑‍✈️</div>
                <div>
                  <div style={{ fontWeight: 700 }}>{order.driverName}</div>
                  <div style={{ fontSize: 13, color: '#8892A4' }}>Driver • {order.vehiclePlate}</div>
                  <div style={{ fontSize: 13, color: '#FF8A65' }}>{order.driverPhone}</div>
                </div>
              </div>
            )}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: '#8892A4' }}>
          💡 Coba lacak dengan: <button onClick={() => setOrderNum('PBM-250101-1234')} style={{ background: 'none', border: 'none', color: '#FF8A65', cursor: 'pointer', textDecoration: 'underline', fontSize: 13 }}>PBM-250101-1234</button>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .track-search { flex-direction: column; }
        }
      `}</style>
    </section>
  )
}
