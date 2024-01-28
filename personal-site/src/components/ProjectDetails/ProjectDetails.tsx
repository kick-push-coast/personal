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
                            <>
                                {
                                    i > 0 ? <span>-&nbsp;</span> : null
                                }
                                <span className={classes.tech} key={i}>{t} </span>
                            </>

                        )
                    })
                }
            </p>
            <a href={props.githubLink} target="_blank">View on Github &#8594;</a>
        </div>
	);
};