export default function TimelineItem({ item }) {
  return (
    <article className="timeline-item">
      <div>
        <p className="timeline-date">{item.period}</p>
        <p className="timeline-place">{item.place}</p>
      </div>
      <div>
        <h3>{item.role || item.degree}</h3>
        {item.organization && <p className="font-semibold text-[var(--green)]">{item.organization}</p>}
        <ul>
          {item.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
