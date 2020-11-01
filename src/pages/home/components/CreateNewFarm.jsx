import { Drawer, Form, Button, Col, Row, Input, Select, Radio, Cascader } from 'antd';
import { useState, useEffect  } from 'react';
import getAddressOptions from '@/utils/address';

const CreateFarmDrawer = (props) => {

  const [form] = Form.useForm();
  const [addressOptions, setAddressOptions] = useState([]);

  useEffect(() => {
    setAddressOptions(getAddressOptions());
  }, [])

  const onFinish = values => {
    props.onCreateCompany(values);
  }
  
  return (
    <Drawer
      title="基础信息录入"
      width={720}
      onClose={props.onClose}
      visible={props.visible}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Button onClick={props.onClose} style={{ marginRight: 8 }}>
            取消
          </Button>
          <Button onClick={() => form.submit()} type="primary">
            确认
          </Button>
        </div>
      }
    >
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
            rules={[
              {
                required: true,
                message: '请选择公司地址',
              },
            ]}
           >
            <Cascader
              options={addressOptions}
              placeholder="请选择公司地址"
              
            />
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
    </Form>
  </Drawer>
  )
}

export default CreateFarmDrawer;