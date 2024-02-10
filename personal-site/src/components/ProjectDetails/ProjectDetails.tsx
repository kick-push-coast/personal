import { Fragment } from 'react';
import classes from './project-details.module.scss';

export interface ProjectDetailsProps {
    tech: string[];
    githubLink: string;
}

export const ProjectDetails = (props: ProjectDetailsProps) => {
	
	return (
		<div className={classes.container}>
            <p className={classes.details}>
                {
                    props.tech.map((t, i) => {
                        return (
                            <Fragment key={i}>
                                {
                                    i > 0 ? <span>-&nbsp;</span> : null
                                }
                                <span className={classes.tech}>{t} </span>
                            </Fragment>

                        )
                    })
                }
            </p>
            <a href={props.githubLink} target="_blank">View on GitHub &#8594;</a>
        </div>
	);
};