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
  Space, 
  message,
  Modal,
  Upload
} from 'antd';
import DetailDrawer from './components/DetailDrawer';
import { getAnimalList, getAnimalDetail, deleteAnimal } from '@/services/animal';
import { getFarmOptions } from '@/services/farm';
import { getPageQuery, stringify } from '@/utils/utils';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import cs from 'classnames';
import './index.less';
import { useEffect } from 'react';

const { confirm } = Modal;

export default function HealthManage() {
  
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

  const confirmDeleteAnimal = async (confirmDeleteAnimal) => {
    const res = await deleteAnimal({animalIds: confirmDeleteAnimal});
    const { code, message: info } = res;
    if (info) {
      message.error(info);
      return;
    }
    message.success('删除成功');
    form.submit();
  }

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
      title: '牲畜编号',
      dataIndex: 'animalNo',
      key: 'animalNo',
      render: (text, record) => (
          <a onClick={() => openDetailDrawer(record)}>{text}</a>
      ),
    },
    {
      title: '圈舍编号',
      dataIndex: 'houseNo',
      key: 'houseNo',
    },
    {
      title: '设备编号',
      dataIndex: 'equipmentNo',
      key: 'equipmentNo',
    },
    {
      title: '体温(℃)',
      dataIndex: 'temperatureValue',
      key: 'temperatureValue',
      render: (v, record) => {
        const { temperature } = record;
        let text = "-";
        if (temperature == '100') {
          text = v
        } else if (temperature == '99') {
        text = <span className="low-abnormal-color">{v}</span>
        } else  if (temperature == '98') {
        text = <span className="abnormal-color">{v}</span>
        }
        return text;
      }
    },
    {
      title: '活动(千步)',
      dataIndex: 'activity',
      key: 'activity',
      render: (v, record) => {
        const { activityValue } = record;
        let text = "-";
        if (activityValue == '100') {
          text = v
        } else if (activityValue == '99') {
        text = <span className="low-abnormal-color">{v}</span>
        } else  if (activityValue == '98') {
        text = <span className="abnormal-color">{v}</span>
        }
        return text;
      }
    },
    {
      title: '进食(次)',
      dataIndex: 'eatValue',
      key: 'eatValue',
      render: v => {
        return v
      }
    },
    {
      title: '位置',
      dataIndex: 'location',
      key: 'location',
      render: v => {
        let text = "-";
        if (v == '100') {
          text = '围栏内'
        } else if (v == '99') {
          text = <span className="abnormal-color">围栏外</span>
        }
        return text;
      }
    },
    {
      title: '发情',
      dataIndex: 'oestrus',
      key: 'oestrus',
      render: v => {
        let text = "-";
        if (v == '100') {
          text = '否'
        } else if (v == '99') {
          text = <span className="abnormal-color">是</span>
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
      fixed: 'right',
      width: 120,
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => openDetailDrawer(record)} >详情</a>
          {/* <a onClick={() => confirmDelete(record)} >删除</a> */}
        </Space>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const changePagination =  (page, pageSize) => {
    fetchAnimalList({ pageNum: page, pageSize})
  }

  const confirmDelete = () => {
    if (selectedRowKeys.length === 0) {
      message.error('请选择一条记录');
      return;
    }
    confirm({
      title: '确认删除吗?',
      icon: <ExclamationCircleOutlined />,
      okText: '是',
      cancelText: '否',
      onOk() {
        confirmDeleteAnimal(selectedRowKeys);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
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

  const exportAll = () => {
    const url = `/yunmu/api/animal/export?${stringify(form.getFieldsValue())}`;
    location.href = url;
  }

  return (
    <div className="health-manage-container">
      <Form
        form={form}
        onFinish={onFinish}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        className="farm-search-form"
      >
        <Row>
            <Col span={6} >
                <Form.Item 
                    label="选择养殖场" 
                    name="farmId"
                >
                    <Select 
                      allowClear 
                      options={farmOptions}
                      showSearch
                      filterOption={(input, option) =>
                        option.label.includes(input)
                      }
                    >
                    </Select>
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item label="活动" name="activity">
                    <Select allowClear>
                        <Select.Option value="-1">全部</Select.Option>
                        <Select.Option value="100">正常</Select.Option>
                        <Select.Option value="99">偏低</Select.Option>
                        <Select.Option value="98">偏高</Select.Option>
                    </Select>
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item label="位置" name="location">
                    <Select allowClear>
                    <Select.Option value="-1">全部</Select.Option>
                        <Select.Option value="100">围栏内</Select.Option>
                        <Select.Option value="99">围栏外</Select.Option>                   
                    </Select>
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item label="进食" name="eat">
                    <Select allowClear>
                    <Select.Option value="-1">全部</Select.Option>
                    <Select.Option value="100">正常</Select.Option>
                        <Select.Option value="99">偏低</Select.Option>
                        <Select.Option value="98">偏高</Select.Option>                    
                    </Select>
                </Form.Item>
            </Col>
        </Row>
        <Row>
          <Col span={6}>
            <Form.Item label="体温" name="temperature">
              <Select allowClear>
                <Select.Option value="-1">全部</Select.Option>
                <Select.Option value="100">正常</Select.Option>
                <Select.Option value="99">偏低</Select.Option>
                <Select.Option value="98">偏高</Select.Option>                   
              </Select>
          </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="发情" name="oestrus">
                <Select allowClear>
                <Select.Option value="-1">全部</Select.Option>
                <Select.Option value="99">是</Select.Option>
                <Select.Option value="100">否</Select.Option>                  
                </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <div className="search-button">
              <Button type="primary" htmlType="submit">
                  查询
              </Button>                      
            </div>
          </Col>
        </Row>
      </Form>
      <div className="health-manage-operator">
        <div className="operator-button">
          <div className="total-select">
            已选择 {selectedRowKeys.length} 项
          </div>
        <Space>
        {/* <Button onClick={confirmDelete}>
            删除
          </Button> */}
           <Button onClick={confirmDelete}>
            删除
          </Button>
          <Button onClick={exportAll}>
            导出
          </Button>
          <Upload {...uplaodProps}>
            <Button>
              批量导入
            </Button>
          </Upload>
          <Button onClick={() =>  location.href = '//uploadTemplate/animal_template.xlsx'}>
            模板下载
          </Button>
        </Space>
        </div>
        <Pagination  defaultCurrent={1} current={paging.current} pageSize={paging.pageSize} total={paging.total} onChange={changePagination} />
      </div>
      <div className="health-manage-content">
        <Table 
          rowKey="id" 
          columns={columns} 
          dataSource={animalList}
          pagination={false}
          // onChange={changePagination}
          rowSelection={rowSelection}
          scroll={{ x: 1400 }}
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