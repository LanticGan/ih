import React, { useState, useCallback, useEffect } from 'react';
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
  message,
  Input
} from 'antd';
import CreateVaccineDrawer from './components/CreateVaccineDrawer';
import { getVaccineList, createVaccine } from '@/services/vaccine'
import cs from 'classnames';
import './index.less';

export default function VaccineManage() {
  
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [vaccineList, setVaccineList] = useState([]);


  const [form] = Form.useForm();

  const onFinish = (values) => {
    fetchVaccineList(values);
  };

  const onSelectChange = selectedRowKeys => {
    setSelectedRowKeys(selectedRowKeys);
  }

  const openDetailDrawer = record => {
    setDrawerVisible(true);
  }

  const onOk = async (values) => {
    const res = await createVaccine({ ...values, farmId: 2 });
    const { code, message: info } = res;
    if (code == 500) {
        message.error(info);
        return;
    }

    setDrawerVisible(false);
    fetchVaccineList();
    message.success('新增成功');
};

  const fetchVaccineList = useCallback(async params => {
    const res = await getVaccineList({ ...params });
    const { code, message: info, data = {} } = res;
    if (code == 500) {
        message.error(info);
        return;
    }
    const { list = [], currPage, pageSize, totalCount } = data;
    setVaccineList(list);
  }, []);

  useEffect(() => {
    fetchVaccineList();
  }, []);

  const columns = [
    {
      title: '所属养殖场',
      dataIndex: 'farmName',
      key: 'farmName',
    },
    {
      title: '疫苗名称',
      dataIndex: 'vaccineName',
      key: 'vaccineName',
    },
    {
      title: '注射数量',
      dataIndex: 'nums',
      key: 'nums',
    },
    {
      title: '注射人',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '注射时间',
      dataIndex: 'vaccineTime',
      key: 'vaccineTime',
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
                <Form.Item label="疫苗名称" name="vaccineName" labelCol={{ span: 6 }}>
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
            <Button type="primary" onClick={() => {setDrawerVisible(true)}}>
              疫苗录入
            </Button>
          </Space>
          
        </div>
      </div>
      <div className="health-manage-content">
        <Table rowKey="id" rowSelection={rowSelection} columns={columns} dataSource={vaccineList} />
      </div>
      <CreateVaccineDrawer
        visible={drawerVisible} 
        onClose={() => setDrawerVisible(false)}
        onOk={onOk}
      />
    </div>
  )
}