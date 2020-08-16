// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      component: '../layouts/CustomUserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/welcome',
            },
            {
              path: '/welcome',
              name: 'welcome',
              icon: 'smile',
              component: './Welcome',
            },
            {
              path: '/admin',
              name: 'admin',
              icon: 'crown',
              component: './Admin',
              authority: ['admin'],
              routes: [
                {
                  path: '/admin/sub-page',
                  name: 'sub-page',
                  icon: 'smile',
                  component: './Welcome',
                  authority: ['admin'],
                },
              ],
            },
            {
              name: 'list.table-list',
              icon: 'table',
              path: '/list',
              component: './ListTableList',
            },
            {
              name: '首页',
              icon: 'smile',
              path: '/home',
              component: './home',
            },
            {
              path: '/farm-manage',
              name: '养殖场管理',
              icon: 'crown',
              routes: [
                {
                  path: '/farm-manage/fence-manage',
                  name: '围栏管理',
                  icon: 'smile',
                  component: './Welcome',
                },
              ],
            },
            {
              path: '/animal-manage',
              name: '牲畜管理',
              icon: 'crown',
              routes: [
                {
                  path: '/animal-manage/health-manage',
                  name: '牲畜健康管理',
                  icon: 'smile',
                  component: './Welcome',
                },
                {
                  path: '/animal-manage/device-manage',
                  name: '设备管理',
                  icon: 'smile',
                  component: './Welcome',
                },
              ],
            },
            {
              path: '/vaccine-manage',
              name: '疫苗管理',
              icon: 'smile',
              component: './Welcome',
            },
            {
              path: '/forage-manage',
              name: '饲料管理',
              icon: 'smile',
              component: './Welcome',
            },
            {
              path: '/staff-manage',
              name: '人员管理',
              icon: 'smile',
              component: './Welcome',
            },
            {
              path: '/param-manage',
              name: '参数管理',
              icon: 'smile',
              component: './Welcome',
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
