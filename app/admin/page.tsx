'use client'
import { useState, useEffect } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────
interface Order {
  id: string; orderNumber: string; customerName: string; phone: string
  origin: string; destination: string; itemDesc: string; vehicleType: string
  status: string; totalPrice: number; createdAt: string; notes?: string; weight?: number
}
interface Review {
  id: string; name: string; rating: number; comment: string
  service: string; verified: boolean; createdAt: string
}
interface Photo {
  id: string; url: string; type: string; caption: string; orderId: string
}
interface Settings {
  businessName: string; tagline: string; phone: string; whatsapp: string
  address: string; operationalHours: string; logoEmoji: string
  heroTitle: string; heroSubtitle: string
  trustBadge1: string; trustBadge2: string; trustBadge3: string
}

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123'

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending:   { label: '⏳ Pending',    color: '#F59E0B' },
  confirmed: { label: '✅ Dikonfirmasi', color: '#3B82F6' },
  pickup:    { label: '🚛 Dijemput',   color: '#8B5CF6' },
  onway:     { label: '🛣️ Di Jalan',   color: '#EC4899' },
  delivered: { label: '📦 Sampai',     color: '#10B981' },
  done:      { label: '🎉 Selesai',    color: '#4ADE80' },
}

const DEFAULT_SETTINGS: Settings = {
  businessName: 'Pickup Batam',
  tagline: 'Jasa Angkut Barang Murah & Amanah',
  phone: '+62 812-XXXX-XXXX',
  whatsapp: '6281234567890',
  address: 'Kota Batam, Kepulauan Riau',
  operationalHours: '24 Jam, 7 Hari Seminggu',
  logoEmoji: '🚛',
  heroTitle: 'Jasa Angkut Barang Pickup Batam Murah & Amanah',
  heroSubtitle: 'Solusi angkut barang terpercaya di Batam. Pindahan rumah, kirim barang besar — kami siap melayani.',
  trustBadge1: '✅ Terpercaya di Batam',
  trustBadge2: '🏆 Sudah Terbukti 2.800+ Order',
  trustBadge3: '⭐ Rating 4.9 / 5.0',
}

