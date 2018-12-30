export const GA_ID = process.env.GA_ID;
export const NODE_ENV = process.env.NODE_ENV;
export const NODE_ENV_STATUS = {
  TEST: NODE_ENV === 'test',
  DEVELOP: NODE_ENV === 'develop',
  PRODUCTION: NODE_ENV === 'production'
};
