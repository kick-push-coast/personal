import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

window.history.replaceState({}, document.title);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <App />
)
