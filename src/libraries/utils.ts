import { customAlphabet } from "nanoid";
import { REMOTE_PATTERNS } from "./config";

/**
 * Fetches data from a specified API endpoint.
 *
 * @template DataType - The type of data expected from the API response.
 * @param {string} path - The path to the API endpoint (e.g., '/api/products', 'api/articles/123').
 * @param {string[]} [fields] - An optional array of field names to be included in the API response.
 *
 * @example
 * // Fetch products with specific fields
 * const products = await fetchData<ProductType>('/api/products', ['id', 'name', 'price']);
 * console.log(products);
 *
 * @example
 * // Fetch an article with all fields
 * const article = await fetchData<ArticleType>('api/articles/123');
 * console.log(article);
 */
export async function fetchData<DataType>(path: string, fields?: string[]): Promise<DataType> {
  const baseUrl = 'http://localhost:3000';
  const cleanedPath = path.replace(/^\/+|\/+$/g, ''); 

  if (!cleanedPath) {
    throw new Error('Path cannot be empty');
  }

  const normalizedPath = cleanedPath.startsWith('/') ? cleanedPath.slice(1) : `/${cleanedPath}`;
  const url = fields
    ? `${baseUrl}/${normalizedPath}?fields=${fields.join(",")}`
    : `${baseUrl}/${normalizedPath}`;

  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${url}`);
  }

  return response.json();
}

export function generateId() {
  const nanoid = customAlphabet("1234567890", 5);
  return nanoid();
}

export function isValidRemoteImage(url: string) {
  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.protocol !== "https:") {
      return false;
    }

    const isRemote = REMOTE_PATTERNS.some((pattern) => {
      const patternProtocol = pattern.protocol.replace(":", "");
      const parsedProtocol = parsedUrl.protocol.replace(":", "");
      return (
        patternProtocol === parsedProtocol &&
        pattern.hostname === parsedUrl.hostname
      );
    });

    return isRemote;
  } catch (error) {
    return false;
  }
}

export function capitalizeFirstLetter(str: string) {
  if (typeof str !== "string" || str.length === 0) {
    return str;
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function titleCase(str: string) {
  if (typeof str !== "string" || str.length === 0) {
    return str;
  }

  return str
    .split(" ")
    .map((word) => capitalizeFirstLetter(word))
    .join(" ");
}

export function currentTimestamp() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hour = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
}

export function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function formatThousands(num: string | number): string {
  const numString = typeof num === "number" ? num.toString() : num;

  if (!/^-?\d*\.?\d*$/.test(numString)) {
    return numString;
  }

  const numWithoutCommas = numString.replace(/,/g, "");

  const parsedNum = parseFloat(numWithoutCommas);

  if (isNaN(parsedNum)) {
    return numString;
  }

  const formattedNumber = parsedNum.toLocaleString("en-US", {
    minimumFractionDigits: 2,
  });

  return formattedNumber;
}

export const statusCodes = {
  success: { code: 200, flag: "success", message: "Operation was successful" },
  already_exists: {
    code: 409,
    flag: "already_exists",
    message: "Resource already exists",
  },
  not_found: { code: 404, flag: "not_found", message: "Resource not found" },
  failed: { code: 500, flag: "failed", message: "Operation failed" },
};

export const productInternationalSizes = {
  Size: ["S", "M", "L", "XL", "XXL"],
  US: ["4", "6", "8/10", "12", "14"],
  EU: ["36", "38", "40/42", "44", "46"],
  UK: ["8", "10", "12/14", "16", "18"],
  NZ: ["8", "10", "12/14", "16", "18"],
  AU: ["8", "10", "12/14", "16", "18"],
  DE: ["36", "38", "40/42", "44", "46"],
  CA: ["4", "6", "8/10", "12", "14"],
  FR: ["36", "38", "40/42", "44", "46"],
  NL: ["36", "38", "40/42", "44", "46"],
  ES: ["36", "38", "40/42", "44", "46"],
  IT: ["40", "42", "44/46", "48", "50"],
  MX: ["4", "6", "8/10", "12", "14"],
  PT: ["36", "38", "40/42", "44", "46"],
  PL: ["36", "38", "40/42", "44", "46"],
  SE: ["36", "38", "40/42", "44", "46"],
  CH: ["36", "38", "40/42", "44", "46"],
  JP: ["S", "M", "L", "XL", "XXL"],
  KR: ["S", "M", "L", "XL", "XXL"],
  BR: ["S", "M", "L", "XL", "XXL"],
  Asian: ["L", "XL", "2XL/3XL", "4XL", "5XL"],
  ZA: ["66", "77", "88", "99", "110"],
  SA: ["P", "M", "L", "XL", "XXL"],
  BH: ["L", "XL", "2XL/3XL", "4XL", "5XL"],
  AE: ["32", "34", "36/38", "40", "42"],
  KW: ["S", "M", "L", "XL", "XXL"],
  QA: ["S", "M", "L", "XL", "XXL"],
  JO: ["S", "M", "L", "XL", "XXL"],
  OM: ["S", "M", "L", "XL", "XXL"],
};
