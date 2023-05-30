import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import 'tailwindcss/tailwind.css';

import App from './App';
import store from 'redux/store';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <Provider store={store}>
      {/* default store config for the store the state in redux */}
      <App />
    </Provider>
  );
}
