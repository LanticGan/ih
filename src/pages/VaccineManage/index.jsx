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
import { getFarmOptions } from '@/services/farm';
import { stringify } from '@/utils/utils';

import { getVaccineList, createVaccine, exportVaccine } from '@/services/vaccine';
import { getAnimalList } from '@/services/animal';
import cs from 'classnames';
import './index.less';

const vaccineTypeMap = {
  1000001: '猪瘟弱毒苗',
  1000002: '兰耳病弱毒苗',
  1000003: '伪狂犬病弱毒疫苗',
  1000004: '气喘病灭活菌苗',
  1000005: '猪瘟疫苗',
  1000006: '口蹄疫疫苗'
};

const vaccineColumns = [
  {
    title: '疫苗名称',
    dataIndex: 'vaccineName',
    key: 'vaccineName',
    
  },
  {
    title: '疫苗类型',
    dataIndex: 'vaccineType',
    key: 'vaccineType',
    render: (v, record) => {
      const vaccineType = vaccineTypeMap[v] || '其他';
      return vaccineType;
    }
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

const expandedRowRender = ({ vaccineDTOS = [] }) => {
  return <Table rowKey="id" columns={vaccineColumns} dataSource={vaccineDTOS} pagination={false}size="small" />;
}

export default function VaccineManage() {
  
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [vaccineList, setVaccineList] = useState([]);
  const [animalList, setAnimalList] = useState([]);
  const [farmOptions, setFarmOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paging, setPaging] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    position: ['topRight']
  });
  const [targetAnimal, setTargetAnimal] = useState({});

  const [form] = Form.useForm();

  const onFinish = (values) => {
    fetchVaccineList(values);
  };

  const onSelectChange = selectedRowKeys => {
    setSelectedRowKeys(selectedRowKeys);
  }

  const openDetailDrawer = record => {
    setTargetAnimal(record);
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

  const fetchVaccineList = useCallback(async params => {
    setLoading(true);
    const res = await getVaccineList({ ...params });
    setLoading(false);
    const { code, message: info, data = {} } = res;
    if (code == 500) {
        message.error(info);
        return;
    }
    const { list = [], currPage, pageSize, totalCount } = data;
    setVaccineList(list);
    setPaging({
      ...paging,
      current: currPage,
      total: totalCount,
    });
  }, []);

  const changePagination = v => {
    const { current } = v;
    fetchVaccineList({ pageNum: current });
  }

  const exportVa = async () => {
    const url = `/yunmu/api/vaccine/export?${stringify(form.getFieldsValue())}`;
    location.href = url;
  }

  
  useEffect(() => {
    fetchVaccineList();
  }, []);

  const animalColumns = [
    {
      title: '牲畜id',
      dataIndex: 'id',
      key: 'id',
    },
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
      title: '日龄',
      dataIndex: 'dailyAges',
      key: 'dailyAges',
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 120,
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => openDetailDrawer(record)} >疫苗录入</a>
        </Space>
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
        wrapperCol={{ span: 16 }}
        className="farm-search-form"
        loading={loading}
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
                <Form.Item label="疫苗类型" name="vaccineName">
                  <Input />
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item label="日龄" name="dailyAges">
                  <Input />
                </Form.Item>
            </Col>
            <Col span={4}>
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
            <Button onClick={exportVa}>
              导出
            </Button>
            {/* <Button type="primary" onClick={() => {setDrawerVisible(true)}}>
              疫苗录入
            </Button> */}
          </Space>
          
        </div>
      </div>
      <div className="health-manage-content">
        {/* rowSelection={rowSelection} */}
        {/* <Table 
          rowKey="id" 
          columns={columns} 
          dataSource={vaccineList}
          pagination={paging}
          onChange={changePagination}
          rowSelection={rowSelection}
          loading={loading}
          size="small"
        /> */}
        <Table 
          rowKey="id" 
          columns={animalColumns} 
          dataSource={vaccineList}
          pagination={paging}
          onChange={changePagination}
          rowSelection={rowSelection}
          expandable={{ 
            expandedRowRender,
            rowExpandable: ({vaccineDTOS = []}) => true,
          }}
          loading={loading}
          size="small"
        />
      </div>
      <CreateVaccineDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        targetAnimal={targetAnimal}
        onOk={onOk}
      />
    </div>
  )
}