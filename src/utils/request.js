import axios from 'axios';

const { API_ENDPOINT } = process.env;

const defaultHeaders = {};

const defaultOptions = {
  baseURL: API_ENDPOINT,
  method: 'post'
};

const request = options => {
  let cancel;

  const promise = new Promise(async (resolve, reject) => {
    try {
      const response = await axios.request({
        ...defaultOptions,
        ...options,
        cancelToken: new axios.CancelToken(c => {
          cancel = c;
        }),
        headers: {
          ...defaultHeaders,
          ...options.headers
        }
      });
      resolve(response.data);
    } catch (error) {
      if (options.cancelable) {
        reject('Request canceled');
      } else {
        reject(error.response.data);
      }
    }
  });

  if (options.cancelable) {
    return {
      promise,
      cancel
    };
  }

  return promise;
};

export { defaultHeaders as headers };
export default request;
