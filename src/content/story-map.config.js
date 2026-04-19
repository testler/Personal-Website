/**
 * Story map adapted from Portfolio_Draft.twee.
 * Each node represents a Twine passage. Photos, time-of-day conditionals,
 * name substitution, and "Next Destination" suggestions are handled in PassageScene.
 *
 * Tokens supported in prompt/paragraphs:
 *   $name         → player name (or empty)
 *   {NAME_COMMA}  → ", $name" if name set, else ""
 *   {TIME_MODE}   → "working" | "gaming" depending on local hour
 *   {TYPING_SFX}  → "keyboard typing sounds" | "controller clicks and faint game audio"
 *
 * Per-passage flags:
 *   visitKey         → marks this destination as "visited" when reached
 *   nameInput        → renders the name input field with preset choices
 *   showNextDestination → renders the "To {random unvisited}" link
 *   isEnding         → routes through the dynamic 3-tier ending dispatcher
 */
const STORY_MAP = {
  starts: {
    'press-start': 'press-start',
    core: 'the-core',
    contact: 'contact-me',
    resume: 'resume-1',
    linkedin: 'linkedin-1',
    github: 'github-1',
  },
  nodes: {
    'press-start': {
      sceneLabel: 'Press Start',
      title: 'Press Start',
      prompt: 'JOSHUA GARST',
      paragraphs: [
        'Portfolio Site // v1.0',
        'Full-Stack Developer II in Bentonville, Arkansas.\nSpecializing in .NET, Razor Pages, and React.\nCurrently at Sharp Hue, shipping production software for real clients.',
      ],
      photoKey: 'press_start',
      visitKey: 'Press Start',
      isPressStart: true,
      choices: [
        { label: 'Tap to enter', toPassage: 'opening' },
      ],
    },

    'welcome-back': {
      sceneLabel: 'Welcome Back',
      title: 'Welcome Back',
      prompt: 'Welcome back, $name! Long time no see. How can I help you?',
      paragraphs: [],
      photoKey: 'welcome_back',
      choices: [
        { label: 'Act like you have never seen me before', resetPlayer: true, toPassage: 'opening' },
        { label: 'Introduce yourself again', toPassage: 'main-intro-1' },
        { label: 'Take me to The Core', toPassage: 'the-core' },
        { label: 'Give me your LinkedIn', toPassage: 'linkedin-1' },
        { label: 'Give me your resume', toPassage: 'resume-1' },
        { label: 'Show me how to get in contact with you', toPassage: 'contact-me' },
      ],
    },

    opening: {
      sceneLabel: 'Opening',
      title: 'Opening',
      prompt: 'Hi there! Sorry, give me just a second, I am just wrapping something up...',
      paragraphs: [
        '*{TYPING_SFX}*',
        'Okay! Ready now. What brings you by?',
      ],
      photoKeyByTime: { working: 'opening_working', gaming: 'opening_gaming' },
      choices: [
        { label: 'Wait patiently', toPassage: 'main-intro-1' },
        { label: 'I am sorry, I am in a hurry', toPassage: 'straight-to-core' },
        { label: 'What? You are virtual, what could you possibly be working on?', toPassage: 'smart-intro' },
        { label: 'Take me to your LinkedIn', toPassage: 'linkedin-1' },
        { label: 'Just need a resume', toPassage: 'resume-1' },
        { label: 'Just contact information please', toPassage: 'contact-me' },
      ],
    },

    'smart-intro': {
      sceneLabel: 'Smart Intro',
      title: 'Smart Intro',
      prompt: 'Ha, you are right! I am just a virtual version of my physical counterpart.',
      paragraphs: [
        'But as such, I need to represent him in virtual space as closely as possible, and the most likely thing he is doing right now is {TIME_MODE}! So let me introduce myself properly.',
      ],
      photoKey: 'smart_intro',
      choices: [
        { label: "Yeah, let's go!", toPassage: 'main-intro-1' },
        { label: "Fine. But I still don't understand.", toPassage: 'main-intro-1' },
      ],
    },

    'straight-to-core': {
      sceneLabel: 'Straight to The Core',
      title: 'Straight to The Core',
      prompt: 'Okay, fair enough. I will take you to central navigation. From there you should be able to get whatever you need quickly. Thanks for stopping by!',
      paragraphs: ['To the core!'],
      photoKey: 'main_intro',
      choices: [
        { label: 'Tap to continue', toPassage: 'the-core' },
      ],
    },

    'main-intro-1': {
      sceneLabel: 'Main Intro',
      title: 'Main Intro',
      prompt: "Hi! I am Joshua Garst, or more accurately, Josh's digital double if you will.",
      paragraphs: [],
      photoKey: 'main_intro',
      choices: [
        { label: 'Tap to continue', toPassage: 'main-intro-2' },
      ],
    },

    'main-intro-2': {
      sceneLabel: 'Main Intro',
      title: 'Main Intro',
      prompt: 'I am here to guide you on your journey and help you along the way!',
      paragraphs: [],
      photoKey: 'main_intro',
      choices: [
        { label: 'Tap to continue', toPassage: 'main-intro-3' },
      ],
    },

    'main-intro-3': {
      sceneLabel: 'Main Intro',
      title: 'Main Intro',
      prompt: 'Before we embark, what can I call you?',
      paragraphs: ['Pick one of the suggestions below, or type your own.'],
      photoKey: 'main_intro',
      nameInput: true,
      choices: [
        { label: 'Stranger', setName: 'Stranger', toPassage: 'main-intro-4' },
        { label: 'Operator', setName: 'Operator', toPassage: 'main-intro-4' },
        { label: 'Director', setName: 'Director', toPassage: 'main-intro-4' },
        { label: 'Acquisition Specialist', setName: 'Acquisition Specialist', toPassage: 'main-intro-4' },
      ],
    },

    'main-intro-4': {
      sceneLabel: 'Main Intro',
      title: 'Main Intro',
      prompt: 'Awesome! Nice to meet you, $name. I want to start with something I created special just for navigating around my site quickly. I call it the Core.',
      paragraphs: [],
      photoKey: 'main_intro',
      choices: [
        { label: 'Tap to continue', toPassage: 'the-core' },
      ],
    },

    'the-core': {
      sceneLabel: 'The Core',
      title: 'The Core',
      prompt: 'You can go anywhere in the whole site from here. As you explore, the places you visit will be counted. Where do you want to go{NAME_COMMA}?',
      paragraphs: [],
      photoKey: 'the_core',
      isCoreHub: true,
      choices: [],
    },

    /* ──────────────────────────────────────────── */
    /* PROJECTS                                     */
    /* ──────────────────────────────────────────── */

    'projects-1': {
      sceneLabel: 'Projects',
      title: 'Projects',
      prompt: 'I would love to show you some of my work. Everything here earned its spot by passing one test: did I learn something real building it, or did I ship something real with it?',
      paragraphs: [
        'Each project sits on a different stack. CyberDefense (a browser tower defense game I built) is vanilla HTML, CSS, and JavaScript — no framework, no build step. Date Night Organizer is a Node and Express app with EJS server-side rendering and MongoDB. Movie App is full MERN. The Cube is React Three Fiber on top of Three.js. Different problems, different tools.',
      ],
      photoKey: 'projects',
      choices: [{ label: 'Tap to continue', toPassage: 'projects-3' }],
    },

    'projects-3': {
      sceneLabel: 'Projects',
      title: 'Projects',
      prompt: 'Which one do you want to dig into{NAME_COMMA}?',
      paragraphs: [],
      photoKey: 'projects',
      visitKey: 'Projects',
      showNextDestination: true,
      choices: [
        { label: 'HTML5 + CSS3 + JS Tower Defense', toPassage: 'cyberdefense' },
        { label: 'EJS Node Date Night Organizer', toPassage: 'date-night-organizer' },
        { label: 'React Movie App', toPassage: 'movie-app' },
        { label: 'The Cube', toPassage: 'the-cube' },
        { label: 'Currently Building', toPassage: 'currently-building' },
        { label: 'How do I approach problems?', toPassage: 'my-approach-1' },
        { label: 'See my full tech stack', toPassage: 'my-stack-1' },
        { label: 'Back to The Core', toPassage: 'the-core' },
      ],
    },

    cyberdefense: {
      sceneLabel: 'CyberDefense',
      title: 'CyberDefense',
      prompt: '*loading project file: CYBER_DEFENSE.exe*',
      paragraphs: [
        'A modern, educational tower defense game themed around real-world cybersecurity. You defend a main server from waves of digital threats (Viruses, Worms, Ransomware, DDoS) by deploying real cybersecurity tools as towers. Firewalls, antivirus, intrusion detection systems, encryption, honeypots. Every tower and threat is tied to a real concept, so you actually learn something while you play.',
        '*tech stack*\nVanilla HTML5, CSS3, and JavaScript. No frameworks, no build step. Just the browser and a game loop.',
        '*why I built it*\nI wanted to see how far I could push a browser game without reaching for a framework. Turns out pretty far. Also wanted to teach cybersecurity concepts in a way that was actually fun.',
      ],
      photoKey: 'projects',
      choices: [
        { label: 'Play it live', href: 'https://testler.github.io/CyberDefense/' },
        { label: 'See the code on GitHub', href: 'https://github.com/testler/CyberDefense' },
        { label: 'See another project', toPassage: 'projects-3' },
        { label: 'Back to The Core', toPassage: 'the-core' },
      ],
    },

    'date-night-organizer': {
      sceneLabel: 'Date Night Organizer',
      title: 'Date Night Organizer',
      prompt: '*loading project file: DATE_NIGHT.exe*',
      paragraphs: [
        'A web app for collecting and organizing date ideas so indecisive couples can spend more time actually doing fun things and less time deciding what to do. Create an account, build collections, add ideas, pick one and go.',
        '*tech stack*\nNode.js, Express, EJS, MongoDB, Mongoose. Fully server-side rendered. Authentication built in.',
        '*why I built it*\nBecause my wife and I were spending more time deciding what to do for date night than doing it. Classic engineer response: build an app for it.',
        '*heads up*\nThe original Heroku deployment has been retired (RIP free tier). The code is still up on GitHub if you want to see how it was built.',
      ],
      photoKey: 'projects',
      choices: [
        { label: 'See the code on GitHub', href: 'https://github.com/testler/DateNightOrganizer' },
        { label: 'See another project', toPassage: 'projects-3' },
        { label: 'Back to The Core', toPassage: 'the-core' },
      ],
    },

    'movie-app': {
      sceneLabel: 'Movie App',
      title: 'Movie App',
      prompt: '*loading project file: MOVIE_APP.exe*',
      paragraphs: [
        'A movie watchlist app built as a four-person team project at General Assembly. Users can sign up, browse movies, rate and review, and build a personal watchlist to come back to later.',
        '*tech stack*\nReact front end, Express and Mongoose backend API, MongoDB database. JWT authentication, bcrypt for password hashing. Deployed (originally) to Heroku.',
        '*my role*\nOne of four contributors. This was the project where I really got comfortable with the full stack, from schema design through to React components, and it was also my first real taste of collaborative development with pull requests, branches, and merge conflicts.',
      ],
      photoKey: 'projects',
      choices: [
        { label: 'See the code on GitHub', href: 'https://github.com/testler/movieApp' },
        { label: 'See another project', toPassage: 'projects-3' },
        { label: 'Back to The Core', toPassage: 'the-core' },
      ],
    },

    'the-cube': {
      sceneLabel: 'The Cube',
      title: 'The Cube',
      prompt: '*loading project file: THE_CUBE.exe*',
      paragraphs: [
        'A smaller experimental project exploring 3D rendering and interaction in the browser.',
      ],
      photoKey: 'projects',
      choices: [
        { label: 'See the code on GitHub', href: 'https://github.com/testler/the-cube/tree/main/the_cube' },
        { label: 'See another project', toPassage: 'projects-3' },
        { label: 'Back to The Core', toPassage: 'the-core' },
      ],
    },

    'currently-building': {
      sceneLabel: 'Currently Building',
      title: 'Currently Building',
      prompt: '*loading in-progress files*',
      paragraphs: [
        'These are the things I am building right now, today, in real time.',
        '== UNITY MULTIPLAYER GAME ==\nA multiplayer prototype in Unity and C#. A nights-and-weekends project I pick at because I enjoy it. Not deployed, not chasing anything — just a sandbox for stretching into networking, gameplay code, and asset pipelines.',
        '== GARDEN PLANNER ==\nAn Electron app with an internal SQLite database so it works offline. When you are online, it syncs with my own API to pull weather and location data. Built to help plan a large-scale ethnobotanical garden with over a hundred plants.',
        '== THIS PORTIFILIO ==\nYeah, this. Built in Twine-style branching dialogue as a React app. You are inside it right now.',
      ],
      photoKey: 'projects',
      choices: [
        { label: 'See a finished project', toPassage: 'projects-3' },
        { label: 'Back to The Core', toPassage: 'the-core' },
      ],
    },

    /* ──────────────────────────────────────────── */
    /* MY APPROACH                                  */
    /* ──────────────────────────────────────────── */

    'my-approach-1': {
      sceneLabel: 'My Approach',
      title: 'My Approach',
      prompt: 'My approach to dealing with complex problems is actually pretty simple: communicate, balance, and reason.',
      paragraphs: [
        'Communication with teammates and clients, because most bugs are really miscommunications in disguise.',
        'Balance of priorities, because everything cannot be urgent.',
        'Reasoning to identify the actual root cause, because the symptom is almost never the problem.',
      ],
      photoKey: 'approach',
      choices: [{ label: 'Tap to continue', toPassage: 'my-approach-2' }],
    },

    'my-approach-2': {
      sceneLabel: 'My Approach',
      title: 'My Approach',
      prompt: 'I guess that is also the fourth pillar: keeping it simple. Not overcomplicating things for no reason. If it is complicated, it had better be for a good reason.',
      paragraphs: [
        'To be clear, there is a difference between elaborate and complex. This site, for instance, is elaborate, but it is not complex in the way it was programmed. That is the kind of distinction I try to hold onto.',
      ],
      photoKey: 'approach',
      choices: [{ label: 'Tap to continue', toPassage: 'my-approach-3' }],
    },

    'my-approach-3': {
      sceneLabel: 'My Approach',
      title: 'My Approach',
      prompt: 'Now, to continue with this elaborate site, where would you like to go next{NAME_COMMA}?',
      paragraphs: [],
      photoKey: 'approach',
      visitKey: 'My Approach',
      showNextDestination: true,
      choices: [
        { label: "Show me some projects you've done with this approach", toPassage: 'projects-1' },
        { label: 'Why did you create this elaborate site?', toPassage: 'website-reason-1' },
        { label: 'Back to The Core', toPassage: 'the-core' },
      ],
    },

    /* ──────────────────────────────────────────── */
    /* WEBSITE REASON                               */
    /* ──────────────────────────────────────────── */

    'website-reason-1': {
      sceneLabel: 'Why Gamify?',
      title: 'Why Gamify?',
      prompt: 'Why did I make my portifilio into a game? Because I thought it would be fun. For me building it, and for you reading it.',
      paragraphs: [
        'I also love video games as a medium. They are one of the most honest forms of human connection we have invented. So why should my portfolio be a boring PDF?',
      ],
      photoKey: 'website_reason',
      choices: [{ label: 'Tap to continue', toPassage: 'website-reason-2' }],
    },

    'website-reason-2': {
      sceneLabel: 'Why Gamify?',
      title: 'Why Gamify?',
      prompt: 'It is pretty simple, really. I enjoy making people\'s lives a little better, and if that is through a quirky little game, so be it. Most resumes get skimmed in thirty seconds and forgotten in sixty. This one, you will actually remember. That is the whole point.',
      paragraphs: [],
      photoKey: 'website_reason',
      choices: [{ label: 'Tap to continue', toPassage: 'website-reason-3' }],
    },

    'website-reason-3': {
      sceneLabel: 'Why Gamify?',
      title: 'Why Gamify?',
      prompt: 'I hope you are enjoying it. Where would you like to go next{NAME_COMMA}?',
      paragraphs: [],
      photoKey: 'website_reason',
      visitKey: 'Website Reason',
      showNextDestination: true,
      choices: [
        { label: 'Tell me more about you personally', toPassage: 'personal-dossier-1' },
        { label: 'Tell me how you approach challenges', toPassage: 'my-approach-1' },
        { label: 'Back to The Core', toPassage: 'the-core' },
      ],
    },

    /* ──────────────────────────────────────────── */
    /* PERSONAL DOSSIER                             */
    /* ──────────────────────────────────────────── */

    'personal-dossier-1': {
      sceneLabel: 'Personal Dossier',
      title: 'Personal Dossier',
      prompt: '*classified: OPERATIVE PROFILE*',
      paragraphs: [
        '== IDENTITY ==\nName: Joshua Garst\nLocation: Bentonville, Arkansas\nStatus: Married. Large extended family.',
        '== SPECIALIZATION ==\nFull-stack software engineer by day. Regenerative homesteader by evening and weekend.',
      ],
      photoKey: 'personal_dossier',
      choices: [{ label: 'Tap to continue', toPassage: 'personal-dossier-2' }],
    },

    'personal-dossier-2': {
      sceneLabel: 'Personal Dossier',
      title: 'Personal Dossier',
      prompt: '== OFF-DUTY INTERESTS ==',
      paragraphs: [
        'Home base is a suburban spot in Centerton, Northwest Arkansas. Outside of tech I help my grandpa with his orchard in Gravette — the Non-Tech Career section has the full rundown of the outdoor work.',
        'The rest of my off-hours: PC gaming on a self-built rig. 3D printing. Home Assistant smart home I wired up myself. Solar and EV tech. Volunteer production coordinator at my church (sound, lighting, cameras, slides).',
      ],
      photoKey: 'personal_dossier',
      choices: [{ label: 'Tap to continue', toPassage: 'personal-dossier-3' }],
    },

    'personal-dossier-3': {
      sceneLabel: 'Personal Dossier',
      title: 'Personal Dossier',
      prompt: '== CORE PHILOSOPHY ==\nBuild things that last. Understand how they work. Do not outsource your own competence.',
      paragraphs: ['Where to next{NAME_COMMA}?'],
      photoKey: 'personal_dossier',
      visitKey: 'Personal Dossier',
      showNextDestination: true,
      choices: [
        { label: 'See my tech stack', toPassage: 'my-stack-1' },
        { label: 'See my non-tech career', toPassage: 'nontech-career-1' },
        { label: 'Back to The Core', toPassage: 'the-core' },
      ],
    },

    /* ──────────────────────────────────────────── */
    /* TECH CAREER                                  */
    /* ──────────────────────────────────────────── */

    'tech-career-1': {
      sceneLabel: 'Tech Career',
      title: 'Tech Career',
      prompt: '*loading career log // chapter 1*',
      paragraphs: [
        'I started at Sharp Hue in February 2023 as an apprentice. Three months in, they converted me to full-time. Since then I have been promoted twice and I am on track for Dev III this summer.',
        'Sharp Hue is a small consultancy in Fayetteville, which means I do not get to hide behind a title. I scope projects with clients, make the architectural calls, ship the code, and mentor the developers behind me. On any given day I am part engineer, part project manager, part technical consultant.',
      ],
      photoKey: 'tech_career',
      choices: [{ label: 'Tap to continue', toPassage: 'tech-career-2' }],
    },

    'tech-career-2': {
      sceneLabel: 'Tech Career',
      title: 'Tech Career',
      prompt: '*chapter 2 // the work*',
      paragraphs: [
        'The project I am proudest of: a high-traffic web and mobile app was throwing over 5,000 errors in Application Insights from SQL connection pool exhaustion. I refactored the synchronous write path into an Azure Function App fronted by a queue. Poison queue for retries. Errors went from 5,000+ to zero.',
        'The project that taught me the most: migrating legacy WebForms apps to .NET 9. Stateful to stateless, ViewState to Razor Pages. It is unglamorous work but it is where you learn what actually matters about a codebase.',
        'Across three years I have shipped 50+ production features end to end across 15+ client accounts.',
      ],
      photoKey: 'tech_career',
      choices: [{ label: 'Tap to continue', toPassage: 'tech-career-3' }],
    },

    'tech-career-3': {
      sceneLabel: 'Tech Career',
      title: 'Tech Career',
      prompt: "*chapter 3 // what's next*",
      paragraphs: [
        'Right now I am focused on leveling up at Sharp Hue — going deeper on architecture, Azure, and owning more of the complex client work end to end. On the side I keep a rotation of personal projects going to stretch into new stacks and keep my fundamentals sharp.',
        'Where to next{NAME_COMMA}?',
      ],
      photoKey: 'tech_career',
      visitKey: 'Tech Career',
      showNextDestination: true,
      choices: [
        { label: 'Grab the resume', toPassage: 'resume-1' },
        { label: 'See my projects', toPassage: 'projects-1' },
        { label: 'Back to The Core', toPassage: 'the-core' },
      ],
    },

    /* ──────────────────────────────────────────── */
    /* NON-TECH CAREER                              */
    /* ──────────────────────────────────────────── */

    'nontech-career-1': {
      sceneLabel: 'Non-Tech Career',
      title: 'Non-Tech Career',
      prompt: '*loading non-tech operations log // chapter 1*',
      paragraphs: [
        'Tech is only half of what I do. The other half runs on dirt, wiring, and wood.',
        'My home base is a suburban property in Centerton, Northwest Arkansas. I also help my grandpa with his orchard in Gravette — it is his place, still very much his, and I am the extra set of hands learning everything I can while I help him work it.',
      ],
      photoKey: 'nontech_career',
      choices: [{ label: 'Tap to continue', toPassage: 'nontech-career-2' }],
    },

    'nontech-career-2': {
      sceneLabel: 'Non-Tech Career',
      title: 'Non-Tech Career',
      prompt: '*chapter 2 // what I actually do out there*',
      paragraphs: [
        "In 2026 I helped my grandpa replant a chunk of his orchard: fourteen grafted trees on MM.111 rootstock, seven disease-resistant scion varieties from Cummins Nursery. All based on Guy Ames's neglect-trial data from NCAT/ATTRA.",
        'At my own place: a backyard organic garden we are slowly expanding, and plans on the board for a greenhouse and a DIY ground-mount solar array down the road. Chickens, ducks, and goats are planned but not on the property yet.',
        'I also volunteer as production coordinator at my church. Sound, lighting, slides, cameras. Running live events with real stakes and real people is some of the best project management training you can get.',
      ],
      photoKey: 'nontech_career',
      choices: [{ label: 'Tap to continue', toPassage: 'nontech-career-3' }],
    },

    'nontech-career-3': {
      sceneLabel: 'Non-Tech Career',
      title: 'Non-Tech Career',
      prompt: '*chapter 3 // why it matters*',
      paragraphs: [
        'The same brain that debugs a SQL connection pool also debugs a drip irrigation system. Systems thinking is systems thinking. I am the kind of engineer who believes the best software is built by people who have also built real, physical things.',
        'Also, I am really good at problem-solving without a Stack Overflow tab open.',
        'Where to next{NAME_COMMA}?',
      ],
      photoKey: 'nontech_career',
      visitKey: 'non-tech Career',
      showNextDestination: true,
      choices: [
        { label: 'See my Personal Dossier', toPassage: 'personal-dossier-1' },
        { label: 'See my tech career', toPassage: 'tech-career-1' },
        { label: 'Back to The Core', toPassage: 'the-core' },
      ],
    },

    /* ──────────────────────────────────────────── */
    /* MY STACK                                     */
    /* ──────────────────────────────────────────── */

    'my-stack-1': {
      sceneLabel: 'My Stack',
      title: 'My Stack',
      prompt: '*loading equipment manifest // primary*',
      paragraphs: [
        '== PRIMARY LOADOUT ==\nC# // .NET (Framework 4.5 through 9) // ASP.NET // Razor Pages // React',
        'These are the tools I reach for first. Three years of production experience shipping C# and .NET on Azure. React trained at General Assembly and reinforced on every side project since.',
      ],
      photoKey: 'my_stack',
      choices: [{ label: 'Tap to continue', toPassage: 'my-stack-2' }],
    },

    'my-stack-2': {
      sceneLabel: 'My Stack',
      title: 'My Stack',
      prompt: '*secondary arsenal*',
      paragraphs: [
        '== SECONDARY ==\nJavaScript (ES6+) // TypeScript // Node.js // Express // Python // PHP',
        '== CLOUD AND DEVOPS ==\nMicrosoft Azure (App Services, Function Apps) // Application Insights // Azure DevOps CI/CD',
        '== DATA ==\nSQL Server // PostgreSQL // MongoDB // Entity Framework // SQLite',
        '== DAILY TOOLS ==\nGit // Visual Studio // VS Code // Postman // Swagger // Cursor // Claude Code // LM Studio',
      ],
      photoKey: 'my_stack',
      choices: [{ label: 'Tap to continue', toPassage: 'my-stack-3' }],
    },

    'my-stack-3': {
      sceneLabel: 'My Stack',
      title: 'My Stack',
      prompt: '*game dev and what I am learning next*',
      paragraphs: [
        '== GAME DEV ==\nUnity // C# scripting // low-poly asset pipelines',
        '== LEARNING NEXT ==\nUnity networking and multiplayer patterns. Deeper Rust. Shader programming.',
        'Where to next{NAME_COMMA}?',
      ],
      photoKey: 'my_stack',
      visitKey: 'My Stack',
      showNextDestination: true,
      choices: [
        { label: 'See the projects I built with this stack', toPassage: 'projects-1' },
        { label: 'See my career log', toPassage: 'tech-career-1' },
        { label: 'Back to The Core', toPassage: 'the-core' },
      ],
    },

    /* ──────────────────────────────────────────── */
    /* MY CONTACT                                   */
    /* ──────────────────────────────────────────── */

    'my-contact-1': {
      sceneLabel: 'My Contact',
      title: 'My Contact',
      prompt: '*opening direct channel*',
      paragraphs: [
        'The easiest way to reach me:',
        'Email: joshuagarst@gmail.com\nLocation: Bentonville, Arkansas',
        'I read every message.',
      ],
      photoKey: 'my_contact',
      choices: [{ label: 'Tap to continue', toPassage: 'my-contact-2' }],
    },

    'my-contact-2': {
      sceneLabel: 'My Contact',
      title: 'My Contact',
      prompt: '*who I like hearing from*',
      paragraphs: [
        'Fellow devs who want to trade notes on .NET, React, or regenerative agriculture (yes, really).',
        'People with weird project ideas. I love weird project ideas.',
        'And if you are local to Northwest Arkansas and want to meet up, I am in.',
      ],
      photoKey: 'my_contact',
      choices: [{ label: 'Tap to continue', toPassage: 'my-contact-3' }],
    },

    'my-contact-3': {
      sceneLabel: 'My Contact',
      title: 'My Contact',
      prompt: '*response time*',
      paragraphs: [
        'I read email within a day and reply within two. LinkedIn DMs also work if you prefer.',
        'Where to next{NAME_COMMA}?',
      ],
      photoKey: 'my_contact',
      visitKey: 'My Contact',
      showNextDestination: true,
      choices: [
        { label: 'See my LinkedIn', toPassage: 'linkedin-1' },
        { label: 'See my GitHub', toPassage: 'github-1' },
        { label: 'Back to The Core', toPassage: 'the-core' },
      ],
    },

    /* ──────────────────────────────────────────── */
    /* CONTACT ME (standalone shortcut)             */
    /* ──────────────────────────────────────────── */

    'contact-me': {
      sceneLabel: 'Contact',
      title: 'Contact',
      prompt: '*direct channel open*',
      paragraphs: [
        'Email: joshuagarst@gmail.com\nLinkedIn: linkedin.com/in/joshua-garst\nGitHub: github.com/testler',
        'Based in Bentonville, Arkansas.',
      ],
      photoKey: 'my_contact',
      choices: [{ label: 'Back to The Core', toPassage: 'the-core' }],
    },

    /* ──────────────────────────────────────────── */
    /* LINKEDIN                                     */
    /* ──────────────────────────────────────────── */

    'linkedin-1': {
      sceneLabel: 'LinkedIn',
      title: 'LinkedIn',
      prompt: '*redirecting to external profile*',
      paragraphs: [
        'My LinkedIn profile lives here: linkedin.com/in/joshua-garst',
        'Full work history, recommendations, and the credentials recruiters want to see.',
      ],
      photoKey: 'linkedin',
      choices: [
        { label: 'Open LinkedIn', href: 'https://linkedin.com/in/joshua-garst' },
        { label: 'Tap to continue', toPassage: 'linkedin-2' },
      ],
    },

    'linkedin-2': {
      sceneLabel: 'LinkedIn',
      title: 'LinkedIn',
      prompt: '*why I keep it current*',
      paragraphs: [
        'I treat LinkedIn like a professional front door: updated regularly, connection requests accepted from actual humans, messages answered within a day or two.',
        'If you reached out there and I missed you, try again. Sometimes the notifications eat things.',
      ],
      photoKey: 'linkedin',
      choices: [{ label: 'Tap to continue', toPassage: 'linkedin-3' }],
    },

    'linkedin-3': {
      sceneLabel: 'LinkedIn',
      title: 'LinkedIn',
      prompt: '*alternatives*',
      paragraphs: ['If LinkedIn is not your speed:'],
      photoKey: 'linkedin',
      visitKey: 'LinkedIn',
      showNextDestination: true,
      choices: [
        { label: 'Just contact me directly', toPassage: 'contact-me' },
        { label: 'See my GitHub instead', toPassage: 'github-1' },
        { label: 'Back to The Core', toPassage: 'the-core' },
      ],
    },

    /* ──────────────────────────────────────────── */
    /* GITHUB                                       */
    /* ──────────────────────────────────────────── */

    'github-1': {
      sceneLabel: 'GitHub',
      title: 'GitHub',
      prompt: '*redirecting to code archive*',
      paragraphs: [
        'All my public code lives here: github.com/testler',
        'Browse at your leisure. Some of it is polished, some of it is experimental, all of it is mine.',
      ],
      photoKey: 'github',
      choices: [
        { label: 'Open GitHub', href: 'https://github.com/testler' },
        { label: 'Tap to continue', toPassage: 'github-2' },
      ],
    },

    'github-2': {
      sceneLabel: 'GitHub',
      title: 'GitHub',
      prompt: '*featured repositories*',
      paragraphs: ['If you want my write-ups on these, check the Projects section.'],
      photoKey: 'github',
      choices: [
        { label: 'CyberDefense — Tower defense game', href: 'https://github.com/testler/CyberDefense' },
        { label: 'Date Night Organizer — Node/Mongo web app', href: 'https://github.com/testler/DateNightOrganizer' },
        { label: 'Movie App — React + Express team project', href: 'https://github.com/testler/movieApp' },
        { label: 'The Cube — 3D browser experiment', href: 'https://github.com/testler/the-cube' },
        { label: 'Tap to continue', toPassage: 'github-3' },
      ],
    },

    'github-3': {
      sceneLabel: 'GitHub',
      title: 'GitHub',
      prompt: '*commit style*',
      paragraphs: [
        'I write honest commit messages. No "fix stuff" or "update files." My git history is readable, my branches get deleted after merge, and I rebase when it makes the history cleaner.',
        'A clean history tells a consistent story. I like joining codebases where someone cared about that, so I try to leave mine that way.',
      ],
      photoKey: 'github',
      visitKey: 'GitHub',
      showNextDestination: true,
      choices: [
        { label: 'See project write-ups', toPassage: 'projects-1' },
        { label: 'Grab my resume', toPassage: 'resume-1' },
        { label: 'Back to The Core', toPassage: 'the-core' },
      ],
    },

    /* ──────────────────────────────────────────── */
    /* RESUME                                       */
    /* ──────────────────────────────────────────── */

    'resume-1': {
      sceneLabel: 'Resume',
      title: 'Resume',
      prompt: '*generating document*',
      paragraphs: ['Grab my resume below. PDF or Word doc — whichever one works for you.'],
      photoKey: 'resume',
      choices: [{ label: 'Tap to continue', toPassage: 'resume-3' }],
    },

    'resume-3': {
      sceneLabel: 'Resume',
      title: 'Resume',
      prompt: '*if you prefer the site version*',
      paragraphs: ['The whole resume is also spread across this site in interactive form:'],
      photoKey: 'resume',
      visitKey: 'Resume',
      showNextDestination: true,
      choices: [
        { label: 'See my tech career log', toPassage: 'tech-career-1' },
        { label: 'See my tech stack', toPassage: 'my-stack-1' },
        { label: 'See my projects', toPassage: 'projects-1' },
        { label: 'Back to The Core', toPassage: 'the-core' },
      ],
    },

    /* ──────────────────────────────────────────── */
    /* ENDING (dispatched by visit count)           */
    /* ──────────────────────────────────────────── */

    ending: {
      sceneLabel: 'Signal Detected',
      title: 'Signal Detected',
      prompt: '*signal detected // routing transmission*',
      paragraphs: [],
      photoKey: 'ending',
      isEnding: true,
      choices: [],
    },
  },
};

export const DESTINATION_KEYS = [
  'Press Start',
  'Resume',
  'LinkedIn',
  'GitHub',
  'Projects',
  'Tech Career',
  'non-tech Career',
  'Website Reason',
  'My Contact',
  'Personal Dossier',
  'My Approach',
  'My Stack',
];

export const DESTINATION_TO_PASSAGE = {
  'Press Start': 'press-start',
  Resume: 'resume-1',
  LinkedIn: 'linkedin-1',
  GitHub: 'github-1',
  Projects: 'projects-1',
  'Tech Career': 'tech-career-1',
  'non-tech Career': 'nontech-career-1',
  'Website Reason': 'website-reason-1',
  'My Contact': 'my-contact-1',
  'Personal Dossier': 'personal-dossier-1',
  'My Approach': 'my-approach-1',
  'My Stack': 'my-stack-1',
};

export default STORY_MAP;
