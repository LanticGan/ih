import React, { useState, useCallback  } from 'react';
import {
  Form, 
  Row, 
  Col,
  Select,
  Button,
  Pagination,
  Table,
  Tag,
  Space, message
} from 'antd';
import DetailDrawer from './components/DetailDrawer';
import { getAnimalList, getAnimalDetail } from '@/services/animal';
import { getFarmOptions } from '@/services/farm';
import { getPageQuery } from '@/utils/utils';

import cs from 'classnames';
import './index.less';
import { useEffect } from 'react';

export default function HealthMa0nage() {
  
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [targetAnimal, setTargetAnimal] = useState({});
  const [animalList, setAnimalList] = useState([]);
  const [farmOptions, setFarmOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paging, setPaging] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    position: ['topRight']
  })

  const [form] = Form.useForm();
  const onFinish = (values) => {
    fetchAnimalList(values)
  };

  const onSelectChange = selectedRowKeys => {
    setSelectedRowKeys(selectedRowKeys);
  }

  const openDetailDrawer = record => {
    setTargetAnimal(record);
    setDrawerVisible(true);
  }

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
    farmOptions.unshift({
      label: '全部',
      value: ''
    })
    setFarmOptions(farmOptions);
}, []);

  useEffect(() => {
    fetchFarmOptions();
  }, [])

  useEffect(() => {
    const params = getPageQuery() || {};
    const farmId = params['farmId']
    if (farmId && farmOptions.length > 0) {
      form.setFieldsValue({ farmId: Number(farmId) });
      form.submit();
    }
  }, [farmOptions])

  const fetchAnimalList = useCallback(async params => {
    setLoading(true);
    const res = await getAnimalList({ ...params });
    setLoading(false);
    const { code, message: info, data = {} } = res;
    if (code == 500) {
        message.error(info);
        return;
    }
    const { list = [], currPage, pageSize, totalCount } = data;
    setAnimalList(list);
    setPaging({
      ...paging,
      current: currPage,
      total: totalCount,
    })
  }, []);

  useEffect(() => {
    fetchAnimalList();
  }, [])

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
    // {
    //   title: '品种',
    //   dataIndex: 'animalBreed',
    //   key: 'animalBreed',
    // },
    // {
    //   title: '性别',
    //   dataIndex: 'animalSex',
    //   key: 'animalSex',
    //   render: v => v == '1' ? '母' : '公'
    // },
    {
      title: '活动',
      dataIndex: 'activity',
      key: 'activity',
      render: v => {
        let text = "";
        if (v == '0') {
          text = '正常'
        } else if (v == '1') {
          text = <span className="abnormal-color">偏少</span>
        } else {
          text = <span className="abnormal-color">异常</span>
        }
        return text;
      }
    },
    {
      title: '进食',
      dataIndex: 'eat',
      key: 'eat',
      render: v => {
        let text = "";
        if (v == '0') {
          text = '正常'
        } else if (v == '1') {
          text = <span className="abnormal-color">偏少</span>
        } else {
          text = <span className="abnormal-color">异常</span>
        }
        return text;
      }
    },
    {
      title: '位置',
      dataIndex: 'location',
      key: 'location',
      render: v => {
        let text = "";
        if (v == '0') {
          text = '正常'
        } else if (v == '1') {
          text =  <span className="abnormal-color">偏少</span>
        } else {
          text = <span className="abnormal-color">异常</span>
        }
        return text;
      }
    },
    {
      title: '日龄',
      dataIndex: 'dailyAges',
      key: 'dailyAges',
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

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const changePagination = v => {
    const { current } = v;
    fetchAnimalList({ pageNum: current });
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
                    name="farmId"
                >
                    <Select allowClear options={farmOptions}>
                    </Select>
                </Form.Item>
            </Col>
            <Col span={5}>
                <Form.Item label="活动" name="activity" labelCol={{ span: 6 }}>
                    <Select allowClear>
                        <Select.Option value="0">正常</Select.Option>
                        <Select.Option value="1">偏少</Select.Option>
                        <Select.Option value="2">异常</Select.Option>

                    </Select>
                </Form.Item>
            </Col>
            <Col span={4}>
                <Form.Item label="位置" name="location" labelCol={{ span: 6 }}>
                    <Select allowClear>
                    <Select.Option value="0">正常</Select.Option>
                        <Select.Option value="1">围栏内</Select.Option>
                        <Select.Option value="2">围栏外</Select.Option>                   
                    </Select>
                </Form.Item>
            </Col>
            <Col span={4}>
                <Form.Item label="进食" name="eat" labelCol={{ span: 6 }}>
                    <Select allowClear>
                    <Select.Option value="0">正常</Select.Option>
                        <Select.Option value="1">偏少</Select.Option>
                        <Select.Option value="2">异常</Select.Option>                    
                    </Select>
                </Form.Item>
            </Col>
            <Col span={4}>
                <Form.Item label="体温" name="template" labelCol={{ span: 6 }}>
                    <Select allowClear>
                    <Select.Option value="0">正常</Select.Option>
                    <Select.Option value="1">偏高</Select.Option>
                    <Select.Option value="2">异常</Select.Option>                    
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
        {/* 已选择 {selectedRowKeys.length} 项 */}
        <div className="operator-button">
        <Space>
          {/* <Button onClick={() => message.error('导出失败')}>
            导出
          </Button> */}
        </Space>

        </div>
      </div>
      <div className="health-manage-content">
        <Table 
          rowKey="id" 
          columns={columns} 
          dataSource={animalList}
          pagination={paging}
          onChange={changePagination}
          loading={loading}
          size="small"
        />
      </div>
      <DetailDrawer
        targetAnimal={targetAnimal}
        visible={drawerVisible} 
        onClose={() => setDrawerVisible(false)}
      />
    </div>
  )
}