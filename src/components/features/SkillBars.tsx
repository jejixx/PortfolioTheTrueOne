import type { Skill } from "@/types";

interface SkillBarsProps {
  skills: Skill[];
}

export function SkillBars({ skills }: SkillBarsProps) {
  return (
    <ul className="space-y-4" role="list">
      {skills.map((skill) => (
        <li key={skill.name}>
          <div className="mb-1 flex justify-between text-sm">
            <span className="font-medium text-foreground">{skill.name}</span>
            <span className="text-muted" aria-hidden>
              {skill.level}%
            </span>
          </div>
          <div
            className="h-2 overflow-hidden rounded-full bg-muted-bg"
            role="meter"
            aria-valuenow={skill.level}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${skill.name} : ${skill.level} sur 100`}
          >
            <div
              className="h-full rounded-full bg-accent transition-all"
              style={{ width: `${skill.level}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
