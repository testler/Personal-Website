import resumePdf from '../pages/Resume/Joshua Garst Resume.pdf';
import resumeDocx from '../pages/Resume/Joshua Garst Resume.docx';
import cyberDefenseImg from '../pages/Projects/cyberdefense.png';
import dateNightImg from '../pages/Projects/datenightorganizer.png';
import cubeExperimentImg from '../pages/Projects/the-cube.png';

const RESUME_DOWNLOADS = {
  type: 'downloads',
  items: [
    { label: 'Download Resume (PDF)', href: resumePdf, download: 'Joshua Garst Resume.pdf' },
    { label: 'Download Resume (DOCX)', href: resumeDocx, download: 'Joshua Garst Resume.docx' },
  ],
  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/joshua-garst/', external: true },
    { label: 'GitHub', href: 'https://github.com/testler', external: true },
    { label: 'Email', href: 'mailto:joshuagarst@gmail.com' },
  ],
};

const CONTACT_LINKS = {
  type: 'contact-links',
  channels: [
    { label: 'Email', value: 'joshuagarst@gmail.com', href: 'mailto:joshuagarst@gmail.com' },
    { label: 'Phone', value: '+1 (940) 783-0938', href: 'tel:+19407830938' },
    { label: 'GitHub', value: 'github.com/testler', href: 'https://github.com/testler', external: true },
    { label: 'LinkedIn', value: 'linkedin.com/in/joshua-garst', href: 'https://www.linkedin.com/in/joshua-garst/', external: true },
  ],
};

const PASSAGE_EXTRAS = {
  'resume-1': RESUME_DOWNLOADS,
  'resume-3': RESUME_DOWNLOADS,
  'contact-me': CONTACT_LINKS,
  'my-contact-1': CONTACT_LINKS,
  'my-contact-3': CONTACT_LINKS,
  cyberdefense: {
    type: 'project-showcase',
    image: cyberDefenseImg,
    repo: 'https://github.com/testler/CyberDefense',
    live: 'https://testler.github.io/CyberDefense/',
  },
  'date-night-organizer': {
    type: 'project-showcase',
    image: dateNightImg,
    repo: 'https://github.com/testler/DateNightOrganizer',
  },
  'movie-app': {
    type: 'project-showcase',
    repo: 'https://github.com/testler/movieApp',
  },
  'the-cube': {
    type: 'project-showcase',
    image: cubeExperimentImg,
    repo: 'https://github.com/testler/the-cube/tree/main/the_cube',
  },
};

export default PASSAGE_EXTRAS;
