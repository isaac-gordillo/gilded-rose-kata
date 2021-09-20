import { Item, Quality, SellIn } from './item';

export class AgedBrieItem extends Item {
  constructor(sellIn: SellIn, quality: Quality) {
    super(sellIn, quality);
  }
  update(): void {
    this.sellIn.decrease(1);
    this.quality.increase(1);
  }
}
