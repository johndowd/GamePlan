import React from "react"
import { Loader } from "@googlemaps/js-api-loader"

const SimpleMap = (props) => {

  const loader = new Loader({
    apiKey: "AIzaSyC5Gj_-ovAnb8B9ViBYmW4v8Qu5r4L7iyU",
    libraries: ["places"]
  });


  loader.load().then(async () => {
    const geocoder = new google.maps.Geocoder()
    const results = await geocoder.geocode({ address: props.address })
    const { lat, lng } = results.results[0].geometry.location
    console.log(lat(), lng());
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: lat(), lng: lng() },
      zoom: 12,
    });

    new google.maps.Marker({
      position: { lat: lat(), lng: lng() },
      map: map,
    });
  })

  return (
    <>
      <div id="map" style={{ height: 400 }}></div>
    </>
  )
}

export default SimpleMap