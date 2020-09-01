import React from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxLanguage  from '@mapbox/mapbox-gl-language'
import Widget from './components/Widget';
import './index.less';

const accessToken = "pk.eyJ1IjoibGFudGljZ2FuIiwiYSI6ImNrZWZvN2FycTBudDEzMWp5and2N2tzbXQifQ.bk0EI93t_BeiapFw5MJnSA";

export default class FenceManage extends React.Component {

  createGeoJSONCircle = (center, radiusInKm, points) => {
    if(!points) points = 64;

    var coords = {
        latitude: center[1],
        longitude: center[0]
    };

    var km = radiusInKm;

    var ret = [];
    var distanceX = km/(111.320*Math.cos(coords.latitude*Math.PI/180));
    var distanceY = km/110.574;

    var theta, x, y;
    for(var i=0; i<points; i++) {
        theta = (i/points)*(2*Math.PI);
        x = distanceX*Math.cos(theta);
        y = distanceY*Math.sin(theta);

        ret.push([coords.longitude+x, coords.latitude+y]);
    }
    ret.push(ret[0]);
   

    return {
        "type": "geojson",
        "data": {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [120.15, 30.3]
          }
        }
    };
  };

  addCirle = () => {
    this.map.addSource("polygon", this.createGeoJSONCircle([120.15, 30.3], 0.5));

    this.map.addLayer({
      "id": "polygon",
      "type": "symbol",
      "source": "polygon",
      "layout": {},
      "paint": {
          "text-field": "ceshi"
      }
    });
  }

  componentDidMount() {
    mapboxgl.accessToken =accessToken;
    
    this.map = new mapboxgl.Map({
      container: 'mapbox-container',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [120.15, 30.3], //地图中心经纬度
      zoom: 7, //缩放级别
      defaultLanguage: 'zh'
    });
  }

  render() {
    return (
      <div className="fence-map">
        <div id="mapbox-container" className="mapbox-container" />
        <Widget addCirle={this.addCirle} />
      </div>
    )
  }
} 