import React from 'react';
import Widget from './components/Widget';
import FarmCard from '@/components/FarmCard';
import { message } from 'antd';
import { getFarmList } from '@/services/farm';
import { getFenceList } from '@/services/fence';
import { history, connect } from 'umi';

import './index.less';

const farms = [{
  id: "001",
  number: 8,
  center: [108.71, 40.83],
  radius: 300,
  farmName: '001号养殖场',
  activityTotal: 0,
  locationTotal: 0,
  eatTotal: 0,
  batteryTotal: 0,
  isAbnormal: false,
  status: 1,
  animals: [
    {
      center: [108.71, 40.83],
    },
    {
      center: [108.71, 40.83],
    },
    {
      center: [108.71, 40.83],
    },
    {
      center: [108.71, 40.83],
    },
    {
      center: [108.71, 40.83],
    },
    {
      center: [108.71, 40.83],
    },
    {
      center: [108.71, 40.83],
    },
    {
      center: [108.71, 40.83],
    }
  ]
}, {
  id: "002",
  number: 2,
  center: [119.55, 30.27],
  radius: 300,
  farmName: '002号养殖场',
  activityTotal: 0,
  locationTotal: 0,
  eatTotal: 0,
  batteryTotal: 0,
  isAbnormal: false,
  status: 1,
  animals: [
    {
      center: [119.55, 30.27],
    },
    {
      center: [119.55, 30.27],
    }
  ]
}]

class FenceManage extends React.Component {

  state = {
    showFarmCard: false,
    targetFarm: {},
    targetFence: null,
    farmsDistribution: [],
    farmAreaValue: 'all',
    allFarms: []
  }

  fetchFenceList = async params => {
    const res = await getFenceList({ ...params });
    const { code, message: info, data = [] } = res;
    if (code == 500) {
        message.error(info);
        return;
    }
    this.setState({
      allFarms: data,
      farmsDistribution: data
    });
  }

  renderFarmCard = () => {
    let { targetFarm = {} } = this.state;
    let { x = 0, y = 0, animals } = targetFarm;
    animals = animals || [];

    // if (!targetFarm.center) {
    //   return null;
    // }

    targetFarm = {
      ...targetFarm,
      animalUnits: animals.length || 0
    }

    return (
      <div className="farm-card-modal" style={{position: 'absolute', left: x, top: y, width: 300}}>
        <FarmCard data={targetFarm} />
      </div>
    )
  }

  handleHoverFarm = (e, farm) => {
    const x = e.pixel.getX();
    const y  = e.pixel.getY();
    const targetFarm = {
      ...farm,
      x,
      y
    }
    this.setState({
      showFarmCard: true,
      targetFarm
    })
  }

  handleOutFarm = (e, farm) => {
    this.setState({
      showFarmCard: false
    });
  }

  handleClickFarm = (farm) =>{
    const { center, id } = farm;
    this.setState({
      showFarmCard: false
    });

    this.changeAllMarker(false);
    this.changeAllCircle(true);

    let targetFence = this[`fence${id}`];

    if (targetFence) {
      this.map.setFitView([ targetFence ]);
    } else {
      this.addFence(farm);
    }
  }

  renderFarmsMarker = (allFarms) => {
    if (!allFarms || allFarms.length === 0) {
      return;
    }
    allFarms.forEach((farm, i) => {
      const { animals, latitude, longitude, activityTotal, locationTotal, eatTotal, temperatureTotal } = farm;
      const isAbnormal = activityTotal || locationTotal || eatTotal || temperatureTotal;
      const animalsNum = Array.isArray(animals) ? animals.length : 0;
      const text = new AMap.Text({
        text: `${animalsNum}`,
        anchor:'center', // 设置文本标记锚点
        cursor:'pointer',
        style:{
            'background-color': isAbnormal ? 'rgba(255,152,2,.7)' : 'rgba(20,97,204,.7)',
            'width': '3.5rem',
            'border-radius': '20px',
            'text-align': 'center',
            'font-size': '14px',
            'color': 'white'
        },
        position: [longitude,latitude]
      });

      text.setMap(this.map);
      text.on('mouseover', (e) => this.handleHoverFarm(e, farm));
      text.on('mouseout', (e) => this.handleOutFarm(e, farm));
      text.on('click', (e) => this.handleClickFarm(farm));

    });
  }
  
