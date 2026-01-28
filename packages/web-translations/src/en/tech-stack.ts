export default {
  title: 'Tech Stack',
  subtitle: 'the ecosystem powering my development workflow',

  sections: [
    {
      id: 'typescript',
      title: 'Typescript',
      subtitle: 'The Foundation of Stability',
      content: `TypeScript is a strongly typed superset of JavaScript. I use it as my
non-negotiable standard because it eliminates chaos before it happens. By
enforcing static typing, it prevents runtime errors and ensures that my code is self-documenting,
scalable, and easy to refactor without fear of breaking the build.`,
    },
    {
      id: 'react',
      title: 'React.js',
      subtitle: 'Modular Frontend Architecture',
      content: `React is a library for building user interfaces based on components.
I choose React for its ability to break down complex UIs into reusable, isolated pieces.
This modular approach allows me to manage application state efficiently and deliver a responsive,
seamless user experience without creating spaghetti code.`,
    },
    {
      id: 'node',
      title: 'Node.js',
      subtitle: 'High-Performance Runtime',
      content: `Node.js is a JavaScript runtime built on Chrome's V8 engine.
It allows me to unify the tech stack, using the same language for both frontend and backend.
I rely on its non-blocking, event-driven architecture to build scalable network applications
that can handle high throughput with low latency.`,
    },
    {
      id: 'express',
      title: 'Express.js',
      subtitle: 'Robust Backend Logic',
      content: `Express is a minimal and flexible Node.js web application framework.
I use it to structure my server-side logic and build robust RESTful APIs.
Its simplicity gives me full control over the architecture,
allowing me to design custom endpoints and middleware pipelines
that fit the specific needs of the project without unnecessary overhead.`,
    },
    {
      id: 'reactrouter',
      title: 'React Router',
      subtitle: 'Seamless NAvigation & SEO',
      content: `React Router is the standard library for routing in React.
I utilize it to manage navigation and render dynamic views,
creating a fluid Single Page Application experience.
Crucially, I leverage its capabilities for Server-Side Rendering (SSR),
ensuring that my applications are not just fast, but also fully crawlable and SEO-friendly,
making content visible to search engines without compromising interactivity.`,
    },
    {
      id: 'docker',
      title: 'Docker',
      subtitle: 'Containerization & Consistency',
      content: `Docker is the open-source platform I use to containerize applications.
It allows me to package code with all its dependencies, ensuring absolute consistency between development,
testing, and production environments. By isolating services,
Docker eliminates the 'it works on my machine' problem and serves as the fundamental
building block for my automated deployment pipelines and scalable infrastructure.`,
    },
  ],
};
