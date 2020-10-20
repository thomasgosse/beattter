import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

// import { DevSettings } from 'react-native';

// if (__DEV__) {
//   DevSettings._nativeModule.setHotLoadingEnabled(false);
// }

AppRegistry.registerComponent(appName, () => App);
