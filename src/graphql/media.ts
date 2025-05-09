import type { FuzzyDateInt } from "../types/FuzzyDateInt"

export function queryMedia(
    page: number = 1,
    perPage: number = 25,
    id?: number,
    type?: "ANIME" | "MANGA",
    isAdult?: boolean,
    search?: string,
    format?: (
        | "TV" 
        | "TV_SHORT" 
        | "MOVIE" 
        | "SPECIAL" 
        | "OVA" 
        | "ONA" 
        | "MUSIC" 
        | "MANGA" 
        | "NOVEL" 
        | "ONE_SHOT"
    )[],
    status?: 
        | "FINISHED" 
        | "RELEASING" 
        | "NOT_YET_RELEASED" 
        | "CANCELLED" 
        | "HIATUS",
    countryOfOrigin?: string,
    source?: 
        | "ORIGINAL" 
        | "MANGA" 
        | "LIGHT_NOVEL"
        | "VISUAL_NOVEL"
        | "VIDEO_GAME"
        | "OTHER"
        | "NOVEL"
        | "DOUJINSHI"
        | "ANIME"
        | "WEB_NOVEL"
        | "LIVE_ACTION"
        | "GAME"
        | "COMIC"
        | "MULTIMEDIA_PROJECT"
        | "PICTURE_BOOK",
    season?: 
        | "WINTER" 
        | "SPRING" 
        | "SUMMER" 
        | "FALL",
    seasonYear?: number,
    year?: string,
    onList?: boolean,
    yearLesser?: FuzzyDateInt, //YYYYMMDD
    yearGreater?: FuzzyDateInt, //YYYYMMDD
    episodeLesser?: number,
    episodeGreater?: number,
    durationLesser?: number,
    durationGreater?: number,
    chaptersLesser?: number,
    chapterGreater?: number,
    volumesLesser?: number,
    volumeGreater?: number,
    licensedBy?: number[],
    isLicensed?: boolean,
    genres?: string[],
    excludeGenres?: string[],
    tags?: string[],
    excludedTags?: string[],
    minimumTagRank?: number,
    sort: (
        | "ID"
        | "ID_DESC"
        | "TITLE_ROMAJI"
        | "TITLE_ROMAJI_DESC"
        | "TITLE_ENGLISH"
        | "TITLE_ENGLISH_DESC"
        | "TITLE_NATIVE"
        | "TITLE_NATIVE_DESC"
        | "TYPE"
        | "TYPE_DESC"
        | "FORMAT"
        | "FORMAT_DESC"
        | "START_DATE"
        | "START_DATE_DESC"
        | "END_DATE"
        | "END_DATE_DESC"
        | "SCORE"
        | "SCORE_DESC"
        | "POPULARITY"
        | "POPULARITY_DESC"
        | "TRENDING"
        | "TRENDING_DESC"
        | "EPISODES"
        | "EPISODES_DESC"
        | "DURATION"
        | "DURATION_DESC"
        | "STATUS"
        | "STATUS_DESC"
        | "CHAPTERS"
        | "CHAPTERS_DESC"
        | "VOLUMES"
        | "VOLUMES_DESC"
        | "UPDATED_AT"
        | "UPDATED_AT_DESC"
        | "SEARCH_MATCH"
        | "FAVOURITES"
        | "FAVOURITES_DESC"
    )[] = ["POPULARITY_DESC", "SCORE_DESC"],
    expectedValues: string[] = ["id", "title", "coverImage:large"],
): object {

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
        returnValues += plainFields.join("\n");
    }

    Object.entries(nestedFields).forEach(([key, values]) => {
        returnValues += `${key} { ${values.join(' ')} }\n`;
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
    return {}
}