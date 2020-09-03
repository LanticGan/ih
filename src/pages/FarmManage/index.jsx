import React, { useState } from 'react';
import {
    Form, 
    Row, 
    Col,
    Select,
    Button,
    Pagination
 } from 'antd';
import CreateFarmDrawer from './components/CreateFarmDrawer';
import FarmCard from '@/components/FarmCard';
import cs from 'classnames';
import './index.less';

const mockFarmData = [
    {
        title: '001号养殖场',
        count: 1675,
        hdyc: 7,
        jwzyc: 2,
        jsyc: 2,
        sbddl: 2,
        isAbnormal: false
    },
    {
        title: '002号养殖场',
        count: 1675,
        hdyc: 7,
        jwzyc: 2,
        jsyc: 2,
        sbddl: 2,
        isAbnormal: false
    },
    {
        title: '003号养殖场',
        count: 1675,
        hdyc: 7,
        jwzyc: 2,
        jsyc: 2,
        isAbnormal: true
    },
    {
        title: '004号养殖场',
        count: 1675,
        hdyc: 0,
        jwzyc: 0,
        jsyc: 0,
        sbddl: 0,
        isAbnormal: false
    }
]

const FarmContentCard = (props) => {
    const { data = {} } = props;
    return (
        <Col span={8} className="farm-card-col">
            <FarmCard data={data} />
        </Col>
    )
}


const FarmManage = () => {

    const [form] = Form.useForm();
    const [drawerVisible, setDrawerVisible] = useState(false);

    const onFinish = (values) => {
        console.log('values', values);
    };
    
    return (
        <div className="farm-manage-container">
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
                            <Select>
                                <Select.Option value="demo">Demo</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item label="活动" name="activity" labelCol={{ span: 6 }}>
                            <Select>
                                <Select.Option value="demo">Demo</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item label="位置" name="position" labelCol={{ span: 6 }}>
                            <Select>
                                <Select.Option value="demo">Demo</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item label="进食" name="food" labelCol={{ span: 6 }}>
                            <Select>
                                <Select.Option value="demo">Demo</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item label="设备电量" name="deviceCharge">
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
            <div className="operate-area">
                <Button type="primary" onClick={() => setDrawerVisible(true)}>
                    新增养殖场
                </Button>
                <Pagination  defaultCurrent={1} total={50} />
            </div>
            <div className="content-area">
                <Row gutter={16}>
                    {mockFarmData.map(d => (
                        <FarmContentCard data={d} />
                    ))}
                </Row>
            </div>
            <CreateFarmDrawer visible={drawerVisible} onClose={() => setDrawerVisible(false)} />
        </div>

    )
}

export default FarmManage;