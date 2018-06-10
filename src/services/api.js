import request from '../utils/request';

export const blockAPI = {
  list: params => request({ url: '/blocks', params }),
  single: id => request({ url: `/blocks/${id}` })
};

export const transactionAPI = {
  list: params => request({ url: '/transactions', params }),
  single: id => request({ url: `/transactions/${id}` })
};

export const addressAPI = {
  list: params => request({ url: '/addresses', params }),
  single: id => request({ url: `/addresses/${id}` })
};
