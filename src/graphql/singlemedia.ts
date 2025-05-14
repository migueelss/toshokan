import type { FuzzyDateInt } from "../types/FuzzyDateInt"
import type { MediaFormat, MediaType, MediaStatus, MediaSource, MediaSeason, MediaSort } from "../types/media";

const serverCache = new Map<string, object>();

function getCacheKey(params: object): string {
    return JSON.stringify(params);
}

function isBrowser() {
    return typeof window !== "undefined";
}

function getFromCache(key: string): object | undefined {
    const data = isBrowser()
        ? JSON.parse(localStorage.getItem(key) || "null")
        : serverCache.get(key);

    if (!data || Date.now() > data.expiresAt) {
        if (!isBrowser()) {
            serverCache.delete(key);
        } else {
            localStorage.removeItem(key);
        }
        return undefined;
    }
    return data.value;
}

function setToCache(key: string, value: object, ttlMs: number = 2 * 60 * 1000) {
    const data = {
        value,
        expiresAt: Date.now() + ttlMs,
    };

    if (isBrowser()) {
        localStorage.setItem(key, JSON.stringify(data));
    } else {
        serverCache.set(key, data);
    }
}

export async function queryMedia(
    page: number = 1,
    perPage: number = 1,
    id?: number,
    expectedValues: string[] = ["id", "title", "coverImage:large"],
): Promise<object> {
    const params = {
        page, perPage, id, expectedValues
    }
    const key = getCacheKey(params);

    const cached = getFromCache(key);
    if (cached) return cached;

    let returnValues = "";
    const nestedFields: Record<string, string[]> = {};
    const plainFields: string[] = [];

    expectedValues.forEach((expected) => {
        if (expected.includes(":")) {
            const [k, v] = expected.split(":");
            if (!nestedFields[k]) nestedFields[k] = [];
            nestedFields[k].push(v);
        } else {
            plainFields.push(expected);
        }
    });

    if (plainFields.length) {
        returnValues += plainFields.join("\n") + "\n";
    }

    Object.entries(nestedFields).forEach(([k, v]) => {
        returnValues += `${k} { ${v.join(' ')} } `;
    });

    const graphqlQuery = `
    query (
        $page: Int
        $perPage: Int 
        $id: Int
        ) {
            Page(page: $page, perPage: $perPage) {
                pageInfo {
                    hasNextPage
                }
                media(
                    id: $id
                ) {
                    ${returnValues}
                }
            }
        }
    `;

    const variables: Record<string, any> = {
        page, perPage, id
    };

    Object.keys(variables).forEach((key) => variables[key] === undefined && delete variables[key]);

    const response = await fetch("https://graphql.anilist.co", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({
            query: graphqlQuery,
            variables,
        }),
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`AniList API error: ${response.status} ${text}`);
    }

    const res = await response.json();
    setToCache(key, res);
    return res;
}