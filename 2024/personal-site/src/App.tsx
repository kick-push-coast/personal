import './App.css'
import { LayoutContainer } from './components/LayoutContainer'
import { Avatar } from './components/Avatar'
import { BrowserDisplay } from './components/BrowserDisplay'
import { BrowserRouter } from 'react-router-dom'

function App() {

    return (

        /**
         * - Layout
         *  - Avatar
         *  - Browser
         *      - BrowserToolbar
         *      - BrowserContent
         * 
         * 
         */
        
        <BrowserRouter>
            <LayoutContainer>
                <Avatar />
                <BrowserDisplay />
            </LayoutContainer>
        </BrowserRouter>
    )
}

export default App
