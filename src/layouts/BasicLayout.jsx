/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout, { DefaultFooter } from '@ant-design/pro-layout';
import React, { useEffect, useCallback, useState } from 'react';
import { Link, useIntl, connect, history } from 'umi';
import { Result, Button } from 'antd';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import { fetchUserDetail } from '@/services/users';
import { getAuthorityFromRouter } from '@/utils/utils';
import cookie from 'js-cookie';
import { stringify } from 'querystring';

import logo from '../assets/logo-white.png';

const noMatch = (
  <Result
    status={403}
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary">
        <Link to="/user/login">Go Login</Link>
      </Button>
    }
  />
);

const BasicLayout = props => {
  const {
    dispatch,
    children,
    settings,
    location = {
      pathname: '/',
    },
    companyDetail = {}
  } = props;

  /**
   * constructor
   */

   /**
 * use Authorized check all menu item
 */
  const menuDataRender = menuList =>
    menuList.map(item => {
    const localItem = {
      ...item,
      children: item.children ? menuDataRender(item.children) : undefined,
    };
    const { companyId } = companyDetail 
    return companyId ? localItem : (localItem.path == '/home' ? localItem : null)
    // return Authorized.check(item.authority, localItem, null);
  });

  const fetchUser = useCallback(async () => {
    const res = await fetchUserDetail();
    const { code, message: info, data = {} } = res;
    if (code == 500) {
        message.error(info);
        return;
    }
    const { companyId } = data;
    if (companyId) {
      dispatch({
        type: 'company/getCompanyDetail',
        payload: {
          companyId
        }
      });
    }
  }, []);

  useEffect(() => {
    const { isLogin } = props;
    const token = cookie.get('token');

    if (isLogin || token) {
      fetchUser()
      return;
    }

    history.replace({
      pathname: '/user/login',
      search: stringify({
        redirect: window.location.href,
      }),
    });    
    
  }, [])
 

  const handleMenuCollapse = payload => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  }; // get children authority

  const authorized = getAuthorityFromRouter(props.route.routes, location.pathname || '/') || {
    authority: undefined,
  };

  const { formatMessage } = useIntl();
  return (
    <ProLayout
      logo={logo}
      formatMessage={formatMessage}
      onCollapse={handleMenuCollapse}
      onMenuHeaderClick={() => history.push('/')}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl || !menuItemProps.path) {
          return defaultDom;
        }

        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      breadcrumbRender={(routers = []) => [
        {
          path: '/',
          breadcrumbName: formatMessage({
            id: 'menu.home',
          }),
        },
        ...routers,
      ]}
      itemRender={(route, params, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? (
          <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
        ) : (
          <span>{route.breadcrumbName}</span>
        );
      }}
      footerRender={null}
      menuDataRender={menuDataRender}
      rightContentRender={() => <RightContent />}
      {...props}
      {...settings}
    >
      <Authorized authority={authorized.authority} noMatch={noMatch}>
        {children}
      </Authorized>
    </ProLayout>
  );
};

export default connect(({ global, settings, login, company }) => ({
  collapsed: global.collapsed,
  settings,
  isLogin: login.isLogin,
  companyDetail: company.companyDetail
}))(BasicLayout);
