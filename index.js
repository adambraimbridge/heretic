const querystring = require ('querystring')
const fetch = require('node-fetch')
exports.handler = async ({httpMethod, body}) => {
    if (httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' }
    }
    const params = querystring.parse(body)
    const { SLACK_TOKEN, SLACK_WEBHOOK_URL } = process.env
    if (!params.token || params.token !== SLACK_TOKEN) {
        return { statusCode: 401, body: 'Unauthorized' }
    }
    return fetch(process.env.SLACK_WEBHOOK_URL, {
        headers: {
            "content-type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            'text': `🕊 Please think twice before using @here. ${params.text || ''}`
        })
        .then(() => ({
            statusCode: 200,
        }))
        .catch(error => ({
            statusCode: 422,
            body: `Oops! Something went wrong. ${error}`
        }))
    })
}
