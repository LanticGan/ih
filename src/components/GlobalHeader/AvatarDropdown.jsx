import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import React from 'react';
import { history, connect } from 'umi';
import CompanyDetail from './CompanyDetail';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

class AvatarDropdown extends React.Component {

  state = {
    showCompanyDetail: false
  }

  onMenuClick = event => {
    const { key } = event;

    if (key === 'logout') {
      const { dispatch } = this.props;

      if (dispatch) {
        dispatch({
          type: 'login/logout',
        });
      }

      return;
    }

    if (key === 'settings') {
      this.setState({
        showCompanyDetail: true
      });

      return;
    }

    history.push(`/account/${key}`);
  };

  render() {
    const { showCompanyDetail } = this.state;
    const {
      // currentUser = {
      //   avatar: '',
      //   name: '云牧',
      // },
      menu,
      companyDetail = {}
    } = this.props;
    const currentUser = {
      avatar: '',
      name: '云牧',
    };
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        {menu && (
          <Menu.Item key="center">
            <UserOutlined />
            个人中心
          </Menu.Item>
        )}

        {menu && <Menu.Divider />}

        <Menu.Item key="settings">
            <SettingOutlined />
            公司基础信息
          </Menu.Item>

        <Menu.Item key="logout">
          <LogoutOutlined />
          退出登录
        </Menu.Item>
      </Menu>
    );
    return currentUser && currentUser.name ? (
      <>
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="small" className={styles.avatar} src={"https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"} alt="avatar" />
          {/* <span className={`${styles.name} anticon`}>{currentUser.name}</span> */}
        </span>
      </HeaderDropdown>
      <CompanyDetail 
        visible={showCompanyDetail} 
        onClose={() => this.setState({ showCompanyDetail: false })} 
        companyDetail={companyDetail}
      />
      </>
    ) : (
      <span className={`${styles.action} ${styles.account}`}>
        <Spin
          size="small"
          style={{
            marginLeft: 8,
            marginRight: 8,
          }}
        />
      </span>
    );
  }
}

export default connect(({ user, company }) => ({
  currentUser: user.currentUser,
  companyDetail: company.companyDetail
}))(AvatarDropdown);
