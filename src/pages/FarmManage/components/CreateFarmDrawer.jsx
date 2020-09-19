import { Drawer, Form, Button, Col, Row, Input, Select, Radio } from 'antd';

const CreateFarmDrawer = (props) => {

  const [form] = Form.useForm();

  const finish = (values) => {
    props.onOK(values);
  }

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
            name="breedType"
            label="养殖场类型"
            rules={[
              {
                required: true,
                message: '请选择养殖场类型',
              },
            ]}
          >
            <Radio.Group>
              <Radio value="1">散养</Radio>
              <Radio value="2">圈养</Radio>
              <Radio value="3">牧场</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={20}>
        <Form.Item
          name="farmName"
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
            name="animalUnits"
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