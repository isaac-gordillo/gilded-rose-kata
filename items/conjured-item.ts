import { Item, Quality, SellIn } from './item';

export class ConjuredItem extends Item {
  protected readonly QUALITY_DECREASE_VALUE = 2;

  constructor(sellIn: SellIn, quality: Quality) {
    super(sellIn, quality);
  }

  update(): void {
    this.sellIn.decrease(1);

    this.isExpired()
      ? this.quality.decrease(this.QUALITY_DECREASE_VALUE * 2)
      : this.quality.decrease(this.QUALITY_DECREASE_VALUE);
  }
}
