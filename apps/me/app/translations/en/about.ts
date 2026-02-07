export default {
  mission: {
    title: 'My Mission',
    desc: `To bring wonderful ideas to life by simplifying the workflow and eliminating chaos,
ensuring a smooth developer experience through clean, robust code.`,
  },
  sections: [
    {
      id: 0,
      title: 'Full-Stack Development & Software Engineering',
      content: `I transform abstract concepts into tangible, high-performance digital products by
leveraging the full power of the TypeScript ecosystem. My expertise spans building dynamic
user interfaces with React.js and robust backend logic using Node.js and Express.js.
I don't just write code that works; I prioritize "Clean Code" principles to ensure every
component is modular, testable, and maintainable. By bridging the gap between elegant
design and complex technical functionality, I deliver software that is resilient, scalable,
and ready to evolve alongside business needs without accumulating technical debt.`,
    },
    {
      id: 1,
      title: 'Process Automation & Developer Experience (DX)',
      content: `My core mission is to eliminate chaos from the development lifecycle. I deeply
understand that friction kills productivity, which is why I dedicate myself to building
custom internal tools, CLIs, and automation scripts that streamline daily workflows.
I design and implement rigorous CI/CD pipelines to ensure code moves from development to
testing and production without manual errors or bottlenecks. My ultimate goal is to create
a "smooth developer experience" where I (and the team) can focus purely on solving business
problems and innovating, rather than fighting with configuration or repetitive tasks.`,
    },
    {
      id: 2,
      title: 'Scalable Server Architecture & Production Management',
      content: `Writing the code is only half the battle; ensuring it runs reliably in the real
world is where I truly take ownership. I design scalable server architectures capable of
handling high loads, optimizing the performance of my Node.js applications for maximum
efficiency. I actively manage deployment strategies and production environments, monitoring
stability and security around the clock. By making conscious architectural choices and
maintaining rigorous standards for infrastructure, I ensure that our "wonderful ideas"
remain online, performant, and accessible to users at all times.`,
    },
  ],
} as const;
