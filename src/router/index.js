import Vue from 'vue'
import Router from 'vue-router'
// import Index from '@/components/Index'
const Index = () => import('@/components/Index');
// import Details from '@/components/Details'
const Details = () => import('@/components/Details');

// import Witness from '@/components/Witness'
const Witness = () => import('@/components/Witness');

// import Committee from '@/components/Committee'
const Committee = () => import('@/components/Committee');


// import Account from '@/components/Account'
const Account = () => import('@/components/Account');

// import TransactionRecord from '@/components/TransactionRecord'

const TransactionRecord = () => import('@/components/TransactionRecord');
Vue.use(Router);

Router.prototype.goBack = function () {
  this.isBack = true
  window.history.go(-1);
}

const routes =
  [
    {
      path: '/',
          name: 'Index',
          component: Index,
          meta: {
            title: '首页'
          }
    },
    {
      path: '/index',
          name: 'Index',
          component: Index,
          meta: {
            title: '首页'
          }
    },
    {
      path: '/Details/:id',
          name: 'Details',
          component: Details,
          meta: {
            title: ''
          }
    },
    {
      path: '/Witness',
          name: 'Witness',
          component: Witness,
          meta: {
            title: ''
          }
    },
    {
      path: '/Committee',
          name: 'Committee',
          component: Committee,
          meta: {
            title: ''
          }
    },
    {
      path: '/Account/:id/:type',
          name: 'Account',
          component: Account,
          meta: {
            title: ''
          }
    },
    {
      path: '/Transaction/:id',
          name: 'TransactionRecord',
          component: TransactionRecord,
          meta: {
            title: ''
          }
    }
  
  ];

const router = new Router({
	 routes
});

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
      document.title = to.meta.title;
    }
    next();
});

export default router;
