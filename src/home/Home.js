import React, { Component } from 'react';
import styles from './home.css';
import FetchCall from '../page/Fetch'


class Home extends Component {
  componentDidMount() {
    const GetDataWeather = (lat, lon) => {
      let apikey = "4882bb2318db9a69e681e20cc403b2ac";
      FetchCall("//api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apikey + "&units=metric", function(data){
        let city    = data.name,
            temp    = data.main.temp,
            country = data.sys.country,
            weather = data.weather[0].description,
            wind    = data.wind.speed;
        console.log(city, country, temp);
        document.querySelector("." + styles.city__temp).innerHTML = temp;
        document.querySelector("." + styles.city__name).innerHTML = city + ", " + country;
        document.querySelector("." + styles.city__weather).innerHTML = weather + ", Wind - " + wind + " meter per second";
      })
    }
    if(sessionStorage.coord !== undefined){
      console.log("load sessionStorage");
      GetDataWeather(JSON.parse(sessionStorage.coord)[0], JSON.parse(sessionStorage.coord)[1])
    }else{
      console.log("load no session");
      FetchCall("//ip-api.com/json/", function(data){
        let lat = data.lat,
            lon = data.lon;
        sessionStorage.setItem("coord",JSON.stringify([lat,lon]));
        GetDataWeather(lat, lon)
      })
    }
  }

  render() {
    return (
      <div>
        <section className={styles.city}>
            <button type="button" className={styles.city__add}>+</button>
            <h2 className={styles.city__temp}> </h2>
            <h1 className={styles.city__name}> </h1>
            <h3 className={styles.city__weather}> </h3>
        </section>
        <section className={styles.saveds}>
          <h1 className={styles.saveds__heading}>Saved cities</h1>
        </section>
      </div>
    );
  }
}

export default Home;
