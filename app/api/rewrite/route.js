import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const api = process.env.GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(api);

const LANGUAGE_NAMES = {
  javascript: "JavaScript",
  typescript: "TypeScript",
  python: "Python",
  java: "Java",
  cpp: "C++",
  csharp: "C#",
  php: "PHP",
  ruby: "Ruby",
  go: "Go",
  rust: "Rust",
  sql: "SQL",
  html: "HTML",
  css: "CSS",
};

export async function POST(req) {
  try {
    const {
      code,
      fromLanguage = "javascript",
      toLanguage = "python",
    } = await req.json();

    const fromName = LANGUAGE_NAMES[fromLanguage] || fromLanguage;
    const toName = LANGUAGE_NAMES[toLanguage] || toLanguage;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const prompt = `
Convert the following ${fromName} code into ${toName}.

Rules:
- Preserve logic exactly
- Use idiomatic ${toName} style
- Keep comments if possible
- Return ONLY JSON with this structure:

{
  "language": "${toName}",
  "code": "converted code here",
  "notes": "short explanation of important changes"
}

Code:
${code}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const data = JSON.parse(text);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Rewrite error:", error);

    return NextResponse.json(
      {
        error: "Rewrite failed",
        details: error.message,
      },
      { status: 500 }
    );
  }
}