import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Draganddrop from './DragandDrop'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Draganddrop/>
  </StrictMode>,
)
