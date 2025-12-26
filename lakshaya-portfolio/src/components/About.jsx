import useRevealOnScroll from '../hooks/useRevealOnScroll'

export default function About() {
  useRevealOnScroll()

  return (
    <section id="about">
      <div className="section-title">About</div>
      <div className="glass reveal">
        <p>
          I am a Computer Science graduate whose curiosity for technology routinely propels me into new realms of learning and creation. My work embodies a fusion of meticulous design, disciplined structure, and an unwavering commitment to clarity and efficiency.My journey in development is guided by a perpetual desire to transcend the ordinary and master the intricacies that lie beneath the surface. With each endeavour, I aspire not merely to build, but to elevate, innovate, and contribute meaningfully to the digital tapestry of our time.
        </p>
      </div>
    </section>
  )
}