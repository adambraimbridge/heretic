const querystring = require ('querystring')
exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' }
    }
    const params = querystring.parse(event.body)
    const { SLACK_TOKEN } = process.env
    if (!params.token || params.token !== SLACK_TOKEN) {
        return { statusCode: 401, body: 'Unauthorized' }
    }
    return {
        statusCode: 200,
        headers: {
            'content-type': 'application/json'
        },
        body: `{
            'response_type': 'in_channel',
            'text': '🕊 Please think twice before using @here. ${params.text || ""}'
        }`
    }
}
