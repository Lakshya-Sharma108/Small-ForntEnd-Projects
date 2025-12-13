import useRevealOnScroll from '../hooks/useRevealOnScroll'

export default function Achievements() {
  useRevealOnScroll()

  return (
    <section id="achievements">
      <div style={{ display: 'flex', gap: '18px', alignItems: 'stretch', flexWrap: 'wrap' }}>
        <div style={{ flex: 1 }}>
          <div className="section-title">Achievements</div>
          <div
            className="glass reveal"
            style={{
              height: '140px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              color: 'var(--muted)'
            }}
          >
            Not Available RN
          </div>
        </div>

        <div style={{ width: '320px' }}>
          <div className="section-title">Services</div>
          <div
            className="glass reveal"
            style={{
              height: '140px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              color: 'var(--muted)'
            }}
          >
            Not Available RN
          </div>
        </div>
      </div>
    </section>
  )
}