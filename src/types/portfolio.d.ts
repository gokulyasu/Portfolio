export interface Personal {
  name: string
  title: string
  email: string
  phone: string
  linkedin: string
  resume: string
  profileImage: string
}
export interface HeroData {
  greeting: string
  typedText: string[]
  tagline: string
}
export interface AboutData {
  bio: string
  funFacts: string[]
}
export interface SkillCategory {
  category: string
  items: string[]
}
export interface ExperienceEntry {
  title: string
  company: string
  duration: string
  location: string
  summary: string
  highlights: string[]
}
export interface Project {
  name: string
  techStack: string[]
  description: string
  impact: string
}
export interface Education {
  degree: string
  institute: string
  location: string
  duration: string
  affiliation?: string
}
export interface NavItem { name: string; href: string }
export interface FooterData { copyright: string; tagline: string }
export interface EasterEggData { button: string; konamiCode: string[]; konamiMessage: string }
export interface ContactData { email: string; phone: string; linkedin: string }
export interface PortfolioData {
  personal: Personal
  hero: HeroData
  about: AboutData
  skills: SkillCategory[]
  experience: ExperienceEntry[]
  projects: Project[]
  education: Education[]
  quotes: string[]
  contact: ContactData
  navigation: NavItem[]
  footer: FooterData
  easterEgg: EasterEggData
}
