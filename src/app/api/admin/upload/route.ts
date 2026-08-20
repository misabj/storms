import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth/session";

const allowedContentTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = (await request.json()) as HandleUploadBody;
    const response = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!(await isAuthenticated())) {
          throw new Error("Niste prijavljeni.");
        }
        if (!pathname.startsWith("projects/")) {
          throw new Error("Putanja za upload nije dozvoljena.");
        }

        return {
          allowedContentTypes,
          maximumSizeInBytes:
            Number(process.env.MAX_UPLOAD_SIZE_MB || 12) * 1024 * 1024,
          addRandomSuffix: true,
          cacheControlMaxAge: 60 * 60 * 24 * 30,
        };
      },
      onUploadCompleted: async () => {
        // The Blob URL is stored by the existing admin form action.
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Upload nije uspeo.",
      },
      { status: 400 },
    );
  }
}
