import { useEffect, useState, useCallback  } from 'react';
import { history } from 'umi';
import { Table, Space, Tag  } from 'antd';
import { getMsgList } from '@/services/msg';
import './index.less';

const msgTypeEnum = {
  "1": "系统消息",
  "2" : "养殖场消息",
  "3" : "牲畜消息", 
}

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

const CustromNoticeList = (props) => {

  const { msgList = {}, dispatch = () => {} } = props;
  const { list = [], currPage = 1, pageSize = 10, totalCount } = msgList; 
  const paging = {
    current: currPage,
    pageSize,
    total: totalCount,
  };
  

  const columns = [
    {
      title: '类型',
      dataIndex: 'msgType',
      key: 'msgType',
      render: v => msgTypeEnum[v]
    },
    // {
    //   title: '所属养殖场',
    //   dataIndex: 'farmName',
    //   key: 'farmName',
    // },
    {
      title: '简要概述',
      dataIndex: 'desc',
      key: 'desc',
    },
    // {
    //   title: '数量',
    //   dataIndex: 'nums',
    //   key: 'nums',
    // },
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        let ele = null;
        if (text == 0) {
          ele = <Tag color="volcano">未读</Tag>
        } else {
          ele = <Tag color="green">已读</Tag>
        }
        return ele;
      }
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 120,
      render: (text, record) => {
        const { msgType, ref, id } = record;
        if (msgType == 1) {
          return null
        } else {
          return (
            <Space size="middle">
              <a onClick={() => {
                if (msgType == 2) {
                  history.push(`/farm-manage/farm-manage?farmdId=${ref}`);
                } else if (msgType == 3) {
                  history.push(`/animal-manage/health-manage?farmdId=${ref}`);
                }
                dispatch({
                  type: 'msg/read',
                  payload: {
                    messageId: id,
                  }
                });
              }} >详情</a>
            </Space>
          )
        }
      }
    },
  ];

  const changePagination = v => {
    const { current } = v;
    dispatch({
      type: 'msg/getMsgInfo',
      payload: {
        pageSize: 10,
        pageNum: current
      }
    });
  }

  const batchRead = () => {
    dispatch({
      type: 'msg/batchread',
    });
  }

  return (
    <div className="cus-notice-list-container">
      <div className="title">
        <div>消息</div>
        <div className="readAll" onClick={batchRead}>全部已读</div>
      </div>
      <Table 
        rowKey="id"
        dataSource={list} 
        columns={columns}
        pagination={paging}
        onChange={changePagination}
        scroll={{
          y: 400
          }
        }
      />;
    </div>
  )
}

export default CustromNoticeList;