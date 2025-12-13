import useRevealOnScroll from '../hooks/useRevealOnScroll'

export default function Contact() {
  useRevealOnScroll()

  return (
    <section id="contact">
      <div className="section-title">Contact</div>
      <div className="glass reveal">
        <div className="contact-grid">
          <div className="contact-info">
            <p><strong>Email:</strong> lakshayaawasthi108@gmail.com</p>
            <p><strong>Phone:</strong> 9549157829</p>
            <p><strong>Location:</strong> Jaipur, Rajasthan</p>

            <div style={{ display: 'flex', gap: '16px', marginTop: '18px', justifyContent: 'left', alignItems: 'center' }}>
              <a href="https://github.com/Lakshya-Sharma108" target="_blank" rel="noopener noreferrer">
                <img src="/Images/github.png" style={{ width: '32px', height: '32px', objectFit: 'contain' }} alt="GitHub" />
              </a>
              <a href="https://www.linkedin.com/in/lakshaya-awasthi-713b5b281/" target="_blank" rel="noopener noreferrer">
                <img src="/Images/linkedin.png" style={{ width: '32px', height: '32px', objectFit: 'contain' }} alt="LinkedIn" />
              </a>
              <a href="https://www.instagram.com/vyom_surya108/" target="_blank" rel="noopener noreferrer">
                <img src="/Images/instagram.png" style={{ width: '32px', height: '32px', objectFit: 'contain' }} alt="Instagram" />
              </a>
              <a href="https://x.com/LankeshRavan_" target="_blank" rel="noopener noreferrer">
                <img src="/Images/x.png" style={{ width: '32px', height: '32px', objectFit: 'contain' }} alt="X" />
              </a>
            </div>
          </div>

          <div>
            <form action="https://formspree.io/f/xwpgnyoa" method="POST">
              <label>Name</label>
              <input type="text" name="name" placeholder="Your name" required />
              <label>Email</label>
              <input type="email" name="email" placeholder="you@email.com" required />
              <label>Message</label>
              <textarea name="message" rows="6" placeholder="Write a short message..." required></textarea>
              <button className="btn primary" type="submit">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}