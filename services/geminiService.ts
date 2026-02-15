
import { GoogleGenAI, Type } from "@google/genai";
import { UserResponses, AgentProfile } from "../types.ts";

export const generateAgentIdentity = async (data: UserResponses): Promise<AgentProfile> => {
  // Initialize the GoogleGenAI client using the API_KEY from the environment.
  // A new instance is created on each call to ensure the latest selected key is utilized.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Create a high-tech, cool secret agent identity for a child based on their personal "Neural Fingerprint" (provided below).

    NEURAL FINGERPRINT DATA:
    - Primary Spectrum Preference: ${data.favoriteColor}
    - Biological Affinity: ${data.favoriteAnimal}
    - Sustenance Index: ${data.favoriteSnack}
    - Temporal Origin: ${data.birthMonth}

    STRICT OPERATIONAL GUIDELINES:
    1. CHILD SAFETY: All output must be strictly child-appropriate, heroic, and professional. If the input contains inappropriate words, ignore them and generate a standard heroic spy profile instead.
    2. NO LITERAL USAGE: Do not use the user's input words directly in the names or profile fields. Use them as "vibes" (e.g., "Shark" affinity leads to a "Deep Sea" or "Hydro" theme).
    3. FULL NAME: Generate a cool-sounding fictional full name (e.g., "Sebastian Sterling", "Luna Lockheart").
    4. LAST NAME: Provide just the last name from the full name.
    5. RANK: A high-tech title like "Stealth Operative" or "Cyber-Sentinel".
    6. SPECIALTY: A unique skill inspired by the affinity (e.g., "Night-Vision Surveillance").
    7. LAST KNOWN LOCATION: Select a random famous city from anywhere in the world (e.g., Tokyo, Paris, Cairo, New York).
    8. CLEARANCE LEVEL: A number from 1 to 5.
  `;

  // Use the models.generateContent method as per the latest SDK requirements.
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          fullName: { type: Type.STRING },
          lastName: { type: Type.STRING },
          rank: { type: Type.STRING },
          specialty: { type: Type.STRING },
          lastKnownLocation: { type: Type.STRING },
          clearanceLevel: { type: Type.NUMBER }
        },
        required: ["fullName", "lastName", "rank", "specialty", "lastKnownLocation", "clearanceLevel"]
      }
    }
  });

  // Access the text content directly via the .text property (not a method).
  let text = response.text || "";
  
  // Clean potential Markdown wrapping if it exists, though responseMimeType: application/json should return raw JSON.
  if (text.includes("```")) {
    text = text.replace(/```json|```/g, "").trim();
  }

  if (!text) throw new Error("No response from Agency HQ");
  
  try {
    return JSON.parse(text) as AgentProfile;
  } catch (parseError) {
    console.error("JSON Parse Error:", parseError, "Raw text:", text);
    throw new Error("Agency data packet corrupted.");
  }
};
