import { useEffect, useState, useCallback } from 'react';
import { Drawer, Form, Button, Card, Descriptions, Divider, Table, message, Row, Col  } from 'antd';
import { Line } from '@ant-design/charts';
import { DatePicker } from 'antd';
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

const temparatureData = [
  { date: '09-10', value: 36, name: '体温(℃)' },
  { date: '09-11', value: 35, name: '体温(℃)' },
  { date: '09-12', value: 34, name: '体温(℃)' },
  { date: '09-13', value: 36, name: '体温(℃)' },
  { date: '09-14', value: 37, name: '体温(℃)' },
  { date: '09-15', value: 38, name: '体温(℃)' },
  { date: '09-16', value: 32, name: '体温(℃)' },
  { date: '09-17', value: 36, name: '体温(℃)' },
];

const eatData = [
  { date: '09-10', value: 220, name: '进食(次)' },
  { date: '09-11', value: 230, name: '进食(次)'},
  { date: '09-12', value: 550, name: '进食(次)' },
  { date: '09-13', value: 400, name: '进食(次)'},
  { date: '09-14', value: 310, name: '进食(次)'},
  { date: '09-15', value: 254, name: '进食(次)' },
  { date: '09-16', value: 276, name: '进食(次)' },
  { date: '09-17', value: 472, name: '进食(次)' },
];

const activityData = [
  { date: '09-10', value: 12, name: '活动(千步)' },
  { date: '09-11', value: 13.4, name: '活动(千步)'},
  { date: '09-12', value: 13.5, name: '活动(千步)' },
  { date: '09-13', value: 13.6, name: '活动(千步)'},
  { date: '09-14', value: 15, name: '活动(千步)'},
  { date: '09-15', value: 11.2, name: '活动(千步)' },
  { date: '09-16', value: 16, name: '活动(千步)' },
  { date: '09-17', value: 13, name: '活动(千步)' },
];

const temparaturConfig = {
  data:temparatureData,
  xField: 'date',
  yField: 'value',
  seriesField: 'name',
  legend: { position: 'top' },
};

const eatConfig = {
  data: eatData,
  xField: 'date',
  yField: 'value',
  seriesField: 'name',
  legend: { position: 'top' },
};

const activityConfig = {
  data: activityData,
  xField: 'date',
  yField: 'value',
  seriesField: 'name',
  legend: { position: 'top' },
};

const { RangePicker } = DatePicker;

const CreateFarmDrawer = (props) => {

  const { targetAnimal } = props;
  const { id, equipmentNo, dailyAges, breedType, farmName, bindTime, farmAddr, battery } = targetAnimal;
  const [animalHistory, setAnimalHistory] = useState([]);
  const [dates, setDates] = useState([]);
  
  const disabledDate = current => {
    if (!dates || dates.length === 0) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], 'days') > 30;
    const tooEarly = dates[1] && dates[1].diff(current, 'days') > 30;
    return tooEarly || tooLate;
  };


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
          <Descriptions title="基本信息" style={{ marginBottom: 16 }}>
            <Descriptions.Item label="设备编号">{equipmentNo}</Descriptions.Item>
            <Descriptions.Item label="所属养殖场">{farmName}</Descriptions.Item>
            <Descriptions.Item label="日龄">{dailyAges}</Descriptions.Item>
            <Descriptions.Item label="养殖类型">{breedType}</Descriptions.Item>
            <Descriptions.Item label="佩戴时间">{bindTime}</Descriptions.Item>
            <Descriptions.Item label="地址">{farmAddr}</Descriptions.Item>
            <Descriptions.Item label="设备状态">已激活</Descriptions.Item>
            <Descriptions.Item label="设备电量">{battery}%</Descriptions.Item>

          </Descriptions>
          <Divider style={{ marginBottom: 16 }} />
          <div className="header-container">
            <div className="header-title">历史记录（近一周）</div>
            <div className="header-range-pciker">
              <span style={{marginRight: 6}}>时间区间</span>
              <RangePicker 
                disabledDate={disabledDate}
                onCalendarChange={value => {
                  const [start, end] = value;
                  const [oldStart, oldEnd] = dates;
                  setDates([start || oldStart, end || oldEnd]);
                }}
              />
            </div>
          </div>
          
          <Row style={{height: 220, marginBottom: 16}} gutter={8}>
            <Col span={24}>
              <Line {...temparaturConfig} />
            </Col>
          </Row>
          <Row style={{height: 220, marginBottom: 16}} gutter={8}>
            <Col span={24}>
              <Line {...eatConfig} />
            </Col>
          </Row>
          <Row style={{height: 220, marginBottom: 16}} gutter={8}>
            <Col span={24}>
              <Line {...activityConfig} />
            </Col>
          </Row>
          <Table
            style={{ marginBottom: 24 }}
            pagination={false}
            dataSource={[]}
            columns={animalColumns}
            rowKey="id"
          />
      </div>
  </Drawer>
  )
}

export default CreateFarmDrawer;