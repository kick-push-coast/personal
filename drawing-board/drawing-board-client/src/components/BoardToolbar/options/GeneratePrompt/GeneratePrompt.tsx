import { useRef, useState, useEffect, FormEvent } from 'react';
import { generateImage } from '../../../../helpers/generate-helpers';
import useClickOutside from '../../../../hooks/use-click-outside';
import useRecaptcha from '../../../../hooks/use-recaptcha';
import openAiSvg from '../../../../assets/openai.svg';
import classes from '../../board-toolbar.module.scss';
import formClasses from './generate-prompt.module.scss';

interface GeneratePromptProps {
    onImageGenerate: (image: ImageData | undefined) => void
}

let generateTimer: NodeJS.Timeout;
const genericError = 'Whoops, something went awry :-/';

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
        setErrorMsg(null);
        const recaptchaToken = await getToken();
        if (recaptchaToken) {
            handleGenerateImage(input.value, recaptchaToken);
        } else {
            handleError(genericError);
        }
    }

    async function handleGenerateImage(prompt: string, token: string) {
        try {
            const image = await generateImage(prompt, token);
            setGenerateLoading(false);
            props.onImageGenerate(image);
            setGenerateOpen(false);
        } catch {
            setGenerateLoading(false);
            handleError(genericError);
        }
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
        return (() => clearInterval(generateTimer));
    }, [generateLoading])
    
    
    return (
        <div ref={generateRef} className={classes.option}>
            <label
                title="Drawing generator"
                tabIndex={0}
                onClick={() => setGenerateOpen(!generateOpen)}
                onKeyDown={(e) => (e.key === 'Enter') && setGenerateOpen(!generateOpen)}
                className={classes.label + (generateOpen ? ' ' + classes.labelOpen : '')}
                role="button"
                aria-haspopup="true"
                aria-expanded={generateOpen}
                aria-controls="drawing-generator-prompt">
                <img alt="Drawing generator icon" className={classes.dashImg} src={openAiSvg} />
            </label>
            <div id="drawing-generator-prompt" className={classes.inputContainer + ' ' + (generateOpen ? ' ' + classes.inputOpen : '')}>
                <form onSubmit={handleSubmit} className={classes.inputMargin + ' ' + classes.form}>
                    <h2 className={classes.title}>Describe a drawing to generate ✨</h2>
                    <input disabled={generateLoading} required className={formClasses.input} name="prompt" type='text' autoComplete='off' placeholder='i.e. "evil monkey on a horse"' />
                    <button disabled={generateLoading} className={formClasses.submit} type='submit'>
                        {generateLabel}
                    </button>
                    { errorMsg && 
                        <span className={formClasses.error}>
                            {errorMsg}
                        </span>
                    }
                </form>
            </div>
        </div>
    );
};