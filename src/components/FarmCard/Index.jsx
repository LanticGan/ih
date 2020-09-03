import React from 'react';
import { Row, Col } from 'antd';
import cs from 'classnames';
import './index.less';

const FarmContentCard = (props) => {
  const { data = {} } = props;
  const { title, number, hdyc, jwzyc, jsyc, sbddl = '-', isAbnormal } = data;

  return (
    <div className={
        cs({
            "farm-content-card": true,
            "abormal": isAbnormal,
            "normal": !isAbnormal
        })
    }>
        <div className="title">{title}</div>
        <div className="monitor-count">
            <div className="count-value">{number}</div>
            <div className="count-label">监控数量</div>
        </div>
        <div className="detail-list">
            <Row>
                <Col span={6}>
                    <div className="detail">
                        <div className="detail-value">{hdyc}</div>
                        <div className="detail-label">活动异常</div>
                    </div>
                </Col>
                <Col span={6}>
                    <div className="detail">
                        <div className="detail-value">{jwzyc}</div>
                        <div className="detail-label">进位置异常</div>
                    </div>
                </Col>
                <Col span={6}>
                    <div className="detail">
                        <div className="detail-value">{jsyc}</div>
                        <div className="detail-label">进食异常</div>
                    </div>
                </Col>
                <Col span={6}>
                    <div className="detail">
                        <div className="detail-value">{sbddl}</div>
                        <div className="detail-label">设备低电量</div>
                    </div>
                </Col>
            </Row>
        </div>
    </div>
  )
}

export default FarmContentCard;