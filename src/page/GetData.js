
import FetchCall from './Fetch';


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

const Timestamp = (timestamp, callback) => {
  let update = false,
      stamp = false;
  if(sessionStorage.getItem(timestamp) !== null){
    stamp = true;
    console.log("timestamp - " + stamp);
    let time    = sessionStorage.getItem(timestamp),
        newtime = new Date().toTimeString().split(" ")[0],
        minutes = 0,
        min_up  = 10;
    newtime = newtime.split(':')[0] * 60 + newtime.split(':')[1] * 1;
    minutes = newtime - time;
    if(minutes >= min_up){
      update = true;
      console.log("update - " + update);
      sessionStorage.setItem(timestamp, newtime);
      return callback(stamp, update)
    }else{
      update = false;
      console.log("update - " + update);
      return callback(stamp, update)
    }
  }else{
    stamp = false;
    console.log("timestamp - " + stamp);
    let time = new Date().toTimeString().split(" ")[0];
    time = time.split(':')[0] * 60 + time.split(':')[1] * 1;
    sessionStorage.setItem(timestamp, time);
    return callback(stamp, update)
  }
}


export const GetDataForecast = (coord, type, callback) => {
  const GetForecast = (coord, type) => {
    let apikey = "4882bb2318db9a69e681e20cc403b2ac",
        url    = "//api.openweathermap.org/data/2.5/forecast?",
        units  = "units=metric";
    FetchCall(url + "lat=" + coord[0] + "&lon=" + coord[1] + "&appid=" + apikey + "&" + units, (data) => {
      let list = {},
          arrl = [];
      if(type === "today"){
        let date  = new Date(data.list[0].dt_txt.split(" ")),
            month = date.toLocaleString('en-US',{month: 'long'}),
            day   = date.getDate(),
            data_list = data.list;
        for(let i=0; i<4; i++){
          let wind = Math.round(data_list[i].wind.speed),
              new_time = (new Date(data_list[i].dt_txt)).getHours() + ":00",
              weather = Math.round(data_list[i].main.temp) + "°C, " + data_list[i].weather[0].description,
              code = {};
          if(wind < 1){
            wind = ", No wind";
          }else{
            wind = ", Wind - " + wind + " meter per second";
          }
          code.time = new_time;
          code.weather = weather + wind;
          arrl[i] = code;
        };
        list.date = month + ", " + day;
        list.data = arrl;
        sessionStorage.setItem("list_" + type, JSON.stringify(list))
        return callback(list, arrl)
      }
      if( type === "tomorrow"){}
      if( type === "week"){}
    });
  };
  Timestamp("timestamp_" + type, (stamp, update) => {
    if(stamp){
      if(update){
        GetForecast(coord, type)
      }else{
        let list = JSON.parse(sessionStorage.getItem("list_" + type));
        return callback(list);
      }
    }else{
      GetForecast(coord, type)
    }
  })
}


const GetDataWeather = (coord, callback) => {
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
  Timestamp("timestamp", (stamp, update) => {
    if(stamp){
      if(update){
        GetWeather(coord);
      }else{
        let list = JSON.parse(sessionStorage.list);
        return callback(list);
      }
    }else{
      GetWeather(coord);
    }
  })
}


export default GetDataWeather;
