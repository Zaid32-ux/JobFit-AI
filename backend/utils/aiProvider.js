import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";

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

const callAnthropic = async (apiKey, prompt) => {
  if (!apiKey) throw new Error("Missing Anthropic API key");

  const anthropic = new Anthropic({ apiKey });

  const response = await anthropic.messages.create({
    model: "claude-3-sonnet-20240229",
    max_tokens: 800,
    messages: [{ role: "user", content: prompt }],
  });
  console.log("Anthropic response:", response);
  return response.content?.[0]?.text || "";
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

    if (provider === "anthropic") {
      const key = apiKeys?.anthropic || serverDefaultKey;
      return await callAnthropic(key, prompt);
    }


    throw new Error(`Unsupported provider: ${provider}`);
  } catch (err) {
    console.error(`[AI Provider Error] ${provider}:`, err.message);
    throw err;
  }
};

export default { analyzeWithProvider }; 