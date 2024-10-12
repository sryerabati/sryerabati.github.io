import { motion } from 'framer-motion'

export default function ProjectCard({ title, description, imageUrl, projectUrl }) {
  return (
    <motion.div
      className="card"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-text-secondary mb-4">{description}</p>
        <a
          href={projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn"
        >
          View Project
        </a>
      </div>
    </motion.div>
  )
}