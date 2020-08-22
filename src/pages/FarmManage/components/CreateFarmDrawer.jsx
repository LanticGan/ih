import { Drawer, Form, Button, Col, Row, Input, Select, Radio } from 'antd';

const CreateFarmDrawer = (props) => {

  const [form] = Form.useForm();

  return (
    <Drawer
      title="新建养殖场"
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
            name="type"
            label="养殖场类型"
          >
            <Radio.Group defaultValue={"a"}>
              <Radio value="a">散养</Radio>
              <Radio value="b">圈养</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={20}>
        <Form.Item
          name="name"
          label="养殖场名称"
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
            label="存栏量"
           >
            <Input placeholder="请输入存栏量" />
          </Form.Item>
        </Col>
      </Row>

    </Form>
  </Drawer>
  )
}

export default CreateFarmDrawer;