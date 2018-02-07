import React, { Component } from 'react';
import styles from './today.css';
// import FetchCall from '../page/Fetch';
import GoogleMapReact from 'google-map-react';
import { GetDataForecast, GetDataGeoLocation } from '../page/GetData';
import { TopBar } from '../home/Home';

const AnyReactComponent = ({ text }) => {
  let data = JSON.parse(sessionStorage.list),
      temp = data.temp,
      weather = data.weather;

  return(
    <span className={styles.map__marker + " " + styles.map__marker_hidden}>
      {text}
      <span>{temp}<br/>{weather}</span>
    </span>
  )
}

class SimpleMap extends Component {
  constructor(props) {
     super(props);
     this.state = {
       apikey: "AIzaSyCelDWnJzogIKY0ewNVp_PQvjj_Iedm5Xc",
       coord: [],
       zoom: 11,
       isLoading: true
     }
  }
  _onChildClick = (key, childProps) => {
    let el    = document.querySelector("." + styles.map__marker);
    if(el.classList.contains(styles.map__marker_hidden)){
      el.classList.remove(styles.map__marker_hidden)
    }else{
      el.classList.add(styles.map__marker_hidden)
    }
  }
  componentWillMount(){
    GetDataGeoLocation((coord) => {
      this.setState({
        coord: coord,
        isLoading: false,
      })
    })
  }

  render() {
    const { isLoading, coord, zoom, apikey } = this.state;
    if(isLoading){
      return (
        <h2>Loading map...</h2>
      )
    }
    if(!isLoading){
      return (
        <GoogleMapReact
          defaultCenter={coord}
          defaultZoom={zoom}
          apiKey={apikey}
          onChildClick={this._onChildClick}
        >
          <AnyReactComponent
            lat={coord[0]}
            lng={coord[1]}
            text={""}
          />
        </GoogleMapReact>
      );
    }
  }
}


class Forecast extends Component {
  constructor(props){
    super(props);
    this.state = {
      date: "",
      lists: [],
      isLoading: true
    };
  }
  componentWillMount(){
    GetDataGeoLocation((coord) => {
      GetDataForecast(coord, "today", (list, arrl) => {
        // console.log(list)
        this.setState({
          isLoading: false,
          date: list.date,
          lists: list.data
        })
      })
    })
  }
  render(){
    const { date, lists, isLoading } = this.state;
    // console.log(lists)
    if( isLoading ){
      return (
        <div className={styles.more__data}>
          <h1 className={styles.more__heading}>Today</h1>
          <h2 className={styles.more__date}>Loading...</h2>
        </div>
      )
    };
    if( !isLoading ){
      const table = lists.map((item,i) =>
          <tr key={ "today_fore_" + i.toString()}>
            <td>{item.time}</td>
            <td>{item.weather}</td>
          </tr>
      )
      return (
        <div className={styles.more__data}>
          <h1 className={styles.more__heading}>Today</h1>
          <h2 className={styles.more__date}>{date}</h2>
          <table className={styles.table}>
            <thead className={styles.table__thead}>
              <tr>
                <td>Time</td>
                <td>Weather</td>
              </tr>
            </thead>
            <tbody className={styles.table__tbody}>
              {table}
            </tbody>
          </table>
        </div>
      )
    }
  }
}


const Today = () => {
  return [
    <section key="today_topbar" className={styles.city}>
      <TopBar otherPage="true"/>
    </section>,
    <section key="today_other" className={styles.more}>
      <Forecast />
      <div className={styles.more__map}>
        <SimpleMap coord={sessionStorage.coord}/>
      </div>
    </section>
  ]
}


export default Today;
