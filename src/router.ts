import Vue from 'vue';
import * as VueRouter from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router'

import HelloWorld from './components/HelloWorld.vue';
import Login from './pages/login.vue';
import Review from './pages/review.vue';
import Submit from './pages/submit.vue';
import Mypage from './pages/mypage.vue';

const routes = [
  {
    path: '/',
    component: HelloWorld  // HelloWorldコンポーネントルーティング
  },
  {
    path: '/login',
    component: Login  // Hogeコンポーネントルーティング
  },
  {
    path: '/review',
    component: Review
  },
  {
    //id=="add"の時はnew post
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