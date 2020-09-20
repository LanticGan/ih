import { useEffect, useState, useCallback  } from 'react';
import { Table } from 'antd';
import { getMsgList } from '@/services/msg';
import './index.less';

const msgTypeEnum = {
  "101": "售卖",
  "102" : "设备故障",
  "103" : "低电量", 
  "201" : "设备变更",
  "202" : "养殖场变更"
}

const columns = [
  {
    title: '类型',
    dataIndex: 'msgType',
    key: 'msgType',
    render: v => msgTypeEnum[v]
  },
  {
    title: '所属养殖场',
    dataIndex: 'farmName',
    key: 'farmName',
  },
  {
    title: '简要概述',
    dataIndex: 'desc',
    key: 'desc',
  },
  {
    title: '数量',
    dataIndex: 'nums',
    key: 'nums',
  },
  {
    title: '时间',
    dataIndex: 'time',
    key: 'time',
  },
];

const expandedRowRender = ({ msgDetailDTOS = [] }) => {
  const columns = [
    {
      title: '设备编号',
      dataIndex: 'equipmentNo',
      key: 'equipmentNo',
    },
    {
      title: '事件发生时间',
      dataIndex: 'eventTime',
      key: 'eventTime',
    }
  ];
  return <Table rowKey="id" columns={columns} dataSource={msgDetailDTOS} pagination={false} />;
}

const CustromNoticeList = () => {

  const [msgList, setMsgList] = useState([]);


  const fetchDeviceList = useCallback(async params => {
    const res = await getMsgList({ ...params });
    const { code, message: info, data = {} } = res;
    if (code == 500) {
        message.error(info);
        return;
    }
    const { list = [], currPage, pageSize, totalCount } = data;
    setMsgList(list);
  }, []);

  useEffect(() => {
    fetchDeviceList();
  },[])


  return (
    <div className="cus-notice-list-container">
      <div className="title">消息</div>
      <Table 
        rowKey="id"
        dataSource={msgList} 
        columns={columns} 
        expandable={{ 
          expandedRowRender,
          rowExpandable: ({msgDetailDTOS = []}) => msgDetailDTOS.length > 0,
        }}
        scroll={{
          y: 300
          }
        }
      />;
    </div>
  )
}

export default CustromNoticeList;