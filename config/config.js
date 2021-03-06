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
  history: {
    type: "hash"
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      key: 'user',
      path: '/user', 
      component: '../layouts/CustomUserLayout',
      routes: [
        {
          key: 'login',
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
        {
          key: 'register',
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
              icon: 'https://img.alicdn.com/tfs/TB1sObktz39YK4jSZPcXXXrUFXa-12-12.png',
              key: 'home',
              path: '/home',
              component: './home',
            },
            {
              path: '/animal-manage',
              name: '牲畜管理',
              icon: 'https://img.alicdn.com/tfs/TB1AzNpsQ9l0K4jSZFKXXXFjpXa-13-12.png',
              routes: [
                {
                  path: '/animal-manage/health-manage',
                  name: '牲畜健康管理',
                  icon: 'smile',
                  component: './HealthManage',
                },
                {
                  path: '/animal-manage/vaccine-manage',
                  name: '疫苗注射',
                  icon: 'pushpin',
                  component: './VaccineManage',
                },
                {
                  path: '/breed-manage',
                  name: '繁殖管理',
                  icon: 'tablet',
                  component: './404',
                },
                {
                  path: '/sell-manage',
                  name: '售卖管理',
                  icon: 'tablet',
                  component: './404',
                }
              ],
            },
            {
              path: '/farm-manage',
              name: '养殖场管理',
              icon: 'https://img.alicdn.com/tfs/TB1DDm52Yr1gK0jSZFDXXb9yVXa-14-12.png',
              routes: [
                {
                  path: '/farm-manage/fence-manage',
                  name: '地图模式',
                  icon: 'border',
                  component: './FenceManage',
                },
                {
                  path: '/farm-manage/farm-manage',
                  name: '圈舍管理',
                  icon: 'group',
                  component: './FarmManage',
                },
              ],
            },
            {
              path: '/device-manage',
              name: '设备管理',
              icon: 'https://img.alicdn.com/tfs/TB1kRM927T2gK0jSZFkXXcIQFXa-14-14.png',
              routes: [
                {
                  path: '/device-manage/device-manage',
                  name: '设备状态',
                  icon: 'smile',
                  component: './DeviceManage',
                },
                {
                  path: '/device-manage/param-manage',
                  name: '参数设置',
                  icon: 'menu',
                  component: './ParamsSetting',
                },
              ]
            },
            {
              path: '/staff-manage',
              name: '人员管理',
              icon: 'https://img.alicdn.com/tfs/TB1DFrksBBh1e4jSZFhXXcC9VXa-11-14.png',
              component: './StaffManage',
            },
            {
              path: '/stock-manage',
              name: '库存管理',
              icon: 'https://img.alicdn.com/tfs/TB1lRM927T2gK0jSZFkXXcIQFXa-14-14.png',
              routes: [
                {
                  path: '/stock-manage/vaccine-manage',
                  name: '疫苗管理',
                  icon: 'smile',
                  component: './VaccineManage',
                },
                {
                  path: '/forage-manage',
                  name: '饲料管理',
                  icon: 'tablet',
                  component: './404',
                },
              ]
            },
            // {
            //   path: '/source-manage',
            //   name: '溯源管理',
            //   icon: 'smile',
            //   component: './404',
            // },
            {
              name: '合作方管理',
              icon: 'https://img.alicdn.com/tfs/TB1UXMqomslXu8jSZFuXXXg7FXa-12-14.png',
              path: '/profilebasic',
              component: './404',
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
