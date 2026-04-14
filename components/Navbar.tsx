'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#layanan', label: 'Layanan' },
    { href: '#harga', label: 'Harga' },
    { href: '#dokumentasi', label: 'Dokumentasi' },
    { href: '#ulasan', label: 'Ulasan' },
    { href: '#lacak', label: 'Lacak Pesanan' },
    { href: '#kontak', label: 'Kontak' },
  ]

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999,
      transition: 'all 0.3s ease',
      background: scrolled ? 'rgba(15,15,26,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
      padding: '0 24px',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 70 }}>
        
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Image
            src="/logo.png"
            alt="Pickup Batam"
            width={40}
            height={40}
            style={{ borderRadius: 10, objectFit: 'contain' }}
          />
          <div>
            <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 16, color: '#F0F0F0', lineHeight: 1.1 }}>PickupBatam</div>
            <div style={{ fontSize: 10, color: '#FF8A65', fontWeight: 600 }}>Murah • Amanah • 24 Jam</div>
          </div>
        </Link>

        {/* Desktop Links */}
        <div style={{ display: 'flex', gap: 28, alignItems: 'center' }} className="desktop-nav">
          {links.map(l => (
            <a key={l.href} href={l.href} style={{
              color: '#8892A4', textDecoration: 'none', fontSize: 14,
              fontWeight: 500, transition: 'color 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = '#FF8A65')}
              onMouseLeave={e => (e.currentTarget.style.color = '#8892A4')}
            >{l.label}</a>
          ))}
          <a href="#pesan" className="btn-primary" style={{ padding: '9px 20px', fontSize: 13 }}>
            📦 Pesan Sekarang
          </a>
          <Link href="/admin" style={{
            padding: '9px 16px', fontSize: 12, borderRadius: 8,
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
            color: '#8892A4', textDecoration: 'none', fontWeight: 500,
          }}>🔐 Admin</Link>
        </div>

        {/* Mobile Hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{
          background: 'none', border: 'none', cursor: 'pointer', color: '#F0F0F0',
          display: 'none', flexDirection: 'column', gap: 5, padding: 8
        }} className="hamburger">
          {[0,1,2].map(i => (
            <span key={i} style={{
              display: 'block', width: 24, height: 2,
              background: menuOpen && i === 1 ? 'transparent' : '#FF5722',
              borderRadius: 2, transition: 'all 0.3s ease',
              transform: menuOpen ? (i===0 ? 'rotate(45deg) translate(5px,5px)' : i===2 ? 'rotate(-45deg) translate(5px,-5px)' : '') : '',
            }}/>
          ))}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          background: 'rgba(15,15,26,0.98)', backdropFilter: 'blur(20px)',
          padding: '20px 24px', borderTop: '1px solid rgba(255,255,255,0.06)',
        }}>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{
              display: 'block', color: '#F0F0F0', textDecoration: 'none',
              padding: '12px 0', fontSize: 16, fontWeight: 500,
              borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}>{l.label}</a>
          ))}
          <a href="#pesan" className="btn-primary" style={{ marginTop: 16, display: 'block', textAlign: 'center' }}>
            📦 Pesan Sekarang
          </a>
          <Link href="/admin" style={{
            display: 'block', marginTop: 12, textAlign: 'center',
            padding: '12px 0', color: '#8892A4', textDecoration: 'none',
            fontSize: 14, borderBottom: '1px solid rgba(255,255,255,0.05)',
          }}>🔐 Admin</Link>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}