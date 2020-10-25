import { useEffect, useState, useCallback } from 'react';
import { Drawer, Form, Button, Card, Descriptions, Divider, Table, message, Row, Col, Input, Select } from 'antd';

const CreateFarmDrawer = (props) => {

  const { companyDetail = {} } = props;
  const { id, companyName, companyAddr, insurance, breedType, num } = companyDetail;
  const [isEdit, setIsEdit] = useState(false);

  const [form] = Form.useForm();

  const onFinish = values => {
    message.success('编辑成功!');
    setIsEdit(false);
  }

  // const getAnimalDetail = useCallback(async id => {
  //   if (!id) {
  //     return;
  //   }
  //   const res = await getAnimaDetail({ animalId: id });
  //   const { code, message: info, data = {} } = res;
  //   if (code == 500) {
  //       message.error(info);
  //       return;
  //   }
  //   const { syncHistoryDTOS = [] } = data;
  //   setAnimalHistory(syncHistoryDTOS);
  // }, [])

  // useEffect(() => {
  //   getAnimalDetail(id);
  // }, [id]);

  useEffect(() => {
    form.setFieldsValue({
      companyName,
      companyAddr,
      insurance
    });
  }, [companyDetail])

  return (
    <Drawer
      title=""
      width={720}
      onClose={props.onClose}
      visible={props.visible}
      bodyStyle={{ paddingBottom: 80 }}
      closable={false}
    >
      {isEdit ? (
        <div className="compnay-edit-container">
          <div className="header-title">公司基础信息</div>
          <Form
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            onFinish={onFinish}
          >
            <Row justify="center">
              <Col span={20}>
              <Form.Item
                name="companyName"
                label="公司名称"
                rules={[
                    {
                      required: true,
                      message: '请输入公司名称',
                    },
                  ]}
                >
                  <Input placeholder="请输入公司名称" />
                </Form.Item>
              </Col>
            </Row>
            <Row justify="center">
              <Col span={20}>
                <Form.Item
                  name="companyAddr"
                  label="地址"
                >
                  <Input placeholder="请输入公司地址" />
                </Form.Item>
              </Col>
            </Row>
            <Row justify="center">
              <Col span={20}>
                <Form.Item
                  name="insurance"
                  label="所属保险公司"
                >
                  <Input placeholder="请输入所属保险公司" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
            <Col span={24}>
                <div className="btns" style={{
                  display:"flex",
                  justifyContent: 'flex-end',
                  paddingRight: '52px'
                }}>
                  <Button type="primary" htmlType="submit">
                    提交
                  </Button>
                  <Button style={{marginLeft: 8}} type="normal" onClick={() => setIsEdit(false)}>
                    取消
                  </Button> 
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      ) : (
        <div>
        <Descriptions title="公司基础信息" style={{ marginBottom: 32 }} extra={<div onClick={() => setIsEdit(true)} style={{ cursor:  "pointer", color: '#1461cc' }}>编辑</div>}
        >
          <Descriptions.Item label="养殖类型">{breedType}</Descriptions.Item>
          <Descriptions.Item label="公司名称">{companyName}</Descriptions.Item>
          <Descriptions.Item label="存栏量">{num}</Descriptions.Item>
          <Descriptions.Item label="地址">{companyAddr}</Descriptions.Item>
          <Descriptions.Item label="保险公司">{insurance}</Descriptions.Item>
        </Descriptions>
        </div>)
      }
  </Drawer>
  )
}

export default CreateFarmDrawer;