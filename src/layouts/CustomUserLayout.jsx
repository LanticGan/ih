import { getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link, SelectLang, useIntl, connect } from 'umi';
import React from 'react';
import './CustomUserLayout.less';

const UserLayout = props => {
  return (
    <div className="user-container">
      <div className="title">
        <div className="icon"></div>
        <div className="text">云牧智慧畜牧</div>
      </div>
      <div className="user-content">
        {props.children}
      </div>
    </div>
  );
};

export default UserLayout