import { ExternalLink } from 'lucide-react';

export default function ResearchProjects({ projects }) {
  return (
    <div className="grid gap-4">
      {projects.map((project) => (
        <article className="research-card" key={project.title}>
          <div>
            <p className="research-label">{project.status}</p>
            <h3>{project.title}</h3>
            <p className="mt-3 text-[var(--muted)] leading-7">{project.description}</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div>
                <h4>{project.methodologyLabel}</h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.methodologies.map((item) => (
                    <span className="skill-pill" key={item}>{item}</span>
                  ))}
                </div>
              </div>
              <div>
                <h4>{project.resultsLabel}</h4>
                <ul className="mt-2 list-disc pl-5 text-[var(--muted)] leading-7">
                  {project.results.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            {project.links?.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {project.links.map((link) => (
                  <a className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-3 py-2 text-sm font-bold text-[var(--green)]" href={link.href} key={link.href}>
                    {link.label}
                    <ExternalLink size={14} />
                  </a>
                ))}
              </div>
            )}
          </div>
          <div className="research-image">
            {project.image ? <img alt={project.title} src={project.image} /> : <span>{project.imageFallback}</span>}
          </div>
        </article>
      ))}
    </div>
  );
}
