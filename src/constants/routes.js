import asyncComponent from '../components/AsyncComponent';

export const routes = [
  {
    path: '/',
    exact: true,
    component: asyncComponent(() => import('../pages/WelcomePage'))
  },
  {
    path: '*',
    component: asyncComponent(() => import('../pages/NotFoundPage'))
  }
];
