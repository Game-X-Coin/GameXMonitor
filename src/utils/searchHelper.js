import API from '../services/API';

// return routerName
export const searchHelper = async value => {
  if (!value.length) {
    return;
  }

  if (Number(value)) {
    return `/blocks/${value}`;
  }

  if (value.length === 64) {
    return `/transactions/${value}`;
  }

  // check account is available
  await API.getAccount(value);

  return `/accounts/${value}`;
};
