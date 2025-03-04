import etag from "etag";
import { NextRequest, NextResponse } from "next/server";
import { ResponseHeaders } from "./headers";

export const GET = async (request: NextRequest) => {
  const source = request.nextUrl.searchParams.get(`source`);
  if (!source) return new Response(null, { status: 204 });

  const range = request.headers.get(`range`) ?? `bytes=0-`;
  const response = await fetch(source, { headers: { range } });
  if (!response.ok) return new Response(null, { status: response.status });

  response.headers.append(`range`, range);
  const headers = new ResponseHeaders(response.headers);
  headers.append(`etag`, etag(source, { weak: false }).replace(/"/g, ``));

  return new NextResponse(response.body, { status: 206, headers });
};
