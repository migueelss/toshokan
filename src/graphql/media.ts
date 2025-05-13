import type { FuzzyDateInt } from "../types/FuzzyDateInt"
import type { MediaFormat, MediaType, MediaStatus, MediaSource, MediaSeason, MediaSort} from "../types/media";

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
    yearLesser?: FuzzyDateInt, //YYYYMMDD
    yearGreater?: FuzzyDateInt, //YYYYMMDD
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

    let returnValues = "";
    const nestedFields: Record<string, string[]> = {};
    const plainFields: string[] = [];

    expectedValues.forEach((expected) => {
        if (expected.includes(":")) {
            const [key, value] = expected.split(":");
            if (!nestedFields[key]) nestedFields[key] = [];
            nestedFields[key].push(value);
        } else {
            plainFields.push(expected);
        }
    });

    if (plainFields.length) {
        returnValues += plainFields.join("\n") + "\n";
    }

    Object.entries(nestedFields).forEach(([key, values]) => {
        returnValues += `${key} { ${values.join(' ')} } `;
    });

    const graphqlQuery = `
    query (
        $page: Int = 1
        $perPage: Int = 25
        $id: Int
        $type: MediaType
        $isAdult: Boolean = false
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
        $sort: [MediaSort] = [POPULARITY_DESC, SCORE_DESC]
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
        throw new Error(`AniList API error: ${response.status} ${await response.text()}`);
    }
    
    return await response.json();
}