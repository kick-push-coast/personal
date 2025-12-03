
interface DallEDataResponse {
    created: number,
    data: {
        b64_json: string;
    } []
}

export async function generateImage(prompt: string, recaptchaToken: string) {
    const requestBody = { prompt, recaptchaToken };

    const response = await fetch('https://miketyler.us/generate-drawing', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
    });

    // Throw if the response is not OK
    if (!response.ok) {
        let errorMessage = `Request failed with status ${response.status}`;

        // Try to parse JSON first
        try {
            const errorData = await response.json();
            if (errorData?.response) {
                errorMessage += `: ${errorData.response}`;
            } else {
                errorMessage += `: ${JSON.stringify(errorData)}`;
            }
        } catch {
            // Fall back to plain text if not JSON
            const text = await response.text().catch(() => '');
            if (text) errorMessage += `: ${text}`;
        }

        throw new Error(errorMessage);
    }

    // If OK, parse and handle the JSON response
    const res = await response.json() as DallEDataResponse;

    if (
        res &&
        Array.isArray(res.data) &&
        res.data.length > 0 &&
        res.data[0] &&
        res.data[0].b64_json
    ) {
        const processedImage = await processAndReturnImage(res.data[0].b64_json);
        return processedImage;
    }

    throw new Error('No image data returned from API');
}



async function processAndReturnImage(b64String: string) {
    const imageData = await getImageDataFromB64(b64String);
    const whiteRemovedImage = removeNearWhite(imageData);
    return whiteRemovedImage;
}

async function getImageDataFromB64(b64String: string): Promise<ImageData> {
    const b64Prefix = 'data:image/png;base64,';
    const b64Image = b64Prefix + b64String;

    const canvas = document.createElement("canvas");
    canvas.width = 1792;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d");

    const image = new Image();
    image.src = b64Image;
    await image.decode();

    if (ctx) {
        ctx.drawImage(image, 0, 0);
        return ctx.getImageData(0, 0, 1792, 1024);
    } else {
        return new ImageData(0, 0);
    }
}

function removeNearWhite(imageData: ImageData, brightnessThreshold = 0.65): ImageData {
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i] / 255;
        const g = data[i + 1] / 255;
        const b = data[i + 2] / 255;

        // perceived brightness (ITU-R BT.709)
        const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;

        if (brightness >= brightnessThreshold) {
            data[i + 3] = 0; // transparent
        }
    }

    return imageData;
}