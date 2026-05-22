import { motion } from 'framer-motion';
import bioactivityImage from '../assets/bioactivity-map.png';
import molecularImage from '../assets/molecular-modeling.png';

export default function ScientificVisuals({ content }) {
  const visuals = [
    {
      ...content.molecular,
      image: molecularImage,
      className: 'visual-card visual-card-wide',
    },
    {
      ...content.bioactivity,
      image: bioactivityImage,
      className: 'visual-card visual-card-map',
    },
  ];

  return (
    <section className="visual-lab" id="scientific-visuals">
      <div className="section-heading">
        <span>{content.eyebrow}</span>
        <h2>{content.title}</h2>
      </div>
      <div className="visual-grid">
        {visuals.map((visual, index) => (
          <motion.article
            className={visual.className}
            key={visual.title}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            viewport={{ once: true, margin: '-80px' }}
          >
            <div className="visual-image-wrap">
              <img alt={visual.alt} src={visual.image} />
            </div>
            <div className="visual-copy">
              <p>{visual.kicker}</p>
              <h3>{visual.title}</h3>
              <span>{visual.description}</span>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
