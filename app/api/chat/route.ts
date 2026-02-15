import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const systemMsg = `Act as a Board of 6 AI Agents. Analyze: "${prompt}". 
    Format response as JSON: { "architect": "30-day plan", "board": [{"name": "MENTOR", "text": "..."}, {"name": "ACCOUNTANT", "text": "..."}, {"name": "COACH", "text": "..."}, {"name": "ATTORNEY", "text": "..."}, {"name": "SECRETARY", "text": "..."}] }`;

    const result = await model.generateContent(systemMsg);
    const text = result.response.text().replace(/```json|```/g, "");
    return NextResponse.json(JSON.parse(text));
  } catch (e) {
    return NextResponse.json({ architect: "System error. Check API Key.", board: [] });
  }
}
