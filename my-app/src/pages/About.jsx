import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function About() {
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
      <h1 className="text-4xl font-bold mb-6 text-gradient">About Me</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <p className="text-xl mb-4">
            I'm a student with 4 years of experience using Python, Java, and ReactJS.
          </p>
          <p className="text-lg mb-4 text-text-secondary">
            My passion is [describe what drives you in your work].
          </p>
          <p className="text-lg text-text-secondary">
            When I'm not coding, you can find me listening to spotify relaxing on my bed.
          </p>
        </div>
        <div className="card p-6">
          <h2 className="text-2xl font-bold mb-4" style ={{marginLeft: '25px'}}>Skills</h2>
          <ul className="list-disc list-inside">
            <li>Skill 1</li>
            <li>Skill 2</li>
            <li>Skill 3</li>
            <li>Skill 4</li>
            <li>Skill 5</li>
          </ul>
        </div>
      </div>
    </motion.div>
  )
}