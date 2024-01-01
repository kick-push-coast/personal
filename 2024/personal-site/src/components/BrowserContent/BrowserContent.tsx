import { Route, Routes, useLocation } from 'react-router-dom';
import { BrowserArticle, ArticleTopic } from '../BrowserArticle';
import classes from './browser-content.module.scss';
import { useEffect, useRef } from 'react';

export const BrowserContent = () => {

    const container = useRef<HTMLElement>(null);
    const location = useLocation();
    const scrollOnNavigate = () => {
        if (container.current) {
            container.current.scrollTo(0,0);
        }
    }

    useEffect(() => {
        scrollOnNavigate()
    }, [location]);
	
	return (
		<main ref={container} className={classes.container}>
            <Routes>
                <Route path="/" element={<BrowserArticle topic={ArticleTopic.Home} />} />
                <Route path="/skills" element={<BrowserArticle topic={ArticleTopic.Skills} />} />
                <Route path="/experience" element={<BrowserArticle topic={ArticleTopic.Experience} />} />
                <Route path="/education" element={<BrowserArticle topic={ArticleTopic.Education} />} />
                <Route path="/fun" element={<div>fun</div>} />
            </Routes>
        </main>
	);
};