import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// PASTE YOUR KEY HERE
const GEMINI_API_KEY = "AIzaSyBjMxQzaMP249qEt4p688EsyEcv3NTZtrA";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const LANGUAGE_NAMES = {
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  python: 'Python',
  java: 'Java',
  cpp: 'C++',
  csharp: 'C#',
  php: 'PHP',
  ruby: 'Ruby',
  go: 'Go',
  rust: 'Rust',
  sql: 'SQL',
  html: 'HTML',
  css: 'CSS',
  json: 'JSON',
};

export async function POST(req) {
  try {
    const { code, language = 'javascript' } = await req.json();
    const languageName = LANGUAGE_NAMES[language] || language;
    
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: { 
        responseMimeType: "application/json" 
      }
    });

    const prompt = `
      Review the following ${languageName} code for bugs, style issues, performance problems, and best practices.
      Return a JSON array of objects. 
      Each object must have these exact keys:
      "line": (number),
      "severity": (string - must be exactly one of: "critical", "warning", or "info"),
      "error": (string description of the issue),
      "fix": (string of the exact fixed code)
      
      Severity guidelines:
      - "critical": Security vulnerabilities, bugs that will cause runtime errors, or serious logic flaws
      - "warning": Style issues, performance concerns, or code that could be improved
      - "info": Minor suggestions, best practices that are not critical
      
      Focus on ${languageName}-specific conventions and best practices.
      
      Code to review:
      ${code}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse the text into JSON to send to the frontend
    const data = JSON.parse(text);

    return NextResponse.json(data);
  } catch (error) {
    console.error("DEBUG ERROR:", error);
    
    // If you get a 404 again, it might be a regional restriction.
    // This will return the actual error message to your browser console.
    return NextResponse.json({ 
      error: "Analysis failed", 
      details: error.message 
    }, { status: 500 });
  }
}