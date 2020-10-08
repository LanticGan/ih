import { useEffect, useState, useCallback } from 'react';
import { Drawer, Form, Button, Card, Descriptions, Divider, Table, message, Row, Col  } from 'antd';
import { Line } from '@ant-design/charts';
import { getAnimaDetail } from '@/services/animal';

const animalColumns = [
  {
    title: '活动',
    dataIndex: 'activity',
    key: 'activity',

  },
  {
    title: '位置',
    dataIndex: 'location',
    key: 'location',

  },
  {
    title: '进食',
    dataIndex: 'eat',
    key: 'eat',
    align: 'right',
  },
  {
    title: '设备电量',
    dataIndex: 'battery',
    key: 'battery',
    align: 'right',  
  },
];

const templateData = [
  { year: '10.1', value: 36, name: '温度' },
  { year: '10.2', value: 35, name: '温度'},
  { year: '10.3', value: 34, name: '温度' },
  { year: '10.4', value: 36, name: '温度'},
  { year: '10.5', value: 37, name: '温度'},
  { year: '10.6', value: 38, name: '温度' },
  { year: '10.7', value: 32, name: '温度' },
  { year: '10.8', value: 36, name: '温度' },
  { year: '10.9', value: 35, name: '温度' },
];

const templateConfig = {
  data:templateData,
  xField: 'year',
  yField: 'value',
  seriesField: 'name',
  legend: { position: 'top' },
};

const CreateFarmDrawer = (props) => {

  const { targetAnimal } = props;
  const { id, equipmentNo, dailyAges, breedType, farmName, bindTime, farmAddr, battery } = targetAnimal;
  const [animalHistory, setAnimalHistory] = useState([]);


  const getAnimalDetail = useCallback(async id => {
    if (!id) {
      return;
    }
    const res = await getAnimaDetail({ animalId: id });
    const { code, message: info, data = {} } = res;
    if (code == 500) {
        message.error(info);
        return;
    }
    const { syncHistoryDTOS = [] } = data;
    setAnimalHistory(syncHistoryDTOS);
  }, [])

  useEffect(() => {
    getAnimalDetail(id);
  }, [id])

  return (
    <Drawer
      title=""
      width={720}
      onClose={props.onClose}
      visible={props.visible}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Button onClick={props.onClose} style={{ marginRight: 8 }}>
            取消
          </Button>
          <Button onClick={props.onClose} type="primary">
            确认
          </Button>
        </div>
      }
    >
    <div>
          <Descriptions title="基本信息" style={{ marginBottom: 32 }}>
            <Descriptions.Item label="设备编号">{equipmentNo}</Descriptions.Item>
            <Descriptions.Item label="所属养殖场">{farmName}</Descriptions.Item>
            <Descriptions.Item label="日龄">{dailyAges}</Descriptions.Item>
            <Descriptions.Item label="养殖类型">{breedType}</Descriptions.Item>
            <Descriptions.Item label="佩戴时间">{bindTime}</Descriptions.Item>
            <Descriptions.Item label="地址">{farmAddr}</Descriptions.Item>
            <Descriptions.Item label="设备状态">已激活</Descriptions.Item>
            <Descriptions.Item label="设备电量">{battery}%</Descriptions.Item>

          </Descriptions>
          <Divider style={{ marginBottom: 32 }} />
          <div className="header-title">历史记录（近一周）</div>
          <Row style={{height: 240, marginBottom: 16}} gutter={8}>
            <Col span={12}>
              <Line {...templateConfig} />
            </Col>
            <Col span={12}>
              <Line {...templateConfig} />
            </Col>
          </Row>
          <Row style={{height: 240, marginBottom: 16}} gutter={8}>
            <Col span={24}>
              <Line {...templateConfig} />
            </Col>
          </Row>
          <Table
            style={{ marginBottom: 24 }}
            pagination={false}
            dataSource={animalHistory}
            columns={animalColumns}
            rowKey="id"
          />
      </div>
  </Drawer>
  )
}

export default CreateFarmDrawer;