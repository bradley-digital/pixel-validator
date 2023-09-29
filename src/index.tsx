import { createRoot } from 'react-dom/client';
import App from './components/App';

const dom = document.createElement('div');
dom.id = "root";
document.body.appendChild(dom);

const root = createRoot(dom);
root.render(<App />);
