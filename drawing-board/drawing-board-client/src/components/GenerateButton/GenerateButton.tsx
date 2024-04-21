import classes from './generate-button.module.scss';

export interface GenerateButtonProps {}

export const GenerateButton = () => {

    async function handleGenerateClick() {
        const requestBody = {
            prompt: 'a pineapple'
        };
        const response = await fetch('http://localhost:3000/generate-image',
            {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        const res = await response.json();
        console.log(res);
    }
	
	return (
		<button className={classes.button} onClick={handleGenerateClick} >
            Generate image
        </button>
	);
};