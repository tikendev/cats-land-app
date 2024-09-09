import { getConfig } from './config.js';
import { getFavoriteCats, getRandomCats, handleReload } from './apiService.js';

const init = async() => {
    const config = getConfig();

    await getRandomCats(config);
    await getFavoriteCats(config);

    const reloadBtn = document.getElementById('reloadBtn');
    reloadBtn.addEventListener('click', () => handleReload(config));
}

document.addEventListener('DOMContentLoaded', init);