/**
 * Google Gemini API Client Wrapper
 * Implements server-side call using official REST endpoint with timeouts and graceful error handling.
 */

interface GeminiResponse {
  text: string;
  error?: string;
  model: string;
}

export async function generateGeminiContent(
  systemInstruction: string,
  userPrompt: string
): Promise<GeminiResponse> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return {
      text: "",
      error: "GEMINI_API_KEY_NOT_CONFIGURED",
      model: "offline-fallback",
    };
  }

  const model = "gemini-1.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemInstruction }],
        },
        contents: [
          {
            role: "user",
            parts: [{ text: userPrompt }],
          },
        ],
        generationConfig: {
          temperature: 0.2, // Low temperature for deterministic, factual adherence
          maxOutputTokens: 1024,
        },
      }),
      signal: AbortSignal.timeout(15000), // 15 second safety timeout
    });

    if (!response.ok) {
      const errBody = await response.text().catch(() => "");
      console.warn(`Gemini API error [${response.status}]:`, errBody);
      return {
        text: "",
        error: `API_ERROR_${response.status}`,
        model,
      };
    }

    const data = await response.json();
    const candidate = data.candidates?.[0];
    const text = candidate?.content?.parts?.[0]?.text;

    if (!text) {
      return {
        text: "",
        error: "EMPTY_MODEL_RESPONSE",
        model,
      };
    }

    return {
      text: text.trim(),
      model,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.warn("Gemini network request failed:", errorMsg);
    return {
      text: "",
      error: errorMsg,
      model,
    };
  }
}
