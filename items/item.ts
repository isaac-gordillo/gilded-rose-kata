export abstract class Item {
  protected sellIn: SellIn;
  protected quality: Quality;
  protected QUALITY_DECREASE_VALUE = 1;
  constructor(sellIn: SellIn, quality: Quality) {
    this.sellIn = sellIn;
    this.quality = quality;
  }

  protected decreaseSellInValue() {
    this.sellIn.decrease(1);
  }

  public getSellInValue(): number {
    return this.sellIn.getValue();
  }

  public getQualityValue(): number {
    return this.quality.getValue();
  }

  public isExpired(): boolean {
    return this.sellIn.getValue() < 0 ? true : false;
  }

  abstract update(): void;
}

export class SellIn {
  public static readonly INFINITE_VALUE = 999999;

  private value: number;

  constructor(value: number) {
    this.value = value;
  }

  public getValue(): number {
    return this.value;
  }

  public decrease(number) {
    this.value -= number;
  }
}

export class Quality {
  public static readonly MAX_VALUE = 50;
  public static readonly MIN_VALUE = 0;

  private value: number;

  constructor(value: number) {
    this.value = this.getValidValue(value);
  }

  public getValue() {
    return this.value;
  }

  public decrease(number) {
    if (this.value > Quality.MIN_VALUE) {
      this.value -= number;
    }
  }

  public setMinimumValue() {
    this.value = Quality.MIN_VALUE;
  }

  public increase(number) {
    if (this.value < Quality.MAX_VALUE) {
      this.value += number;
    }
  }

  private getValidValue(value: number): number {
    if (value > Quality.MAX_VALUE) {
      return Quality.MAX_VALUE;
    }

    if (value < Quality.MIN_VALUE) {
      return Quality.MIN_VALUE;
    }

    return value;
  }
}
