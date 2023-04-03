const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_KEY,
});

export const openai = new OpenAIApi(configuration);
