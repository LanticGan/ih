import React, { Component } from 'react';
import { connect } from 'umi';
import { Tag, message } from 'antd';
import groupBy from 'lodash/groupBy';
import moment from 'moment';
import NoticeIcon from '../NoticeIcon';
import styles from './index.less';

class GlobalHeaderRight extends Component {
  componentDidMount() {
    // const { dispatch } = this.props;

    // if (dispatch) {
    //   dispatch({
    //     type: 'global/fetchNotices',
    //   });
    // }
  }

  changeReadState = clickedItem => {
    const { id } = clickedItem;
    const { dispatch } = this.props;

    if (dispatch) {
      dispatch({
        type: 'global/changeNoticeReadState',
        payload: id,
      });
    }
  };

  handleNoticeClear = (title, key) => {
    const { dispatch } = this.props;
    message.success(`${'清空了'} ${title}`);

    if (dispatch) {
      dispatch({
        type: 'global/clearNotices',
        payload: key,
      });
    }
  };

  getNoticeData = () => {
    const notices = [
      {
        avatar: "https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png",
        datetime: "2020-06-30",
        id: "000000001",
        title: "设备解绑警告",
        type: "notification",
      },
      {
        avatar: "https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png",
        datetime: "2020-06-30",
        id: "000000002",
        title: "牲畜异常",
        type: "notification",
      },
      {
        avatar: "https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png",
        datetime: "2020-06-30",
        id: "000000003",
        title: "设备更换",
        type: "notification",
      }
    ]

    if (!notices || notices.length === 0 || !Array.isArray(notices)) {
      return {};
    }

    const newNotices = notices.map(notice => {
      const newNotice = { ...notice };

      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }

      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }

      if (newNotice.extra && newNotice.status) {
        const color = {
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        }[newNotice.status];
        newNotice.extra = (
          <Tag
            color={color}
            style={{
              marginRight: 0,
            }}
          >
            {newNotice.extra}
          </Tag>
        );
      }

      return newNotice;
    });
    return groupBy(newNotices, 'type');
  };

  getUnreadData = noticeData => {
    const unreadMsg = {};
    Object.keys(noticeData).forEach(key => {
      const value = noticeData[key];

      if (!unreadMsg[key]) {
        unreadMsg[key] = 0;
      }

      if (Array.isArray(value)) {
        unreadMsg[key] = value.filter(item => !item.read).length;
      }
    });
    return unreadMsg;
  };

  render() {
    const { currentUser, fetchingNotices, onNoticeVisibleChange, msg = {}, dispatch } = this.props;
    const noticeData = this.getNoticeData();
    const unreadMsg = this.getUnreadData(noticeData);
    const { unreadCount, msgList } = msg;
    return (
      <NoticeIcon
        className={styles.action}
        count={currentUser && currentUser.unreadCount}
        onItemClick={item => {
          this.changeReadState(item);
        }}
        loading={fetchingNotices}
        clearText="清空"
        viewMoreText="查看更多"
        onClear={this.handleNoticeClear}
        onPopupVisibleChange={onNoticeVisibleChange}
        onViewMore={() => message.info('Click on view more')}
        clearClose
        unreadCount={unreadCount}
        msgList={msgList}
        dispatch={dispatch}
      >
        <NoticeIcon.Tab />
      </NoticeIcon>
    );
  }
}

export default connect(({ user, global, loading, msg }) => ({
  currentUser: user.currentUser,
  collapsed: global.collapsed,
  fetchingMoreNotices: loading.effects['global/fetchMoreNotices'],
  fetchingNotices: loading.effects['global/fetchNotices'],
  notices: global.notices,
  msg
}))(GlobalHeaderRight);
