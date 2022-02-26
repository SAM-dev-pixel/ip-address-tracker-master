const getApiFetch =async(url)=> {
  const api = await fetch(url);
  return api.json();
}

const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');
searchBtn.addEventListener('click', getDatas);
async function getDatas() {
  
  try {
    const datas = await getApiFetch('https://geo.ipify.org/api/v2/country,city?apiKey=at_Dc0QHiP1AWMO0wQ6DkwGfZwgnvJgp&ipAddress='+ searchInput.value);
    
    document.querySelector('.ip').textContent = datas.ip;
    document.querySelector('.location').textContent = `${datas.location.region}, ${datas.location.country}`;
    document.querySelector('.timezone').textContent = `UTC${datas.location.timezone}`;
    document.querySelector('.isp').textContent = `${datas.isp}`;
    getMap(datas.location.lat, datas.location.lng);
    
  } catch(err) {
    
    alert('Please enter the right IP address');
    
  }
  
};
getDatas();


function getMap(lat, lng) {
  
  var container = L.DomUtil.get('map');
  if (container != null) {
    container._leaflet_id = null;
  }
  var map = L.map('map').setView([lat, lng], 13);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2hhbW4iLCJhIjoiY2wwMGRjMHY4MGl6NTNjcDZvNXd5c3Z6aiJ9.QwCFx5Rg-k6ucmt3FL9k5Q', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
  }).addTo(map);
  
  var marker = L.marker([lat, lng]).addTo(map);
  
}
