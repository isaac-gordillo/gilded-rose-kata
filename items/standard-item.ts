import { Item, Quality, SellIn } from './item';

export class StandardItem extends Item {
  constructor(sellIn: SellIn, quality: Quality) {
    super(sellIn, quality);
  }

  update(): void {
    this.decreaseSellInValue();
    this.isExpired()
      ? this.quality.decrease(this.QUALITY_DECREASE_VALUE * 2)
      : this.quality.decrease(this.QUALITY_DECREASE_VALUE);
  }
}
