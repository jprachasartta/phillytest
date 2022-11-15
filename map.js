// ADD YOUR MAPBOX ACCESS TOKEN
mapboxgl.accessToken =
  "pk.eyJ1IjoianByYWMiLCJhIjoiY2t2aXRzOGx6Y3BldzJvbW50NGxyMDUwbSJ9.xPknrw_XSeNgZ5w7SxkOIg"; //YOUR KEY HERE
 
// CREATE A NEW OBJECT CALLED MAP
const map = new mapboxgl.Map({
  container: "map", // container ID for the map object
  style: "mapbox://styles/jprac/cl9vriycd000314o80svl28s1", //YOUR STYLE URL
  center: [-75.1652, 39.9526], // starting position [lng, lat]
  zoom: 12, // starting zoom
  projection: "globe", // display the map as a 3D globe
});

// ADD A GEOJSON SOURCE THAT POINTS TO YOUR LOCAL FILE
map.on("load", function () {
    map.addSource("playstreets", {
      type: "geojson",
      data: "/PPR_Playstreets_Locations.geojson",
    });
   
    // ADD A LAYER TO THE MAP
    map.addLayer({
      id: "playstreets",
      type: "fill",
      source: "playstreets",
      layout: {},
      paint: {
        "fill-color": [
          // first introduce conditional in-case of null values
          "case",
          ["==", ["get", "geometry"], null],
          "rgba(0,0,0,0)",
          [
            // then use a linear ramp to display number values. Adjust rgba color values.
            "interpolate",
            ["linear"],
            ["get", "geometry"],
            0,
            "rgba(255,0,0,0)",
            1,
            "rgba(60,60,60,20)",
            2,
            "rgba(90,60,60,100)",
            3,
            "rgba(175,60,60,175)",
            4,
            "rgba(255,60,60,225)",
          ],
        ],
        "fill-opacity": 0.9,
      },
    });
  });
  