/**
 * 12 dodecahedron face mappings — one per TWEE destination.
 * IDs match DESTINATION_KEYS so VisitTrackerProvider's visited Set
 * can directly drive per-face color state.
 */
const CORE_FACES = [
  // Navigation
  { id: 'Press Start', label: 'Press Start', toPassage: 'press-start', color: '#7dd3fc', group: 'Navigation' },
  { id: 'Resume', label: 'Resume', toPassage: 'resume-1', color: '#fbbf24', group: 'Navigation' },
  { id: 'LinkedIn', label: 'LinkedIn', toPassage: 'linkedin-1', color: '#60a5fa', group: 'Navigation' },
  { id: 'GitHub', label: 'GitHub', toPassage: 'github-1', color: '#a78bfa', group: 'Navigation' },
  // Experience
  { id: 'Projects', label: 'Projects', toPassage: 'projects-1', color: '#34d399', group: 'Experience' },
  { id: 'Tech Career', label: 'Tech Career', toPassage: 'tech-career-1', color: '#22d3ee', group: 'Experience' },
  { id: 'non-tech Career', label: 'Non-Tech Career', toPassage: 'nontech-career-1', color: '#86efac', group: 'Experience' },
  { id: 'Website Reason', label: 'Website Reason', toPassage: 'website-reason-1', color: '#f0abfc', group: 'Experience' },
  // About Me
  { id: 'My Contact', label: 'My Contact', toPassage: 'my-contact-1', color: '#fda4af', group: 'About Me' },
  { id: 'Personal Dossier', label: 'Personal Dossier', toPassage: 'personal-dossier-1', color: '#fcd34d', group: 'About Me' },
  { id: 'My Approach', label: 'My Approach', toPassage: 'my-approach-1', color: '#c4b5fd', group: 'About Me' },
  { id: 'My Stack', label: 'My Stack', toPassage: 'my-stack-1', color: '#06b6d4', group: 'About Me' },
];

export default CORE_FACES;
