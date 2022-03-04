import Vue from 'vue';
import * as VueRouter from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router'

import HelloWorld from './components/HelloWorld.vue';
import Login from './pages/login.vue';
import ReviewLists from './pages/reviewLists.vue';
import Submit from './pages/submit.vue';
import Mypage from './pages/mypage.vue';

const routes = [
  {
    path: '/',
    component: ReviewLists  // HelloWorldコンポーネントルーティング
  },
  {
    path: '/login',
    component: Login  // Hogeコンポーネントルーティング
  },
  {
    path: '/review',
    component: ReviewLists
  },
  {
    //id=="new"の時はnew post
    path: '/review/:id',
    component: Submit
  },
  {
    path: '/mypage',
    component: Mypage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;