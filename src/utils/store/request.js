export const request = {
  fetching: false,
  fetched: false
};

export const pending = {
  ...request,
  fetching: true
};

export const fulfilled = {
  ...request,
  fetched: true
};

export const rejected = {
  ...request,
  fetched: false
};
