import { useEffect } from 'react';
import { Drawer, Form, Button, Col, Row, Input, Select, Radio } from 'antd';

const CreateStaffDrawer = (props) => {
  const { targetUser } = props;

  const [form] = Form.useForm();

  const onFinish = values =>{
    if (targetUser) {
      targetUser.userId = targetUser.id;
      props.onUpdateUser({...targetUser, ...values});
    } else {
      props.onCreateUser(values);
    }
  }

  useEffect(() => {
    if (targetUser) {
      form.setFieldsValue(targetUser)
    }
  }, [targetUser]);


  return (
    <Drawer
      title={targetUser ? '编辑人员' : '新增人员'}
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
          name="name"
          label="人员姓名"
          rules={[
                {
                  required: true,
                  message: '人员姓名',
                },
              ]}
            >
            <Input placeholder="人员姓名" />
          </Form.Item>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={20}>
        <Form.Item
          name="gender"
          label="性别"
          rules={[
                {
                  required: true,
                  message: '性别',
                },
              ]}
            >
            <Select style={{ width: 120 }} options={[{label:'男', value:1},{label:'女', value:2}]}/>
          </Form.Item>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={20}>
          <Form.Item
            name="idCard"
            label="身份证号"
           >
            <Input placeholder="请输入身份证号" />
          </Form.Item>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={20}>
          <Form.Item
            name="phone"
            label="手机号"
            rules={[
              {
                required: true,
                message: '手机号不能为空',
              },
            ]}
           >
            <Input placeholder="请输入手机号" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  </Drawer>
  )
}

export default CreateStaffDrawer;