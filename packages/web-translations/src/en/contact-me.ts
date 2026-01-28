export default {
  title: 'Contact Me',
  subtitle:
    "Fill out the form below and I'll get back to you as soon as possible.",
  form: {
    name: {
      label: 'Name',
      placeholder: 'Your name',
    },
    email: {
      label: 'Email',
      placeholder: 'your@email.com',
    },
    message: {
      label: 'Message',
      placeholder: 'Hi, I wish to build something amazing...',
    },
    privacy: {
      label: 'I have read and agree to the',
      link: 'Privacy Policy',
    },
    submit: {
      default: 'Send Message',
      submitting: 'Sending...',
    },
    feedback: {
      CONTACT_SUCCESS:
        'Message sent successfully! I will get back to you soon.',
      CONTACT_INVALID_INPUT: 'Please fill in all the required fields.',
      CONTACT_SERVER_ERROR: 'Something went wrong. Please try again.',
      unknown: 'Something went wrong. Please try again.',
    },
  },
};
