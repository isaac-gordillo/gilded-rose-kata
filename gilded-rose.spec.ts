import { expect } from 'chai';
import { GildedRose } from './gilded-rose';
import { AgedBrieItem } from './items/aged-brie-item';
import { BackStagePassItem } from './items/back-stage-pass-item';
import { ConjuredItem } from './items/conjured-item';
import { Quality, SellIn } from './items/item';
import { StandardItem } from './items/standard-item';

describe('GildedRose', () => {
  let gildedRose: GildedRose;

  beforeEach(() => {
    gildedRose = new GildedRose([]);
  });

  describe('when update the quality of the items', () => {
    describe('and is a standard item', () => {
      describe('and the sell date has not expired', () => {
        it('should decrease both "sellIn" and "qualily" values in one', () => {
          gildedRose = new GildedRose([getStandardItemNotExpired()]);
          const expectedSellInValue =
            gildedRose.getItems()[0].getSellInValue() - 1;
          const expectedQualityValue =
            gildedRose.getItems()[0].getQualityValue() - 1;

          gildedRose.updateQuality();
          const updatedStandardItem = gildedRose.getItems()[0];

          expect(updatedStandardItem.getSellInValue()).equals(
            expectedSellInValue
          );
          expect(updatedStandardItem.getQualityValue()).equals(
            expectedQualityValue
          );
        });
      });

      describe('and the sell date has expired', () => {
        it('should decrease the qualily twice as fast', () => {
          gildedRose = new GildedRose([getStandardItemExpired()]);
          const qualityValue = gildedRose.getItems()[0].getQualityValue();
          const expectedQuality = qualityValue - 2;
          gildedRose.updateQuality();

          const updatedStandardItem = gildedRose.getItems()[0];

          expect(updatedStandardItem.getQualityValue()).to.equal(
            expectedQuality
          );
        });
      });
    });
    describe('and is an AgedBrieItem', () => {
      it('should increase the qualily value and decrease de sellIn value', () => {
        const agedBrieItem = getAgedBrieItemExpired();
        gildedRose = new GildedRose([agedBrieItem]);
        const expectedQuality = agedBrieItem.getQualityValue() + 1;
        const expectedSellIn = agedBrieItem.getSellInValue() - 1;

        gildedRose.updateQuality();

        const updatedAgedBrieItem = gildedRose.getItems()[0];

        expect(updatedAgedBrieItem.getQualityValue()).to.be.equal(
          expectedQuality
        );

        expect(updatedAgedBrieItem.getSellInValue()).to.be.equal(
          expectedSellIn
        );
      });
    });
    describe('and is a BackStagePasses', () => {
      describe('and the sell date has not expired', () => {
        it('should increase qualily in one if sellIn is greater than 10 days', () => {
          const sellIn = new SellIn(20);
          const qualily = new Quality(15);
          const backStagePass = new BackStagePassItem(sellIn, qualily);

          const expectedSellIn = sellIn.getValue() - 1;
          const expectedQuality = qualily.getValue() + 1;

          gildedRose = new GildedRose([backStagePass]);

          gildedRose.updateQuality();

          const updatedBackStagePassItem = gildedRose.getItems()[0];

          expect(updatedBackStagePassItem.getSellInValue()).to.be.equal(
            expectedSellIn
          );
          expect(updatedBackStagePassItem.getQualityValue()).to.be.equal(
            expectedQuality
          );
        });

        it('should increase qualily in two if sellIn is between 10 and 6 days ', () => {
          const sellIn = new SellIn(9);
          const qualily = new Quality(15);
          const backStagePass = new BackStagePassItem(sellIn, qualily);

          const expectedSellIn = sellIn.getValue() - 1;
          const expectedQuality = qualily.getValue() + 2;

          gildedRose = new GildedRose([backStagePass]);

          gildedRose.updateQuality();

          const updatedBackStagePassItem = gildedRose.getItems()[0];

          expect(updatedBackStagePassItem.getSellInValue()).to.be.equal(
            expectedSellIn
          );
          expect(updatedBackStagePassItem.getQualityValue()).to.be.equal(
            expectedQuality
          );
        });

        it('should increase qualily in 3 if sellIn is between 5 and 1 days ', () => {
          const sellIn = new SellIn(4);
          const qualily = new Quality(15);
          const backStagePass = new BackStagePassItem(sellIn, qualily);

          const expectedSellIn = sellIn.getValue() - 1;
          const expectedQuality = qualily.getValue() + 3;

          gildedRose = new GildedRose([backStagePass]);

          gildedRose.updateQuality();

          const updatedBackStagePassItem = gildedRose.getItems()[0];

          expect(updatedBackStagePassItem.getSellInValue()).to.be.equal(
            expectedSellIn
          );
          expect(updatedBackStagePassItem.getQualityValue()).to.be.equal(
            expectedQuality
          );
        });

        it('should drops to 0 qualily value if the sell date has expired ', () => {
          const sellIn = new SellIn(0);
          const qualily = new Quality(15);
          const backStagePass = new BackStagePassItem(sellIn, qualily);

          const expectedSellIn = sellIn.getValue() - 1;
          const expectedQuality = 0;

          gildedRose = new GildedRose([backStagePass]);

          gildedRose.updateQuality();

          const updatedBackStagePassItem = gildedRose.getItems()[0];

          expect(updatedBackStagePassItem.getSellInValue()).to.be.equal(
            expectedSellIn
          );
          expect(updatedBackStagePassItem.getQualityValue()).to.be.equal(
            expectedQuality
          );
        });
      });
    });
    describe('and is a ConjuredItem', () => {
      describe('and the sell date has not expired', () => {
        it('should decrease both "sellIn" and "qualily" values in two', () => {
          const sellIn = new SellIn(10);
          const qualily = new Quality(20);
          const conjuredItem = new ConjuredItem(sellIn, qualily);
          gildedRose = new GildedRose([conjuredItem]);

          const expectedSellIn = conjuredItem.getSellInValue() - 1;
          const expectedQuality = conjuredItem.getQualityValue() - 2;

          gildedRose.updateQuality();

          const updatedConjuredItem = gildedRose.getItems()[0];

          expect(updatedConjuredItem.getSellInValue()).to.be.equal(
            expectedSellIn
          );

          expect(updatedConjuredItem.getQualityValue()).to.be.equal(
            expectedQuality
          );
        });

        describe('and the sell date has expired', () => {
          it('should decrease the qualily twice as fast', () => {
            const expiredSellIn = new SellIn(-1);
            const qualily = new Quality(20);
            const expiredConjuredItem = new ConjuredItem(
              expiredSellIn,
              qualily
            );
            gildedRose = new GildedRose([expiredConjuredItem]);

            const expectedSellIn = expiredConjuredItem.getSellInValue() - 1;
            const expectedQuality = expiredConjuredItem.getQualityValue() - 4;

            gildedRose.updateQuality();

            const updatedConjuredItem = gildedRose.getItems()[0];

            expect(updatedConjuredItem.getSellInValue()).to.be.equal(
              expectedSellIn
            );

            expect(updatedConjuredItem.getQualityValue()).to.be.equal(
              expectedQuality
            );
          });
        });
      });
    });
    describe('and is a SufurasItem', () => {
      const sulfurasItem = '';
    });
  });

  function getStandardItemNotExpired() {
    const sellIn = new SellIn(5);
    const quality = new Quality(10);
    return new StandardItem(sellIn, quality);
  }

  function getStandardItemExpired() {
    const sellIn = new SellIn(0);
    const quality = new Quality(10);
    return new StandardItem(sellIn, quality);
  }

  function getAgedBrieItemExpired() {
    const sellIn = new SellIn(10);
    const quality = new Quality(10);
    return new AgedBrieItem(sellIn, quality);
  }
});
