/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import HMSLocation from '@hmscore/react-native-hms-location';


const yourFunction = (data)=> console.log(data) // set your listener function

// register headless tasks
HMSLocation.ActivityIdentification.Events.registerActivityIdentificationHeadlessTask(yourFunction);
HMSLocation.ActivityIdentification.Events.registerActivityConversionHeadlessTask(yourFunction);
HMSLocation.FusedLocation.Events.registerFusedLocationHeadlessTask(yourFunction);
HMSLocation.Geofence.Events.registerGeofenceHeadlessTask(yourFunction);
AppRegistry.registerComponent(appName, () => App);
