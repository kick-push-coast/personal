import classes from './generate-button.module.scss';

export interface DallEDataResponse {
    created: Number,
    data: {
        b64_json: string;
    } []
}

export const GenerateButton = (props: {onLoad: (image: ImageData) => any}) => {

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
        const res = await response.json() as DallEDataResponse;
        processAndReturnImage(res.data[0].b64_json);
    }

    async function processAndReturnImage(b64String: string) {
        const imageData = await getImageDataFromB64(b64String);
        // const whiteRemovedImage = removeWhiteFromImage(imageData);
        props.onLoad(imageData);
    }

    async function getImageDataFromB64(b64String: string): Promise<ImageData> {
        const b64Prefix = 'data:image/png;base64,';
        const canvasDimension = 1024;
        const b64Image = b64Prefix + b64String;

        const canvas = document.createElement("canvas");
        canvas.width = canvas.height = canvasDimension;
        const ctx = canvas.getContext("2d");

        const image = new Image();
        image.src = b64Image;
        await image.decode();

        if (ctx) {
            ctx.drawImage(image, 0, 0);
            return ctx.getImageData(0, 0, canvasDimension, canvasDimension);
        } else {
            return new ImageData(0, 0);
        }
    }

    // function removeWhiteFromImage(imageData: ImageData): ImageData {

    // }
	
	return (
		<button className={classes.button} onClick={handleGenerateClick} >
            Generate drawing
        </button>
	);
};