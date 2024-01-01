import classes from './layout-container.module.scss';

export interface LayoutContainerProps {
    children: React.ReactNode;
}

export const LayoutContainer = (props: LayoutContainerProps) => {
	
	return (
		<div className={classes.layout}>
            { props.children }
        </div>
	);
};