import { ColorPicker } from "./options/ColorPicker";
import { WidthPicker } from "./options/WidthPicker";
import { DashPicker } from "./options/DashPicker";
import classes from './board-toolbar.module.scss';
import { GeneratePrompt } from "./options/GeneratePrompt";

interface BoardToolbarProps {
    onImageGenerate: (image: ImageData | undefined) => void
}

export const BoardToolbar = (props: BoardToolbarProps) => {

    return (
        <div className={classes.container}>

            <ColorPicker />
            <WidthPicker />
            <DashPicker />
            <GeneratePrompt onImageGenerate={props.onImageGenerate} />

        </div>
    );
};