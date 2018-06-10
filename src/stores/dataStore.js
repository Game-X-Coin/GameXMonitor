import { observable, action, runInAction } from 'mobx';

import { transactionAPI } from '../services/api';
import { request, pending, fulfilled, rejected } from '../utils/store/request';

const requests = {
  getTransactions: request
};

class dataStore {
  @observable transactions = [];

  @observable requests = requests;

  @action
  getTransactions = async () => {
    this.requests.getTransactions = pending;

    try {
      const data = await transactionAPI.list();

      runInAction(() => {
        this.transactions = data;
        this.requests.getTransactions = fulfilled;
      });
    } catch (error) {
      runInAction(() => {
        this.requests.getTransactions = rejected;
      });
    }
  };
}

export default new dataStore();
