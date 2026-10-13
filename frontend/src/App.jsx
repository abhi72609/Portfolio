import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import NotFoundPage from './pages/NotFoundPage'
import PortfolioPage from './pages/PortfolioPage'
import CreatePortfolioPage from './pages/CreatePortfolioPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/create-portfolio" element={<CreatePortfolioPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
