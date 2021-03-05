//const parseCamp = JSON.parse(camping);
 
 mapboxgl.accessToken = mapToken;
  const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/light-v10', // style URL
  center:  camping.geometry.coordinates, // starting position [lng, lat]
  zoom: 8 // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker()
     .setLngLat(camping.geometry.coordinates)
     .setPopup(
       new mapboxgl.Popup({offset:25})
       .setHTML(
         `<h4>${camping.title}</h4><p>${camping.location}</p>`
       )
     )
     .addTo(map)