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
  message
} from 'antd';
import { updateConfig, getConfig } from '@/services/params';

import './index.less';

export default function HealthMa0nage() {
  
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const [form] = Form.useForm();

  const updateParams = useCallback(async params => {
    const res = await updateConfig({ type: 1, content: params });
    const { code, message: info, data = {} } = res;
    if (code == 500) {
        message.error(info);
        return;
    } else {
      message.success('保存成功')
    }
  }, []);

  const getParams = useCallback(async () => {
    const res = await getConfig({ type: 1 });
    const { code, message: info, data = {} } = res;
    if (code == 500) {
      message.error(info);
      return;
    }
    const { content } = data;
    form.setFieldsValue(content)
  }, []);

  useEffect(() => {
    getParams();
  }, [])

  const onFinish = (values) => {
    updateParams(values);
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
                    label="采集频次" 
                    name="collectRate"
                >
                    <Select>
                        <Select.Option value={1}>每小时1次</Select.Option>
                        <Select.Option value={2}>2小时1次</Select.Option>

                    </Select>
                </Form.Item>
            </Col>
            <Col span={5}>
                <Form.Item label="上传频次" name="uploadRate" labelCol={{ span: 6 }}>
                    <Select>
                    <Select.Option value={1}>4小时1次</Select.Option>
                    <Select.Option value={2}>8小时1次</Select.Option>
                    </Select>
                </Form.Item>
            </Col>
            <Col span={2}>
              <div className="search-button">
                <Button type="primary" htmlType="submit">
                    保存
                </Button>                      
              </div>
            </Col>
        </Row>
      </Form>
    </div>
  )
}