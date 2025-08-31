import axios from 'axios';

export const getLargeMarketList = (params: any) =>
  axios.get('https://prod-web.cloudgn.com/qs_svc/v1/stock_start_rank_f', {
    params,
  });

export const getFiveStarsList = (params: any) =>
  axios.get('https://prod-web.cloudgn.com/qs_svc/v1/stock_start_rank', {
    params,
  });

export const getHighScoreList = (params: any) =>
  axios.get('https://prod-web.cloudgn.com/qs_svc/v1/stock_start_block_score', {
    params,
  });

// 本地服务
export const getLocalFiveStarsList = (params: any) =>
  axios.get('/quantify/stars', {
    params,
  });
