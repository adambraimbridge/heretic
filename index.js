const querystring = require ('querystring')
const axios = require('axios');
exports.handler = async ({httpMethod, body}) => {
    if (httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' }
    }
    const params = querystring.parse(body)
    const { SLACK_TOKEN, SLACK_WEBHOOK_URL } = process.env
    if (!params.token || params.token !== SLACK_TOKEN) {
        return { statusCode: 401, body: 'Unauthorized' }
    }
    try {
        const response = await axios.post(SLACK_WEBHOOK_URL, {
            body: JSON.stringify({
                headers: {
                    "content-type": "application/json"
                },
                method: "POST",
                text: `🕊 Please think twice before using @here. ${params.text || ''}`
            })
        })
        return { 
            statusCode: 200 
        }
    }
    catch (error) {
        return {
            statusCode: 422,
            body: `Error: ${error}`
        }
    }
}
