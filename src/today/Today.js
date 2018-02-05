import React, { Component } from 'react';
import styles from './today.css';
import FetchCall from '../page/Fetch'



class Today extends Component {
  componentDidMount() {
    const GetDataWeather = (lat, lon) => {
      let apikey = "4882bb2318db9a69e681e20cc403b2ac";
      FetchCall("//api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apikey + "&units=metric", function(data){
        let city    = data.name,
            temp    = data.main.temp,
            country = data.sys.country;
        document.querySelector("." + styles.city__temp).innerHTML = temp;
        document.querySelector("." + styles.city__name).innerHTML = city + ", " + country;
        // console.log(data)
      })
      FetchCall("//api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apikey + "&units=metric", function(data){
        let date  = new Date(data.list[0].dt_txt.split(" ")),
            month = date.toLocaleString('en-US',{month: 'long'}),
            day   = date.getDate(),
            time  = date.getHours() + ":00",
            dlist = data.list,
            html_code = "";
            // time  = date.getHours() + ":" + date.getMinutes();
        document.querySelector("." + styles.more__date).innerHTML = month + ", " + day;
        for(let i=0; i<4; i++){
          let l_time = (new Date(dlist[i].dt_txt)).getHours() + ":00",
              l_temp = Math.round(dlist[i].main.temp) + "°C, ",
              l_weat = dlist[i].weather[0].description,
              l_wind = Math.round(dlist[i].wind.speed);
          if(l_wind <= 1){
            l_wind = ", No wind";
          }else{
            l_wind = ", Wind - " + l_wind + " meter per second";
          }
          html_code += "<tr><td>" + l_time + "</td><td>" + l_temp + l_weat + l_wind + "</td></tr>";
          console.log(l_time, l_temp, l_weat, l_wind)
        }
        // console.log(html_code);
        document.querySelector("." + styles.table__tbody).innerHTML = html_code;
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
            <h2 className={styles.city__temp} >18</h2>
            <h1 className={styles.city__name}>London, GB</h1>
        </section>
        <section className={styles.more}>
          <div className={styles.more__data}>
            <h1 className={styles.more__heading}>Today</h1>
            <h2 className={styles.more__date}>August, 31</h2>
            <table className={styles.table}>
              <thead className={styles.table__thead}>
                <tr>
                  <td>Time</td>
                  <td>Weather</td>
                </tr>
              </thead>
              <tbody className={styles.table__tbody}>
                <tr>
                  <td>15:00</td>
                  <td>18°C, Clear, Wind - 2.77 meter per second</td>
                </tr>
                <tr>
                  <td>18:00</td>
                  <td>18°C, Clear, Wind - 2.77 meter per second</td>
                </tr>
                <tr>
                  <td>21:00</td>
                  <td>18°C, Clear, Wind - 2.77 meter per second</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={styles.more__map}></div>
        </section>
      </div>
    );
  }
}

export default Today;
