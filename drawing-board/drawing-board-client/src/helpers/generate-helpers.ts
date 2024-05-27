
interface DallEDataResponse {
    created: Number,
    data: {
        b64_json: string;
    } []
}

export async function generateImage(prompt: string) {
    const requestBody = {
        prompt: prompt
    };
    const response = await fetch('http://localhost:3000/generate-drawing',
        {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
    const res = await response.json() as DallEDataResponse;
    if (res?.data[0]?.b64_json) {
        const processedImage = await processAndReturnImage(res.data[0].b64_json);
        return processedImage;
    }
}

async function processAndReturnImage(b64String: string) {
    const imageData = await getImageDataFromB64(b64String);
    const whiteRemovedImage = removeWhiteFromImage(imageData);
    return whiteRemovedImage;
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

function removeWhiteFromImage(imageData: ImageData): ImageData {
    const pixelData = imageData.data;
    const transparentColor = { r: 0, g: 0, b: 0, a: 0 };

    for (var i = 0, n = pixelData.length; i < n; i += 4) {
        let r = pixelData[i],
            g = pixelData[i + 1],
            b = pixelData[i + 2];

        if (r >= 230 && g >= 230 && b >= 230) {
            pixelData[i] = transparentColor.r;
            pixelData[i + 1] = transparentColor.g;
            pixelData[i + 2] = transparentColor.b;
            pixelData[i + 3] = transparentColor.a;
        }
    }

    return imageData;
}