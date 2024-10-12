import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function Contact() {
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
      <h1 className="text-4xl font-bold mb-6 text-gradient">Contact Me</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <p className="text-xl mb-4">
            I'd love to hear from you! Feel free to reach out using the information below.
          </p>
          <div className="space-y-2 text-text-secondary">
            <p>Email: your.email@example.com</p>
            <p>LinkedIn: <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">Your LinkedIn Profile</a></p>
            <p>GitHub: <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">Your GitHub Profile</a></p>
          </div>
        </div>
        <div className="card p-6">
          <h2 className="text-2xl font-bold mb-4">Send a Message</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
              <input type="text" id="name" name="name" className="w-full p-2 bg-background border border-border rounded" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
              <input type="email" id="email" name="email" className="w-full p-2 bg-background border border-border rounded" />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
              <textarea id="message" name="message" rows="4" className="w-full p-2 bg-background border border-border rounded"></textarea>
            </div>
            <button type="submit" className="btn">Send Message</button>
          </form>
        </div>
      </div>
    </motion.div>
  )
}