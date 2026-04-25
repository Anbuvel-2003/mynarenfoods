import React from 'react';
import Image from 'next/image';

export const Hero: React.FC = () => {
  return (
    <section style={{
      padding: 'var(--spacing-2xl) 0',
      marginTop: 'var(--spacing-2xl)',
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'var(--spacing-xl)',
        alignItems: 'center'
      }}>
        <div className="animate-fade-in">
          <h1 style={{
            fontSize: '4rem',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: 'var(--spacing-md)'
          }}>
            Experience the <span style={{ color: 'var(--accent-primary)' }}>Art</span> of Fine Dining
          </h1>
          <p style={{
            fontSize: '1.25rem',
            color: 'var(--text-secondary)',
            marginBottom: 'var(--spacing-xl)',
            maxWidth: '500px'
          }}>
            MynarenFoods brings gourmet experiences to your doorstep. Crafted with passion, delivered with care.
          </p>
          <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
            <button className="btn-primary" style={{ padding: '1rem 2rem' }}>Explore Menu</button>
            <button style={{ 
              background: 'transparent', 
              border: '1px solid var(--border-secondary)',
              padding: '1rem 2rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              cursor: 'pointer'
            }}>Our Story</button>
          </div>
        </div>
        <div style={{ position: 'relative', height: '500px' }} className="animate-fade-in">
          <div style={{
            position: 'absolute',
            top: '10%',
            left: '10%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
            borderRadius: 'var(--radius-xl)',
            opacity: 0.1,
            zIndex: -1
          }}></div>
          <Image 
            src="/hero-food.png" 
            alt="Delicious gourmet dish" 
            fill
            style={{
              objectFit: 'cover',
              borderRadius: 'var(--radius-xl)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
            }}
          />
        </div>
      </div>
    </section>
  );
};
