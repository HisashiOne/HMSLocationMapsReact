/*
    Copyright 2020-2021. Huawei Technologies Co., Ltd. All rights reserved.

    Licensed under the Apache License, Version 2.0 (the "License")
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        https://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

import React from "react";
import { SafeAreaView, StyleSheet, ScrollView, View, Text, Image, Button, TextInput } from "react-native";

import { Colors } from "react-native/Libraries/NewAppScreen";

import HMSLocation from "@hmscore/react-native-hms-location";
import HMSMap, { MapTypes } from "@hmscore/react-native-hms-map";

let myLatitude = 0;
let myLongitude = 0;

const locationRequest = {
  priority: HMSLocation.FusedLocation.Native.PriorityConstants.PRIORITY_HIGH_ACCURACY,
  interval: 10000,
  numUpdates: 2147483647,
  fastestInterval: 10000,
  expirationTime: 3372036854775807.0,
  smallestDisplacement: 0.0,
  maxWaitTime: 0,
  needAddress: false,
  language: '',
  countryCode: '',
};

const locationSettingsRequest = {
  locationRequests: [locationRequest],
  alwaysShow: false,
  needBle: false,
};

class Header extends React.Component {
  componentDidMount() {
    HMSLocation.LocationKit.Native.init()
      .then((_) => console.log("Done loading"))
      .catch((err) => alert(err.message));
  }
  render() {
    return (
      <>
        <View style={styles.header}>
          <Text style={styles.headerTitle}> HMS MAP LOCATION  KIT</Text>
        </View>
      </>
    );
  }
}

class Permissions extends React.Component {
  constructor() {
    super();
    this.state = { location: false, activity: false };
  }
  componentDidMount() {
    // Check location permissions
    HMSLocation.FusedLocation.Native.hasPermission()
      .then((res) => this.setState({ location: res.hasPermission }))
      .catch((err) => alert(err.message));

    // Check ActivityIdentification permissions
    HMSLocation.ActivityIdentification.Native.hasPermission()
      .then((res) => this.setState({ activity: res.hasPermission }))
      .catch((err) => alert(err.message));
  }

  requestLocationPermisson = () =>
    HMSLocation.FusedLocation.Native.requestPermission().then((res) => this.setState({ location: res.granted }));

  requestActivityIdentificationPermisson = () =>
    HMSLocation.ActivityIdentification.Native.requestPermission().then((res) =>
      this.setState({ activity: res.granted })
    );

  render() {
    return (
      <>
      <View style={styles.sectionContainer}>
      
      <HMSMap
      style={{ height: 400 }}
  camera={{
    target: { latitude: 41, longitude: 29 },
    zoom: 11,
    bearing: 5,
    tilt: 70,
  }}
  latLngBoundsForCameraTarget={[
    { latitude: 40, longitude: 28 },
    { latitude: 42, longitude: 30 },
  ]}
  useAnimation={true}
  animationDuration={2000}
  compassEnabled={true}
  mapType={MapTypes.NORMAL}
  minZoomPreference={10}
  maxZoomPreference={20}
  rotateGesturesEnabled={true}
  scrollGesturesEnabled={true}
  tiltGesturesEnabled={true}
  zoomControlsEnabled={true}
  zoomGesturesEnabled={true}
  buildingsEnabled={true}
  trafficEnabled={true}
  pointToCenter={{x: 10, y: 10}}
  gestureScaleByMapCenter={true}
  markerClusterColor={[255, 230, 130, 0]}
  markerClusterTextColor={[200, 0, 0, 0]}
  markerClusterIcon={{ asset: "ic_launcher.png" }}
  description="Huawei Map"
  mapStyle={
    '[{"mapFeature":"all","options":"labels.icon","paint":{"icon-type":"night"}}]'
  }
  myLocationEnabled={true}
  mapPadding={{ right: 200, left: 10, top: 10, bottom: 10 }}
  markerClustering={true}
  myLocationButtonEnabled={true}
  scrollGesturesEnabledDuringRotateOrZoom={true}
  onCameraUpdateFinished={(e) => console.log("HMSMap onCameraUpdateFinished: ", e.nativeEvent)}
  onCameraUpdateCanceled={(e) => console.log("HMSMap onCameraUpdateCanceled: ", e.nativeEvent)}
  onCameraIdle={(e) => console.log("HMSMap onCameraIdle: ", e.nativeEvent)}
  onMapReady={(e) => console.log("HMSMap onMapReady: ", e.nativeEvent)}
  onCameraMoveCanceled={(e) => console.log("HMSMap onCameraMoveCanceled: ", e.nativeEvent)}
  onCameraMove={(e) => console.log("HMSMap onCameraMove: ", e.nativeEvent)}
  onCameraMoveStarted={(e) => console.log("HMSMap onCameraMoveStarted: ", e.nativeEvent)}
  onMapClick={(e) => console.log("HMSMap onMapClick: ", e.nativeEvent)}
  onMapLoaded={(e) => console.log("HMSMap onMapLoaded: ", e.nativeEvent)}
  onMapLongClick={(e) => console.log("HMSMap onMapLongClick: ", e.nativeEvent)}
  onMyLocationButtonClick={(e) => console.log("HMSMap onMyLocationButtonClick: ", e.nativeEvent)}
  onMyLocationClick={(e) => console.log("HMSMap onMyLocationClick: ", e.nativeEvent)}
  onPoiClick={(e) => console.log("HMSMap onPoiClick: ", e.nativeEvent)}
  onSnapshotReady={(e) => console.log("HMSMap onSnapshotReady: ", e.nativeEvent)}
/>
      <View style={styles.spaceBetweenRow}>
      
      </View>
      </View>
        <View style={styles.sectionContainer}>
          <View style={styles.spaceBetweenRow}>
            <Text style={styles.sectionTitle}>Location</Text>
            <Button title="Get Permission" onPress={this.requestLocationPermisson} />
          </View>
          <View style={styles.spaceBetweenRow}>
            <Text style={styles.monospaced}>{JSON.stringify(this.state.location, null, 2)}</Text>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.spaceBetweenRow}>
            <Text style={styles.sectionTitle}>Activity Identification</Text>
            <Button title="Get Permission" onPress={this.requestActivityIdentificationPermisson} />
          </View>
          <View style={styles.spaceBetweenRow}>
            <Text style={styles.monospaced}>{JSON.stringify(this.state.activity, null, 2)}</Text>
          </View>
        </View>
      </>
    );
  }
}
class LocationAvailability extends React.Component {
  constructor() {
    super();
    this.state = { locationAvailable: false };
  }

  getLocationAvailability = () =>
    HMSLocation.FusedLocation.Native.getLocationAvailability()
      .then((res) => this.setState({ locationAvailable: res.isLocationAvailable }))
      .catch((err) => alert(err.message));

  render() {
    return (
      <>
        <View style={styles.sectionContainer}>
          <View style={styles.spaceBetweenRow}>
            <Text style={styles.sectionTitle}>Location Availability</Text>
            <Button title="Check" onPress={this.getLocationAvailability} />
          </View>
          <View style={styles.spaceBetweenRow}>
            <Text style={styles.monospaced}>{JSON.stringify(this.state.locationAvailable, null, 2)}</Text>
          </View>
        </View>
      </>
    );
  }
}

class LocationSettings extends React.Component {
  constructor() {
    super();
    this.state = { locationSettings: {} };
  }

  checkLocationSettings = () =>
    HMSLocation.FusedLocation.Native.checkLocationSettings(locationSettingsRequest)
      .then((res) => this.setState({ locationSettings: res }))
      .catch((err) => alert(err.message));

  render() {
    return (
      <>
        <View style={styles.sectionContainer}>
          <View style={styles.spaceBetweenRow}>
            <Text style={styles.sectionTitle}>Location Settings</Text>
            <Button title="Check" onPress={this.checkLocationSettings} />
          </View>
          <View style={styles.spaceBetweenRow}>
            <Text style={styles.sectionDescription}></Text>
          </View>
          <View style={styles.spaceBetweenRow}>
            <Text style={styles.monospaced}>{JSON.stringify(this.state.locationSettings, null, 2)}</Text>
          </View>
        </View>
      </>
    );
  }
}

class LocationEnhance extends React.Component {
  constructor() {
    super();
    this.state = { navigationState: {} };
  }

  getNavigationState = () =>
    HMSLocation.FusedLocation.Native.getNavigationContextState(
      HMSLocation.FusedLocation.Native.NavigationRequestConstants.IS_SUPPORT_EX
    )
      .then((res) => this.setState({ navigationState: res }))
      .catch((err) => alert(err.message));

  render() {
    return (
      <>
        <View style={styles.sectionContainer}>
          <View style={styles.spaceBetweenRow}>
            <Text style={styles.sectionTitle}>Location Enhance</Text>
            <Button title="Check" onPress={this.getNavigationState} />
          </View>
          <View style={styles.spaceBetweenRow}>
            <Text style={styles.sectionDescription}></Text>
          </View>
          <View style={styles.spaceBetweenRow}>
            <Text style={styles.monospaced}>{JSON.stringify(this.state.navigationState, null, 2)}</Text>
          </View>
        </View>
      </>
    );
  }
}

class LastLocation extends React.Component {
  constructor() {
    super();
    this.state = { location: {} };
  }

  getLocation = () =>
    HMSLocation.FusedLocation.Native.getLastLocation()
      .then((pos) => {
        this.setState({ location: pos });
        myLatitude = pos.latitude;
        myLongitude = pos.longitude;
      })
      .catch((err) => alert(err.message));

  render() {
    return (
      <>
        <View style={styles.sectionContainer}>
          <View style={styles.spaceBetweenRow}>
            <Text style={styles.sectionTitle}>Last Location</Text>
            <Button title="Get" onPress={this.getLocation} />
          </View>
          <View style={styles.spaceBetweenRow}>
            <Text style={styles.monospaced}>{JSON.stringify(this.state.location, null, 2)}</Text>
          </View>
        </View>
      </>
    );
  }
}

class LocationAddress extends React.Component {
  constructor() {
    super();
    this.state = { locationAddress: {} };
  }

  locationRequest = {
    priority: HMSLocation.FusedLocation.Native.PriorityConstants.PRIORITY_HIGH_ACCURACY,
    interval: 10000,
    numUpdates: 2147483647,
    fastestInterval: 10000,
    expirationTime: 3372036854775807.0,
    smallestDisplacement: 0.0,
    maxWaitTime: 0,
    needAddress: true,
    language: '',
    countryCode: '',
  };

  getLocation = () =>
    HMSLocation.FusedLocation.Native.getLastLocationWithAddress(this.locationRequest)
      .then((pos) => this.setState({ locationAddress: pos }))
      .catch((err) => alert(err.message));

  render() {
    return (
      <>
        <View style={styles.sectionContainer}>
          <View style={styles.spaceBetweenRow}>
            <Text style={styles.sectionTitle}>Last Location With Address</Text>
            <Button title="Get" onPress={this.getLocation} />
          </View>
          <View style={styles.spaceBetweenRow}>
            <Text style={styles.monospaced}>{JSON.stringify(this.state.locationAddress, null, 2)}</Text>
          </View>
        </View>
      </>
    );
  }
}
class LocationUpdateWithCallback extends React.Component {
  constructor() {
    super();
    this.state = { locationCallbackResult: {}, reqCode: null, autoUpdateEnabled: false };
  }

  handleLocationUpdate = (locationResult) => { console.log(locationResult); this.setState({ locationCallbackResult: locationResult }); }

  requestLocationCallbackWithListener = () => {
    HMSLocation.FusedLocation.Native.requestLocationUpdatesWithCallbackEx(locationRequest)
      .then((res) => this.setState({ reqCode: res.requestCode }))
      .catch((err) => alert(err.message));
    HMSLocation.FusedLocation.Events.addFusedLocationEventListener(this.handleLocationUpdate);
    this.setState({ autoUpdateEnabled: true });
  };

  removeLocationAndListener = () => {
    HMSLocation.FusedLocation.Native.removeLocationUpdatesWithCallback(this.state.reqCode)
      .then((_) => this.setState({ reqCode: null }))
      .catch((err) => alert(err.message));
    HMSLocation.FusedLocation.Events.removeFusedLocationEventListener(this.handleLocationUpdate);
    this.setState({ autoUpdateEnabled: false });
  };

  render() {
    return (
      <>
        <View style={styles.sectionContainer}>
          <View style={styles.spaceBetweenRow}>
            <Text style={styles.sectionTitle}>Location Update With Callback</Text>
          </View>
          <View style={styles.spaceBetweenRow}>
            <Text style={styles.monospaced}>{JSON.stringify(this.state.locationCallbackResult, null, 2)}</Text>
          </View>
          <View style={styles.centralizeContent}>
            <Button
              title={`${this.state.autoUpdateEnabled ? "Disable" : "Enable"} auto-update`}
              onPress={() => {
                if (this.state.autoUpdateEnabled) {
                  this.removeLocationAndListener();
                } else {
                  this.requestLocationCallbackWithListener();
                }
              }}
            />
          </View>
        </View>
      </>
    );
  }
}
class MockLocation extends React.Component {
  constructor() {
    super();
    this.state = { mocked: false, lat: "41.3", lon: "29.1" };
  }

  enableMockLocation = () => {
    HMSLocation.FusedLocation.Native.setMockMode(true)
      .then((res) => {
        console.log("Mock mode enabled:", res);
        this.setState({ mocked: true });
      })
      .catch((err) => alert(err.message));
  };

  disableMockLocation = () => {
    HMSLocation.FusedLocation.Native.setMockMode(false)
      .then((res) => {
        console.log("Mock mode disabled:", res);
        this.setState({ mocked: false });
      })
      .catch((err) => alert(err.message));
  };

  setMockLocation = () => {
    HMSLocation.FusedLocation.Native.setMockLocation({
      latitude: parseFloat(this.state.lat),
      longitude: parseFloat(this.state.lon),
    })
      .then((res) => console.log("MOCK SET", res))
      .catch((err) => alert(err.message));
  };
  render() {
    return (
      <>
        <View style={styles.sectionContainer}>
          <View style={styles.spaceBetweenRow}>
            <Text style={styles.sectionTitle}>Mock Location</Text>
            {this.state.mocked ? (
              <Button title="Disable" color="red" onPress={this.disableMockLocation} />
            ) : (
              <Button title="Enable" onPress={this.enableMockLocation} />
            )}
          </View>
          <View>
            <Text style={styles.boldText}>Latitude</Text>
            <TextInput
              style={styles.input}
              placeholder="LAT"
              value={this.state.lat}
              keyboardType="numeric"
              onChangeText={(val) => this.setState({ lat: val })}
            />
            <Text style={styles.boldText}>Longitude</Text>
            <TextInput
              style={styles.input}
              placeholder="LON"
              value={this.state.lon}
              keyboardType="numeric"
              onChangeText={(val) => this.setState({ lon: val })}
            />
          </View>
          <View style={styles.centralizeContent}>
            <Button disabled={!this.state.mocked} title="Set Mock Location" onPress={this.setMockLocation} />
          </View>
        </View>
      </>
    );
  }
}
class Notification extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <>
        <View style={styles.sectionContainer}>
          <View style={styles.spaceBetweenRow}>
            <Text style={styles.sectionTitle}>Notification</Text>
            <Button title="Set" onPress={() => {
              HMSLocation.LocationKit.Native.setNotification({
                contentTitle: "Hello",
                contentText: "You received something",
                defType: "mipmap",
                resourceName: "ic_launcher",
              })
                .then((res) => console.log("Notification set:", res))
                .catch((err) => alert(err.message));
            }} />
          </View>
        </View>
      </>
    );
  }
}

class LocationUpdate extends React.Component {
  constructor() {
    super();
    this.state = { locationResult: {}, reqCode: 1, autoUpdateEnabled: false };
  }

  handleLocationUpdate = (locationResult) => { console.log(locationResult); this.setState({ locationResult: locationResult.lastLocation }); };

  requestLocationWithListener = () => {
    HMSLocation.FusedLocation.Native.requestLocationUpdates(this.state.reqCode, locationRequest)
      .then((res) => console.log(res))
      .catch((err) => alert(err.message));
    HMSLocation.FusedLocation.Events.addFusedLocationEventListener(this.handleLocationUpdate);
    this.setState({ autoUpdateEnabled: true });
  };

  removeLocationAndListener = () => {
    HMSLocation.FusedLocation.Native.removeLocationUpdates(this.state.reqCode)
      .then((res) => console.log(res))
      .catch((err) => alert(err.message));
    HMSLocation.FusedLocation.Events.removeFusedLocationEventListener(this.handleLocationUpdate);
    this.setState({ autoUpdateEnabled: false });
  };

  render() {
    return (
      <>
        <View style={styles.sectionContainer}>
          <View style={styles.spaceBetweenRow}>
            <Text style={styles.sectionTitle}>Location Update</Text>
          </View>
          <View style={styles.spaceBetweenRow}>
            <Text style={styles.sectionDescription}>
              <Text style={styles.boldText}>Location Request Code</Text>: {`${this.state.reqCode || ""}`}
            </Text>
          </View>
          <View style={styles.spaceBetweenRow}>
            <Text style={styles.monospaced}>{JSON.stringify(this.state.locationResult, null, 2)}</Text>
          </View>
          <View style={styles.centralizeContent}>
            <Button
              title={this.state.autoUpdateEnabled ? "Disable auto-update" : "Enable auto-update"}
              onPress={() => {
                if (this.state.autoUpdateEnabled) {
                  this.removeLocationAndListener();
                } else {
                  this.requestLocationWithListener();
                }
              }}
            />
          </View>
        </View>
      </>
    );
  }
}

class Geofence extends React.Component {
  constructor() {
    super();
    this.state = { geofenceResponse: {}, reqCode: 1, activated: false, subscribed: false };
  }

  createGeofenceList = (requestCode) => {
    const conversionType = HMSLocation.Geofence.Native.GeofenceRequestConstants.DWELL_INIT_CONVERSION;
    const coordinateType = HMSLocation.Geofence.Native.GeofenceRequestConstants.COORDINATE_TYPE_WGS_84;
    const geofence = {
      latitude: myLatitude,
      longitude: myLongitude,
      radius: 100000.0,
      uniqueId: "e02329",
      conversions: HMSLocation.Geofence.Native.GeofenceConstants.DWELL_GEOFENCE_CONVERSION,
      validContinueTime: 10000.0,
      dwellDelayTime: 10,
      notificationInterval: 1,
    };
    const geofenceList = [geofence];
    HMSLocation.Geofence.Native.createGeofenceList(requestCode, geofenceList, conversionType, coordinateType)
      .then((_) => this.setState({ activated: true }))
      .catch((err) => alert(err.message));
  };

  deleteGeofenceList = (requestCode) => {
    HMSLocation.Geofence.Native.deleteGeofenceList(requestCode)
      .then((_) => this.setState({ activated: false }))
      .catch((err) => alert(err.message));
  };

  handleGeofenceEvent = (geo) => this.setState({ geofenceResponse: geo });

  addGeofenceEventListener = () => {
    HMSLocation.Geofence.Events.addGeofenceEventListener(this.handleGeofenceEvent);
    this.setState({ subscribed: true });
  };

  removeGeofenceEventListener = () => {
    HMSLocation.Geofence.Events.removeGeofenceEventListener(this.handleGeofenceEvent);
    this.setState({ subscribed: false });
  };

  render() {
    return (
      <>
        <View style={styles.sectionContainer}>
          <View style={styles.spaceBetweenRow}>
            <Text style={styles.sectionTitle}>Geofence</Text>
          </View>
          <View style={styles.spaceBetweenRow}>
            <Text style={styles.sectionDescription}>
              <Text style={styles.boldText}>Geofence Request Code</Text>: {`${this.state.reqCode || ""}`}
            </Text>
          </View>
          <Text style={styles.monospaced}>{JSON.stringify(this.state.geofenceResponse, null, 2)}</Text>
          <View style={styles.centralizeContent}>
            <Button
              title={this.state.activated ? "Remove Geofence" : "Create Geofence"}
              onPress={() =>
                this.state.activated
                  ? this.deleteGeofenceList(this.state.reqCode)
                  : this.createGeofenceList(this.state.reqCode)
              }
            />
            <Button
              title={this.state.subscribed ? "Unsubscribe" : "Subscribe"}
              onPress={() =>
                this.state.subscribed ? this.removeGeofenceEventListener() : this.addGeofenceEventListener()
              }
            />
          </View>
        </View>
      </>
    );
  }
}

class ActivityIdentification extends React.Component {
  constructor() {
    super();
    this.state = { reqCode: 1, activated: false, subscribed: false, identificationResponse: {} };
  }

  // Activity Identification
  createActivityIdentification = (requestCode) =>
    HMSLocation.ActivityIdentification.Native.createActivityIdentificationUpdates(requestCode, 20000)
      .then((_) => this.setState({ activated: true }))
      .catch((err) => alert(err.message));

  removeActivityIdentification = (requestCode) =>
    HMSLocation.ActivityIdentification.Native.deleteActivityIdentificationUpdates(requestCode)
      .then((_) => this.setState({ activated: false }))
      .catch((err) => alert(err.message));

  handleActivityIdentification = (act) => this.setState({ identificationResponse: act });

  addActivityIdentificationEventListener = () => {
    HMSLocation.ActivityIdentification.Events.addActivityIdentificationEventListener(this.handleActivityIdentification);
    this.setState({ subscribed: true });
  };

  removeActivityIdentificationEventListener = () => {
    HMSLocation.ActivityIdentification.Events.removeActivityIdentificationEventListener(
      this.handleActivityIdentification
    );
    this.setState({ subscribed: false });
  };

  render() {
    return (
      <>
        <View style={styles.sectionContainer}>
          <View style={styles.spaceBetweenRow}>
            <Text style={styles.sectionTitle}>Activity Identification</Text>
          </View>
          <View style={styles.spaceBetweenRow}>
            <Text style={styles.sectionDescription}>
              <Text style={styles.boldText}>Activity Request Code</Text>: {`${this.state.reqCode || ""}`}
            </Text>
          </View>
          <View style={styles.spaceBetweenRow}>
            <Text style={styles.monospaced}>{JSON.stringify(this.state.identificationResponse, null, 2)}</Text>
          </View>
          <View style={styles.centralizeContent}>
            <Button
              title={this.state.activated ? "Remove Identification" : "Get Identification"}
              onPress={() => {
                if (this.state.activated) {
                  this.removeActivityIdentification(this.state.reqCode);
                } else {
                  this.createActivityIdentification(this.state.reqCode);
                }
              }}
            />
            <Button
              title={this.state.subscribed ? "Unsubscribe" : "Subscribe"}
              onPress={() => {
                if (this.state.subscribed) {
                  this.removeActivityIdentificationEventListener();
                } else {
                  this.addActivityIdentificationEventListener();
                }
              }}
            />
          </View>
        </View>
      </>
    );
  }
}

class ActivityConversion extends React.Component {
  constructor() {
    super();
    this.state = { reqCode: 2, activated: false, subscribed: false, conversionResponse: {} };
  }

  // Activity Conversion
  handleActivityConversion = (conv) => this.setState({ conversionResponse: conv });

  createConversionUpdates = (requestCode) => {
    HMSLocation.ActivityIdentification.Native.createActivityConversionUpdates(requestCode, [
      // STILL
      {
        conversionType: HMSLocation.ActivityIdentification.Native.ActivityConversions.ENTER_ACTIVITY_CONVERSION,
        activityType: HMSLocation.ActivityIdentification.Native.Activities.STILL,
      },
      {
        conversionType: HMSLocation.ActivityIdentification.Native.ActivityConversions.EXIT_ACTIVITY_CONVERSION,
        activityType: HMSLocation.ActivityIdentification.Native.Activities.STILL,
      },

      // ON FOOT
      {
        conversionType: HMSLocation.ActivityIdentification.Native.ActivityConversions.ENTER_ACTIVITY_CONVERSION,
        activityType: HMSLocation.ActivityIdentification.Native.Activities.FOOT,
      },
      {
        conversionType: HMSLocation.ActivityIdentification.Native.ActivityConversions.EXIT_ACTIVITY_CONVERSION,
        activityType: HMSLocation.ActivityIdentification.Native.Activities.FOOT,
      },

      // RUNNING
      {
        conversionType: HMSLocation.ActivityIdentification.Native.ActivityConversions.ENTER_ACTIVITY_CONVERSION,
        activityType: HMSLocation.ActivityIdentification.Native.Activities.RUNNING,
      },
      {
        conversionType: HMSLocation.ActivityIdentification.Native.ActivityConversions.EXIT_ACTIVITY_CONVERSION,
        activityType: HMSLocation.ActivityIdentification.Native.Activities.RUNNING,
      },
    ])
      .then((_) => this.setState({ activated: true }))
      .catch((err) => alert(err.message));
  };

  deleteConversionUpdates = (requestCode) => {
    HMSLocation.ActivityIdentification.Native.deleteActivityConversionUpdates(requestCode)
      .then((_) => this.setState({ activated: false }))
      .catch((err) => alert(err.message));
  };

  addActivityConversionEventListener = () => {
    HMSLocation.ActivityIdentification.Events.addActivityConversionEventListener(this.handleActivityConversion);
    this.setState({ subscribed: true });
  };

  removeActivityConversionEventListener = () => {
    HMSLocation.ActivityIdentification.Events.removeActivityConversionEventListener(this.handleActivityConversion);
    this.setState({ subscribed: false });
  };
  render() {
    return (
      <>
        <View style={styles.sectionContainer}>
          {/* Conversion */}
          <View style={styles.spaceBetweenRow}>
            <Text style={styles.sectionTitle}>Conversion Update</Text>
          </View>
          <View style={styles.spaceBetweenRow}>
            <Text style={styles.sectionDescription}>
              <Text style={styles.boldText}>Conversion Request Code</Text>: {`${this.state.reqCode || ""}`}
            </Text>
          </View>
          <View style={styles.spaceBetweenRow}>
            <Text style={styles.monospaced}>{JSON.stringify(this.state.conversionResponse, null, 2)}</Text>
          </View>
          <View style={styles.centralizeContent}>
            <Button
              title={this.state.activated ? "Remove Update" : "Create Update"}
              onPress={() =>
                this.state.activated ? this.deleteConversionUpdates(this.state.reqCode) : this.createConversionUpdates(this.state.reqCode)
              }
            />
            <Button
              title={this.state.subscribed ? "Unsubscribe" : "Subscribe"}
              onPress={() =>
                this.state.subscribed ? this.removeActivityConversionEventListener() : this.addActivityConversionEventListener()
              }
            />
          </View>
        </View>
      </>
    );
  }
}
const App = () => {
  return (
    <>
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
          <Header />
          <View style={styles.body}>
            <Permissions />
            <View style={styles.divider} />
            <LocationAvailability />
            <View style={styles.divider} />
            <LocationSettings />
            <View style={styles.divider} />
            <LocationEnhance />
            <View style={styles.divider} />
            <LastLocation />
            <View style={styles.divider} />
            <LocationAddress />
            <View style={styles.divider} />
            <LocationUpdateWithCallback />
            <View style={styles.divider} />
            <MockLocation />
            <View style={styles.divider} />
            <Notification />
            <View style={styles.divider} />
            <LocationUpdate />
            <View style={styles.divider} />
            <Geofence />
            <View style={styles.divider} />
            <ActivityIdentification />
            <View style={styles.divider} />
            <ActivityConversion />
            <View style={styles.divider} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: "absolute",
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 30,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: "400",
    color: Colors.dark,
  },
  activityData: {
    marginTop: 8,
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "400",
    color: Colors.dark,
  },
  highlight: {
    fontWeight: "700",
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: "600",
    padding: 4,
    paddingRight: 12,
    textAlign: "right",
  },
  header: {
    height: 80,
    width: "100%",
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "gray" },
  headerLogo: { height: 160, width: 160 },
  spaceBetweenRow: { flexDirection: "row", justifyContent: "space-between" },
  divider: {
    width: "90%",
    alignSelf: "center",
    height: 1,
    backgroundColor: "grey",
    marginTop: 20,
  },
  boldText: { fontWeight: "bold" },
  centralizeSelf: { alignSelf: "center" },
  centralizeContent: { flexDirection: "row", justifyContent: "space-around", alignItems: 'center' },
  monospaced: { fontFamily: "monospace" },
});

export default App;
