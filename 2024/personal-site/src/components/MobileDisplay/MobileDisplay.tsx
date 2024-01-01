import { ArticleTopic, BrowserArticle } from '../BrowserArticle';
import classes from './mobile-display.module.scss';

const topics = [
    ArticleTopic.Home,
    ArticleTopic.Skills,
    ArticleTopic.Experience,
    ArticleTopic.Education
]

export const MobileDisplay = () => {
	
	return (
		<div className={classes.container}>
            { topics.map((topic) => {
                return (
                    <div className={classes.article}>
                        <BrowserArticle topic={topic} />
                    </div>
                )
            })}
        </div>
	);
};