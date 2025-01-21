import { ArticleTopic, BrowserArticle } from '../BrowserArticle';
import classes from './mobile-display.module.scss';

const topics = [
    ArticleTopic.Home,
    ArticleTopic.Experience,
    ArticleTopic.Skills
]

export const MobileDisplay = () => {
	
	return (
		<div className={classes.container}>
            { topics.map((topic, i) => {
                return (
                    <div key={i} className={classes.article}>
                        <BrowserArticle topic={topic} />
                    </div>
                )
            })}
        </div>
	);
};