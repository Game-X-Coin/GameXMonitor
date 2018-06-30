import asyncComponent from '../components/AsyncComponent';

export const routes = [
  {
    path: '/',
    exact: true,
    component: asyncComponent(() => import('../pages/WelcomePage'))
  },
  {
    path: '/blocks',
    exact: true,
    component: asyncComponent(() => import('../pages/block/BlockListPage'))
  },
  {
    path: '/blocks/:id',
    component: asyncComponent(() => import('../pages/block/BlockPage'))
  },
  {
    path: '/transactions/:id',
    component: asyncComponent(() => import('../pages/tx/TxPage'))
  },
  {
    path: '/accounts/:id',
    component: asyncComponent(() => import('../pages/account/AccountPage'))
  },
  {
    path: '*',
    component: asyncComponent(() => import('../pages/NotFoundPage'))
  }
];
