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
  // dynamicImport: {
  //   loading: '@/components/PageLoading/index',
  // },
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
        {
          name: 'login',
          path: '/user/register',
          component: './user/register',
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
              redirect: '/home',
            },
            {
              name: '首页',
              icon: 'home',
              path: '/home',
              component: './home',
            },
            {
              path: '/farm-manage',
              name: '养殖场管理',
              icon: 'group',
              routes: [
                {
                  path: '/farm-manage/fence-manage',
                  name: '围栏管理',
                  icon: 'border',
                  component: './FenceManage',
                },
                {
                  path: '/farm-manage/farm-manage',
                  name: '养殖场管理',
                  icon: 'group',
                  component: './FarmManage',
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
                  component: './HealthManage',
                },
                {
                  path: '/animal-manage/device-manage',
                  name: '设备管理',
                  icon: 'smile',
                  component: './DeviceManage',
                },
              ],
            },
            {
              path: '/vaccine-manage',
              name: '疫苗管理',
              icon: 'pushpin',
              component: './VaccineManage',
            },
            {
              path: '/forage-manage',
              name: '饲料管理',
              icon: 'tablet',
              component: './Welcome',
            },
            {
              path: '/staff-manage',
              name: '人员管理',
              icon: 'user',
              component: './StaffManage',
            },
            {
              path: '/param-manage',
              name: '参数管理',
              icon: 'menu',
              component: './ParamsSetting',
            },
            {
              name: '合作方管理',
              icon: 'team',
              path: '/profilebasic',
              component: './PartnerManage',
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
    'menu-dark-bg': defaultSettings.primaryColor,
    'layout-sider-background': defaultSettings.primaryColor,
    'menu-dark-submenu-bg':  defaultSettings.primaryColor,
    'menu-dark-item-active-bg': '#29cc88'
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
