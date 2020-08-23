import { Drawer, Form, Button, Col, Row, Input, Select, Radio } from 'antd';

const CreateFarmDrawer = (props) => {

  const [form] = Form.useForm();

  return (
    <Drawer
      title="疫苗录入"
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
          name="name"
          label="所属养殖场"
          rules={[
                {
                  required: true,
                  message: '请输入养殖场名称',
                },
              ]}
            >
            <Input placeholder="请输入养殖场名称" />
          </Form.Item>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={20}>
          <Form.Item
            name="cll"
            label="疫苗名称"
           >
            <Input placeholder="请输入疫苗名称" />
          </Form.Item>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={20}>
          <Form.Item
            name="cll"
            label="注射数量"
           >
            <Input placeholder="请输入注射数量" />
          </Form.Item>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={20}>
          <Form.Item
            name="cll"
            label="注射人"
           >
            <Input placeholder="请输入注射人" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  </Drawer>
  )
}

export default CreateFarmDrawer;