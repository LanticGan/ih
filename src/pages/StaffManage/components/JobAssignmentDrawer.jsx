import { Drawer, Form, Button, Col, Row, Input, Select, Radio } from 'antd';

const CreateFarmDrawer = (props) => {

  const [form] = Form.useForm();

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
          <Button onClick={props.onClose} type="primary">
            确认
          </Button>
        </div>
      }
    >
    <Form
      form={form}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
    >
      <Row justify="center">
        <Col span={20}>
        <Form.Item
          name="job"
          label="职务类型"
          rules={[
                {
                  required: true,
                  message: '职务类型',
                },
              ]}
            >
            <Select style={{ width: 120 }} options={[]}/>
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
            <Select style={{ width: 120 }} options={[]}/>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  </Drawer>
  )
}

export default CreateFarmDrawer;