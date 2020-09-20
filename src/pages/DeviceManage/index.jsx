import React, { useState, useEffect, useCallback  } from 'react';
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
  Modal,
  message,
  InputNumber
} from 'antd';
import { getDeviceList } from '@/services/device';
import cs from 'classnames';
import './index.less';

export default function HealthMa0nage() {
  
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deviceList, setDeviceList] = useState([]);

  const [form] = Form.useForm();
  const onFinish = (values) => {
    fetchDeviceList(values);
  };

  const onSelectChange = selectedRowKeys => {
    setSelectedRowKeys(selectedRowKeys);
  }

  const openDetailDrawer = record => {
    setDrawerVisible(true);
  }

  const fetchDeviceList = useCallback(async params => {
    const res = await getDeviceList({ ...params });
    const { code, message: info, data = {} } = res;
    if (code == 500) {
        message.error(info);
        return;
    }
    const { list = [], currPage, pageSize, totalCount } = data;
    setDeviceList(list);
  }, []);

  useEffect(() => {
    fetchDeviceList();
  }, []);

  const confirmUnbind = () => {
    setShowModal(true);
  }

  const columns = [
    {
      title: '所属养殖场',
      dataIndex: 'farmName',
      key: 'farmName',
    },
    {
      title: '设备编号',
      dataIndex: 'equipmentNo',
      key: 'equipmentNo',
    },
    {
      title: '设备状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '设备电量',
      dataIndex: 'battery',
      key: 'battery',
    },
    // {
    //   title: '操作',
    //   key: 'action',
    //   render: (text, record) => (
    //     <Space size="middle">
    //       <a onClick={confirmUnbind}>设备解绑</a>
    //     </Space>
    //   ),
    // },
  ];
  
  const data = [
    {
      key: '1',
      farm: '001号养殖场',
      device: 'L1239397123412',
      status: '绑定',
      charge: '90%',
    },
    {
      key: '2',
      farm: '001号养殖场',
      device: 'L1239397123413',
      status: '绑定',
      charge: '60%',
    },{
      key: '3',
      farm: '001号养殖场',
      device: 'L1239397123414',
      status: '绑定',
      charge: '75%',
    },{
      key: '4',
      farm: '001号养殖场',
      device: 'L1239397123415',
      status: '绑定',
      charge: '90%',
    },{
      key: '5',
      farm: '001号养殖场',
      device: 'L1239397123416',
      status: '绑定',
      charge: '90%',
    },{
      key: '6',
      farm: '002号养殖场',
      device: 'L1239397123417',
      status: '绑定',
      charge: '85%',
    },
    {
      key: '7',
      farm: '002号养殖场',
      device: 'L1239397123418',
      status: '绑定',
      charge: '85%',
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onOk = () => {
    message.success('解绑成功')
    setShowModal(false);
  }

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
                <Form.Item label="设备电量" name="battery" labelCol={{ span: 6 }}>
                  <InputNumber mix={0} max={100} />
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
            <Button type="primary">
              批量导入
            </Button>
          </Space>

        </div>
      </div>
      <div className="health-manage-content">
        <Table rowKey="id" rowSelection={rowSelection} columns={columns} dataSource={deviceList} />
      </div>
      <div>
        <Modal visible={showModal} onCancel={() => {setShowModal(false)}} onOk={onOk}>
          确定解绑吗？
        </Modal>
      </div>
    </div>
  )
}