// app.js (raiz)
import { ExpoRoot } from 'expo-router';
import { name as appName } from './app.json';

export default function App() {
  return <ExpoRoot context={require.context('./app')} />;
}

//  compatibilidade com React Native Web
if (typeof document !== 'undefined') {
  AppRegistry.registerComponent(appName, () => App);
  AppRegistry.runApplication(appName, {
    rootTag: document.getElementById('root'),
  });
}