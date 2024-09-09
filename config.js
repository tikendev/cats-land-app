export const getConfig = () => {
    return {
        API_URL_RANDOM: 'https://api.thecatapi.com/v1/images/search',
        API_URL_FAVORITES: 'https://api.thecatapi.com/v1/favourites',
        API_URL_DELETE: (favoriteId) => `https://api.thecatapi.com/v1/favourites/${favoriteId}`,
        API_KEY: 'live_pHP2KVRJ1HplQBSJNt5DdLSClZhh8eMxdcnTPKPrDQRL7HCLCnYHw1Dgp7HPsuFQ',
        queryString: '?limit=4',
    }
}