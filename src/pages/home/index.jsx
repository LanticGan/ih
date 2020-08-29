import React, { useState, useEffect } from 'react';
import { Spin, Button, Result } from 'antd';
import CreateNewFarmDrawer from './components/createNewFarm';
import './index.less';

const manageCardMessage = [];

const cardList =[1,2,3,4];

export default () => {

  const [needInitial, setNeedInitial] = useState(false);
  const [drawerVisible, setDialogVisible] = useState(false);

  return (
    <>
      {
        needInitial ? 
          (
            <div className="manage-card-container">
              {
                cardList.map((v, i) => <ManageCard key={i} />)
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
      <CreateNewFarmDrawer visible={drawerVisible} onClose={() => setDialogVisible(false)} />
    </>
  );
};
