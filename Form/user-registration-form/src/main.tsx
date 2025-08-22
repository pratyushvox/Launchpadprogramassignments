import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Userform from './UserForm.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Userform />
  </StrictMode>,
)
