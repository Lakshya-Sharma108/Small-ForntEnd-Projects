import useRevealOnScroll from '../hooks/useRevealOnScroll'

export default function About() {
  useRevealOnScroll()

  return (
    <section id="about">
      <div className="section-title">About</div>
      <div className="glass reveal">
        <p>
          I'm Lakshaya, a Computer Science graduate from Maharaja Surajmal Brij University. 
          I like clean code, reliable systems, and elegant UIs. My toolkit includes Core Java, 
          React, MySQL, Hibernate and modern front-end tooling. Outside of code I play badminton, 
          travel and garden.
        </p>
      </div>
    </section>
  )
}