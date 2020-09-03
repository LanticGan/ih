import React, { useState } from 'react';
import {
  Form, 
  Row, 
  Col,
  Select,
  Button,
  Pagination,
  Table,
  Tag,
  Space
} from 'antd';
import DetailDrawer from './components/DetailDrawer';
import cs from 'classnames';
import './index.less';

export default function HealthMa0nage() {
  
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [targetAnimal, setTargetAnimal] = useState({});

  const [form] = Form.useForm();
  const onFinish = (values) => {
      console.log('values', values);
  };

  const onSelectChange = selectedRowKeys => {
    setSelectedRowKeys(selectedRowKeys);
  }

  const openDetailDrawer = record => {
    setTargetAnimal(record);
    setDrawerVisible(true);
  }

  const columns = [
    {
      title: '所属养殖场',
      dataIndex: 'farm',
      key: 'farm',
      render: text => <a>{text}</a>,
    },
    {
      title: '设备编号',
      dataIndex: 'device',
      key: 'device',
    },
    {
      title: '品种',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
    },
    {
      title: '日龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '活动',
      dataIndex: 'activity',
      key: 'activity',
    },
    {
      title: '位置',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: '进食',
      dataIndex: 'feed',
      key: 'feed',
    },
    {
      title: '数据更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => openDetailDrawer(record)} >详情</a>
        </Space>
      ),
    },
  ];
  
  const data = [
    {
      key: '1',
      farm: '养殖场001',
      device: 'L1239397123412',
      type: '约克夏鹿',
      sex: '母',
      age: 30,
      activity: '正常',
      position: '正常',
      feed: '正常',
      updateTime: "2020/06/30 12:31"
    },
    {
      key: '2',
      farm: '养殖场001',
      device: 'L1239397123413',
      type: '约克夏鹿',
      sex: '母',
      age: 25,
      activity: '正常',
      position: '正常',
      feed: '正常',
      updateTime: "2020/06/30 12:31"
    },
    {
      key: '3',
      farm: '养殖场001',
      device: 'L1239397123413',
      type: '约克夏鹿',
      sex: '公',
      age: 32,
      activity: '正常',
      position: '正常',
      feed: '正常',
      updateTime: "2020/06/30 12:31"
    },
    {
      key: '4',
      farm: '养殖场001',
      device: 'L1239397123414',
      type: '约克夏鹿',
      sex: '母',
      age: 30,
      activity: '正常',
      position: '正常',
      feed: '正常',
      updateTime: "2020/06/30 12:31"
    },
    {
      key: '5',
      farm: '养殖场001',
      device: 'L1239397123415',
      type: '约克夏鹿',
      sex: '母',
      age: 42,
      activity: '正常',
      position: '正常',
      feed: '正常',
      updateTime: "2020/06/30 12:31"
    },
    {
      key: '6',
      farm: '养殖场001',
      device: 'L1239397123416',
      type: '约克夏鹿',
      sex: '母',
      age: 30,
      activity: '正常',
      position: '正常',
      feed: '正常',
      updateTime: "2020/06/30 12:31"
    },
    {
      key: '7',
      farm: '养殖场001',
      device: 'L1239397123417',
      type: '约克夏鹿',
      sex: '母',
      age: 27,
      activity: '正常',
      position: '正常',
      feed: '正常',
      updateTime: "2020/06/30 12:31"
    },
    {
      key: '8',
      farm: '养殖场001',
      device: 'L1239397123418',
      type: '约克夏鹿',
      sex: '公',
      age: 30,
      activity: '正常',
      position: '正常',
      feed: '正常',
      updateTime: "2020/06/30 12:31"
    },
    {
      key: '9',
      farm: '养殖场002',
      device: 'L1239397123412',
      type: '约克夏鹿',
      sex: '母',
      age: 30,
      activity: '正常',
      position: '正常',
      feed: '正常',
      updateTime: "2020/06/30 12:31"
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div className="health-manage-container">
      <Form
        form={form}
        onFinish={onFinish}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
        className="farm-search-form"
      >
        <Row>
            <Col span={5} >
                <Form.Item 
                    label="选择养殖场" 
                    name="farmName"
                >
                    <Select defaultValue="all">
                        <Select.Option value="all">全部</Select.Option>
                    </Select>
                </Form.Item>
            </Col>
            <Col span={5}>
                <Form.Item label="活动" name="activity" labelCol={{ span: 6 }}>
                    <Select>
                        <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                </Form.Item>
            </Col>
            <Col span={4}>
                <Form.Item label="位置" name="position" labelCol={{ span: 6 }}>
                    <Select>
                        <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                </Form.Item>
            </Col>
            <Col span={4}>
                <Form.Item label="进食" name="food" labelCol={{ span: 6 }}>
                    <Select>
                        <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                </Form.Item>
            </Col>
            <Col span={2}>
              <div className="search-button">
                <Button type="primary" htmlType="submit">
                    查询
                </Button>                      
              </div>
            </Col>
        </Row>
      </Form>
      <div className="health-manage-operator">
        已选择 {selectedRowKeys.length} 项
        <div className="operator-button">
        <Space>
          <Button>
            导出
          </Button>
        </Space>

        </div>
      </div>
      <div className="health-manage-content">
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
      </div>
      <DetailDrawer
        visible={drawerVisible} 
        onClose={() => setDrawerVisible(false)}
      />
    </div>
  )
}