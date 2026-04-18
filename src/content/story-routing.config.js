/**
 * Maps every passage ID to its URL slug.
 * The home route ("/") is rendered by Home.jsx — it shows either Press Start
 * or Welcome Back depending on whether a player name is already saved.
 */
const PASSAGE_ROUTE_MAP = {
  'press-start': '/',
  'welcome-back': '/welcome-back',
  opening: '/opening',
  'smart-intro': '/smart-intro',
  'straight-to-core': '/straight-to-core',
  'main-intro-1': '/intro',
  'main-intro-2': '/intro-2',
  'main-intro-3': '/intro-3',
  'main-intro-4': '/intro-4',
  'the-core': '/core',

  'projects-1': '/projects',
  'projects-3': '/projects-3',
  cyberdefense: '/cyberdefense',
  'date-night-organizer': '/date-night-organizer',
  'movie-app': '/movie-app',
  'the-cube': '/the-cube',
  'currently-building': '/currently-building',

  'my-approach-1': '/my-approach',
  'my-approach-2': '/my-approach-2',
  'my-approach-3': '/my-approach-3',

  'website-reason-1': '/why-this-site',
  'website-reason-2': '/why-this-site-2',
  'website-reason-3': '/why-this-site-3',

  'personal-dossier-1': '/personal-dossier',
  'personal-dossier-2': '/personal-dossier-2',
  'personal-dossier-3': '/personal-dossier-3',

  'tech-career-1': '/tech-career',
  'tech-career-2': '/tech-career-2',
  'tech-career-3': '/tech-career-3',

  'nontech-career-1': '/nontech-career',
  'nontech-career-2': '/nontech-career-2',
  'nontech-career-3': '/nontech-career-3',

  'my-stack-1': '/my-stack',
  'my-stack-2': '/my-stack-2',
  'my-stack-3': '/my-stack-3',

  'my-contact-1': '/my-contact',
  'my-contact-2': '/my-contact-2',
  'my-contact-3': '/my-contact-3',

  'contact-me': '/contact',

  'linkedin-1': '/linkedin',
  'linkedin-2': '/linkedin-2',
  'linkedin-3': '/linkedin-3',

  'github-1': '/github',
  'github-2': '/github-2',
  'github-3': '/github-3',

  'resume-1': '/resume',
  'resume-3': '/resume-3',

  ending: '/ending',
};

const SLUG_TO_PASSAGE = {};
for (const [passageId, route] of Object.entries(PASSAGE_ROUTE_MAP)) {
  if (route === '/') continue; // Home handled separately
  const slug = route.slice(1);
  SLUG_TO_PASSAGE[slug] = passageId;
}

export function resolveRouteForPassage(passageId) {
  return PASSAGE_ROUTE_MAP[passageId] || '/';
}

export function resolvePassageForSlug(slug) {
  return SLUG_TO_PASSAGE[slug] || null;
}

export { SLUG_TO_PASSAGE };
export default PASSAGE_ROUTE_MAP;
