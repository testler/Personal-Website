const DIALOGUE_CONFIG = {
  intro: {
    builder: [
      "Oh, hey! Sorry -- just give me one second. I'm right in the middle of something and I just need to finish this thought real quick...",
    ],
    wave: [
      "Hey, sorry about that. My name's Josh. I'm a programmer, and sometimes I just need to get the thought out of my head before it's gone forever.",
      "Welcome to my portfolio site! I wanted more than just a static page -- I wanted an experience. Something that shows who I actually am, not just that I can build a website.",
      "So I'll be your guide to, well... me, if you will. What do you want to know?",
    ],
    tour: [
      'Oh yeah, so I actually have something really cool that I cooked up just for this site.',
      'It\'s called "The Core" -- it\'s the main interface for this website. You won\'t be able to interact with it just yet until I\'m done talking, ha!',
      "It's a high-tech looking UI that is surprisingly easy to use. It'll let you go anywhere on my site in just a couple of taps.",
      'Tap once to select a destination, tap again on the same face to confirm and be whisked away.',
    ],
  },
  intentGate: {
    heading: 'The Core',
    subheading: 'Take it for a spin.',
    options: [
      { label: 'About Me', to: '/about-intro' },
      { label: 'My Faith', to: '/faith' },
      { label: 'My Family', to: '/family' },
      { label: 'Hopes & Dreams', to: '/hopes-and-dreams' },
      { label: 'Hobbies', to: '/hobbies' },
      { label: 'Career Path', to: '/experience-intro' },
      { label: 'Career Goals', to: '/career-goals' },
      { label: 'Projects', to: '/projects-intro' },
      { label: 'Tech Stack', to: '/tech-intro' },
      { label: 'Personality', to: '/personality-intro' },
      { label: 'Full Tech List', to: '/tech-list' },
      { label: 'Resume & Contact', to: '/resume' },
    ],
  },
};

export default DIALOGUE_CONFIG;
