import React, { useState, useCallback, useEffect  } from 'react';
import { history, connect } from 'umi';
import {
    Form, 
    Row, 
    Col,
    Select,
    Button,
    Pagination,
    message
 } from 'antd';
import CreateFarmDrawer from './components/CreateFarmDrawer';
import FarmCard from '@/components/FarmCard';
import { getFarmList, createFarm, getFarmOptions } from '@/services/farm';
import cs from 'classnames';
import './index.less';

const FarmContentCard = (props) => {
    const { data = {} } = props;
    const { id } = data;
    return (
        <Col span={8} className="farm-card-col" onClick={() => history.push(`/animal-manage/health-manage?farmId=${id}` )}>
            <FarmCard data={data} />
        </Col>
    )
}


const FarmManage = (props) => {

    const [form] = Form.useForm();
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [page, setPage] = useState({
        current: 1,
        total: 0,
        pageSize: 10,
    });
    const [famrList, setFarmList] = useState([]);
    const [farmOptions, setFarmOptions] = useState([]);
    const { companyDetail = {} } = props;
    const { companyId } = companyDetail;

    const onFinish = (values) => {
        fetchFarmList({ companyId, ...values })
    };

    const onOK = async (values) => {
        const res = await createFarm({ ...values, companyId });
        const { code, message: info } = res;
        if (code == 500) {
            message.error(info);
            return;
        }
        setDrawerVisible(false);
        fetchFarmList({ companyId })
        message.success('新增成功');
    };

    const fetchFarmList = useCallback(async params => {
        const res = await getFarmList({ companyId, ...params });
        const { code, message: info, data = {} } = res;
        if (code == 500) {
            message.error(info);
            return;
        }
        const { list = [], currPage, pageSize, totalCount } = data;
        setFarmList(list);
        setPage({
            current: currPage,
            pageSize,
            total: totalCount
        });
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

    const changePage = (page, pageSize) => {
        fetchFarmList({ pageNum: page, pageSize})
    }

    useEffect(() => {
        fetchFarmOptions();
    }, [])

    useEffect(() => {
        fetchFarmList({ companyId })
    }, [companyId])

    
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
                            name="farmId"
                        >
                            <Select allowClear options={farmOptions}>
                            </Select>
                        </Form.Item>
                    </Col>
                    {/* <Col span={5}>
                        <Form.Item label="活动" name="activity" labelCol={{ span: 6 }} allowClear>
                            <Select>
                                <Select.Option value="normal">正常</Select.Option>
                                <Select.Option value="demo">异常</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item label="位置" name="position" labelCol={{ span: 6 }} allowClear>
                            <Select>
                            <Select.Option value="normal">正常</Select.Option>
                                <Select.Option value="demo">异常</Select.Option>                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item label="进食" name="food" labelCol={{ span: 6 }} allowClear>
                            <Select>
                            <Select.Option value="normal">正常</Select.Option>
                                <Select.Option value="demo">异常</Select.Option>                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item label="设备电量" name="deviceCharge" allowClear>
                            <Select>
                            <Select.Option value="normal">正常</Select.Option>
                                <Select.Option value="demo">异常</Select.Option>                            </Select>
                        </Form.Item>
                    </Col> */}
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
                <Pagination  defaultCurrent={1} current={page.current} pageSize={page.pageSize} total={page.total} onChange={changePage} />
            </div>
            <div className="content-area">
                {
                    famrList.length > 0 ? (
                        <Row gutter={16}>
                            {famrList.map(d => (
                                <FarmContentCard data={d} />
                            ))}
                        </Row>
                    ) : <div className="no-data">
                        暂无数据
                    </div>
                }
                
            </div>
            <CreateFarmDrawer visible={drawerVisible} onOK={onOK} onClose={() => setDrawerVisible(false)} />
        </div>

    )
}

export default connect(({ company }) => ({
    companyDetail: company.companyDetail
}))(FarmManage);