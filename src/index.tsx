/* @refresh reload */
import './index.css';
import { render } from 'solid-js/web';
import 'solid-devtools';

import App from './App';
import { ConvexClient } from 'convex/browser';
import { ConvexContext } from './convex';

const convex = new ConvexClient(import.meta.env.VITE_CONVEX_URL as string);

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(
  () => (
    <ConvexContext.Provider value={convex}>
      <App />
    </ConvexContext.Provider>
  ),
  root!
);
