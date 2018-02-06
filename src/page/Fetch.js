
const GeoRequest = (url, callback) => {
  let options = {
    method: 'GET',
    // headers: {
    //   'Accept': 'application/json, text/plain, */*',
    //   'Content-Type': 'application/json'
    // },
    // mode: 'cors',
    // cache: 'default' 
  };
  fetch(url, options)
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

export default GeoRequest
