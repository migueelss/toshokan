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
    perPage: number = 25,
    id?: number,
    type?: MediaType,
    isAdult?: boolean,
    search?: string,
    format?: MediaFormat[],
    status?: MediaStatus,
    countryOfOrigin?: string,
    source?: MediaSource,
    season?: MediaSeason,
    seasonYear?: number,
    year?: string,
    onList?: boolean,
    yearLesser?: FuzzyDateInt,
    yearGreater?: FuzzyDateInt,
    episodeLesser?: number,
    episodeGreater?: number,
    durationLesser?: number,
    durationGreater?: number,
    chapterLesser?: number,
    chapterGreater?: number,
    volumeLesser?: number,
    volumeGreater?: number,
    licensedBy?: number[],
    isLicensed?: boolean,
    genres?: string[],
    excludedGenres?: string[],
    tags?: string[],
    excludedTags?: string[],
    minimumTagRank?: number,
    sort: MediaSort[] = ["POPULARITY_DESC", "SCORE_DESC"],
    expectedValues: string[] = ["id", "title", "coverImage:large"],
): Promise<object> {
    const params = {
        page, perPage, id, type, isAdult, search, format, status, countryOfOrigin,
        source, season, seasonYear, year, onList, yearLesser, yearGreater,
        episodeLesser, episodeGreater, durationLesser, durationGreater,
        chapterLesser, chapterGreater, volumeLesser, volumeGreater,
        licensedBy, isLicensed, genres, excludedGenres,
        tags, excludedTags, minimumTagRank, sort, expectedValues
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
        $type: MediaType
        $isAdult: Boolean 
        $search: String
        $format: [MediaFormat]
        $status: MediaStatus
        $countryOfOrigin: CountryCode
        $source: MediaSource
        $season: MediaSeason
        $seasonYear: Int
        $year: String
        $onList: Boolean
        $yearLesser: FuzzyDateInt
        $yearGreater: FuzzyDateInt
        $episodeLesser: Int
        $episodeGreater: Int
        $durationLesser: Int
        $durationGreater: Int
        $chapterLesser: Int
        $chapterGreater: Int
        $volumeLesser: Int
        $volumeGreater: Int
        $licensedBy: [Int]
        $isLicensed: Boolean
        $genres: [String]
        $excludedGenres: [String]
        $tags: [String]
        $excludedTags: [String]
        $minimumTagRank: Int
        $sort: [MediaSort]
        ) {
            Page(page: $page, perPage: $perPage) {
                pageInfo {
                    hasNextPage
                }
                media(
                    id: $id
                    type: $type
                    season: $season
                    format_in: $format
                    status: $status
                    countryOfOrigin: $countryOfOrigin
                    source: $source
                    search: $search
                    onList: $onList
                    seasonYear: $seasonYear
                    startDate_like: $year
                    startDate_lesser: $yearLesser
                    startDate_greater: $yearGreater
                    episodes_lesser: $episodeLesser
                    episodes_greater: $episodeGreater
                    duration_lesser: $durationLesser
                    duration_greater: $durationGreater
                    chapters_lesser: $chapterLesser
                    chapters_greater: $chapterGreater
                    volumes_lesser: $volumeLesser
                    volumes_greater: $volumeGreater
                    licensedById_in: $licensedBy
                    isLicensed: $isLicensed
                    genre_in: $genres
                    genre_not_in: $excludedGenres
                    tag_in: $tags
                    tag_not_in: $excludedTags
                    minimumTagRank: $minimumTagRank
                    sort: $sort
                    isAdult: $isAdult
                ) {
                    ${returnValues}
                }
            }
        }
    `;

    const variables: Record<string, any> = {
        page, perPage, id, type, isAdult, search, format, status, countryOfOrigin, source, season, seasonYear, year, onList,
        yearLesser, yearGreater, episodeLesser, episodeGreater, durationLesser, durationGreater, chapterLesser, chapterGreater,
        volumeLesser, volumeGreater, licensedBy, isLicensed, genres, excludedGenres, tags, excludedTags, minimumTagRank, sort
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