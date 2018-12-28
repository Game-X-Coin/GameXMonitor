import { observable } from 'mobx';

import API from '../services/API';

class dataStore {
  @observable chainInfo = {};
  @observable chainStats = {};
  @observable recentActions = [];

  getChainMeta = async () => {
    const [
      /*  { result: chainInfo }, */
      { result: chainStats },
      { result: recentActions }
    ] = await Promise.all([
      /*  API.getChainInfo(), */
      API.getChainStats(),
      API.getActions(1, 7)
    ]);

    /*  this.chainInfo = chainInfo; */
    this.chainStats = chainStats;
    this.recentActions = recentActions;
  };
}

export default new dataStore();
