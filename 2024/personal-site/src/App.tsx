import './App.css'
import { LayoutContainer } from './components/LayoutContainer'
import { Avatar } from './components/Avatar'
import { BrowserDisplay } from './components/BrowserDisplay'
import { BrowserRouter } from 'react-router-dom'
import { MobileDisplay } from './components/MobileDisplay'

function App() {

    return (        
        <BrowserRouter>
            <LayoutContainer>
                <Avatar />
                <BrowserDisplay />
                <MobileDisplay />
            </LayoutContainer>
        </BrowserRouter>
    )
}

export default App
