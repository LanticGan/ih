import React from 'react';
import { Link, history  } from 'umi';
import classnames from 'classnames';

export default (props) => {
    const { item = {} } = props;
    const { name, detail = [], path } = item;

    const LinkTo = (path) => {
      history.push(path);
    }

    return (
        <div onClick={() => LinkTo(path)} className={classnames({
          "manage-card": true,
        })}>
            <div className={classnames({
          "manage-card-bg": true,
          [props.bgName]: true
        })} />
            <div className="manage-card-content">
                <div className="manage-card-title">
                    {name}
                </div>
                {
                  detail.length > 0 && (
                    <div className="manage-detail-list">
                      {
                        detail.map(i => (<div className="manage-detail"> 
                            <div className="detail-title">{i.label}</div>
                            <div className="detail-content">{i.value}</div>
                        </div>))
                      }
                    </div>
                  )
                }     
            </div>
        </div>
    )
}