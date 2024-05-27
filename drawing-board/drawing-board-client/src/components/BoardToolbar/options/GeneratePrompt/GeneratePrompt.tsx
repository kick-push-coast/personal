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
    const getToken = useRecaptcha();
    const generateRef = useRef<HTMLDivElement>(null);
    const [generateOpen, setGenerateOpen] = useState(false);
    const [generateLoading, setGenerateLoading] = useState(false);
    const [generateLabel, setGenerateLabel] = useState(<>Generate</>);
    const [errorMsg, setErrorMsg] = useState<string|null>(null);

    useEffect(() => {
        generateRef.current && registerClickOutside(generateRef.current, () => setGenerateOpen(false));
    }, [])

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const input = form.elements[0] as HTMLInputElement;
        setGenerateLoading(true);
        let recaptchaToken = await getToken();
        if (recaptchaToken) {
            handleGenerateImage(input.value, recaptchaToken);
        } else {
            handleError();
        }
    }

    async function handleGenerateImage(prompt: string, token: string) {
        const image = await generateImage(prompt, token);
        setGenerateLoading(false);
        props.onImageGenerate(image);
        setGenerateOpen(false);
    }

    function handleError(message?: string) {
        const error = message || 'Something went wrong. Try refreshing the page.';
        setErrorMsg(error);
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
                    <h2 className={classes.title}>&nbsp;&nbsp; Describe a drawing to generate ✨</h2>
                    <input disabled={generateLoading} required className={formClasses.input} name="prompt" type='text' autoComplete='off' placeholder='i.e. "evil monkey on a horse"' />
                    <button className={formClasses.submit} type='submit'>
                        {generateLabel}
                    </button>
                    { errorMsg && 
                        <span>
                            {errorMsg}
                        </span>
                    }
                </form>
            </div>
        </div>
    );
};