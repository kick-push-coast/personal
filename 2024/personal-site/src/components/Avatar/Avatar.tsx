import classes from './avatar.module.scss';
import avatar from '../../assets/me.svg';

export const Avatar = () => {
	
	return (
		<div className={classes.container}>
            <img className={classes.avatarImage} src={avatar} />
            <header className={classes.avatarHeader}>
                <h1>
                    Mike Tyler
                </h1>
                <p>
                    Software Engineer
                </p>
            </header>
        </div>
	);
};