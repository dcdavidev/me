/* eslint-disable @cspell/spellchecker */
export default {
  title: 'Stack Tecnologico',
  subtitle: "l'ecosistema che alimenta il mio flusso di lavoro",

  sections: [
    {
      id: 'typescript',
      title: 'Typescript',
      subtitle: 'Le Fondamenta della Stabilità',
      content: `TypeScript è un superset fortemente tipizzato di JavaScript. Lo uso come
standard non negoziabile perché elimina il caos prima che accada. Imponendo
la tipizzazione statica, previene errori a runtime e assicura che il mio codice sia auto-documentante,
scalabile e facile da rifattorizzare senza paura di rompere la build.`,
    },
    {
      id: 'react',
      title: 'React.js',
      subtitle: 'Architettura Frontend Modulare',
      content: `React è una libreria per costruire interfacce utente basate su componenti.
Scelgo React per la sua capacità di scomporre UI complesse in pezzi riutilizzabili e isolati.
Questo approccio modulare mi permette di gestire lo stato dell'applicazione in modo efficiente e fornire un'esperienza
utente reattiva e fluida senza creare codice spaghetti.`,
    },
    {
      id: 'node',
      title: 'Node.js',
      subtitle: 'Runtime ad Alte Prestazioni',
      content: `Node.js è un runtime JavaScript costruito sul motore V8 di Chrome.
Mi permette di unificare lo stack tecnologico, usando lo stesso linguaggio sia per il frontend che per il backend.
Mi affido alla sua architettura non bloccante e guidata dagli eventi per costruire applicazioni di rete scalabili
in grado di gestire un alto throughput con bassa latenza.`,
    },
    {
      id: 'express',
      title: 'Express.js',
      subtitle: 'Logica Backend Robusta',
      content: `Express è un framework per applicazioni web Node.js minimale e flessibile.
Lo uso per strutturare la logica lato server e costruire robuste API RESTful.
La sua semplicità mi dà il pieno controllo sull'architettura,
permettendomi di progettare endpoint personalizzati e pipeline middleware
che si adattano alle esigenze specifiche del progetto senza overhead non necessario.`,
    },
    {
      id: 'reactrouter',
      title: 'React Router',
      subtitle: 'Navigazione Fluida & SEO',
      content: `React Router è la libreria standard per il routing in React.
La utilizzo per gestire la navigazione e renderizzare viste dinamiche,
creando un'esperienza fluida da Single Page Application.
Fondamentalmente, sfrutto le sue capacità per il Server-Side Rendering (SSR),
assicurando che le mie applicazioni non siano solo veloci, ma anche completamente scansionabili e SEO-friendly,
rendendo i contenuti visibili ai motori di ricerca senza compromettere l'interattività.`,
    },
    {
      id: 'docker',
      title: 'Docker',
      subtitle: 'Containerizzazione & Coerenza',
      content: `Docker è la piattaforma open-source che uso per containerizzare le applicazioni.
Mi permette di pacchettizzare il codice con tutte le sue dipendenze, garantendo assoluta coerenza tra ambienti di sviluppo,
test e produzione. Isolando i servizi,
Docker elimina il problema 'funziona sulla mia macchina' e serve come blocco fondamentale
per le mie pipeline di deployment automatizzato e infrastruttura scalabile.`,
    },
  ],
};
