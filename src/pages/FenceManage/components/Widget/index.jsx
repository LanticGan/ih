import React from 'react';
import { Select } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import './index.less';

class Widget extends React.Component {

  renderFarmDistribution = () => {
    const { farmsDistribution = {}, clickFarm } = this.props;
    return (
      farmsDistribution.map(i => {
        let { animals = [], activityTotal, locationTotal, eatTotal, batteryTotal } = i;
        animals = animals || [];
        const isAbnormal = activityTotal > 0 || locationTotal > 0 || eatTotal > 0 || batteryTotal > 0;
        return (
          <div className="farm-info-item" onClick={() => clickFarm(i)}>
            <div className={classnames({
                "farm-info-status-icon": true, 
                "normal": !isAbnormal,
                "abnormal": isAbnormal
              })}  
            />
            <div className="farm-info-detail">
              <div className="farm-info-name">
                {i.farmName}
              </div>
              <div className="farm-info-value">
                数量 {animals.length}
              </div>
            </div>
            <div className={classnames({
                "farm-info-status": true, 
                "normal": !isAbnormal,
                "abnormal": isAbnormal
              })}
            >
              <span style={{ marginRight: 6 }}>
                {
                  !isAbnormal ? '无异常' : '异常'
                }
              </span>
              <RightOutlined />
            </div>
          </div>
        )
      })
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

  getCurrentFarmInfo = () => {
    const { allFarms = [], farmAreaValue } = this.props;
    const currentFarm = allFarms.filter(f => f.id == farmAreaValue)[0] || {};
    let { activityTotal, locationTotal, eatTotal, batteryTotal } = currentFarm;
    activityTotal = typeof activityTotal === 'number' ? activityTotal : '-'
    locationTotal = typeof locationTotal === 'number' ? locationTotal : '-'
    eatTotal = typeof eatTotal === 'number' ? eatTotal : '-'
    batteryTotal = typeof batteryTotal === 'number' ? batteryTotal : '-'

    return [
      {key: 'activityTotal', label: '活动异常', value: activityTotal},
      {key: 'locationTotal', label: '位置异常', value: locationTotal},
      {key: 'eatTotal', label: '进食异常', value: eatTotal},
      {key: 'batteryTotal', label: '设备低电量', value: batteryTotal},
    ]
  }

  getCurrentIsAbnormal = () => {
    const { allFarms = [], farmAreaValue } = this.props;
    const currentFarm = allFarms.filter(f => f.id == farmAreaValue)[0] || {};
    const { activityTotal, locationTotal, eatTotal, batteryTotal } = currentFarm;
    return activityTotal > 0 || locationTotal > 0 || eatTotal > 0 || batteryTotal > 0;
  }

  render() {
    const { handleFarmAreaChange, farmAreaValue } = this.props;
    const farmInfo = this.getCurrentFarmInfo();
    const isAbnormal = this.getCurrentIsAbnormal();
    return (
      <div className="map-widget-contianer">
        <div className={`widget-header ${isAbnormal ? 'abnormal' : 'normal'}`}>
          <div className="widget-title">
            <div className="widget-name">养殖场概况</div>
            {/* <div className="widget-operation">+ 新建养殖场</div> */}
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