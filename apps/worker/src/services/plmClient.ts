import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export async function fetchDrawingFromPlm(objectId: string) {
  if (process.env.PLM_API_BASE_URL?.includes("mock-plm.example.com")) {
    return {
      id: objectId,
      number: `DRW-${objectId}`,
      revision: "B",
      title: "Bracket Assembly",
      lifecycleState: "Released",
      ownerName: "Jane Smith",
      materialCode: "MAT-001"
    };
  }

  const response = await axios.get(`${process.env.PLM_API_BASE_URL}/drawings/${objectId}`, {
    headers: {
      Authorization: `Bearer ${process.env.PLM_API_TOKEN}`
    }
  });

  return response.data;
}