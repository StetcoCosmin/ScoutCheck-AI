const axios = require('axios');

exports.handler = async function(event, context) {
  const body = JSON.parse(event.body);
  const OPENAI_KEY = process.env.OPENAI_KEY;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: body.model || "gpt-3.5-turbo",
        messages: body.messages,
      },
      {
        headers: {
          "Authorization": `Bearer ${OPENAI_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );
    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(response.data)
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: e.toString() })
    };
  }
};
