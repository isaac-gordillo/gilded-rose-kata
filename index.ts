mocha.checkLeaks();
mocha.setup('bdd');

(async function () {
  await import('./gilded-rose.spec');
  await import('./items/item.spec');

  mocha.run();
})();
