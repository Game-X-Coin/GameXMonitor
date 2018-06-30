import { observable, action, runInAction } from 'mobx';

import { chainAPI, historyAPI } from '../services/api';
import { request, pending, fulfilled, rejected } from '../utils/store/request';

const requests = {
  getChainInfo: request,
  getBlocks: request,
  getBlock: request,
  getTransaction: request,
  getAccount: request,
  getActions: request
};

class dataStore {
  @observable chain = {};

  @observable blocks = [];
  @observable block = {};

  @observable transaction = {};

  @observable account = {};

  @observable actions = {};

  @observable requests = requests;

  @action
  getChainInfo = async () => {
    this.requests.getChainInfo = pending;

    try {
      const data = await chainAPI.getInfo();

      runInAction(() => {
        this.chain = data;
        this.requests.getChainInfo = fulfilled;
      });
    } catch (error) {
      runInAction(() => {
        this.requests.getChainInfo = rejected;
      });
    }
  };

  @action
  getBlocks = async (page, limit) => {
    this.requests.getBlocks = pending;

    try {
      const data = await chainAPI.getBlocks(page, limit);

      runInAction(() => {
        this.blocks = data;
        this.requests.getBlocks = fulfilled;
      });
    } catch (error) {
      runInAction(() => {
        this.requests.getBlocks = rejected;
      });
    }
  };

  @action
  getBlock = async id => {
    this.requests.getBlock = pending;

    try {
      const data = await chainAPI.getBlock(id);

      runInAction(() => {
        this.block = data;
        this.requests.getBlock = fulfilled;
      });
    } catch (error) {
      runInAction(() => {
        this.requests.getBlock = rejected;
      });
    }
  };

  @action
  getTransaction = async id => {
    this.requests.getTransaction = pending;

    try {
      const data = await historyAPI.getTransaction(id);

      runInAction(() => {
        this.transaction = data;
        this.requests.getTransaction = fulfilled;
      });
    } catch (error) {
      runInAction(() => {
        this.requests.getTransaction = rejected;
      });
    }
  };

  @action
  getAccount = async id => {
    this.requests.getAccount = pending;

    try {
      const data = await chainAPI.getAccount(id);
      const [balance] = await chainAPI.getBalance(id);

      runInAction(() => {
        this.account = {
          ...data,
          balance
        };
        this.requests.getAccount = fulfilled;
      });
    } catch (error) {
      runInAction(() => {
        this.requests.getAccount = rejected;
      });
    }
  };

  @action
  getActions = async id => {
    this.requests.getActions = pending;

    try {
      const data = await historyAPI.getActions(id);

      runInAction(() => {
        this.actions = data;
        this.requests.getActions = fulfilled;
      });
    } catch (error) {
      runInAction(() => {
        this.requests.getActions = rejected;
      });
    }
  };
}

export default new dataStore();
