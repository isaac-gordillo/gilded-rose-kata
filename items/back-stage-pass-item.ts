import { Item, Quality, SellIn } from './item';

export class BackStagePassItem extends Item {
  // public static readonly DAYS_STANDARD_
  constructor(sellIn: SellIn, quality: Quality) {
    super(sellIn, quality);
  }
  update(): void {
    this.decreaseSellInValue();

    if (this.sellIn.getValue() <= 0) {
      this.quality.setMinimumValue();
      return;
    }

    if (this.sellIn.getValue() < 5) {
      this.quality.increase(3);
      return;
    }

    if (this.sellIn.getValue() < 10) {
      this.quality.increase(2);
      return;
    }

    if (this.sellIn.getValue() > 10) {
      this.quality.increase(1);
      return;
    }
  }
}
