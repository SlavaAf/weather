import React, { Component } from 'react';
import styles from './home.css';
import GetDataWeather, { GetDataGeoLocation } from '../page/GetData';



class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: "",
      city: "",
      weather: "",
      isLoading: true,
    };
  }

  componentWillMount() {
    GetDataGeoLocation(coord => {
      GetDataWeather(coord, list => {
        this.setState({
          isLoading: false,
          temp: list.temp,
          city: list.city + ", " + list.country,
          weather: list.weather + ", " + list.wind
          })
      })
    })
  }

  render() {
    const { temp, city, weather, isLoading } = this.state;

    if(isLoading) {
      return (
        <h2 className={styles.city__temp}>Loading...</h2>
      )
    };

    if(!isLoading) {
      return [
        <button key="city_save_btn" type="button" className={styles.city__add}>+</button>,
        <h2 key="city_head_temp" className={styles.city__temp}>{temp}</h2>,
        <h1 key="city_head_name" className={styles.city__name}>{city}</h1>,
        <h3 key="city_head_weather" className={styles.city__weather}>{weather}</h3>
      ]
    }
  }
}


class Home extends Component {
  render() {
    return (
      <div>
        <section className={styles.city}>
            <TopBar />
            {/* <withFetching App /> */}
        </section>
        <section className={styles.saveds}>
          <h1 className={styles.saveds__heading}>Saved cities</h1>
        </section>
      </div>
    );
  }
}

export default Home;
