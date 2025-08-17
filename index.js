// index.js (raiz)
import { registerRootComponent } from 'expo';
import { AppRegistry } from 'react-native';
import { createRoot } from 'react-dom/client';
import App from './app';

// compatibilidade web/mobile
if (typeof document !== 'undefined') {
  // Para web: createRoot
  const rootTag = createRoot(document.getElementById('root'));
  rootTag.render(<App />);
} else {
  // Para mobile: registerRootComponent
  registerRootComponent(App);
}