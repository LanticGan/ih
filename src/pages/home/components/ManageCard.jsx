import React from 'react';

export default () => {
    return (
        <div className="manage-card">
            <div className="manage-card-bg"></div>
            <div className="manage-card-content">
                <div className="manage-card-title">
                    养殖场管理
                </div>
                <div className="manage-detail-list">
                    <div className="manage-detail"> 
                        <div className="detail-title">养殖场数量</div>
                        <div className="detail-content">52</div>
                    </div>
                    <div className="manage-detail">
                        <div className="detail-title">异常数量</div>
                        <div className="detail-content abnormal">8</div>
                    </div>
                </div>
            </div>
        </div>
    )
}