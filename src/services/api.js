import request from '../utils/request';
import dataStore from '../stores/dataStore';

export const chainAPI = {
  getInfo() {
    return request({ url: `/chain/get_info` });
  },

  getBlock(block_num_or_id) {
    return request({ url: `/chain/get_block`, data: { block_num_or_id } });
  },

  async getBlocks(page = 1, offset = 20) {
    const max = dataStore.chain.head_block_num;
    const min = 1;

    const start = max - (page - 1) * offset;
    const end = start - offset < min ? min : start - offset;

    let promises = [];

    for (let i = start; i >= end; i -= 1) {
      promises.push(this.getBlock(i));
    }

    return await Promise.all(promises);
  },

  getAccount(account_name) {
    return request({ url: '/chain/get_account', data: { account_name } });
  },

  getBalance(account) {
    return request({
      url: '/chain/get_currency_balance',
      data: { code: 'eosio.token', account, symbol: 'GXC' }
    });
  }
};

export const historyAPI = {
  getTransaction(id) {
    return request({ url: `/history/get_transaction`, data: { id } });
  },

  getActions(account_name) {
    return request({
      url: '/history/get_actions',
      data: { account_name, pos: -1, offset: -20 }
    });
  }
};
