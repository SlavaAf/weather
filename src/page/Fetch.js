
const GeoRequest = (url, callback) => {
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

export default GeoRequest
