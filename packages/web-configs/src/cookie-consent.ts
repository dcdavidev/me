/* eslint-disable @cspell/spellchecker */
import type { CookieConsentConfig } from 'vanilla-cookieconsent';

export const consentConfig: CookieConsentConfig = {
  revision: 1,

  disablePageInteraction: true,
  guiOptions: {
    consentModal: {
      layout: 'box inline',
      position: 'middle center',
      equalWeightButtons: true,
      flipButtons: false,
    },
    preferencesModal: {
      layout: 'box',
      position: 'right',
      equalWeightButtons: true,
      flipButtons: false,
    },
  },
  categories: {
    necessary: {
      readOnly: true,
    },
    functionality: {},
  },
  language: {
    default: 'en',
    autoDetect: 'browser',
    translations: {
      en: {
        consentModal: {
          title: "Hello traveller, it's cookie time!",
          description:
            'We use cookies to ensure you get the best experience on our website. Some are necessary for the site to function, while others help us improve your experience.',
          acceptAllBtn: 'Accept all',
          acceptNecessaryBtn: 'Reject all',
          showPreferencesBtn: 'Manage preferences',
          footer:
            '<a href="/privacy">Privacy Policy</a>\n<a href="#link">Terms and conditions</a>',
        },
        preferencesModal: {
          title: 'Consent Preferences Center',
          acceptAllBtn: 'Accept all',
          acceptNecessaryBtn: 'Reject all',
          savePreferencesBtn: 'Save preferences',
          closeIconLabel: 'Close modal',
          serviceCounterLabel: 'Service|Services',
          sections: [
            {
              title: 'Cookie Usage',
              description:
                'We use cookies to ensure the basic functionalities of the website and to enhance your online experience. You can choose for each category to opt-in/out whenever you want.',
            },
            {
              title:
                'Strictly Necessary Cookies <span class="pm__badge">Always Enabled</span>',
              description:
                'These cookies are essential for the proper functioning of my website. Without these cookies, the website would not work properly.',
              linkedCategory: 'necessary',
            },
            {
              title: 'Functionality Cookies',
              description:
                'These cookies allow the website to remember the choices you have made in the past.',
              linkedCategory: 'functionality',
            },
            {
              title: 'More information',
              description:
                'For any query in relation to my policy on cookies and your choices, please <a class="cc__link" href="§/contact-me">contact me</a>.',
            },
          ],
        },
      },
      it: {
        consentModal: {
          title: 'Ciao viaggiatore, è tempo di biscotti!',
          description:
            'Utilizziamo i cookie per assicurarti la migliore esperienza sul nostro sito web. Alcuni sono necessari per il funzionamento del sito, mentre altri ci aiutano a migliorare la tua esperienza.',
          acceptAllBtn: 'Accetta tutto',
          acceptNecessaryBtn: 'Rifiuta tutto',
          showPreferencesBtn: 'Gestisci preferenze',
          footer:
            '<a href="/privacy">Informativa sulla privacy</a>\n<a href="#link">Termini e condizioni</a>',
        },
        preferencesModal: {
          title: 'Centro preferenze per il consenso',
          acceptAllBtn: 'Accetta tutto',
          acceptNecessaryBtn: 'Rifiuta tutto',
          savePreferencesBtn: 'Salva le preferenze',
          closeIconLabel: 'Chiudi la finestra',
          serviceCounterLabel: 'Servizi',
          sections: [
            {
              title: 'Utilizzo dei Cookie',
              description:
                'Utilizziamo i cookie per garantire le funzionalità di base del sito web e per migliorare la tua esperienza online. Puoi scegliere per ogni categoria di attivare/disattivare i cookie quando vuoi.',
            },
            {
              title:
                'Cookie Strettamente Necessari <span class="pm__badge">Sempre Attivati</span>',
              description:
                'Questi cookie sono essenziali per il corretto funzionamento del mio sito web. Senza questi cookie, il sito web non funzionerebbe correttamente.',
              linkedCategory: 'necessary',
            },
            {
              title: 'Cookie di Funzionalità',
              description:
                'Questi cookie permettono al sito web di ricordare le scelte che hai fatto in passato.',
              linkedCategory: 'functionality',
            },
            {
              title: 'Ulteriori informazioni',
              description:
                'Per qualsiasi domanda relativa alla mia politica sui cookie e alle tue scelte, <a class="cc__link" href="/contact-me">contattami</a>.',
            },
          ],
        },
      },
    },
  },
};
