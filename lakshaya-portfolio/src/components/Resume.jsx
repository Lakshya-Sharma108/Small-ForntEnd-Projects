import { jsPDF } from 'jspdf'
import useRevealOnScroll from '../hooks/useRevealOnScroll'

export default function Resume() {
  useRevealOnScroll()

  const downloadResume = () => {
    try {
      const doc = new jsPDF()
      doc.setFont('Helvetica')
      doc.setFontSize(18)
      doc.text('Lakshaya Awasthi', 20, 30)
      doc.setFontSize(12)
      doc.text('Java Full-Stack Developer', 20, 40)
      doc.setFontSize(11)
      doc.text('Email: lakshayaawasthi108@gmail.com', 20, 50)
      doc.text('Phone: 9549157829', 20, 58)
      doc.setFontSize(10)
      doc.text('Summary:', 20, 76)
      doc.setFontSize(10)
      doc.text(
        'Motivated computer science graduate with experience in Java, React, MySQL and web development. Seeking opportunities to build reliable backend systems.',
        20,
        84,
        { maxWidth: 170 }
      )
      doc.save('Lakshaya_Awasthi_Resume.pdf')
    } catch (err) {
      console.error(err)
      alert('Failed to generate PDF')
    }
  }

  return (
    <section id="resume">
      <div className="section-title">Resume</div>
      <div className="glass resume-box reveal">
        <p style={{ fontWeight: 700, marginBottom: '8px' }}>
          Lakshaya Awasthi — Java Full-Stack Developer (Fake Resume for demo)
        </p>
        <p style={{ maxWidth: '720px', margin: '0 auto', color: 'var(--muted)' }}>
          Summary: Motivated computer science graduate with core knowledge in Java, React, MySQL, 
          and modern web development practices. Seeking full-time opportunities to build scalable 
          backend systems.
        </p>
        <div style={{ marginTop: '14px' }}>
          <button className="btn primary" onClick={downloadResume}>
            Download Resume (PDF)
          </button>
        </div>
      </div>
    </section>
  )
}