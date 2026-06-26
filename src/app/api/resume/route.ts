import { NextResponse } from "next/server";

const FOLDER_ID = "19vtRAxQ_9qxrMl5zFy9hLcHkPlGPXICG";

export async function GET() {
  const res = await fetch(`https://drive.google.com/drive/folders/${FOLDER_ID}`, {
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  const html = await res.text();
  const match = html.match(/\/file\/d\/([a-zA-Z0-9_-]{25,})\//);
  if (match) {
    return NextResponse.redirect(`https://drive.google.com/file/d/${match[1]}/view`);
  }
  return NextResponse.redirect(`https://drive.google.com/drive/folders/${FOLDER_ID}`);
}
