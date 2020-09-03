import React, { useState } from 'react';
import {
  Form, 
  Row, 
  Col,
  Select,
  Button,
  Pagination,
  Table,
  Input,
  Tag,
  Space
} from 'antd';
import CreateStaffDrawer from './components/CreateStaffDrawer';
import JobAssignmentDrawer from './components/JobAssignmentDrawer'
import cs from 'classnames';
import './index.less';

export default function HealthMa0nage() {
  
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [jobDrawerVisible, setJobDrawerVisible] = useState(false);

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
      render: text => <a>{text}</ a>,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
    },
    {
      title: '身份证号',
      dataIndex: 'identify',
      key: 'identify',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '职务',
      dataIndex: 'rule',
      key: 'rule',
    },
    {
      title: '账号权限',
      dataIndex: 'authority',
      key: 'authority',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <div>
        <Space size="middle">
          <a onClick={() => openDetailDrawer(record)} >编辑</ a>
          <a onClick={() => setJobDrawerVisible(true)} >分配职务/账号</ a>
        </Space>
        </div>
      ),
    },
  ];
  
  const data = [
    {
      key: '1',
      farm: '001号养殖场',
      name: '张思思',
      sex: '女',
      identify: '452701198706212711',
      age: 32,
      phone: '15733829982',
      rule: '兽医',
      authority: '员工权限'
    },
    {
      key: '2',
      farm: '001号养殖场',
      name: '王强',
      sex: '男',
      identify: '543201198706212711',
      age: 32,
      phone: '18634821982',
      rule: '饲养员',
      authority: '员工权限'
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
                    label="姓名" 
                    name="name"
                >
                    <Input /> 
                </Form.Item>
            </Col>
            <Col span={5}>
                <Form.Item 
                  label="手机号" 
                  name="number"
                >
                    <Input /> 
                </Form.Item>
            </Col>
            <Col span={4}>
                <Form.Item label="职务" name="position" labelCol={{ span: 6 }}>
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
            批量导出
          </Button>
          <Button type="primary" onClick={() => {setDrawerVisible(true)}}>
            新增人员
          </Button>
          </Space>
        </div>
      </div>
      <div className="health-manage-content">
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
      </div>
      <CreateStaffDrawer
        visible={drawerVisible} 
        onClose={() => setDrawerVisible(false)} 
      />
      <JobAssignmentDrawer
        visible={jobDrawerVisible} 
        onClose={() => setJobDrawerVisible(false)} 
      />
    </div>
  )
}