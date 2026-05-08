const HF_TOKEN = import.meta.env.VITE_AI_TOKEN;
const API_URL = 'https://router.huggingface.co/v1/chat/completions';

/**
 * Send a message to AI via HuggingFace Router (OpenAI-compatible)
 * Only answers using provided dashboard context data
 */
export async function sendChatMessage(userMessage, dashboardContext) {
  const systemPrompt = `You are an AI assistant embedded in the Space Intelligence Dashboard. You can ONLY answer questions using the dashboard data provided below. You must REFUSE to answer any questions not related to the dashboard data. Do NOT use any external knowledge. Do NOT hallucinate or make up information. If you don't have the data to answer, say "I can only answer questions about the current dashboard data."

CURRENT DASHBOARD DATA:
${dashboardContext}

Rules:
1. Only reference data from the dashboard context above
2. Be concise and helpful
3. Format numbers nicely
4. If asked about anything outside the dashboard data, politely decline
5. You are the "Space Intelligence AI Assistant"`;

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${HF_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'Qwen/Qwen2.5-72B-Instruct',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      max_tokens: 300,
      temperature: 0.3,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    if (res.status === 503) {
      throw new Error('Model is loading. Please try again in a moment.');
    }
    throw new Error(errorData.error?.message || errorData.error || `AI API error: ${res.status}`);
  }

  const data = await res.json();
  if (data.choices?.[0]?.message?.content) {
    return data.choices[0].message.content.trim();
  }
  throw new Error('Unexpected AI response format');
}
