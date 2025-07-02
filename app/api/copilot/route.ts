import type { NextRequest } from "next/server"
import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"
import { StreamingTextResponse } from "ai"

// Define the system prompt for the copilot
const SYSTEM_PROMPT = `You are HAUS Copilot, a voice-activated assistant for the HAUS real estate platform.

Your primary functions are:
1. Search: Help users find properties based on their criteria
2. Navigation: Guide users to different sections of the platform
3. Data & Insights: Provide information about real estate trends and property details

When responding:
- Keep responses concise and conversational
- Maintain the HAUS brand voice: sophisticated, minimal, and helpful
- For navigation requests, include an action object with the path
- For search requests, explain what you're searching for
- For data requests, provide clear, factual information

Available platform sections:
- Home: /
- Search: /search
- Property Details: /property/[id]
- Virtual Tours: /property/[id]/virtual-tour
- Compare: /compare
- Dashboard: /dashboard
- Profile: /profile
- Settings: /settings
- About: /about
- Contact: /contact

Example response format for navigation:
I'll take you to the search page where you can explore available properties.
{"type":"navigate","path":"/search"}`

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json()

    if (!query) {
      console.error("API Copilot: Query is required. Received:", query)
      return new Response(JSON.stringify({ error: "Query is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Ensure GROQ_API_KEY is available (for server-side debugging if possible)
    if (!process.env.GROQ_API_KEY) {
      console.error("API Copilot: GROQ_API_KEY is not set in the environment.")
      // Note: This log might not be visible in all environments, but good for local debugging.
    }

    const result = await generateText({
      model: groq("llama3-70b-8192"),
      prompt: query,
      system: SYSTEM_PROMPT,
      maxTokens: 500,
      temperature: 0.7,
      // stream: true, // The AI SDK's generateText with a model that supports streaming will return a streamable object by default
    })

    return new StreamingTextResponse(result.stream)
  } catch (error: any) {
    console.error("--- ERROR IN /api/copilot ---")
    console.error("Timestamp:", new Date().toISOString())
    if (error instanceof Error) {
      console.error("Error Name:", error.name)
      console.error("Error Message:", error.message)
      console.error("Error Stack:", error.stack)
      if ((error as any).cause) {
        console.error("Error Cause:", JSON.stringify((error as any).cause, null, 2))
      }
      // Specific check for AI SDK errors if they have a distinct structure
      if (error.name === "AIError" && (error as any).data) {
        console.error("AI SDK Error Data:", JSON.stringify((error as any).data, null, 2))
      }
    } else {
      console.error("Full Error Object (non-Error instance):", JSON.stringify(error, null, 2))
    }
    console.error("--- END ERROR IN /api/copilot ---")

    // Provide a more generic error message to the client but log details on the server
    return new Response(
      JSON.stringify({ error: "Failed to process copilot request. An internal server error occurred." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
