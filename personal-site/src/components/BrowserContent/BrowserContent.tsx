import { useEffect, useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { BrowserArticle, ArticleTopic } from '../BrowserArticle';
import { BrowserFun, FunMode } from '../BrowserFun';
import classes from './browser-content.module.scss';

enum Paths {
    Home = '/',
    Skills = '/skills',
    Experience = '/experience',
    Play = '/play',
    Draw = '/draw',
}

export const BrowserContent = () => {

    const container = useRef<HTMLElement>(null);
    const location = useLocation();
    const scrollOnNavigate = () => {
        if (container.current) {
            container.current.scrollTo(0,0);
        }
    }

    console.log(location);

    useEffect(() => {
        scrollOnNavigate()
    }, [location]);
	
	return (
		<main ref={container} className={classes.container + (location.pathname === Paths.Home ? ` ${classes.noDetails}` : '')}>
            <Routes>
                <Route path={Paths.Home} element={<BrowserArticle topic={ArticleTopic.Home} />} />
                <Route path={Paths.Skills} element={<BrowserArticle topic={ArticleTopic.Skills} />} />
                <Route path={Paths.Experience} element={<BrowserArticle topic={ArticleTopic.Experience} />} />
                <Route path={Paths.Play} element={<BrowserFun mode={FunMode.dotGame} />} />
                <Route path={Paths.Draw} element={<BrowserFun mode={FunMode.drawingBoard} />} />
            </Routes>
        </main>
	);
};