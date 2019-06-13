exports.handler = async (event, context) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" }
    }
    const params = querystring.parse(event.body)
    const message = params.message || ''
    return {
        statusCode: 200,
        body: `🕊 Please think twice before using @here. ${message}`
    }
}
