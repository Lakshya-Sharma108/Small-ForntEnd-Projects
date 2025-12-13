import useRevealOnScroll from '../hooks/useRevealOnScroll'

export default function Skills() {
  useRevealOnScroll()

  const skills = [
    'Core Java',
    'MySQL',
    'HTML',
    'CSS',
    'JavaScript',
    'React.js',
    'Hibernate',
    'JDBC',
    'Git & GitHub'
  ]

  return (
    <section id="skills">
      <div className="section-title">Skills</div>
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <div key={index} className="glass skill-item reveal">
            <div className="skill-name">{skill}</div>
          </div>
        ))}
      </div>
    </section>
  )
}