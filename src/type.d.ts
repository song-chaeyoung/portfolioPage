export interface SkillItem {
  name: string;
  desc: string;
}

export interface Skill {
  title: string;
  x: number;
  y: number;
  items: SkillItem[];
}

export interface Project {
  id: number;
  category: string;
  img: string[];
  title: string;
  skills: string[];
  links: Link[];
  desc: string;
}

export interface Link {
  type: string;
  link: string;
}
