import { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import OverviewPage from './pages/OverviewPage.jsx'
import JunctionsPage from './pages/JunctionsPage.jsx'
import AnalyticsPage from './pages/AnalyticsPage.jsx'
import EmergencyEventsPage from './pages/EmergencyEventsPage.jsx'
import './styles/App.css'

function App() {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedJunction, setSelectedJunction] = useState(null)

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  const handleSelectJunction = (junction) => {
    setSelectedJunction(junction)
  }

  const handleClosePanel = () => {
    setSelectedJunction(null)
  }

  const handleViewOnMap = (junction) => {
    setSelectedJunction(junction)
    setActiveTab('overview')
  }

  return (
    <div className="traffiq-app">
      <Navbar
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      <main className="traffiq-main-area">
        {activeTab === 'overview' && (
          <OverviewPage
            selectedJunction={selectedJunction}
            onSelectJunction={handleSelectJunction}
            onClosePanel={handleClosePanel}
          />
        )}

        {activeTab === 'junctions' && (
          <JunctionsPage
            onViewOnMap={handleViewOnMap}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsPage />
        )}

        {activeTab === 'emergency' && (
          <EmergencyEventsPage />
        )}
      </main>
    </div>
  )
}

export default App
