/* eslint-disable @cspell/spellchecker */
export default {
  title: 'Contattami',
  subtitle: 'Compila il modulo qui sotto e ti risponderò il prima possibile.',
  form: {
    name: {
      label: 'Nome',
      placeholder: 'Il tuo nome',
    },
    email: {
      label: 'Email',
      placeholder: 'la@tuaemail.com',
    },
    message: {
      label: 'Messaggio',
      placeholder: 'Ciao, vorrei realizzare qualcosa di straordinario...',
    },
    privacy: {
      label: 'Ho letto e accetto la',
      link: 'Privacy Policy',
    },
    submit: {
      default: 'Invia Messaggio',
      loading: 'Invio...',
    },
    feedback: {
      CONTACT_SUCCESS:
        'Messaggio inviato con successo! Ti risponderò il prima possibile.',
      CONTACT_INVALID_INPUT: 'Per favore compila tutti i campi richiesti.',
      CONTACT_SERVER_ERROR: 'Qualcosa è andato storto. Riprova.',
      unknown: 'Qualcosa è andato storto. Riprova.',
    },
  },
};
