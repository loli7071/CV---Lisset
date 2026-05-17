export default function SkillCloud({ groups }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {groups.map((group) => (
        <article className="soft-card" key={group.title}>
          <h3>{group.title}</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {group.items.map((item) => (
              <span className="skill-pill" key={item}>
                {item}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
