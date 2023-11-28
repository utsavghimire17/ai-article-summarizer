import axios from 'axios';

const ApiKey = import.meta.env.VITE_TEXT_API_KEY;
const ApiHost = import.meta.env.VITE_TEXT_API_HOST;

const textApi = async(text) => {

    const encodedParams = new URLSearchParams();
    encodedParams.set('text', text);
    encodedParams.set('sentnum', '5');

    const options = {
    method: 'POST',
    url: 'https://textanalysis-text-summarization.p.rapidapi.com/text-summarizer-text',
    headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': ApiKey,
        'X-RapidAPI-Host': ApiHost
    },
    data: encodedParams,
    };

    try {
        const response = await axios.request(options);
        return response.data.sentences
    } catch (error) {
        console.error(error);
}
}
export { textApi };