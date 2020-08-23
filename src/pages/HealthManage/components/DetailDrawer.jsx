import { Drawer, Form, Button, Card, Descriptions, Divider, Table } from 'antd';

const goodsColumns = [
  {
    title: '商品名称',
    dataIndex: 'name',
    key: 'name',

  },
  {
    title: '商品条码',
    dataIndex: 'barcode',
    key: 'barcode',

  },
  {
    title: '单价',
    dataIndex: 'price',
    key: 'price',
    align: 'right',
  },
];

const CreateFarmDrawer = (props) => {

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
    <div bordered={false}>
          <Descriptions title="退款申请" style={{ marginBottom: 32 }}>
            <Descriptions.Item label="取货单号">1000000000</Descriptions.Item>
            <Descriptions.Item label="状态">已取货</Descriptions.Item>
            <Descriptions.Item label="销售单号">1234123421</Descriptions.Item>
            <Descriptions.Item label="子订单">3214321432</Descriptions.Item>
          </Descriptions>
          <Divider style={{ marginBottom: 32 }} />
          <div className="header-title">退货商品</div>
          <Table
            style={{ marginBottom: 24 }}
            pagination={false}
            dataSource={[]}
            columns={goodsColumns}
            rowKey="id"
          />
      </div>
  </Drawer>
  )
}

export default CreateFarmDrawer;