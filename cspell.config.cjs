const { defineConfig } = require('@cspell/cspell-types');

module.exports = defineConfig({
  version: '0.2',
  import: ['cspell-config-spellbookx'],
  dictionaryDefinitions: [
    {
      name: 'custom-dict',
      path: './.config/cspell/dictionary.txt',
      addWords: true,
    },
    {
      name: 'italian-dict',
      path: './.config/cspell/ita.txt',
      addWords: true,
    },
  ],
  dictionaries: ['custom-dict', 'italian-dict'],
});
