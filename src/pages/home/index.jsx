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
    label: '养殖场数量',
    value: '0'
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
    value: '0'
  },{
    label: '位置异常',
    value: '0'
  }]
},{
  id: "device",
  path:  '/animal-manage/device-manage',
  name: '设备管理',
  detail: [{
    label: '激活数量',
    value: '0'
  },{
    label: '异常数量',
    value: '0'
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

const Home = (props) => {

  const [drawerVisible, setDialogVisible] = useState(false);
  const [needCreateCompany, setNeedCreateCompany] = useState(false);
  const { company, dispatch } = props;
  const { companyList, companyDetail } = company;

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

  const fetchCompanyDetail = useCallback((companyId) => {
    dispatch({
      type: 'company/getCompanyDetail',
      payload: {
        companyId
      }
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: 'company/findPageInfo'
    })
  }, []);

  useEffect(() => {
    if (companyList.length === 0) {
      setNeedCreateCompany(true);
      return;
    } else {
      setNeedCreateCompany(false);
      const targetCompany = companyList[0];
      const { companyId } = targetCompany;
      fetchCompanyDetail(companyId);
    }
  }, [companyList]);

  return (
    <>
      {
        !needCreateCompany ? 
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
      <CreateNewFarmDrawer visible={drawerVisible} onCreateCompany={onCreateCompany} onClose={() => setDialogVisible(false)} />
    </>
  );
};

export default connect(({ company }) => ({
  company
}))(Home);