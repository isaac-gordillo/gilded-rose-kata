mocha.checkLeaks();
mocha.setup('bdd');

(async function () {
  await import('./gilded-rose.spec');
  await import('./item.spec');

  mocha.run();
})();
