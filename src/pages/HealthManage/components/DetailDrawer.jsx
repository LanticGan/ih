import { useEffect, useState, useCallback } from 'react';
import { Drawer, Form, Button, Card, Descriptions, Divider, Table, message, Row, Col, Spin   } from 'antd';
import { Line } from '@ant-design/charts';
import { DatePicker } from 'antd';
import moment from 'moment';
import { getAnimaDetail, statisticDaily } from '@/services/animal';

const animalColumns = [
  {
    title: '体温(℃)',
    dataIndex: 'temperatureValue',
    key: 'temperatureValue',
    render: (v, record) => {
      const { temperature } = record;
      let text = "";
      if (temperature == '100') {
        text = v
      } else if (temperature == '99') {
      text = <span className="low-abnormal-color">{v}</span>
      } else  if (temperature == '98') {
      text = <span className="abnormal-color">{v}</span>
      }
      return text;
    }
  },
  {
    title: '活动(千步)',
    dataIndex: 'activityValue',
    key: 'activityValue',
    render: (v, record) => {
      const { activity } = record;
      let text = "";
      if (activity == '100') {
        text = v
      } else if (activity == '99') {
      text = <span className="low-abnormal-color">{v}</span>
      } else  if (activity == '98') {
      text = <span className="abnormal-color">{v}</span>
      }
      return text;
    }
  },
  {
    title: '进食(次)',
    dataIndex: 'eatValue',
    key: 'eatValue',
    render: v => {
      return v
    }
  },
  {
    title: '位置',
    dataIndex: 'location',
    key: 'location',
    render: v => {
      let text = "";
      if (v == '100') {
        text = '围栏内'
      } else {
        text = <span className="abnormal-color">围栏外</span>
      }
      return text;
    }
  },
  {
    title: '发情',
    dataIndex: 'oestrus',
    key: 'oestrus',
    render: v => {
      let text = "";
      if (v == '100') {
        text = '正常'
      } else {
        text = <span className="abnormal-color">发情</span>
      }
      return text;
    }
  },
  {
    title: '数据更新时间',
    dataIndex: 'syncTime',
    key: 'syncTime',
  },
];

const { RangePicker } = DatePicker;

const CreateFarmDrawer = (props) => {

  const { targetAnimal } = props;
  const { id, equipmentNo, dailyAges, breedType, farmName, bindTime, farmAddr, battery } = targetAnimal;
  const [animalHistory, setAnimalHistory] = useState([]);
  const [temparatureData, setTemparatureData] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const [eatData, setEatData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    setDates([moment().subtract(7, 'days'), moment()]);
  }, [])
  
  const disabledDate = current => {
    if (current.diff(new Date(), 'days') >= 0) {
      return true;
    }
    if (!dates || dates.length === 0) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], 'days') > 30;
    const tooEarly = dates[1] && dates[1].diff(current, 'days') > 30;
    return tooEarly || tooLate;
  };

  const changeRange = value => {
    if (!value) {
      return
    }
    const [start, end] = value;
    const [oldStart, oldEnd] = dates;
    setDates([start || oldStart, end || oldEnd]);
    getStatisticDaily([start || oldStart, end || oldEnd]);
  }

  const updateTempratureData = (data = []) => {
    const temparatureData = data.map(d => ({
      date: d.syncDate,
      value: d.temperatureValue,
      name: '体温(℃)'
    }));
    setTemparatureData(temparatureData);
  }

  const updateEatData = (data = []) => {
    const eatData = data.map(d => ({
      date: d.syncDate,
      value: d.eatValue,
      name: '进食(次)'
    }));
    setEatData(eatData);
  }

  const updateActivityData = (data = []) => {
    const activityData = data.map(d => ({
      date: d.syncDate,
      value: d.activityValue,
      name: '活动(千步)'
    }));
    setActivityData(activityData);
  }

  const getStatisticDaily = async date => {
    setIsFetching(true);
    const [startTime, endTime] = date;
    const res = await statisticDaily({ animalId: id, startTime: startTime.valueOf(), endTime: endTime.valueOf() });
    setIsFetching(false);
    if (res.code != 0) {
      message.error(res.message || "系统异常")
    }
    let data = res.data || [];
    updateTempratureData(data);
    updateEatData(data);
    updateActivityData(data);
    setAnimalHistory(data);
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
            <div className="header-title">历史记录</div>
            <div className="header-range-pciker">
              <span style={{marginRight: 6}}>时间区间</span>
              <RangePicker
                disabledDate={disabledDate}
                onCalendarChange={changeRange}
              />
            </div>
          </div>
          {
            temparatureData.length > 0 && (
              <Row style={{height: 220, marginBottom: 16}} gutter={8}>
                <Col span={24}>
                  {
                    isFetching 
                    ? <div style={{display: 'flex', justifyContent:'center'}}><Spin /></div>
                    : <Line 
                        data={temparatureData}
                        xField='date'
                        yField='value'
                        seriesField='name'
                        legend={{position: 'top'}} 
                      />
                  }
                </Col>
              </Row>
            )
          }
          
          {
            eatData.length > 0 && (
              <Row style={{height: 220, marginBottom: 16}} gutter={8}>
                <Col span={24}>
                  {
                    isFetching 
                    ? <div style={{display: 'flex', justifyContent:'center'}}><Spin /></div>
                    : <Line 
                        data={eatData}
                        xField='date'
                        yField='value'
                        seriesField='name'
                        legend={{position: 'top'}} 
                      />
                  }
                </Col>
              </Row>
            )
          }
          
          {
            activityData.length > 0 && (
              <Row style={{height: 220, marginBottom: 16}}>
                <Col span={24}>
                  {
                    isFetching 
                    ? <div style={{display: 'flex', justifyContent:'center'}}><Spin /></div>
                    : <Line 
                        data={activityData}
                        xField='date'
                        yField='value'
                        seriesField='name'
                        legend={{position: 'top'}} 
                      />
                  }
                </Col>
              </Row>
            )
          }
          
          <Table
            style={{ marginTop: 24 }}
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