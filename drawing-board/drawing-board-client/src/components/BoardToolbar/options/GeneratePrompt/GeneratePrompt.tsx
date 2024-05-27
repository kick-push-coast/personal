import { useRef, useState, useEffect, FormEvent } from 'react';
import useClickOutside from '../../../../hooks/use-click-outside';
import openAiSvg from '../../../../assets/openai.svg';
import classes from '../../board-toolbar.module.scss';
import formClasses from './generate-prompt.module.scss';
import { generateImage } from '../../../../helpers/generate-helpers';
import useRecaptcha from '../../../../hooks/use-recaptcha';

interface GeneratePromptProps {
    onImageGenerate: (image: ImageData | undefined) => void
}

let generateTimer: NodeJS.Timeout;

export const GeneratePrompt = (props: GeneratePromptProps) => {
    
    const registerClickOutside = useClickOutside();
    const recaptchaToken = useRecaptcha();
    const generateRef = useRef<HTMLDivElement>(null);
    const [generateOpen, setGenerateOpen] = useState(false);
    const [generateLoading, setGenerateLoading] = useState(false);
    const [generateLabel, setGenerateLabel] = useState(<>Generate</>);

    useEffect(() => {
        generateRef.current && registerClickOutside(generateRef.current, () => setGenerateOpen(false));
    }, [])

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const input = form.elements[0] as HTMLInputElement;
        setGenerateLoading(true);
        const image = await generateImage(input.value, recaptchaToken);
        setGenerateLoading(false);
        props.onImageGenerate(image);
        setGenerateOpen(false);
    }

    useEffect(() => {
        if (generateLoading) {
            let i = 1;
            const labels = [
                <>&nbsp;&nbsp;&nbsp;Generating&nbsp;&nbsp;&nbsp;</>,
                <>&nbsp;&nbsp;&nbsp;Generating.&nbsp;&nbsp;</>,
                <>&nbsp;&nbsp;&nbsp;Generating..&nbsp;</>,
                <>&nbsp;&nbsp;&nbsp;Generating...</>,
            ]
            setGenerateLabel(labels[0]);
            generateTimer = setInterval(() => {
                setGenerateLabel(labels[i]);
                i = i < 3 ? i + 1 : 0;
            }, 500);
        } else {
            clearInterval(generateTimer);
            setGenerateLabel(<>Generate</>);
        }
    }, [generateLoading])
    
    
    return (
        <div ref={generateRef} className={classes.option}>
            <label tabIndex={0} onClick={() => setGenerateOpen(!generateOpen)} className={classes.label + (generateOpen ? ' ' + classes.labelOpen : '')}>
                <img className={classes.dashImg} src={openAiSvg} />
            </label>
            <div className={classes.inputContainer + ' ' + (generateOpen ? ' ' + classes.inputOpen : '')}>
                <form onSubmit={handleSubmit} className={classes.inputMargin}>
                    <h2 className={formClasses.title}>&nbsp;&nbsp; Generate a drawing ✨</h2>
                    <input required className={formClasses.input} name="prompt" type='text' autoComplete='off' placeholder='Enter a description' />
                    <button className={formClasses.submit} type='submit'>
                        {generateLabel}
                    </button>
                </form>
            </div>
        </div>
    );
};