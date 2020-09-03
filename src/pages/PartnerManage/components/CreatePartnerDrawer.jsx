import { Drawer, Form, Button, Col, Row, Input, Select, Radio, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const draggerProps = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const CreatePartnerDrawer = (props) => {

  const [form] = Form.useForm();

  return (
    <Drawer
      title="新增合作方"
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
          label="姓名"
          rules={[
                {
                  required: true,
                  message: '请输入姓名',
                },
              ]}
            >
            <Input placeholder="请输入姓名" />
          </Form.Item>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={20}>
          <Form.Item
            name="id"
            label="身份证号"
           >
            <Input placeholder="请输入身份证号" />
          </Form.Item>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={20}>
          <Form.Item
            name="yzc"
            label="养殖场"
           >
            <Input placeholder="请输入养殖场" />
          </Form.Item>
        </Col>
      </Row>
      <div className="header-title">身份证正反面</div>
      <Row justify="center">
        <Col span={20}>
        <Dragger {...draggerProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p >
          <p className="ant-upload-text">点击或拖拽上传</p >
          <p className="ant-upload-hint">
            请上传身份证正反面
          </p >
        </Dragger>
        </Col>
      </Row>
      <div className="header-title" style={{marginTop: 10}}>合同文本</div>
      <Row justify="center" >
        <Col span={20}>
        <Dragger {...draggerProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p >
          <p className="ant-upload-text">合同文本</p >
          <p className="ant-upload-hint">
            请上传合同文本
          </p >
        </Dragger>
        </Col>
      </Row>
    </Form>
  </Drawer>
  )
}

export default CreatePartnerDrawer;