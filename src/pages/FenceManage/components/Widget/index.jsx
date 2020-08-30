import React from 'react';
import { Select } from 'antd';
import classnames from 'classnames';
import './index.less';

const farmInfo = [
  {label: '活动异常', value: 14},
  {label: '位置异常', value: 14},
  {label: '进食异常', value: 14},
  {label: '设备低电量', value: 14},
]

const farmDistribution = [
  {
    name: '001号养殖场',
    number: 230,
    stauts: 1
  },
  {
    name: '002号养殖场',
    number: 134,
    stauts: 1
  },
  {
    name: '003号养殖场',
    number: 460,
    stauts: 1
  },
  {
    name: '004号养殖场',
    number: 230,
    stauts: 0
  },
  {
    name: '005号养殖场',
    number: 134,
    stauts: 1
  },
]



class Widget extends React.Component {

  renderFarmDistribution = () => {
    return (
      farmDistribution.map(i => (
        <div className="farm-info-item">
          <div className={classnames({
              "farm-info-status-icon": true, 
              "normal": i.stauts,
              "abnormal": !i.stauts
            })}  
          />
          <div className="farm-info-detail">
            <div className="farm-info-name">
              {i.name}
            </div>
            <div className="farm-info-value">
              数量 {i.number}
            </div>
          </div>
          <div className={classnames({
              "farm-info-status": true, 
              "normal": i.stauts,
              "abnormal": !i.stauts
            })}
          >
            {
              i.stauts ? '无异常' : '异常'
            }
          </div>
        </div>
      ))
    )
  }

  render() {
    return (
      <div className="map-widget-contianer">
        <div className="widget-header normal">
          <div className="widget-title">
            <div className="widget-name">养殖场概况</div>
            <div className="widget-operation">+ 新建养殖场</div>
          </div>
          <div className="widget-filter-form">
            <Select
              options={[]}
              defaultValue="lucy" 
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
          <div className="widget-body-title"></div>
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