import React, { Component } from 'react';
import styles from './App.css';


const GeoRequest = (url, callback) => {
// let obj, countryList;
// let xmlhttp = new XMLHttpRequest();
// xmlhttp.open('POST', '//ip-api.com/json/', true);
// xmlhttp.onreadystatechange = function() {
//     if (xmlhttp.readyState === 4) {
//         if(xmlhttp.status === 200) {
//             obj = JSON.parse(xmlhttp.responseText);
//             countryList = obj.city;
//             console.log(countryList)
//          }
//     }
// };
  fetch(url)
    .then(
      function(response) {
        if(response.status !== 200){
          console.log('Looks like there was a problem. Status Code: ' + response.status);
          return;
        }
        response.json().then(function(data){
          callback(data)
        })
      }
    )
    .catch(
      function(err) {
        console.log('Fetch Error :-S', err);
      }
    );
}

class App extends Component {
  componentDidMount() {
    console.log("load");
    GeoRequest("//ip-api.com/json/", function(data){
      console.log(data)
      let lat = data.lat,
          lon = data.lon,
          apikey = "4882bb2318db9a69e681e20cc403b2ac";
      GeoRequest("//api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apikey + "&units=metric", function(data){
        console.log(data)
        let city    = data.name,
            temp    = data.main.temp,
            country = data.sys.country,
            weather = data.weather[0].description,
            wind    = data.wind.speed;
        console.log(city, temp, country, weather, wind);
        document.querySelector("." + styles.city__temp).innerHTML = temp;
        document.querySelector("." + styles.city__name).innerHTML = city + ", " + country;
        document.querySelector("." + styles.city__weather).innerHTML = weather + ", Wind - " + wind + " meter per second";
      })
    })
  }
  // 4882bb2318db9a69e681e20cc403b2ac
  render() {
    return [
      <header key="header" className={styles.header}>
        <nav className={styles.nav}>
          <ul className={styles.nav__ul}>
            <li className={styles.nav__item}>
              <a href="" className={styles.nav__link}>Today</a>
            </li>
            <li className={styles.nav__item}>
              <a href="" className={styles.nav__link}>Tomorrow</a>
            </li>
            <li className={styles.nav__item}>
              <a href="" className={styles.nav__link}>Week</a>
            </li>
          </ul>
        </nav>
        <input type="search" name="search" placeholder="Find city..." className={styles.header__search}/>
      </header>,
      <main key="main" className={styles.main}>
        <section className={styles.city}>
            <button type="button" className={styles.city__add}>+</button>
            <h2 className={styles.city__temp} >18</h2>
            <h1 className={styles.city__name}>London, GB</h1>
            <h3 className={styles.city__weather}>Clear, Wind - 2.77 meter per second</h3>
        </section>
        <section className={styles.saveds}>
          <h1 className={styles.saveds__heading}>Saved cities</h1>
        </section>
      </main>,
      <footer key="footer" className={styles.footer}>
        <p>Created for training</p>
      </footer>
    ];
  }
}
// const Weather = () => {}

export default App;
