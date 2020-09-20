import { Drawer, Form, Button, Col, Row, Input, Select, Radio } from 'antd';

const CreateFarmDrawer = (props) => {
  const { targetUser = {} } = props;

  const [form] = Form.useForm();

  const onFinish = values =>{
    if (targetUser) {
      targetUser.userId = targetUser.id;
      props.onUpdateUser({...targetUser, ...values});
    }
  }

  return (
    <Drawer
      title="职务分配"
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
          name="jobTitle"
          label="职务类型"
          rules={[
                {
                  required: true,
                  message: '职务类型',
                },
              ]}
            >
            <Select style={{ width: 160 }}>
                <Select.Option value="1">管理员</Select.Option>
                <Select.Option value="2">兽医</Select.Option>
                <Select.Option value="3">饲养员</Select.Option>
                <Select.Option value="4">其他</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={20}>
        <Form.Item
          name="role"
          label="账号权限"
          rules={[
                {
                  required: true,
                  message: '账号权限',
                },
              ]}
            >
            <Select style={{ width: 160 }} options={[
              {label:'超级管理员', value:1},
              {label:'管理员', value:2},
              {label:'普通员工', value:3}
            ]}/>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  </Drawer>
  )
}

export default CreateFarmDrawer;