import React, { useEffect, useState } from "react"
import { Loader } from "@googlemaps/js-api-loader"

import MapSearch from "./MapSearch"
import ResultList from "./ResultList"


const GoogleMap = (props) => {

  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [error, setError] = useState("")

  const loader = new Loader({
    apiKey: "AIzaSyC5Gj_-ovAnb8B9ViBYmW4v8Qu5r4L7iyU",
    libraries: ["places"]
  });

  useEffect(() => {
    setError("")
    loader.load().then(() => {
      const boston = { lat: 42.361, lng: -71.057 };

      const request = {
        query: props.formData.location,
        location: boston,
        radius: "500"
      };

      const map = new google.maps.Map(document.getElementById("map"), {
        center: boston,
        zoom: 12,
      });

      const service = new google.maps.places.PlacesService(map);
      if (searchQuery) {
        service.textSearch(request, function (results, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            setSearchResults(results)
            results.forEach((result) => {
              const resultContent =
                `<p>${result.name}</p>` +
                `<p>${result.formatted_address}</p>`

              const infowindow = new google.maps.InfoWindow({
                content: resultContent,
                ariaLabel: result.name,
              });

              const marker = new google.maps.Marker({
                position: new google.maps.LatLng(result.geometry.location.lat(), result.geometry.location.lng()),
                map: map,
              });

              marker.addListener("click", () => {
                infowindow.open({
                  anchor: marker,
                  map,
                });
              });
            })
            map.setCenter(results[0].geometry.location);
          } else {
            setError("No results found, please try again.")
          }
        })
      }
    });
  }, [searchQuery])

  return (
    <>
      <MapSearch
        setSearchQuery={setSearchQuery}
        handleChange={props.handleChange}
        formData={props.formData}
      />
      <p className="error">{error}</p>
      <div id="map" style={{ height: 300 }}></div>
      <ResultList
        searchResults={searchResults}
        formData={props.formData}
        setFormData={props.setFormData}
        setShowMap={props.setShowMap}
      />
    </>
  )
}

export default GoogleMap