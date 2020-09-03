import React, { useState, useEffect } from 'react';
import { Spin, Button, Result } from 'antd';
import CreateNewFarmDrawer from './components/createNewFarm';
import ManageCard from './components/ManageCard';
import './index.less';

const cardList =[{
  id: "farm",
  path: '/farm-manage/farm-manage',
  name: '养殖场管理',
  detail: [{
    label: '养殖场数量',
    value: '2'
  },{
    label: '异常数量',
    value: '0'
  }]
},
{
  id: "animal",
  path:  '/animal-manage/health-manage',
  name: '牲畜管理',
  detail: [{
    label: '活动异常',
    value: '5'
  },{
    label: '位置异常',
    value: '33'
  }]
},{
  id: "device",
  path:  '/animal-manage/device-manage',
  name: '设备管理',
  detail: [{
    label: '激活数量',
    value: '3333'
  },{
    label: '异常数量',
    value: '33'
  }]
},{
  id: "vaccine",
  path: '/vaccine-manage',
  name: '疫苗管理',
},
{
  id: "system",
  name: '系统管理',
},
{
  id: "params",
  path: '/param-manage',
  name: '参数设置',
}];

export default () => {

  const [needInitial, setNeedInitial] = useState(true);
  const [drawerVisible, setDialogVisible] = useState(false);

  const onOk = () => {
    setNeedInitial(false);
    setDialogVisible(false);
  }

  return (
    <>
      {
        !needInitial ? 
          (
            <div className="manage-card-container">
              {
                cardList.map((v, i) => <ManageCard paht={v.path} item={v} bgName={`bg-${v.id}`} key={i} />)
              }
            </div>
          ) : (
            <div className="create-new-farm-info">
              <Result
                status="403"
                title="你还没有创建公司信息"
                style={{
                  background: 'none',
                }}
                extra={
                  <Button type="primary" onClick={() => setDialogVisible(true) } >马上创建</Button>
                }
              />
            </div>
          )
      }
      <CreateNewFarmDrawer visible={drawerVisible} onOK={onOk} onClose={() => setDialogVisible(false)} />
    </>
  );
};
