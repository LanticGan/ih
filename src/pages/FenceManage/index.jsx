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
  }

  fetchFenceList = async params => {
    const res = await getFenceList({ ...params });
    const { code, message: info, data = {} } = res;
    const { list = [], currPage, pageSize, totalCount } = data;
    if (code == 500) {
        message.error(info);
        return;
    }
    console.log('list', list);
  }

  fetchFarmList = async params => {
    const { companyId } = this.props;
    const res = await getFarmList({ companyId, ...params });
    const { code, message: info, data = {} } = res;
    const { list = [], currPage, pageSize, totalCount } = data;
    if (code == 500) {
        message.error(info);
        return;
    }
  }

  renderFarmCard = () => {
    const { targetFarm = {} } = this.state;
    const { x = 0, y = 0 } = targetFarm;

    if (!targetFarm.center) {
      return null;
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

  addFarmsMarker = () => {
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
      text.on('mouseover', (e) => this.handleHoverFarm(e, farm));
      text.on('mouseout', (e) => this.handleOutFarm(e, farm));
      text.on('click', (e) => this.handleClickFarm(farm));

    });
  }
  
  addFence = (farm) => {
    const {id, center, radius, animals = []} = farm;

    const fence = new AMap.Circle({
      center: center,
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
      const { center } = animal;
      const x = center[0] + Math.random() * 0.001;
      const y = center[1] + Math.random() * 0.001;

      const animalCircle = new AMap.Circle({
        center: [x, y],
        radius: 10,
        borderWeight: 1,
        strokeColor: "#fff", 
        strokeOpacity: .1,
        strokeWeight: 1,
        fillOpacity: 1,
        strokeStyle: 'solid',
        fillColor: '#1461cc',
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
    let farmsDistribution = farms;
    if (id != 'all') {
      farmsDistribution = farms.filter(f => f.id == id);
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
      zoom: 5,//级别
      center: [109, 33],//中心点坐标
    });
    this.fetchFenceList();
    this.addFarmsMarker();
    this.setState({
      farmsDistribution: farms
    });
  }

  render() {
    const { showFarmCard, farmsDistribution = [], farmAreaValue } = this.state;
    return (
      <div className="fence-map">
        <div id="map-container" className="map-container" />
        <Widget
          farmAreaValue={farmAreaValue}
          allFarms={farms} 
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