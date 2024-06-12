import { useContext, useRef } from 'react';
import { GlobalLoadedStateContext } from '../LayoutContainer';
import classes from './avatar.module.scss';
import avatar from '../../assets/me.svg';

export const Avatar = () => {

    const emailBtn = useRef<HTMLButtonElement>(null);
    const globalLoadedStateContext = useContext(GlobalLoadedStateContext)

    function handleEmailClick() {
        navigator.clipboard.writeText('mktyler01@gmail.com');
        if (emailBtn.current) {
            emailBtn.current.textContent = 'Copied ✓';
            setTimeout(() => {
                if (emailBtn.current) emailBtn.current.textContent = 'Copy email';
            }, 3000);
        }
    }
	
	return (
		<div className={classes.container}>
            <img onLoad={() => { globalLoadedStateContext.setAssetsLoaded(true) }} className={classes.avatarImage} src={avatar} alt="A portrait illustration of Mike Tyler" />
            <header className={classes.avatarHeader}>
                <h1>
                    Mike Tyler
                </h1>
                <p>
                    Software Engineer
                </p>
                <nav>
                    <button ref={emailBtn} onClick={handleEmailClick} className={classes.contactBtn} title="Copy mktyler01@gmail.com">
                        Copy email
                    </button>
                    &nbsp;|&nbsp;
                    <a className={classes.contactLink} href="https://www.linkedin.com/in/michael-tyler-569159147/" target="_blank" title="Mike Tyler's LinkedIn page">
                        LinkedIn
                    </a>
                    &nbsp;|&nbsp;
                    <a className={classes.contactLink} href="https://github.com/kick-push-coast/personal/tree/master" target="_blank" title="Mike Tyler's GitHub page">
                        GitHub
                    </a>
                </nav>
            </header>
        </div>
	);
};