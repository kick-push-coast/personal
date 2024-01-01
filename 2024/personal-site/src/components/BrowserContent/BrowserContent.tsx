import { Route, Routes } from 'react-router-dom';
import { BrowserArticle, ArticleTopic } from '../BrowserArticle';
import classes from './browser-content.module.scss';

export const BrowserContent = () => {
	
	return (
		<main className={classes.container}>
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