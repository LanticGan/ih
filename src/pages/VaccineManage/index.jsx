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
  Space,
  message
} from 'antd';
import CreateVaccineDrawer from './components/CreateVaccineDrawer';
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
      dataIndex: 'farm',
      key: 'farm',
      render: text => <a>{text}</a>,
    },
    {
      title: '疫苗名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '注射数量',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: '注射人',
      dataIndex: 'operator',
      key: 'operator',
    },
    {
      title: '注射时间',
      dataIndex: 'time',
      key: 'time',
    },
  ];
  
  const data = [
    {
      key: '1',
      farm: '养殖场001',
      name: '********疫苗',
      number: 120,
      operator: '张思思',
      time: '"2020/06/30 12:31'
    },
    {
      key: '2',
      farm: '养殖场001',
      name: '********疫苗',
      number: 1556,
      operator: '王强',
      time: '"2020/06/30 12:31'
    },{
      key: '3',
      farm: '养殖场001',
      name: '********疫苗',
      number: 23,
      operator: '张思思',
      time: '"2020/06/30 12:31'
    },{
      key: '4',
      farm: '养殖场001',
      name: '********疫苗',
      number: 45,
      operator: '张思思',
      time: '"2020/06/30 12:31'
    },{
      key: '5',
      farm: '养殖场001',
      name: '********疫苗',
      number: 22,
      operator: '张思思',
      time: '"2020/06/30 12:31'
    },{
      key: '6',
      farm: '养殖场001',
      name: '********疫苗',
      number: 120,
      operator: '张思思',
      time: '"2020/06/30 12:31'
    },{
      key: '7',
      farm: '养殖场001',
      name: '********疫苗',
      number: 1132,
      operator: '张思思',
      time: '"2020/06/30 12:31'
    },{
      key: '8',
      farm: '养殖场001',
      name: '********疫苗',
      number: 18,
      operator: '张思思',
      time: '"2020/06/30 12:31'
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onOk = () => {
    setDrawerVisible(false);
    message.success('新增成功');
  }

  return (
    <div className="health-manage-container">
      <div className="health-manage-operator">
        已选择 {selectedRowKeys.length} 项
        <div className="operator-button">
          <Space>
            <Button>
              批量导出
            </Button>
            <Button type="primary" onClick={() => {setDrawerVisible(true)}}>
              疫苗录入
            </Button>
          </Space>
          
        </div>
      </div>
      <div className="health-manage-content">
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
      </div>
      <CreateVaccineDrawer
        visible={drawerVisible} 
        onClose={() => setDrawerVisible(false)}
        onOk={onOk}
      />
    </div>
  )
}