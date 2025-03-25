type HttpOutgoingHeaders = {
  accept?: string;
  "accept-charset"?: string;
  "accept-encoding"?: string;
  "accept-language"?: string;
  "accept-ranges"?: string;
  "access-control-allow-credentials"?: string;
  "access-control-allow-headers"?: string;
  "access-control-allow-methods"?: string;
  "access-control-allow-origin"?: string;
  "access-control-expose-headers"?: string;
  "access-control-max-age"?: string;
  "access-control-request-headers"?: string;
  "access-control-request-method"?: string;
  age?: string;
  allow?: string;
  authorization?: string;
  "cache-control"?: string;
  "cdn-cache-control"?: string;
  connection?: string;
  "content-disposition"?: string;
  "content-encoding"?: string;
  "content-language"?: string;
  "content-length"?: string;
  "content-location"?: string;
  "content-range"?: string;
  "content-security-policy"?: string;
  "content-security-policy-report-only"?: string;
  "content-type"?: string;
  cookie?: string;
  dav?: string;
  dnt?: string;
  date?: string;
  etag?: string;
  expect?: string;
  expires?: string;
  forwarded?: string;
  from?: string;
  host?: string;
  "if-match"?: string;
  "if-modified-since"?: string;
  "if-none-match"?: string;
  "if-range"?: string;
  "if-unmodified-since"?: string;
  "last-modified"?: string;
  link?: string;
  location?: string;
  "max-forwards"?: string;
  origin?: string;
  pragma?: string;
  "proxy-authenticate"?: string;
  "proxy-authorization"?: string;
  "public-key-pins"?: string;
  "public-key-pins-report-only"?: string;
  range?: string;
  referer?: string;
  "referrer-policy"?: string;
  refresh?: string;
  "retry-after"?: string;
  "sec-websocket-accept"?: string;
  "sec-websocket-extensions"?: string;
  "sec-websocket-key"?: string;
  "sec-websocket-protocol"?: string;
  "sec-websocket-version"?: string;
  server?: string;
  "set-cookie"?: string;
  "strict-transport-security"?: string;
  te?: string;
  trailer?: string;
  "transfer-encoding"?: string;
  "user-agent"?: string;
  upgrade?: string;
  "upgrade-insecure-requests"?: string;
  vary?: string;
  via?: string;
  warning?: string;
  "www-authenticate"?: string;
  "x-content-type-options"?: string;
  "x-dns-prefetch-control"?: string;
  "x-frame-options"?: string;
  "x-xss-protection"?: string;
};

type HeadersName = keyof HttpOutgoingHeaders;

const CHUNK_SIZE = 2 ** 20; // 1 MB in bytes
const MAX_AGE = 60 * 60 * 24 * 2; // 2 days in seconds

export class ResponseHeaders extends Headers {
  constructor(headers: ResponseHeaders) {
    // Get the content type and content length headers from response headers
    const contentType = headers.get(`content-type`) || `video/mp4`;
    let contentLength = headers.get(`content-length`) || `${CHUNK_SIZE}`;

    // Bring the range start value from the range header and use it in
    // the default content range header
    const rangeStart = headers.get(`range`)!.split(`-`)[0]!.replace(/\D/g, ``);
    const contentRange =
      headers.get(`content-range`) ||
      `bytes ${rangeStart}-${Number(contentLength) - 1}/${contentLength}`;

    // Check if the content range mismatched with the content length,
    // then update the content length
    const { start, end } = contentRange.match(
      /^bytes (?<start>\d+)-(?<end>\d+)\/\d+$/,
    )!.groups!;

    const length = Number(end) - Number(start);
    if (length !== Number(contentLength) - 1) {
      // console.log(`Mismatched content length: ${length + 1}`);
      contentLength = `${length + 1}`;
    }

    // Call the super constructor with the default headers
    super({
      "accept-ranges": `bytes`,
      "content-type": contentType,
      "content-range": contentRange,
      "content-length": contentLength,
      "cache-control": `public, max-age=${MAX_AGE}`,
    } satisfies HttpOutgoingHeaders);
  }

  append(name: HeadersName, value: string) {
    super.append(name, value);
  }

  get(name: HeadersName) {
    return super.get(name);
  }

  set(name: HeadersName, value: string) {
    super.set(name, value);
  }
}
