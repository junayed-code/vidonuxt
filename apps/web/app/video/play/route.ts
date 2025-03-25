import etag from "etag";
import { NextRequest } from "next/server";
import { ResponseHeaders } from "./headers";

// https://video-previews.elements.envatousercontent.com/h264-video-previews/d8bde258-5364-41ed-b7ac-7621bc9757fe/43385526.mp4

export const GET = async (request: NextRequest) => {
  // Obtain the source url from the request search params
  const source = request.nextUrl.searchParams.get(`source`);
  if (!source) return new Response(null, { status: 204 });

  // Get the range header from the request headers; set it if it not present
  const range = request.headers.get(`range`) ?? `bytes=0-`;
  if (!request.headers.has(`range`)) request.headers.append(`range`, range);

  // Fetch the video from the source
  const response = await fetch(source, { headers: request.headers });
  if (!response.ok) return new Response(null, { status: response.status });

  // Create the response headers instance
  response.headers.append(`range`, range);
  const headers = new ResponseHeaders(response.headers);

  // Append the etag to the response headers
  const _etag = response.headers.get(`etag`) || etag(source, { weak: false });
  headers.append(`etag`, _etag);

  // Handle the if-range conditional request
  if (
    request.headers.get(`if-range`) &&
    request.headers.get(`if-range`) !== _etag
  ) {
    return new Response(response.body, { status: 200, headers });
  }

  // Send the video as a response to client
  return new Response(response.body, { status: response.status, headers });
};
