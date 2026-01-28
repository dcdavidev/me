import about from './about.js';
import common from './common.js';
import contactMe from './contact-me.js';
import error from './error.js';
import home from './home.js';
import techStack from './tech-stack.js';

export const it = {
  common,
  error,

  // routes
  home,
  about,
  'contact-me': contactMe,
  'tech-stack': techStack,
};
