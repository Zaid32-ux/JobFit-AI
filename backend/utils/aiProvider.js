import OpenAI from "openai";
const callOpenAI = async (apiKey, prompt) => {
  if (!apiKey) throw new Error("Missing OpenAI API key");

  const openai = new OpenAI({ apiKey });

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful document analyzer." },
      { role: "user", content: prompt },
    ],
    max_tokens: 800,
  });

  return response.choices?.[0]?.message?.content || "";
};


export const analyzeWithProvider = async (
  provider,
  apiKeys,
  prompt,
  serverDefaultKey
) => {
  try {
    if (provider === "openai") {
      const key = apiKeys?.openai || serverDefaultKey;
      return await callOpenAI(key, prompt);
    }

    throw new Error(`Unsupported provider: ${provider}`);
  } catch (err) {
    console.error(`[AI Provider Error] ${provider}:`, err.message);
    throw err;
  }
};

export default { analyzeWithProvider }; 