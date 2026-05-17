import { motion } from 'framer-motion';

export default function Section({ id, eyebrow, title, children, featured = false }) {
  return (
    <motion.section
      className={`section-panel ${featured ? 'section-featured' : ''}`}
      id={id}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      viewport={{ once: true, margin: '-80px' }}
    >
      <div className="section-heading">
        <span>{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {children}
    </motion.section>
  );
}
