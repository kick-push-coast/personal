import { ColorPicker } from "./options/ColorPicker";
import { WidthPicker } from "./options/WidthPicker";
import { DashPicker } from "./options/DashPicker";
import { GeneratePrompt } from "./options/GeneratePrompt";
import { ClearPrompt } from "./options/ClearPrompt";
import classes from './board-toolbar.module.scss';

interface BoardToolbarProps {
    onImageGenerate: (image: ImageData | undefined) => void
}

export const BoardToolbar = (props: BoardToolbarProps) => {

    return (
        <div className={classes.container}>
            <div>
                <ColorPicker />
                <WidthPicker />
                <DashPicker />
                <GeneratePrompt onImageGenerate={props.onImageGenerate} />
            </div>
            <div>
                <ClearPrompt onImageGenerate={props.onImageGenerate} />
            </div>
        </div>
    );
};