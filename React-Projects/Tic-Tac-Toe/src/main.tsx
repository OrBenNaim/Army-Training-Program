import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import Game from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Game />
  </StrictMode>,
)