  addFence = (farm) => {
    let {id, longitude, latitude , radius, animals = []} = farm;
    radius = radius / 1000;
    animals = animals || [];

    const fence = new AMap.Circle({
      center: [longitude, latitude],
      radius: radius, //半径
      borderWeight: 2,
      strokeColor: "#fff", 
      strokeOpacity: 1,
      strokeWeight: 2,
      strokeOpacity: 0.8,
      fillOpacity: .18,
      strokeStyle: 'solid',
      fillColor: '#7fc712',
      zIndex: 50,
    });

    this[`fence${id}`] = fence;

    fence.setMap(this.map)
    this.map.setFitView([ fence ]);
    this.addAnimals(animals);
  }

  addAnimals = (animals) => {
    animals.forEach(animal => {
      const { longitude, latitude, location } = animal;
      const locationAbnormal = location != '100';
      const animalCircle = new AMap.Circle({
        center: [longitude, latitude],
        radius: 10,
        borderWeight: 1,
        strokeColor: "#fff", 
        strokeOpacity: .1,
        strokeWeight: 1,
        fillOpacity: 1,
        strokeStyle: 'solid',
        fillColor: locationAbnormal ? 'rgba(255,152,2,.7)' : '#1461cc',
        zIndex: 52,
      });
  
      animalCircle.setMap(this.map)
    })
  }

  removeFarmsMarker = () => {
    this.map.clearMap();
  }

  changeAllCircle = (show = true) => {
    const markers = this.map.getAllOverlays('circle');
    markers.forEach(m => {
      if (show) {
        m.show();
      } else {
        m.hide()
      }
    });
  }

  changeAllMarker = (show) => {
    const markers = this.map.getAllOverlays('text');
    markers.forEach(m => {
      if (show) {
        m.show();
      } else {
        m.hide()
      }
    });

    // 看全国视角
    if (show) {
      this.map.setCenter([109, 33]);
      this.map.setZoom(5);
      this.changeAllCircle(false);
    }
  }

  handleFarmAreaChange = (id) => {
    const { allFarms } = this.state;
    let farmsDistribution = allFarms;
    if (id != 'all') {
      farmsDistribution = allFarms.filter(f => f.id == id);
      const targetFarm = farmsDistribution[0];
      this.handleClickFarm(targetFarm)
    } else {
      this.changeAllMarker(true);
    }
    this.setState({
      farmsDistribution,
      farmAreaValue: id
    });
  }

  componentDidMount() {
     this.map = new AMap.Map('map-container', {
      zoom: 4,//级别
      center: [109, 33],//中心点坐标
    });
    this.fetchFenceList({ farmId: '-1' });
  }

  componentDidUpdate(prevProps, prevState) {
    const { allFarms = [] } = this.state;
    const { allFarms: prevFarms = [] } = prevState;

    if (allFarms !== prevFarms) {
      this.renderFarmsMarker(allFarms)
    }
  }

  render() {
    const { showFarmCard, farmsDistribution = [], farmAreaValue, allFarms } = this.state;
    return (
      <div className="fence-map">
        <div id="map-container" className="map-container" />
        <Widget
          farmAreaValue={farmAreaValue}
          allFarms={allFarms} 
          farmsDistribution={farmsDistribution} 
          clickFarm={({id}) => history.push(`/animal-manage/health-manage?farmId=${id}`)}
          handleFarmAreaChange={this.handleFarmAreaChange}
        />
        { showFarmCard && this.renderFarmCard()}
      </div>
    )
  }
} 

export default connect(({ company }) => ({
  companyDetail: company.companyDetail
}))(FenceManage);