import axios from 'axios';

export const getLargeMarketList = (params: any) =>
  axios.get('https://prod-web.cloudgn.com/qs_svc/v1/stock_start_rank_f', {
    params,
  });

export const getFiveStarsList = (params: any) =>
  axios.get('https://prod-web.cloudgn.com/qs_svc/v1/stock_start_rank', {
    params,
  });
