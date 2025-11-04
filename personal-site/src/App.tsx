import './App.css'
import { LayoutContainer } from './components/LayoutContainer'
import { Avatar } from './components/Avatar'
import { BrowserDisplay } from './components/BrowserDisplay'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MobileDisplay } from './components/MobileDisplay'
import { Playground } from './components/Playground'

function App() {

    return (        
        <BrowserRouter>
            <Routes>
                <Route 
                    path='*' 
                    element={
                        <LayoutContainer>
                            <Avatar />
                            <BrowserDisplay />
                            <MobileDisplay />
                        </LayoutContainer>
                    }
                />
                <Route path='/playground' element={<Playground />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
