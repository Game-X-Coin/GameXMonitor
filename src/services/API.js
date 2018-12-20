import request from '../utils/request';

export default {
  // chain
  getChainInfo: () => request({ url: '/chain_info' }),
  getChainStats: () => request({ url: '/chain_stats' }),

  // block
  getBlocks: (page = 1, perPage = 15) => {
    return request({ url: '/blocks', params: { page, perPage } });
  },
  getBlock: id_or_num => {
    return request({ url: `/blocks/${id_or_num}` });
  },

  // action
  getTransactions: (page = 1, perPage = 15) => {
    return request({ url: '/transactions', params: { page, perPage } });
  },
  getTransaction: id => request({ url: `/transactions/${id}` }),

  // action
  getActions: (page = 1, perPage = 15) => {
    return request({ url: '/actions', params: { page, perPage } });
  },
  getAction: num => request({ url: `/actions/${num}` }),

  // account
  getAccount: account_name => {
    return request({ url: `/accounts/${account_name}` });
  },
  getAccountActions: (account_name, page = 1, perPage = 15) => {
    return request({
      url: `/accounts/${account_name}/actions`,
      params: { page, perPage }
    });
  },
  getAccountBalance: account_name => {
    return request({ url: `/accounts/${account_name}/balance` });
  }
};
