"use server";
import { auth } from "@/auth";
import { sendRequestFile } from "./api";

export const uploadThumbnailAPI = async (
  formData: FormData
): Promise<string> => {
  const session = await auth();
  const response = await sendRequestFile<IBackendRes<any>>({
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/files/upload`,
    body: formData,
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
    useCredentials: true,
  });
  if (!response?.data && response.statusCode !== 201)
    throw new Error("Failed to upload thumbnail");

  return response.data?.path || "";
};
