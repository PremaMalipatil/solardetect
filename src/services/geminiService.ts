import { VerificationResult } from "../types";

export const analyzeSolarImage = async (
  base64Image: string
): Promise<VerificationResult> => {

  const cleanBase64 = base64Image.split(",")[1] || base64Image;

  const response = await fetch("https://solardetect-1.onrender.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      imageBase64: cleanBase64,
    }),
  });

  if (!response.ok) {
    throw new Error("Backend analysis failed");
  }

  return response.json();
};
