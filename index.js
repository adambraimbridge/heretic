const querystring = require ('querystring')
const axios = require('axios');
exports.handler = async ({httpMethod, body}) => {
    if (httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' }
    }
    const { token, text, response_url } = querystring.parse(body)
    const { SLACK_TOKEN } = process.env
    if (!token || token !== SLACK_TOKEN) {
        return { statusCode: 401, body: 'Unauthorized' }
    }
    try {

        await axios.post(response_url, {
            text: `🕊 Please think twice before using @here. ${text || ''}`,
        },
        {
            headers: { "content-type": "application/json" }
        })
        return { 
            statusCode: 200 
        }
    }
    catch (error) {
        console.error(error)
        return {
            statusCode: 422,
            body: error.message
        }
    }
}
