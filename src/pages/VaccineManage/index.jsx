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
import CreateFarmDrawer from './components/CreateFarmDrawer';
import cs from 'classnames';
import './index.less';

export default function VaccineManage() {
  
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
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
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
      <div className="health-manage-operator">
        已选择 {selectedRowKeys.length} 项
        <div className="operator-button">
          <Button>
            批量导出
          </Button>
          <Button type="primary" onClick={() => {setDrawerVisible(true)}}>
            疫苗录入
          </Button>
        </div>
      </div>
      <div className="health-manage-content">
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
      </div>
      <CreateFarmDrawer
        visible={drawerVisible} 
        onClose={() => setDrawerVisible(false)} 
      />
    </div>
  )
}