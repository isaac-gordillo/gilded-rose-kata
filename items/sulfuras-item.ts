import { Item, Quality, SellIn } from './item';

export class SufurasItem extends Item {
  constructor() {
    super(new SellIn(0), new Quality(Quality.MAX_VALUE));
  }
  update(): void {}
}
