import { Drawer, Form, Button, Col, Row, Input } from 'antd';

const CreateVaccineDrawer = (props) => {

  const [form] = Form.useForm();

  const finish = (values) => {
    props.onOk(values);
  }

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
      onFinish={finish}
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
            name="vaccineName"
            label="疫苗名称"
           >
            <Input placeholder="请输入疫苗名称" />
          </Form.Item>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={20}>
          <Form.Item
            name="nums"
            label="注射数量"
           >
            <Input placeholder="请输入注射数量" />
          </Form.Item>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={20}>
          <Form.Item
            name="userName"
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

export default CreateVaccineDrawer;