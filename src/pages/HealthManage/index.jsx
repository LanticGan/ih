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

  const [form] = Form.useForm();
  const onFinish = (values) => {
      console.log('values', values);
  };

  const onSelectChange = selectedRowKeys => {
    setSelectedRowKeys(selectedRowKeys);
  }

  const openDetailDrawer = record => {
    setDrawerVisible(true);
  }

  const columns = [
    {
      title: '所属养殖场',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: '设备编号',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '品种',
      dataIndex: 'address',
      key: 'address',
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
      title: '日龄',
      dataIndex: 'dailyAge',
      key: 'dailyAge',
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
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
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
                    <Select>
                        <Select.Option value="demo">Demo</Select.Option>
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
          <Button>
            批量导出
          </Button>
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