import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Gacha from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Gacha />
  </StrictMode>,
)
