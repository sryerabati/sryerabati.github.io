import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import ProjectCard from '../components/ProjectCard'

const projects = [
  {
    title: "Project 1",
    description: "A brief description of project 1.",
    imageUrl: "/path/to/project1-image.jpg",
    projectUrl: "https://project1-url.com"
  },
  {
    title: "Project 2",
    description: "A brief description of project 2.",
    imageUrl: "/path/to/project2-image.jpg",
    projectUrl: "https://project2-url.com"
  },
  {
    title: "Project 3",
    description: "A brief description of project 3.",
    imageUrl: "/path/to/project3-image.jpg",
    projectUrl: "https://project3-url.com"
  }
]

export default function Projects() {
  const [ref, controls] = useScrollAnimation()

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 }
      }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold mb-6 text-gradient">My Projects</h1>
      <div className="grid">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </motion.div>
  )
}