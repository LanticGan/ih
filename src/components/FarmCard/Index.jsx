import React from 'react';
import { Row, Col } from 'antd';
import cs from 'classnames';
import './index.less';

const FarmContentCard = (props) => {
  const { data = {} } = props;
  const { farmName, animalUnits, activityTotal, locationTotal, eatTotal, batteryTotal = '-' } = data;
  const isAbnormal = activityTotal > 0 || locationTotal > 0 || eatTotal > 0 || batteryTotal > 0;

  return (
    <div className={
        cs({
            "farm-content-card": true,
            "abormal": isAbnormal,
            "normal": !isAbnormal
        })
    }>
        <div className="title">{farmName}</div>
        <div className="monitor-count">
            <div className="count-value">{animalUnits}</div>
            <div className="count-label">监控数量</div>
        </div>
        <div className="detail-list">
            <Row>
                <Col span={6}>
                    <div className="detail">
                        <div className="detail-value">{activityTotal}</div>
                        <div className="detail-label">活动异常</div>
                    </div>
                </Col>
                <Col span={6}>
                    <div className="detail">
                        <div className="detail-value">{locationTotal}</div>
                        <div className="detail-label">位置异常</div>
                    </div>
                </Col>
                <Col span={6}>
                    <div className="detail">
                        <div className="detail-value">{eatTotal}</div>
                        <div className="detail-label">进食异常</div>
                    </div>
                </Col>
                <Col span={6}>
                    <div className="detail">
                        <div className="detail-value">{batteryTotal}</div>
                        <div className="detail-label">发情</div>
                    </div>
                </Col>
            </Row>
        </div>
    </div>
  )
}

export default FarmContentCard;