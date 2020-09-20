import React, { useState, useEffect, useCallback } from 'react';
import { Spin, Button, Result, message } from 'antd';
import { createCompany } from '@/services/company';
import { Link, connect } from 'umi';
import CreateNewFarmDrawer from './components/createNewFarm';
import ManageCard from './components/ManageCard';
import './index.less';

const cardList =[{
  id: "farm",
  path: '/farm-manage/farm-manage',
  name: '养殖场管理',
  detail: [{
    key: 'farmTotal',
    label: '养殖场数量',
    value: '0'
  },{
    key: 'farmErrorTotal',
    label: '异常数量',
    value: '0'
  }]
},
{
  id: "animal",
  path:  '/animal-manage/health-manage',
  name: '牲畜管理',
  detail: [{
    key: 'activityTotal',
    label: '活动异常',
    value: '0'
  },{
    key: 'locationTotal',
    label: '位置异常',
    value: '0'
  }]
},{
  id: "device",
  path:  '/animal-manage/device-manage',
  name: '设备管理',
  detail: [{
    key: 'animalTotal',
    label: '激活数量',
    value: '0'
  },{
    key: 'batteryTotal',
    label: '异常数量',
    value: '0'
  }]
},{
  id: "vaccine",
  path: '/vaccine-manage',
  name: '疫苗管理',
},
{
  id: "params",
  path: '/param-manage',
  name: '参数设置',
},
{
  id: "system",
  name: '系统设置',
}
];

const Home = (props) => {

  const [drawerVisible, setDialogVisible] = useState(false);
  const [needCreateCompany, setNeedCreateCompany] = useState(false);
  const [cardData, setCardData] = useState(cardList);
  const { company, dispatch } = props;
  const { companyDetail = {} } = company;
  const { companyId } = companyDetail

  const onCreateCompany = useCallback(async (values) => {
    const res = await createCompany(values);
    const { code } = res;
    const { companyId = 1 } = res.data || {};
    if (code == 0) {
      message.success('创建成功!');
      fetchCompanyDetail(companyId);
      setDialogVisible(false);
    }
  }, []);

  
  useEffect(() => {
    if (!companyId) {
      setNeedCreateCompany(true);
    } else {
      setNeedCreateCompany(false);
    }
  }, [companyDetail]);

  useEffect(() => {
    console.log('companyDetail', companyDetail)
    const newCardData= cardData.map(card => {
      const { detail = [] } = card;
      const newDetail = detail.map(d => {
        d.value = companyDetail[d.key] || 0;
        return d;
      });
      card.detail = newDetail;
      return card;
    });
    setCardData(newCardData);
  }, [companyDetail])

  return (
    <>
      {
        !needCreateCompany ? 
          (
            <div className="manage-card-container">
              {
                cardData.map((v, i) => <ManageCard paht={v.path} item={v} bgName={`bg-${v.id}`} key={i} />)
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
      <CreateNewFarmDrawer visible={drawerVisible} onCreateCompany={onCreateCompany} onClose={() => setDialogVisible(false)} />
    </>
  );
};

export default connect(({ company }) => ({
  company
}))(Home);