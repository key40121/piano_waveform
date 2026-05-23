import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

function App() {
  return (
    <main className="app-shell">
      <section className="hello-panel" aria-label="Hello world">
        <p className="eyebrow">React running on localhost</p>
        <h1>Hello, world!</h1>
        <p className="intro">
          Your simple React front end is ready. Edit <code>src/main.jsx</code> to
          start building from here.
        </p>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
