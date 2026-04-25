import React from 'react';
import Link from 'next/link';

export const Header: React.FC = () => {
  return (
    <header style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 100,
      padding: 'var(--spacing-md) 0'
    }} className="glass-card">
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
          Mynaren<span style={{ color: 'var(--accent-primary)' }}>Foods</span>
        </Link>
        <nav>
          <ul style={{ display: 'flex', gap: 'var(--spacing-lg)' }}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/menu">Menu</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>
        <div>
          <button className="btn-primary">Order Now</button>
        </div>
      </div>
    </header>
  );
};
