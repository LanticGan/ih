import { useEffect, useState, useCallback } from 'react';
import { Drawer, Form, Button, Card, Descriptions, Divider, Table, message  } from 'antd';
import { getAnimaDetail } from '@/services/animal';

const CreateFarmDrawer = (props) => {

  const { companyDetail = {} } = props;
  const { id, companyName, companyAddr, insurance, breedType, num } = companyDetail;


  // const getAnimalDetail = useCallback(async id => {
  //   if (!id) {
  //     return;
  //   }
  //   const res = await getAnimaDetail({ animalId: id });
  //   const { code, message: info, data = {} } = res;
  //   if (code == 500) {
  //       message.error(info);
  //       return;
  //   }
  //   const { syncHistoryDTOS = [] } = data;
  //   setAnimalHistory(syncHistoryDTOS);
  // }, [])

  // useEffect(() => {
  //   getAnimalDetail(id);
  // }, [id]);

  return (
    <Drawer
      title=""
      width={720}
      onClose={props.onClose}
      visible={props.visible}
      bodyStyle={{ paddingBottom: 80 }}
    >
    <div>
          <Descriptions title="公司基本信息" style={{ marginBottom: 32 }}>
            <Descriptions.Item label="养殖类型">{breedType}</Descriptions.Item>
            <Descriptions.Item label="公司名称">{companyName}</Descriptions.Item>
            <Descriptions.Item label="存栏量">{num}</Descriptions.Item>
            <Descriptions.Item label="地址">{companyAddr}</Descriptions.Item>
            <Descriptions.Item label="保险公司">{insurance}</Descriptions.Item>
          </Descriptions>
      </div>
  </Drawer>
  )
}

export default CreateFarmDrawer;