import querystring from "querystring"
exports.handler = async (event, context) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" }
    }
    const params = querystring.parse(event.body)
    const { SLACK_TOKEN } = process.env
    if (!params.token || params.token !== SLACK_TOKEN) {
        return { statusCode: 401, body: "Unauthorized" }
    }
    const message = params.message || ''
    return {
        statusCode: 200,
        body: `🕊 Please think twice before using @here. ${message}`
    }
}
