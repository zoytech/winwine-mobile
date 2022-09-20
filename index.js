/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
require('dotenv').config()

console.log(process.env.S3_API)
AppRegistry.registerComponent(appName, () => App);
