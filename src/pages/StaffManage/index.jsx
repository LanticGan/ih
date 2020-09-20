import React, { useState, useCallback, useEffect  } from 'react';
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
  Space,
  message
} from 'antd';
import CreateStaffDrawer from './components/CreateStaffDrawer';
import JobAssignmentDrawer from './components/JobAssignmentDrawer';
import { getUserList, updateUser, createUser } from '@/services/users';

import cs from 'classnames';
import './index.less';

export default function HealthMa0nage() {
  
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [jobDrawerVisible, setJobDrawerVisible] = useState(false);
  const [userList, setUserList] = useState([]);
  const [targetUser, setTargetUser] = useState({})


  const [form] = Form.useForm();
  const onFinish = (values) => {
    fetchUserList(values);
  };

  const fetchUserList = useCallback(async params => {
    const res = await getUserList({ ...params });
    const { code, message: info, data = {} } = res;
    if (code == 500) {
        message.error(info);
        return;
    }
    const { list = [], currPage, pageSize, totalCount } = data;
    setUserList(list);
  }, []);

  useEffect(() => {
    fetchUserList();
  }, []);

  const onSelectChange = selectedRowKeys => {
    setSelectedRowKeys(selectedRowKeys);
  }

  const openDetailDrawer = record => {
    setTargetUser(record);
    setDrawerVisible(true);
  }

  const openJobAssignmentDrawer = record => {
    setTargetUser(record);
    setJobDrawerVisible(true)
  }

  const onCreateUser = async values => {
    const res = await createUser({ ...values });
      const { code, message: info } = res;
      if (code == 500) {
          message.error(info);
          return;
      }
      setDrawerVisible(false);
      fetchUserList();
      message.success('新增成功');
  }

  const onUpdateUser = async values => {
    const res = await updateUser({ ...values });
      const { code, message: info } = res;
      if (code == 500) {
          message.error(info);
          return;
      }
      setDrawerVisible(false);
      fetchUserList();
      message.success('编辑成功');
  }

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
      render: v => v == '1' ? '男' : '女'
    },
    {
      title: '身份证号',
      dataIndex: 'idCard',
      key: 'idCard',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '职务',
      dataIndex: 'jobTitle',
      key: 'jobTitle',
    },
    {
      title: '账号权限',
      dataIndex: 'role',
      key: 'role',
      render: v => {
        let text;
        if (v == 1) {
          text = '超级管理员'
        } else if (v == 2) {
          text = '管理员'
        } else {
          text = '普通员工'
        }
        return text;
      }
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <div>
        <Space size="middle">
          <a onClick={() => openDetailDrawer(record)} >编辑</ a>
          <a onClick={() => openJobAssignmentDrawer(record)} >分配职务/账号</ a>
        </Space>
        </div>
      ),
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
                  name="phone"
                >
                    <Input /> 
                </Form.Item>
            </Col>
            <Col span={4}>
                <Form.Item label="职务" name="jobTitle" labelCol={{ span: 6 }}>
                    <Input /> 
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
          <Button type="primary" onClick={() => openDetailDrawer(null)}>
            新增人员
          </Button>
          </Space>
        </div>
      </div>
      <div className="health-manage-content">
        <Table rowKey="id" rowSelection={rowSelection} columns={columns} dataSource={userList} />
      </div>
      <CreateStaffDrawer
        visible={drawerVisible} 
        onClose={() => setDrawerVisible(false)}
        onCreateUser={onCreateUser}
        onUpdateUser={onUpdateUser}
        targetUser={targetUser}
      />
      <JobAssignmentDrawer
        visible={jobDrawerVisible} 
        onClose={() => setJobDrawerVisible(false)}
        onUpdateUser={onUpdateUser}
        targetUser={targetUser}
      />
    </div>
  )
}