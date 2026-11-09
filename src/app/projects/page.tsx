import Link from "next/link";
import projects from "./projects.json";
import styles from "./projects.module.css";

export const metadata = { title: "BEA Projects | Biomedical Engineering Association", description: "Explore BEA's ongoing projects and courses." };

export default function ProjectsPage() {
  return <div className={styles.cover}>
    <div className={styles.hero}><h1>BEA Projects</h1><p>Explore the ideas, projects and courses our community is bringing to life.</p></div>
    <div className={styles.grid} aria-label="BEA projects">
      {projects.map((project, index) => <Link className={styles.card} key={project.slug} href={`/projects/${project.slug}`}>
        <span>{String(index + 1).padStart(2, "0")} / {project.type.toUpperCase()}</span><h2>{project.name}</h2>
      </Link>)}
    </div>
  </div>;
}
