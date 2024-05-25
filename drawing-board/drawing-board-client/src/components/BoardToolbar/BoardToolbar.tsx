import { ColorPicker } from "./options/ColorPicker";
import { WidthPicker } from "./options/WidthPicker";
import { DashPicker } from "./options/DashPicker";
import classes from './board-toolbar.module.scss';

export const BoardToolbar = () => {

    return (
        <div className={classes.container}>

            <ColorPicker />
            <WidthPicker />
            <DashPicker />
            
        </div>
    );
};