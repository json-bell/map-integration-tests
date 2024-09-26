import React, { useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [showPopup, setShowPopup] = useState(true);
  const [addedMarkers, setAddedMarkers] = useState([]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        onPress={(e) => {
          console.log(e.nativeEvent);
          const newCoords = e.nativeEvent.coordinate;
          if (newCoords) {
            setAddedMarkers((currMarkers) => {
              console.log("current:", currMarkers);
              const updatedMarkers = [...currMarkers];
              updatedMarkers.push({ ...newCoords });
              console.log(
                "there are now ",
                updatedMarkers.length,
                "markers:",
                updatedMarkers
              );
              return updatedMarkers;
            });
          }
        }}
        onMarkerPress={(event) => {
          console.log(event.nativeEvent);
          setShowPopup((bool) => !bool);
        }}
      >
        <Marker
          coordinate={{ latitude: 30, longitude: 0 }}
          pinColor={"blue"}
        ></Marker>
        {showPopup && (
          <Marker coordinate={{ latitude: 50, longitude: 0 }}></Marker>
        )}
        {addedMarkers.map((markerCoords, index) => {
          return (
            <Marker
              key={index}
              coordinate={markerCoords}
              pinColor="black"
            ></Marker>
          );
        })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
