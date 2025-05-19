import { JsonProperty, Serializable } from '@bilibili-firebird/lib.serializer';

@Serializable()
class BackTestModel {
  @JsonProperty('十点前')
  tenBefore: string = '';

  @JsonProperty('上午')
  morning: string = '';

  @JsonProperty('全天')
  all: string = '';

  @JsonProperty('收盘未涨停次日绿')
  noTrading: string = '';
}

