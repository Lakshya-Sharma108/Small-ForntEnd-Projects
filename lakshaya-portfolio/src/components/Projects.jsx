import useRevealOnScroll from '../hooks/useRevealOnScroll'

export default function Projects() {
  useRevealOnScroll()

  const projects = [
    {
      image: '/Images/hospital.jpg',
      title: 'Hospital Management System',
      desc: 'OOP-based Java system to manage patients, staff, billing & records. Emphasis on clean architecture.'
    },
    {
      image: '/Images/weather.jpg',
      title: 'Weather App',
      desc: 'Modern JS app with live API integration and responsive UI.'
    },
    {
      image: '/Images/student.jpg',
      title: 'Student Portal',
      desc: 'Complete student portal with authentication, profiles & dashboards.'
    }
  ]

  return (
    <section id="projects">
      <div className="section-title">Projects</div>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card reveal">
            <img src={project.image} alt={project.title} />
            <div className="project-body">
              <div className="project-title">{project.title}</div>
              <div className="project-desc">{project.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}