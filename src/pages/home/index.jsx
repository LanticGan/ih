import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import ManageCard from './components/ManageCard';
import { Spin } from 'antd';
import './index.less';

const manageCardMessage = [];

export default () => {
  return (
    <div className="manage-card-container">
      <ManageCard />
      <ManageCard />
      <ManageCard />
      <ManageCard />
    </div>
  );
};
