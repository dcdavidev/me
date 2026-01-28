/* eslint-disable @cspell/spellchecker */
export default {
  common: {
    actions: {
      back_to_top: 'Torna su',
    },
    nav: {
      home: 'Home',
      about: 'Chi sono',
      contact: 'Cotattami',
      tech_stack: 'Tech Stack',
      cookie_pref: 'Preferenze Cookie',
    },
    footer: {
      vat: 'P.IVA {{vat}}',
      source_code: 'Vedi il codice sorgente su',
    },
  },
  error: {
    generic_title: 'Errore',
    oops: 'Ops!',
    unexpected: 'Si è verificato un errore imprevisto.',
    not_found_title: '404',
    not_found_desc: 'La pagina richiesta non è stata trovata.',
    details: 'Dettagli errore',
  },
} as const;
