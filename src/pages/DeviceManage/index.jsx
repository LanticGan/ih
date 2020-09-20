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
  InputNumber,
  Upload
} from 'antd';
import { getDeviceList } from '@/services/device';
import { getFarmOptions } from '@/services/farm';
import { exportAnimal } from '@/services/animal';
import cs from 'classnames';
import './index.less';

export default function HealthMa0nage() {
  
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deviceList, setDeviceList] = useState([]);
  const [farmOptions, setFarmOptions] = useState([]);
  const [paging, setPaging] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

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

  const exportAll = useCallback(async params => {
    const res = await exportAnimal({});
    const { code, message: info, data = {} } = res;
    if (code == 500) {
        message.error(info);
        return;
    }
    console.log('res', res);
  }, [])

  const fetchDeviceList = useCallback(async params => {
    const res = await getDeviceList({ ...params });
    const { code, message: info, data = {} } = res;
    if (code == 500) {
        message.error(info);
        return;
    }
    const { list = [], currPage, pageSize, totalCount } = data;
    setDeviceList(list);
    setPaging({
      ...paging,
      current: currPage,
      total: totalCount,
    })
  }, []);

    useEffect(() => {
      fetchDeviceList();
    }, []);

  const fetchFarmOptions = useCallback(async () => {
      const res = await getFarmOptions({companyId: 1});
      const { code, message: info, data = {} } = res;
      if (code == 500) {
          message.error(info);
          return;
      }
      const { list = [] } = data;
      const farmOptions = list.map(({ farmName, id }) => ({
          label: farmName,
          value: id
      }));
      setFarmOptions(farmOptions);
  }, []);

  useEffect(() => {
    fetchFarmOptions();
  }, [])

  const confirmUnbind = () => {
    setShowModal(true);
  }

  const changePagination = v => {
    const { current } = v;
    fetchDeviceList({ pageNum: current });
  }

  const download = () => {
    window.open('//47.110.59.191/uploadTemplate/device_template.xlsx')
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

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onOk = () => {
    message.success('解绑成功')
    setShowModal(false);
  }

  const uplaodProps = {
    name: 'animals',
    action: '/yunmu/api/animal/importAnimal',
    headers: {
      authorization: 'authorization-text',
    },
    showUploadList: false,
    onChange(info = {}) {
      const { file = {} } = info
      const { status, name } = file
      if (status === 'done') {
        const { response = {} } = file
        const { code, message: msg } = response;
        if (code == 500) {
          message.error(msg);
        } else {
          message.success('导入成功');
          fetchDeviceList();
        }
      } else if (status === 'error') {
        message.error(`${name} 导入失败.`);
      }
    },
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
                    name="farmId"
                >
                    <Select allowClear options={farmOptions}>
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
        {/* 已选择 {selectedRowKeys.length} 项 */}
        <div className="operator-button">
          <Space>
            <Button onClick={exportAll}>
              导出
            </Button>
            <Button onClick={download}>
              模板下载
            </Button>
            <Upload {...uplaodProps}>
              <Button>
                批量导入
              </Button>
            </Upload>
          </Space>

        </div>
      </div>
      <div className="health-manage-content">
        <Table 
          rowKey="id" 
          columns={columns} 
          dataSource={deviceList}
          pagination={paging}
          onChange={changePagination}
        />
      </div>
      <div>
        <Modal visible={showModal} onCancel={() => {setShowModal(false)}} onOk={onOk}>
          确定解绑吗？
        </Modal>
      </div>
    </div>
  )
}