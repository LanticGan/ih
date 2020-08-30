import React from 'react';
import mapboxgl from 'mapbox-gl';
import Widget from './components/Widget';
import './index.less';

const accessToken = "pk.eyJ1IjoibGFudGljZ2FuIiwiYSI6ImNrZWZvN2FycTBudDEzMWp5and2N2tzbXQifQ.bk0EI93t_BeiapFw5MJnSA";

export default class FenceManage extends React.Component {

  componentDidMount() {
    mapboxgl.accessToken =accessToken;
    
    new mapboxgl.Map({
      container: 'mapbox-container',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [120.15, 30.3], //地图中心经纬度
      zoom: 11.5, //缩放级别
      pitch: 45,
      bearing: -17.6,
    });
  }

  render() {
    return (
      <div className="fence-map">
        <div id="mapbox-container" className="mapbox-container" />
        <Widget />
      </div>
    )
  }
} 