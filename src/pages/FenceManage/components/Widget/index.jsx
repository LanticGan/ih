import React from 'react';
import { Select } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import './index.less';

const farmInfo = [
  {label: '活动异常', value: 0},
  {label: '位置异常', value: 0},
  {label: '进食异常', value: 0},
  {label: '设备低电量', value: 0},
]


class Widget extends React.Component {

  renderFarmDistribution = () => {
    const { farmsDistribution = {}, clickFarm } = this.props;
    return (
      farmsDistribution.map(i => (
        <div className="farm-info-item" onClick={() => clickFarm(i)}>
          <div className={classnames({
              "farm-info-status-icon": true, 
              "normal": i.status,
              "abnormal": !i.status
            })}  
          />
          <div className="farm-info-detail">
            <div className="farm-info-name">
              {i.title}
            </div>
            <div className="farm-info-value">
              数量 {i.number}
            </div>
          </div>
          <div className={classnames({
              "farm-info-status": true, 
              "normal": i.status,
              "abnormal": !i.status
            })}
          >
            <span style={{ marginRight: 6 }}>
              {
                i.status ? '无异常' : '异常'
              }
            </span>
            <RightOutlined />
          </div>
        </div>
      ))
    )
  }

  renderOptions = () => {
    const famrsOptions = [{label: '全国', value: 'all'}]
    const { allFarms = [] } = this.props;

    allFarms.forEach(f => {
      const { id, farmName } = f;
      famrsOptions.push({
        label: farmName,
        value: id
      })
    });

    return famrsOptions;
  }

  getCurrentFarm = () => {
    const { allFarms = [], farmAreaValue } = this.props;
    const currentFarm = allFarms.filter(f => f.id == farmAreaValue)[0] || {};
    return currentFarm;
  }

  render() {
    const { handleFarmAreaChange, farmAreaValue } = this.props;
    const currentFarm = this.getCurrentFarm();
    console.log('currentFarm', currentFarm)
    return (
      <div className="map-widget-contianer">
        <div className="widget-header normal">
          <div className="widget-title">
            <div className="widget-name">养殖场概况</div>
            <div className="widget-operation">+ 新建养殖场</div>
          </div>
          <div className="widget-filter-form">
            <Select
              value={farmAreaValue}
              options={this.renderOptions()}
              onChange={handleFarmAreaChange}
              defaultValue="all" 
              style={{ width: '100%' }} 
            />
          </div>
          <div className="widget-info-list">
              {farmInfo.map(i => (
                <div className="widget-info">
                  <div className="widget-info-label">
                    {i.label}
                  </div>
                  <div className="widget-info-value">
                    {i.value}
                  </div>
                </div>
              ))}

          </div>
        </div>
        <div className="widget-body">
          <div className="widget-body-title">牧场分布</div>
          <div className="widget-body-content">
            <div className="farm-info-list">
              {
                this.renderFarmDistribution()
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Widget;