import { Fragment } from 'react';
import classes from './project-details.module.scss';

export interface ProjectDetailsProps {
    tech?: string[];
    link: string;
    linkLabel: string;
}

export const ProjectDetails = (props: ProjectDetailsProps) => {
	
	return (
		<div className={classes.container}>
            <p className={classes.details}>
                {
                    props.tech && props.tech.map((t, i) => {
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
            <a href={props.link} target="_blank">{props.linkLabel} &#8594;</a>
        </div>
	);
};