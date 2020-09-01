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
import CreatePartnerDrawer from './components/CreatePartnerDrawer';
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
      title: '合作方',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: '养殖场名称',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '合同编号',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '签约时间',
      dataIndex: 'sex',
      key: 'sex',
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
          <Button type="primary" onClick={() => {setDrawerVisible(true)}}>
            新增合作方
          </Button>
        </div>
      </div>
      <div className="health-manage-content">
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
      </div>
      <CreatePartnerDrawer
        visible={drawerVisible} 
        onClose={() => setDrawerVisible(false)} 
      />
    </div>
  )
}