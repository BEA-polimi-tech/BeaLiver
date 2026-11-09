import Link from "next/link";
import { notFound } from "next/navigation";
import projects from "../projects.json";
import styles from "../projects.module.css";

export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  return <div className={styles.projectPage}>
    <Link href="/projects" className={styles.back}>← ALL PROJECTS</Link>
    <div className={styles.layout}>
      <div className={styles.identity}>
        <div className={styles.image} role="img" aria-label="Project image unavailable">-</div>
        <h1>{project.name}</h1><div className={styles.label}>Contact</div><p>{project.contact}</p>
      </div>
      <div className={styles.details} tabIndex={0} aria-label="Project details">
        <p className={styles.hint}>Scroll to explore ↓</p>
        {project.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2><p>{section.body}</p></section>)}
      </div>
    </div>
  </div>;
}
