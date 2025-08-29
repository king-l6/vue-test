import { Expose } from 'class-transformer';
import dayjs from 'dayjs';

export class LargeMarket {
  id: string = '';

  star1: number = 0;

  star2: number = 0;

  star3: number = 0;

  star4: number = 0;

  star5: number = 0;
  get stars() {
    return this.star1 + '' + this.star2 + this.star3 + this.star4 + this.star5;
  }

  @Expose({ name: 'stock_name' })
  stockName: string = '';

  @Expose({ name: 'create_time' })
  create_time: string = '';
  get createTime() {
    return dayjs(this.create_time).format('YYYY-MM-DD');
  }

  @Expose({ name: 'change_rate' })
  change_rate: number = 0;

  //当日涨跌幅
  get changeRate() {
    return this.change_rate.toFixed(2) + '%';
  }

  // 收盘价
  price: number = 0;
  get closePrice() {
    return this.price.toFixed(2);
  }

  // 开盘价
  open_price: number = 0;
  get openPrice() {
    return this.open_price.toFixed(2);
  }
  // 开盘入涨跌幅
  get closeOpenPrice() {
    console.log(this.price, this.open_price, this.price - this.open_price);

    return (
      (((this.price - this.open_price) / this.open_price) * 100).toFixed(2) +
      '%'
    );
  }

  // 代码
  @Expose({ name: 'stock_code' })
  stock_code: string = '';
  get stokcCode() {
    return (this.stock_code || '').split('.')[0];
  }

  total_score: number = 0;
  get totalScore() {
    return this.total_score;
  }
}

