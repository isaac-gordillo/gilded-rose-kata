import { Item, Quality, SellIn } from './item';

export class SulfurasItem extends Item {
  constructor() {
    super(new SellIn(SellIn.INFINITE_VALUE), new Quality(Quality.MAX_VALUE));
  }
  update(): void {}
}
