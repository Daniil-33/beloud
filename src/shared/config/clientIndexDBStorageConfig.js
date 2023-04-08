export const DB_NAME = 'beloud'

export const DB_VERSION = 1

export const STORE_MAP = {
    PLAYLISTS: 'playlists',
    USER_DATA: 'user_data',
}

export const STORES_SCHEMA = {
    [STORE_MAP.PLAYLISTS]: {
        KEY: 'key',
        DATA: 'data'
    },
    [STORE_MAP.USER_DATA]: {
        KEY: 'key',
        DATA: 'data'
    },
}

export const STORES_METHODS_MAP = {
    [STORE_MAP.PLAYLISTS]: {
        GET: 'getFromPlaylists',
        SET: 'setToPlaylists'
    },
    [STORE_MAP.USER_DATA]: {
        GET: 'getUserData',
        SET: 'setUSerData'
    },
}

export const USER_DATA_KEYS = {
    LIKED: 'liked',
    PLAYLISTS: 'playlists',
    RECENTLY_PLAYED: 'recently_played',
}