import Config from 'react-native-config';
import Constants from 'expo-constants';

const { OPENAI_API_KEY } = Constants.expoConfig.extra;

export const analyzeImagesWithOpenAI = async (base64Strings) => {
    const url = 'https://api.openai.com/v1/chat/completions';
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
    };

    try {
        console.log("Starting analysis of images with OpenAI API");

        const responses = await Promise.all(base64Strings.map(base64String => {
            const payload = {
                "model": "gpt-4-vision-preview",
                "messages": [
                    {
                        "role": "user",
                        "content": [
                            {
                                "type": "text",
                                "text": "Analyze the images and extract information to create a series of clear and concise 'question' and 'answer' pairs in JSON format. The questions and answers should be directly derived from the content in the images. If any questions or answers are incomplete due to insufficient data in the images, please use relevant context to complete them appropriately. Ensure all Q&A pairs are in the same language as the original text found in the images. Please optimize for quality and relevance of content within the token limit."
                            },
                            {
                                "type": "image_url",
                                "image_url": { "url": `data:image/jpeg;base64,${base64String}` }
                            }
                        ]
                    }
                ],
                "max_tokens": 1000
            };
            console.log("Sending payload to OpenAI for image:", payload);

            return fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(payload),
            });
        }));

        const data = await Promise.all(responses.map(async response => {
            const jsonResponse = await response.json();
            console.log("Received response from OpenAI API:", jsonResponse);
            return transformDataForFlashcards(extractQAPairsFromResponse(jsonResponse));
        }));

        console.log("Completed analysis of images with OpenAI API:", data);
        return data.flat(); // Flattened array of Q&A pairs
    } catch (error) {
        console.error('Error contacting OpenAI API:', error);
        throw error;
    }
};

const extractQAPairsFromResponse = (response) => {
    const content = response.choices[0].message.content;

    try {
        const jsonContent = content.replace(/```json/g, '').replace(/```/g, '').trim();
        const qaPairs = JSON.parse(jsonContent);
        return qaPairs;
    } catch (error) {
        console.error('Error parsing JSON from response:', error);
        return [];
    }
};

const transformDataForFlashcards = (data) => {
    return data.map(qaPair => {
        return { question: qaPair.question, answer: qaPair.answer };
    });
};