import { Drawer, Form, Button, Card, Descriptions, Divider, Table } from 'antd';

const goodsColumns = [
  {
    title: '活动',
    dataIndex: 'name',
    key: 'name',

  },
  {
    title: '位置',
    dataIndex: 'barcode',
    key: 'barcode',

  },
  {
    title: '进食',
    dataIndex: 'price',
    key: 'price',
    align: 'right',
  },
  {
    title: '设备电量',
    dataIndex: 'device',
    key: 'device',
    align: 'right',  },
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
          <Descriptions title="基本信息" style={{ marginBottom: 32 }}>
            <Descriptions.Item label="设备编号">1000000000</Descriptions.Item>
            <Descriptions.Item label="所属养殖场">已取货</Descriptions.Item>
            <Descriptions.Item label="日龄">120天</Descriptions.Item>
            <Descriptions.Item label="养殖类型">散养</Descriptions.Item>
          </Descriptions>
          <Divider style={{ marginBottom: 32 }} />
          <div className="header-title">历史记录（近一周）</div>
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