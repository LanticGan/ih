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
      dataIndex: 'farm',
      key: 'farm',
    },
    {
      title: '合同编号',
      dataIndex: 'agreement',
      key: 'agreement',
    },
    {
      title: '签约时间',
      dataIndex: 'time',
      key: 'time',
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
      name: '农户XXXXXXXXXXXX',
      farm: '001号养殖场',
      agreement: 'L1231235512341',
      time: '2020/06/30 12:31',
    },
    {
      key: '2',
      name: '农户XXXXXXXXXXXX',
      farm: '001号养殖场',
      agreement: 'L1231235512321',
      time: '2020/06/30 12:31',
    },
    {
      key: '3',
      name: '农户XXXXXXXXXXXX',
      farm: '001号养殖场',
      agreement: 'L1234445512341',
      time: '2020/06/30 12:31',
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