const DEFAULT_PHOTOS: Photo[] = [
  { id:'d1', url:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', type:'pickup',   caption:'Proses loading barang - Batam Centre', orderId:'PBM-250101-1234' },
  { id:'d2', url:'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&q=80', type:'delivery', caption:'Barang tiba di tujuan dengan aman',       orderId:'PBM-250101-1234' },
  { id:'d3', url:'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&q=80', type:'pickup',   caption:'Packing sofa 3 dudukan',                 orderId:'PBM-250115-5678' },
  { id:'d4', url:'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80', type:'delivery', caption:'Pindahan kantor selesai',                 orderId:'PBM-250115-5678' },
  { id:'d5', url:'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80', type:'before',   caption:'Kondisi rumah sebelum pindahan',          orderId:'PBM-250120-9012' },
  { id:'d6', url:'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&q=80', type:'pickup',   caption:'Angkut kulkas & mesin cuci',              orderId:'PBM-250125-3456' },
  { id:'d7', url:'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80', type:'delivery', caption:'Pengiriman furniture ke Nagoya',           orderId:'PBM-250130-7890' },
  { id:'d8', url:'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=600&q=80', type:'before',   caption:'Material bangunan siap angkut',           orderId:'PBM-250205-2345' },
  { id:'d9', url:'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80', type:'pickup',   caption:'Angkut barang elektronik',                orderId:'PBM-250210-6789' },
]

const TYPE_OPTIONS = [
  { value: 'pickup',   label: '📦 Penjemputan', color: '#60A5FA' },
  { value: 'delivery', label: '✅ Pengiriman',  color: '#4ADE80' },
  { value: 'before',   label: '📋 Sebelum',     color: '#FBBF24' },
  { value: 'after',    label: '✨ Sesudah',     color: '#A78BFA' },
]

// ─── Login Screen ─────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState('')
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = () => {
    setLoading(true)
    setTimeout(() => {
      if (pw === ADMIN_PASSWORD) {
        sessionStorage.setItem('admin_auth', '1')
        onLogin()
      } else {
        setErr('Password salah!')
        setLoading(false)
      }
    }, 600)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0F0F1A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ width: '100%', maxWidth: 400, padding: 24 }}>
        <div style={{ background: '#16213E', border: '1px solid rgba(255,87,34,0.2)', borderRadius: 24, padding: 40, textAlign: 'center' }}>
          <div style={{ fontSize: 52, marginBottom: 16 }}>🚛</div>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 24, fontWeight: 800, color: '#F0F0F0', margin: '0 0 8px' }}>Admin Panel</h1>
          <p style={{ color: '#8892A4', fontSize: 14, margin: '0 0 32px' }}>Pickup Batam — Masuk dengan password</p>

          <input
            type="password"
            placeholder="Password admin"
            value={pw}
            onChange={e => { setPw(e.target.value); setErr('') }}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            style={{
              width: '100%', padding: '14px 16px', background: 'rgba(255,255,255,0.05)',
              border: `1px solid ${err ? '#EF4444' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: 12, color: '#F0F0F0', fontSize: 16, marginBottom: 12,
              outline: 'none', boxSizing: 'border-box'
            }}
          />
          {err && <p style={{ color: '#EF4444', fontSize: 13, margin: '0 0 12px' }}>{err}</p>}

          <button
            onClick={handleLogin}
            disabled={loading || !pw}
            style={{
              width: '100%', padding: '14px', borderRadius: 12, border: 'none', cursor: loading || !pw ? 'not-allowed' : 'pointer',
              background: 'linear-gradient(135deg,#FF5722,#FF8A65)', color: 'white',
              fontWeight: 700, fontSize: 16, opacity: loading || !pw ? 0.6 : 1, transition: 'opacity 0.2s'
            }}
          >
            {loading ? '⏳ Memeriksa...' : '🔐 Masuk'}
          </button>

          <p style={{ color: '#8892A4', fontSize: 12, marginTop: 20 }}>
            Password default: <code style={{ background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: 4 }}>admin123</code><br/>
            Ubah di <code style={{ background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: 4 }}>.env</code> → <code>NEXT_PUBLIC_ADMIN_PASSWORD</code>
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Main Admin Dashboard ─────────────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [tab, setTab] = useState<'dashboard' | 'orders' | 'reviews' | 'photos' | 'settings'>('dashboard')
  const [orders, setOrders] = useState<Order[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS)
  const [settingsSaved, setSettingsSaved] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [statusFilter, setStatusFilter] = useState('all')

  // ── Photo state ──
  const [photos, setPhotos] = useState<Photo[]>([])
  const [photosSaved, setPhotosSaved] = useState(false)
  const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null)
  const [newPhoto, setNewPhoto] = useState<Partial<Photo>>({ type: 'pickup', caption: '', orderId: '' })
  const [uploadingPhoto, setUploadingPhoto] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const [showAddForm, setShowAddForm] = useState(false)

  // ── Edit photo file upload state ──
  const [editFile, setEditFile] = useState<File | null>(null)
  const [editPreviewUrl, setEditPreviewUrl] = useState<string>('')
  const [uploadingEdit, setUploadingEdit] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') === '1') setAuthed(true)
  }, [])

  useEffect(() => {
    if (!authed) return
    fetch('/api/orders').then(r => r.json()).then(setOrders).catch(() => {})
    fetch('/api/reviews').then(r => r.json()).then(setReviews).catch(() => {})
    const saved = localStorage.getItem('admin_settings')
    if (saved) setSettings(JSON.parse(saved))
    const savedPhotos = localStorage.getItem('admin_photos')
    setPhotos(savedPhotos ? JSON.parse(savedPhotos) : DEFAULT_PHOTOS)
  }, [authed])

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />

  const logout = () => { sessionStorage.removeItem('admin_auth'); setAuthed(false) }

  const saveSettings = () => {
    localStorage.setItem('admin_settings', JSON.stringify(settings))
    setSettingsSaved(true)
    setTimeout(() => setSettingsSaved(false), 2500)
  }

  const savePhotos = (updated: Photo[]) => {
    localStorage.setItem('admin_photos', JSON.stringify(updated))
    setPhotos(updated)
    setPhotosSaved(true)
    setTimeout(() => setPhotosSaved(false), 2000)
  }

  // ── Upload file ke Vercel Blob via API ──
  const addPhoto = async () => {
    if (!selectedFile || !newPhoto.caption) return
    setUploadingPhoto(true)
    try {
      const fd = new FormData()
      fd.append('file', selectedFile)
      fd.append('caption', newPhoto.caption!)
      fd.append('type', newPhoto.type || 'pickup')
      fd.append('orderId', newPhoto.orderId || '')
      const res = await fetch('/api/photos', { method: 'POST', body: fd })
      if (!res.ok) throw new Error('Upload gagal')
      const photo: Photo = await res.json()
      savePhotos([photo, ...photos])
      setNewPhoto({ type: 'pickup', caption: '', orderId: '' })
      setSelectedFile(null)
      setPreviewUrl('')
      setShowAddForm(false)
    } catch {
      alert('Gagal upload foto. Pastikan Vercel Blob sudah dikonfigurasi.')
    } finally {
      setUploadingPhoto(false)
    }
  }

  const deletePhoto = async (id: string, url: string) => {
    if (!confirm('Hapus foto ini?')) return
    try {
      await fetch('/api/photos', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, url }) })
    } catch {}
    savePhotos(photos.filter(p => p.id !== id))
  }

  const saveEditPhoto = async () => {
    if (!editingPhoto) return
    setUploadingEdit(true)
    try {
      let updatedPhoto = { ...editingPhoto }
      // Kalau ada file baru dipilih, upload dulu
      if (editFile) {
        const fd = new FormData()
        fd.append('file', editFile)
        fd.append('caption', editingPhoto.caption)
        fd.append('type', editingPhoto.type)
        fd.append('orderId', editingPhoto.orderId || '')
        const res = await fetch('/api/photos', { method: 'POST', body: fd })
        if (!res.ok) throw new Error('Upload gagal')
        const uploaded: Photo = await res.json()
        // Hapus foto lama dari blob
        try {
          await fetch('/api/photos', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editingPhoto.id, url: editingPhoto.url }) })
        } catch {}
        updatedPhoto = { ...editingPhoto, url: uploaded.url, id: uploaded.id }
      }
      savePhotos(photos.map(p => p.id === editingPhoto.id ? updatedPhoto : p))
      setEditingPhoto(null)
      setEditFile(null)
      setEditPreviewUrl('')
    } catch {
      alert('Gagal menyimpan perubahan foto.')
    } finally {
      setUploadingEdit(false)
    }
  }

  const toggleVerify = (id: string) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, verified: !r.verified } : r))
  }
  const deleteReview = (id: string) => {
    if (confirm('Hapus ulasan ini?')) setReviews(prev => prev.filter(r => r.id !== id))
  }

  const updateOrderStatus = (id: string, status: string) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o))
    if (selectedOrder?.id === id) setSelectedOrder(prev => prev ? { ...prev, status } : null)
  }

  const totalRevenue = orders.filter(o => ['delivered','done'].includes(o.status)).reduce((s, o) => s + (o.totalPrice || 0), 0)
  const pendingCount = orders.filter(o => o.status === 'pending').length
  const avgRating = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : '0.0'
  const filteredOrders = statusFilter === 'all' ? orders : orders.filter(o => o.status === statusFilter)

  const sidebarStyle = (active: boolean): React.CSSProperties => ({
    display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
    borderRadius: 10, cursor: 'pointer', transition: 'all 0.2s', marginBottom: 4,
    background: active ? 'rgba(255,87,34,0.15)' : 'transparent',
    border: active ? '1px solid rgba(255,87,34,0.3)' : '1px solid transparent',
    color: active ? '#FF8A65' : '#8892A4', fontWeight: active ? 600 : 400, fontSize: 14,
  })

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '11px 14px', background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#F0F0F0',
    fontSize: 14, outline: 'none', boxSizing: 'border-box'
  }

  const typeInfo = (type: string) => TYPE_OPTIONS.find(t => t.value === type) || TYPE_OPTIONS[0]

  return (
    <div style={{ minHeight: '100vh', background: '#0F0F1A', display: 'flex', fontFamily: 'Inter, sans-serif', color: '#F0F0F0' }}>

      {/* Sidebar */}
      <aside style={{ width: 240, background: '#16213E', borderRight: '1px solid rgba(255,255,255,0.06)', padding: '24px 16px', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32, padding: '0 4px' }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: 'linear-gradient(135deg,#FF5722,#FF8A65)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🚛</div>
          <div>
            <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 15 }}>Admin Panel</div>
            <div style={{ fontSize: 11, color: '#8892A4' }}>Pickup Batam</div>
          </div>
        </div>

        <nav style={{ flex: 1 }}>
          {([
            { key: 'dashboard', icon: '📊', label: 'Dashboard' },
            { key: 'orders',    icon: '📦', label: 'Pesanan' },
            { key: 'reviews',   icon: '⭐', label: 'Ulasan' },
            { key: 'photos',    icon: '📸', label: 'Foto Galeri' },
            { key: 'settings',  icon: '⚙️', label: 'Pengaturan' },
          ] as const).map(item => (
            <div key={item.key} style={sidebarStyle(tab === item.key)} onClick={() => setTab(item.key)}>
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              <span>{item.label}</span>
              {item.key === 'orders' && pendingCount > 0 && (
                <span style={{ marginLeft: 'auto', background: '#EF4444', color: 'white', borderRadius: 20, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>{pendingCount}</span>
              )}
              {item.key === 'photos' && (
                <span style={{ marginLeft: 'auto', background: 'rgba(255,255,255,0.1)', color: '#8892A4', borderRadius: 20, padding: '2px 8px', fontSize: 11 }}>{photos.length}</span>
              )}
            </div>
          ))}
        </nav>

        <button onClick={logout} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.08)', background: 'transparent', color: '#8892A4', cursor: 'pointer', fontSize: 14, width: '100%' }}>
          🚪 <span>Keluar</span>
        </button>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '32px', overflowY: 'auto', minHeight: '100vh' }}>

        {/* ── DASHBOARD ── */}
        {tab === 'dashboard' && (
          <div>
            <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 28, fontWeight: 800, margin: '0 0 8px' }}>Dashboard</h1>
            <p style={{ color: '#8892A4', margin: '0 0 32px' }}>Selamat datang di panel admin Pickup Batam</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 40 }}>
              {[
                { icon: '📦', label: 'Total Pesanan', value: orders.length, color: '#3B82F6' },
                { icon: '⏳', label: 'Pending',       value: pendingCount, color: '#F59E0B' },
                { icon: '💰', label: 'Total Pendapatan', value: `Rp ${(totalRevenue / 1000).toFixed(0)}rb`, color: '#10B981' },
                { icon: '⭐', label: 'Rating Rata-rata', value: `${avgRating} / 5`, color: '#FF5722' },
                { icon: '📸', label: 'Foto Galeri',   value: photos.length, color: '#A78BFA' },
              ].map(s => (
                <div key={s.label} style={{ background: '#16213E', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 24 }}>
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{s.icon}</div>
                  <div style={{ fontSize: 26, fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: 13, color: '#8892A4', marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div style={{ background: '#16213E', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 24, marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 18, fontWeight: 700, margin: 0 }}>📦 Pesanan Terbaru</h2>
                <button onClick={() => setTab('orders')} style={{ background: 'rgba(255,87,34,0.1)', border: '1px solid rgba(255,87,34,0.2)', color: '#FF8A65', borderRadius: 8, padding: '6px 14px', cursor: 'pointer', fontSize: 13 }}>Lihat Semua →</button>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    {['No. Order', 'Pelanggan', 'Rute', 'Status', 'Harga'].map(h => (
                      <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontSize: 12, color: '#8892A4', fontWeight: 600 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map(o => (
                    <tr key={o.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <td style={{ padding: '12px', fontSize: 13, color: '#FF8A65', fontFamily: 'monospace' }}>{o.orderNumber}</td>
                      <td style={{ padding: '12px', fontSize: 13 }}>{o.customerName}</td>
                      <td style={{ padding: '12px', fontSize: 12, color: '#8892A4' }}>{o.origin} → {o.destination}</td>
                      <td style={{ padding: '12px' }}>
                        <span style={{ fontSize: 12, padding: '3px 10px', borderRadius: 20, background: `${STATUS_LABELS[o.status]?.color}22`, color: STATUS_LABELS[o.status]?.color }}>
                          {STATUS_LABELS[o.status]?.label || o.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px', fontSize: 13, fontWeight: 600 }}>Rp {o.totalPrice?.toLocaleString('id-ID')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ background: '#16213E', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 18, fontWeight: 700, margin: 0 }}>⭐ Ulasan Terbaru</h2>
                <button onClick={() => setTab('reviews')} style={{ background: 'rgba(255,87,34,0.1)', border: '1px solid rgba(255,87,34,0.2)', color: '#FF8A65', borderRadius: 8, padding: '6px 14px', cursor: 'pointer', fontSize: 13 }}>Kelola Semua →</button>
              </div>
              {reviews.slice(0, 3).map(r => (
                <div key={r.id} style={{ display: 'flex', gap: 16, padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(255,87,34,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>{r.name[0]}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontWeight: 600, fontSize: 14 }}>{r.name}</span>
                      <span style={{ fontSize: 12 }}>{'⭐'.repeat(r.rating)}</span>
                    </div>
                    <p style={{ color: '#8892A4', fontSize: 13, margin: 0 }}>{r.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── ORDERS ── */}
        {tab === 'orders' && (
          <div>
            <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 28, fontWeight: 800, margin: '0 0 8px' }}>📦 Manajemen Pesanan</h1>
            <p style={{ color: '#8892A4', margin: '0 0 24px' }}>{orders.length} total pesanan</p>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
              {[{ key: 'all', label: 'Semua' }, ...Object.entries(STATUS_LABELS).map(([k, v]) => ({ key: k, label: v.label }))].map(f => (
                <button key={f.key} onClick={() => setStatusFilter(f.key)} style={{
                  padding: '8px 16px', borderRadius: 20, cursor: 'pointer', fontSize: 13, border: 'none',
                  background: statusFilter === f.key ? 'linear-gradient(135deg,#FF5722,#FF8A65)' : 'rgba(255,255,255,0.05)',
                  color: statusFilter === f.key ? 'white' : '#8892A4', fontWeight: statusFilter === f.key ? 700 : 400
                }}>{f.label} {f.key !== 'all' ? `(${orders.filter(o => o.status === f.key).length})` : `(${orders.length})`}</button>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: selectedOrder ? '1fr 380px' : '1fr', gap: 20 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {filteredOrders.map(o => (
                  <div key={o.id} onClick={() => setSelectedOrder(o)} style={{
                    background: '#16213E', border: `1px solid ${selectedOrder?.id === o.id ? 'rgba(255,87,34,0.4)' : 'rgba(255,255,255,0.06)'}`,
                    borderRadius: 14, padding: 20, cursor: 'pointer', transition: 'border-color 0.2s'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                          <span style={{ fontFamily: 'monospace', fontSize: 13, color: '#FF8A65' }}>{o.orderNumber}</span>
                          <span style={{ fontSize: 12, padding: '3px 10px', borderRadius: 20, background: `${STATUS_LABELS[o.status]?.color}22`, color: STATUS_LABELS[o.status]?.color }}>
                            {STATUS_LABELS[o.status]?.label || o.status}
                          </span>
                        </div>
                        <div style={{ fontWeight: 600, marginBottom: 4 }}>{o.customerName} <span style={{ color: '#8892A4', fontWeight: 400, fontSize: 13 }}>· {o.phone}</span></div>
                        <div style={{ fontSize: 13, color: '#8892A4' }}>📍 {o.origin} → {o.destination}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 700, fontSize: 16, color: '#4ADE80' }}>Rp {o.totalPrice?.toLocaleString('id-ID')}</div>
                        <div style={{ fontSize: 11, color: '#8892A4', marginTop: 4 }}>{new Date(o.createdAt).toLocaleDateString('id-ID', { day:'numeric', month:'short', year:'numeric' })}</div>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredOrders.length === 0 && (
                  <div style={{ textAlign: 'center', padding: 60, color: '#8892A4' }}>
                    <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
                    <div>Tidak ada pesanan dengan status ini</div>
                  </div>
                )}
              </div>

              {selectedOrder && (
                <div style={{ background: '#16213E', border: '1px solid rgba(255,87,34,0.2)', borderRadius: 16, padding: 24, height: 'fit-content', position: 'sticky', top: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, margin: 0, fontSize: 16 }}>Detail Pesanan</h3>
                    <button onClick={() => setSelectedOrder(null)} style={{ background: 'none', border: 'none', color: '#8892A4', cursor: 'pointer', fontSize: 18 }}>✕</button>
                  </div>
                  {[
                    { label: 'No. Order', val: selectedOrder.orderNumber },
                    { label: 'Pelanggan', val: selectedOrder.customerName },
                    { label: 'Telepon',   val: selectedOrder.phone },
                    { label: 'Asal',      val: selectedOrder.origin },
                    { label: 'Tujuan',    val: selectedOrder.destination },
                    { label: 'Barang',    val: selectedOrder.itemDesc },
                    { label: 'Kendaraan', val: selectedOrder.vehicleType },
                    { label: 'Harga',     val: `Rp ${selectedOrder.totalPrice?.toLocaleString('id-ID')}` },
                  ].map(d => (
                    <div key={d.label} style={{ display: 'flex', gap: 12, marginBottom: 12, fontSize: 13 }}>
                      <span style={{ color: '#8892A4', width: 90, flexShrink: 0 }}>{d.label}</span>
                      <span style={{ fontWeight: 500 }}>{d.val}</span>
                    </div>
                  ))}
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 20, marginTop: 8 }}>
                    <p style={{ fontSize: 13, color: '#8892A4', margin: '0 0 12px' }}>Ubah Status:</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                      {Object.entries(STATUS_LABELS).map(([key, val]) => (
                        <button key={key} onClick={() => updateOrderStatus(selectedOrder.id, key)} style={{
                          padding: '8px', borderRadius: 8, cursor: 'pointer', fontSize: 12, border: 'none',
                          background: selectedOrder.status === key ? `${val.color}33` : 'rgba(255,255,255,0.05)',
                          color: selectedOrder.status === key ? val.color : '#8892A4',
                          fontWeight: selectedOrder.status === key ? 700 : 400,
                          outline: selectedOrder.status === key ? `1px solid ${val.color}` : 'none'
                        }}>{val.label}</button>
                      ))}
                    </div>
                  </div>
                  <a href={`https://wa.me/${selectedOrder.phone.replace(/\D/g, '')}?text=Halo ${selectedOrder.customerName}, pesanan Anda ${selectedOrder.orderNumber} sedang ${STATUS_LABELS[selectedOrder.status]?.label}`}
                    target="_blank" style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      marginTop: 16, padding: '12px', borderRadius: 10, background: '#25D366',
                      color: 'white', textDecoration: 'none', fontSize: 14, fontWeight: 600
                    }}>
                    💬 Chat Pelanggan
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── REVIEWS ── */}
        {tab === 'reviews' && (
          <div>
            <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 28, fontWeight: 800, margin: '0 0 8px' }}>⭐ Manajemen Ulasan</h1>
            <p style={{ color: '#8892A4', margin: '0 0 32px' }}>{reviews.length} ulasan · {reviews.filter(r => r.verified).length} terverifikasi</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {reviews.map(r => (
                <div key={r.id} style={{ background: '#16213E', border: `1px solid ${r.verified ? 'rgba(74,222,128,0.15)' : 'rgba(245,158,11,0.15)'}`, borderRadius: 16, padding: 24 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
                    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', flex: 1 }}>
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(255,87,34,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 18, flexShrink: 0 }}>{r.name[0]}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 6 }}>
                          <span style={{ fontWeight: 700, fontSize: 15 }}>{r.name}</span>
                          <span>{'⭐'.repeat(r.rating)}</span>
                          <span style={{ fontSize: 12, padding: '2px 8px', borderRadius: 10, background: r.verified ? 'rgba(74,222,128,0.1)' : 'rgba(245,158,11,0.1)', color: r.verified ? '#4ADE80' : '#F59E0B' }}>
                            {r.verified ? '✅ Verified' : '⏳ Pending'}
                          </span>
                        </div>
                        <p style={{ color: '#CBD5E1', fontSize: 14, margin: 0, lineHeight: 1.6 }}>{r.comment}</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                      <button onClick={() => toggleVerify(r.id)} style={{
                        padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                        background: r.verified ? 'rgba(245,158,11,0.15)' : 'rgba(74,222,128,0.15)',
                        color: r.verified ? '#F59E0B' : '#4ADE80'
                      }}>{r.verified ? 'Batal Verify' : '✅ Verify'}</button>
                      <button onClick={() => deleteReview(r.id)} style={{
                        padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13,
                        background: 'rgba(239,68,68,0.1)', color: '#EF4444', fontWeight: 600
                      }}>🗑️ Hapus</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── PHOTOS ── */}
        {tab === 'photos' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 8 }}>
              <div>
                <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 28, fontWeight: 800, margin: '0 0 8px' }}>📸 Manajemen Foto Galeri</h1>
                <p style={{ color: '#8892A4', margin: 0 }}>{photos.length} foto · Kelola semua foto yang tampil di halaman utama</p>
              </div>
              <button onClick={() => { setShowAddForm(!showAddForm); setSelectedFile(null); setPreviewUrl('') }} style={{
                padding: '12px 24px', borderRadius: 12, border: 'none', cursor: 'pointer',
                background: 'linear-gradient(135deg,#FF5722,#FF8A65)', color: 'white', fontWeight: 700, fontSize: 14
              }}>
                {showAddForm ? '✕ Batal' : '+ Tambah Foto'}
              </button>
            </div>

            {photosSaved && (
              <div style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)', borderRadius: 12, padding: '12px 20px', marginBottom: 20, color: '#4ADE80', fontWeight: 600 }}>
                ✅ Foto berhasil disimpan!
              </div>
            )}

            {/* Add Form */}
            {showAddForm && (
              <div style={{ background: '#16213E', border: '1px solid rgba(255,87,34,0.3)', borderRadius: 16, padding: 24, marginBottom: 24 }}>
                <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, margin: '0 0 20px', fontSize: 16 }}>➕ Tambah Foto Baru</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 16 }}>

                  {/* Upload File — ganti input URL */}
                  <div>
                    <label style={{ display: 'block', fontSize: 13, color: '#8892A4', marginBottom: 8 }}>Upload Gambar *</label>
                    <label style={{
                      display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
                      borderRadius: 10, border: `1px dashed ${selectedFile ? 'rgba(74,222,128,0.5)' : 'rgba(255,87,34,0.4)'}`,
                      background: selectedFile ? 'rgba(74,222,128,0.05)' : 'rgba(255,87,34,0.05)',
                      cursor: 'pointer', transition: 'all 0.2s'
                    }}>
                      <span style={{ fontSize: 22 }}>{selectedFile ? '✅' : '📁'}</span>
                      <span style={{ fontSize: 13, color: selectedFile ? '#4ADE80' : '#8892A4', wordBreak: 'break-all' }}>
                        {selectedFile ? selectedFile.name : 'Klik untuk pilih foto dari perangkat...'}
                      </span>
                      <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => {
                        const f = e.target.files?.[0] || null
                        setSelectedFile(f)
                        setPreviewUrl(f ? URL.createObjectURL(f) : '')
                      }} />
                    </label>
                    <div style={{ fontSize: 11, color: '#8892A4', marginTop: 6 }}>JPG, PNG, WEBP — maks 4.5MB</div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 13, color: '#8892A4', marginBottom: 8 }}>Caption / Keterangan *</label>
                    <input style={inputStyle} placeholder="Proses loading barang..." value={newPhoto.caption} onChange={e => setNewPhoto(p => ({ ...p, caption: e.target.value }))} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, color: '#8892A4', marginBottom: 8 }}>Kategori</label>
                    <select style={{ ...inputStyle, cursor: 'pointer' }} value={newPhoto.type} onChange={e => setNewPhoto(p => ({ ...p, type: e.target.value }))}>
                      {TYPE_OPTIONS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, color: '#8892A4', marginBottom: 8 }}>No. Order (opsional)</label>
                    <input style={inputStyle} placeholder="PBM-250101-1234" value={newPhoto.orderId} onChange={e => setNewPhoto(p => ({ ...p, orderId: e.target.value }))} />
                  </div>
                </div>

                {/* Preview */}
                {previewUrl && (
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: 13, color: '#8892A4', marginBottom: 8 }}>Preview:</div>
                    <img src={previewUrl} alt="preview" style={{ width: 160, height: 120, objectFit: 'cover', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)' }} />
                  </div>
                )}

                <button
                  onClick={addPhoto}
                  disabled={!selectedFile || !newPhoto.caption || uploadingPhoto}
                  style={{
                    padding: '12px 28px', borderRadius: 10, border: 'none',
                    cursor: !selectedFile || !newPhoto.caption || uploadingPhoto ? 'not-allowed' : 'pointer',
                    background: 'linear-gradient(135deg,#FF5722,#FF8A65)', color: 'white', fontWeight: 700, fontSize: 14,
                    opacity: !selectedFile || !newPhoto.caption || uploadingPhoto ? 0.5 : 1
                  }}
                >
                  {uploadingPhoto ? '⏳ Mengupload...' : '💾 Simpan Foto'}
                </button>
              </div>
            )}

            {/* Edit Modal */}
            {editingPhoto && (
              <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
                <div style={{ background: '#16213E', border: '1px solid rgba(255,87,34,0.3)', borderRadius: 20, padding: 32, maxWidth: 600, width: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, margin: 0 }}>✏️ Edit Foto</h3>
                    <button onClick={() => { setEditingPhoto(null); setEditFile(null); setEditPreviewUrl('') }} style={{ background: 'none', border: 'none', color: '#8892A4', cursor: 'pointer', fontSize: 20 }}>✕</button>
                  </div>
                  <div style={{ display: 'grid', gap: 16 }}>

                    {/* Ganti foto (opsional) */}
                    <div>
                      <label style={{ display: 'block', fontSize: 13, color: '#8892A4', marginBottom: 8 }}>Ganti Foto (opsional)</label>
                      <label style={{
                        display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
                        borderRadius: 10, border: `1px dashed ${editFile ? 'rgba(74,222,128,0.5)' : 'rgba(255,255,255,0.15)'}`,
                        background: editFile ? 'rgba(74,222,128,0.05)' : 'rgba(255,255,255,0.02)',
                        cursor: 'pointer'
                      }}>
                        <span style={{ fontSize: 20 }}>{editFile ? '✅' : '📁'}</span>
                        <span style={{ fontSize: 13, color: editFile ? '#4ADE80' : '#8892A4', wordBreak: 'break-all' }}>
                          {editFile ? editFile.name : 'Pilih foto baru (kosongkan jika tidak ingin ganti)'}
                        </span>
                        <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => {
                          const f = e.target.files?.[0] || null
                          setEditFile(f)
                          setEditPreviewUrl(f ? URL.createObjectURL(f) : '')
                        }} />
                      </label>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: 13, color: '#8892A4', marginBottom: 8 }}>Caption</label>
                      <input style={inputStyle} value={editingPhoto.caption} onChange={e => setEditingPhoto(p => p ? { ...p, caption: e.target.value } : p)} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      <div>
                        <label style={{ display: 'block', fontSize: 13, color: '#8892A4', marginBottom: 8 }}>Kategori</label>
                        <select style={{ ...inputStyle, cursor: 'pointer' }} value={editingPhoto.type} onChange={e => setEditingPhoto(p => p ? { ...p, type: e.target.value } : p)}>
                          {TYPE_OPTIONS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                        </select>
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: 13, color: '#8892A4', marginBottom: 8 }}>No. Order</label>
                        <input style={inputStyle} value={editingPhoto.orderId} onChange={e => setEditingPhoto(p => p ? { ...p, orderId: e.target.value } : p)} />
                      </div>
                    </div>

                    {/* Preview: tampilkan file baru kalau ada, kalau tidak tampilkan yang lama */}
                    <img
                      src={editPreviewUrl || editingPhoto.url}
                      alt="preview"
                      style={{ width: '100%', maxHeight: 200, objectFit: 'cover', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)' }}
                      onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                    />

                    <div style={{ display: 'flex', gap: 12 }}>
                      <button onClick={saveEditPhoto} disabled={uploadingEdit} style={{ flex: 1, padding: '12px', borderRadius: 10, border: 'none', cursor: uploadingEdit ? 'not-allowed' : 'pointer', background: 'linear-gradient(135deg,#FF5722,#FF8A65)', color: 'white', fontWeight: 700, fontSize: 14, opacity: uploadingEdit ? 0.6 : 1 }}>
                        {uploadingEdit ? '⏳ Menyimpan...' : '💾 Simpan Perubahan'}
                      </button>
                      <button onClick={() => { setEditingPhoto(null); setEditFile(null); setEditPreviewUrl('') }} style={{ padding: '12px 20px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: '#8892A4', cursor: 'pointer', fontSize: 14 }}>
                        Batal
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Photo Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
              {photos.map((p, idx) => {
                const info = typeInfo(p.type)
                return (
                  <div key={p.id} style={{ background: '#16213E', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, overflow: 'hidden' }}>
                    <div style={{ position: 'relative', aspectRatio: '4/3', background: '#0F0F1A' }}>
                      <img src={p.url} alt={p.caption} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        onError={e => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300/16213E/8892A4?text=Foto+Tidak+Ditemukan' }} />
                      <div style={{ position: 'absolute', top: 10, left: 10 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999, background: `${info.color}25`, border: `1px solid ${info.color}50`, color: info.color }}>
                          {info.label}
                        </span>
                      </div>
                      <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.6)', borderRadius: 6, padding: '2px 8px', fontSize: 11, color: '#8892A4' }}>
                        #{idx + 1}
                      </div>
                    </div>
                    <div style={{ padding: 14 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4, color: '#F0F0F0' }}>{p.caption}</div>
                      {p.orderId && <div style={{ fontSize: 11, color: '#8892A4', marginBottom: 12 }}>{p.orderId}</div>}
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button onClick={() => { setEditingPhoto(p); setEditFile(null); setEditPreviewUrl('') }} style={{
                          flex: 1, padding: '8px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)',
                          background: 'rgba(255,255,255,0.04)', color: '#F0F0F0', cursor: 'pointer', fontSize: 12, fontWeight: 600
                        }}>✏️ Edit</button>
                        <button onClick={() => deletePhoto(p.id, p.url)} style={{
                          padding: '8px 12px', borderRadius: 8, border: 'none',
                          background: 'rgba(239,68,68,0.1)', color: '#EF4444', cursor: 'pointer', fontSize: 12, fontWeight: 600
                        }}>🗑️</button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {photos.length === 0 && (
              <div style={{ textAlign: 'center', padding: 80, color: '#8892A4' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>📸</div>
                <div style={{ fontSize: 16, marginBottom: 8 }}>Belum ada foto</div>
                <div style={{ fontSize: 14 }}>Klik "+ Tambah Foto" untuk menambahkan foto galeri</div>
              </div>
            )}
          </div>
        )}

        {/* ── SETTINGS ── */}
        {tab === 'settings' && (
          <div>
            <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 28, fontWeight: 800, margin: '0 0 8px' }}>⚙️ Pengaturan Usaha</h1>
            <p style={{ color: '#8892A4', margin: '0 0 32px' }}>Atur informasi dan tampilan website kamu</p>

            {settingsSaved && (
              <div style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)', borderRadius: 12, padding: '14px 20px', marginBottom: 24, color: '#4ADE80', fontWeight: 600 }}>
                ✅ Pengaturan berhasil disimpan!
              </div>
            )}

            {[
              {
                title: '🏢 Informasi Usaha', fields: [
                  { key: 'businessName', label: 'Nama Usaha', placeholder: 'Pickup Batam' },
                  { key: 'tagline', label: 'Tagline', placeholder: 'Jasa Angkut Barang Murah & Amanah' },
                  { key: 'phone', label: 'Nomor Telepon (tampilan)', placeholder: '+62 812-XXXX-XXXX' },
                  { key: 'whatsapp', label: 'Nomor WhatsApp (tanpa +)', placeholder: '6281234567890' },
                  { key: 'address', label: 'Alamat / Kota', placeholder: 'Kota Batam, Kepulauan Riau' },
                  { key: 'operationalHours', label: 'Jam Operasional', placeholder: '24 Jam, 7 Hari Seminggu' },
                  { key: 'logoEmoji', label: 'Logo Emoji', placeholder: '🚛' },
                ]
              },
              {
                title: '🦸 Konten Hero', fields: [
                  { key: 'heroTitle', label: 'Judul Utama', placeholder: 'Jasa Angkut Barang...' },
                  { key: 'heroSubtitle', label: 'Sub-judul', placeholder: 'Solusi angkut barang...' },
                ]
              },
              {
                title: '✅ Badge Kepercayaan', fields: [
                  { key: 'trustBadge1', label: 'Badge 1', placeholder: '✅ Terpercaya di Batam' },
                  { key: 'trustBadge2', label: 'Badge 2', placeholder: '🏆 Sudah Terbukti 2.800+ Order' },
                  { key: 'trustBadge3', label: 'Badge 3', placeholder: '⭐ Rating 4.9 / 5.0' },
                ]
              }
            ].map(section => (
              <div key={section.title} style={{ background: '#16213E', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 28, marginBottom: 24 }}>
                <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 17, fontWeight: 700, margin: '0 0 20px' }}>{section.title}</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
                  {section.fields.map(f => (
                    <div key={f.key}>
                      <label style={{ display: 'block', fontSize: 13, color: '#8892A4', marginBottom: 8, fontWeight: 500 }}>{f.label}</label>
                      <input
                        value={(settings as any)[f.key]}
                        onChange={e => setSettings(prev => ({ ...prev, [f.key]: e.target.value }))}
                        placeholder={f.placeholder}
                        style={inputStyle}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div style={{ background: '#16213E', border: '1px solid rgba(255,87,34,0.2)', borderRadius: 16, padding: 28, marginBottom: 24 }}>
              <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 17, fontWeight: 700, margin: '0 0 20px' }}>👀 Preview Tampilan</h2>
              <div style={{ background: '#0F0F1A', borderRadius: 12, padding: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg,#FF5722,#FF8A65)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{settings.logoEmoji}</div>
                  <div>
                    <div style={{ fontWeight: 700 }}>{settings.businessName}</div>
                    <div style={{ fontSize: 12, color: '#8892A4' }}>{settings.tagline}</div>
                  </div>
                </div>
                <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 20, fontWeight: 800, margin: '0 0 8px' }}>{settings.heroTitle}</h2>
                <p style={{ color: '#8892A4', fontSize: 13, margin: '0 0 16px' }}>{settings.heroSubtitle}</p>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  {[settings.trustBadge1, settings.trustBadge2, settings.trustBadge3].map((b, i) => (
                    <span key={i} style={{ fontSize: 12, padding: '4px 12px', borderRadius: 20, background: 'rgba(255,87,34,0.1)', border: '1px solid rgba(255,87,34,0.2)', color: '#FF8A65' }}>{b}</span>
                  ))}
                </div>
              </div>
            </div>

            <button onClick={saveSettings} style={{
              padding: '14px 40px', borderRadius: 12, border: 'none', cursor: 'pointer',
              background: 'linear-gradient(135deg,#FF5722,#FF8A65)', color: 'white',
              fontWeight: 700, fontSize: 16
            }}>
              💾 Simpan Pengaturan
            </button>
          </div>
        )}
      </main>
    </div>
  )
}