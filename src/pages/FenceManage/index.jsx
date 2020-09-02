import React from 'react';
import Widget from './components/Widget';
import './index.less';

const farms = [{
  number: 210,
  center: [109.81, 40.83]
}, {
  number: 260,
  center: [119.55, 30.27]
}]

export default class FenceManage extends React.Component {

  addCirle = () => {
  }

  componentDidMount() {
     this.map = new AMap.Map('map-container', {
      zoom: 5,//级别
      center: [109, 33],//中心点坐标
    });

    farms.forEach((farm, i) => {

      const { center, number } = farm;

      const text = new AMap.Text({
        text: number,
        anchor:'center', // 设置文本标记锚点
        cursor:'pointer',
        style:{
            'background-color': 'rgba(20,97,204,.7)',
            'width': '3.5rem',
            'border-radius': '20px',
            'text-align': 'center',
            'font-size': '14px',
            'color': 'white'
        },
        position: center
    });

    text.setMap(this.map);
    })
  }

  render() {
    return (
      <div className="fence-map">
        <div id="map-container" className="map-container" />
        <Widget addCirle={this.addCirle} />
      </div>
    )
  }
} 