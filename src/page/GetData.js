
import FetchCall from './Fetch';

// Geolocation
export const GetDataGeoLocation = (callback) => {
  let coord = [];

  if(sessionStorage.coord !== undefined){
    console.log("load sessionStorage");
    coord = JSON.parse(sessionStorage.coord);
    return callback(coord);
  }else{
    console.log("load no session");
    FetchCall("//ipapi.co/json", data => {
      coord = [data.latitude, data.longitude];

      if(data.country === "RU"){
        sessionStorage.setItem("coord",JSON.stringify(coord));
        return callback(coord);
      }else{
        if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition( position => {
            let coord_2 = [position.coords.latitude, position.coords.longitude];
            if(coord_2.length !== 0){
              sessionStorage.setItem("coord",JSON.stringify(coord_2));
              return callback(coord_2);
            }else{
              sessionStorage.setItem("coord",JSON.stringify(coord));
              return callback(coord);
            }
          },() => {
            sessionStorage.setItem("coord",JSON.stringify(coord));
            return callback(coord);
          })
        }else{
          sessionStorage.setItem("coord",JSON.stringify(coord));
          return callback(coord);
        }
      }
    })
  }
}



export const GetDataForecast = (lat, lon, item, callback) => {
  // let apikey = "4882bb2318db9a69e681e20cc403b2ac";
  console.log("forecast")
}


const GetDataWeather = (coord, callback) => {
  // -----
  const GetWeather = (coord) => {
    let apikey = "4882bb2318db9a69e681e20cc403b2ac",
        url    = "//api.openweathermap.org/data/2.5/weather?",
        units  = "units=metric";
    FetchCall(url + "lat=" + coord[0] + "&lon=" + coord[1] + "&appid=" + apikey + "&" + units, (data) => {
      let list = {};
      list.city    = data.name;
      list.temp    = data.main.temp + "°C";
      list.country = data.sys.country;
      list.weather = data.weather[0].description;

      if(1 >= data.wind.speed){
        list.wind = "No wind";
      }else{
        list.wind  = "Wind - " + data.wind.speed + " meter per second";
      }

      sessionStorage.setItem("list",JSON.stringify(list));

      return callback(list)
    })
  }
  if(sessionStorage.timestamp !== undefined){
    console.log("timestamp");
    let time    = sessionStorage.timestamp,
        newtime = new Date().toTimeString().split(" ")[0],
        minutes = 0,
        min_up  = 10;

    newtime = newtime.split(':')[0] * 60 + newtime.split(':')[1] * 1;
    minutes = newtime - time;

    if(minutes >= min_up){
      console.log("update");
      sessionStorage.setItem("timestamp", newtime);
      GetWeather(coord);
    }else{
      console.log("not update");
      let list = JSON.parse(sessionStorage.list);
      return callback(list);
    }
  }else{
    console.log("no timestamp");
    let time = new Date().toTimeString().split(" ")[0];
    sessionStorage.setItem("timestamp", time);
    GetWeather(coord);
  }
}

export default GetDataWeather;
