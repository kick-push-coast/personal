import { NavLink } from 'react-router-dom';
import classes from './tab-links.module.scss';

const links = [
    {
        url: '/',
        label: 'Welcome',
        state: {
            introWasTyped: true
        }
    },
    {
        url: '/experience',
        label: 'Experience'
    },
    {
        url: '/skills',
        label: 'Skills & Education'
    },
    {
        url: '/play',
        label: 'Play'
    },
    {
        url: '/draw',
        label: 'Draw'
    }

]

export const TabLinks = () => {	
	return (
        <nav className={classes.container}>
            { links.map((link, i) =>
                <NavLink key={i} to={link.url} state={link.state} className={({ isActive }) => (isActive ? classes.active + ' ' + classes.tab : classes.tab)}>
                    { link.label }
                </NavLink>
            )}
        </nav>
	);
};