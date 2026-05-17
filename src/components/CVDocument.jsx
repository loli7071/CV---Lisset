import { Award, GraduationCap, Languages, Mail, MapPin, Microscope, Phone, UserRound } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ResearchProjects from './ResearchProjects.jsx';
import Section from './Section.jsx';
import SkillCloud from './SkillCloud.jsx';
import TimelineItem from './TimelineItem.jsx';

export default function CVDocument() {
  const { t } = useTranslation();
  const profile = t('profile', { returnObjects: true });
  const contact = t('contact', { returnObjects: true });

  return (
    <article id="cv-document" className="cv-page">
      <section className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">{profile.location}</p>
          <h1>{profile.name}<span>{profile.familyName}</span></h1>
          <p className="lead">{profile.summary}</p>
          <div className="hero-meta">
            {profile.highlights.map((item) => (
              <div className="meta" key={item.label}>
                <small>{item.label}</small>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </div>
        <aside className="profile-photo" aria-label={profile.photoAlt}>
          <img alt={profile.photoAlt} src={profile.image} />
          <div className="photo-card">
            <strong>{profile.photoTitle}</strong>
            <p>{profile.photoText}</p>
          </div>
        </aside>
      </section>

      <section className="contact-strip">
        <a href={`mailto:${contact.email}`}><Mail size={16} />{contact.email}</a>
        <a href={`https://wa.me/${contact.whatsappLink}`}><Phone size={16} />{contact.phone}</a>
        <span><MapPin size={16} />{contact.location}</span>
      </section>

      <Section id="profile" eyebrow={t('sections.profileEyebrow')} title={t('sections.profile')}>
        <p className="body-text">{t('professionalProfile')}</p>
      </Section>

      <Section id="research" eyebrow={t('sections.researchEyebrow')} title={t('sections.research')} featured>
        <ResearchProjects projects={t('researchProjects', { returnObjects: true })} />
      </Section>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Section id="experience" eyebrow={t('sections.experienceEyebrow')} title={t('sections.experience')}>
          <div className="timeline">
            {t('experience', { returnObjects: true }).map((item) => <TimelineItem item={item} key={item.role} />)}
          </div>
        </Section>
        <Section id="education" eyebrow={t('sections.educationEyebrow')} title={t('sections.education')}>
          <div className="timeline">
            {t('education', { returnObjects: true }).map((item) => <TimelineItem item={item} key={item.degree} />)}
          </div>
        </Section>
      </div>

      <Section id="skills" eyebrow={t('sections.skillsEyebrow')} title={t('sections.skills')}>
        <SkillCloud groups={t('skills', { returnObjects: true })} />
      </Section>

      <div className="grid gap-4 lg:grid-cols-3">
        <Section id="languages" eyebrow={<Languages size={16} />} title={t('sections.languages')}>
          <ul className="compact-list">{t('languages', { returnObjects: true }).map((item) => <li key={item}>{item}</li>)}</ul>
        </Section>
        <Section id="certifications" eyebrow={<Award size={16} />} title={t('sections.certifications')}>
          <ul className="compact-list">{t('certifications', { returnObjects: true }).map((item) => <li key={item}>{item}</li>)}</ul>
        </Section>
        <Section id="publications" eyebrow={<Microscope size={16} />} title={t('sections.publications')}>
          <ul className="compact-list">{t('publications', { returnObjects: true }).map((item) => <li key={item}>{item}</li>)}</ul>
        </Section>
      </div>

      <Section id="events" eyebrow={<GraduationCap size={16} />} title={t('sections.events')}>
        <div className="grid gap-3 md:grid-cols-2">
          {t('events', { returnObjects: true }).map((event) => <div className="soft-card" key={event}>{event}</div>)}
        </div>
      </Section>

      <Section id="contact" eyebrow={<UserRound size={16} />} title={t('sections.contact')}>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="soft-card">
            <h3>{t('contact.direct')}</h3>
            <p>{contact.email}</p>
            <p>{contact.phone}</p>
            <p>{contact.location}</p>
          </div>
          <div className="soft-card">
            <h3>{t('contact.availabilityTitle')}</h3>
            <p>{contact.availability}</p>
          </div>
        </div>
      </Section>
    </article>
  );
}
