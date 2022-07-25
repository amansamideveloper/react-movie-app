const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apikey: 'f30fba7b1c4ef150b448932d6964a0e9',
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500${imgPath}`,
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`
}
export default apiConfig;