import { createImages, createArticle, controlError, deleteCatOfFavorites } from './ui.js';
import { getConfig } from './config.js';

export const getRandomCats = async( config ) => {
    const { API_URL_RANDOM, queryString, API_KEY } = config;

    try {
        const resp = await fetch(`${API_URL_RANDOM}${queryString}&api_key=${API_KEY}`);

        if (!resp.ok)
            throw new Error(`HTTP Error: ${resp.status}`);

        const data = await resp.json();
        createImages(data);

        return data;

    } catch (error) {
        console.error('Error fetching random cats', error);
        controlError('Error loading random Cats. Please try again', 'randomContainer');
    }
}

export const getFavoriteCats = async( config ) => {
    const { API_URL_FAVORITES, API_KEY } = config;

    try {
        const resp = await fetch(API_URL_FAVORITES , {
            headers:{
                "content-type":"application/json",
                'x-api-key': API_KEY,
            }
        })

        if (!resp.ok)
            throw new Error(`HTTP Error: ${resp.status}`);

        const favoriteCats = await resp.json();

        favoriteCats.forEach( cat => {
            const { image, id } = cat;
            const newArticle = createArticle(image, 'Delete Cat', 'favoritesContainer');

            const deleteButton = newArticle.querySelector('button');
            deleteButton.addEventListener('click', () => deleteCatOfFavorites( newArticle, id ));
        })
        
        return favoriteCats;
        
    } catch (error) {
        console.error('Error fetching favourite cats', error);
        controlError('Error loading your favourite cats. Please try again.', 'favoritesContainer');
    }
}

export const postFavoriteCat = async( config, catId ) => {
    const { API_URL_FAVORITES, API_KEY } = config;
    const postBody = {
        image_id: catId, 
        sub_id: 'user-123'
    }

    try {
        const resp = await fetch(API_URL_FAVORITES, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY,
            },
            body: JSON.stringify(postBody)
        });

        if (!resp.ok)
            throw new Error(`HTTP Error: ${resp.status}`);

        const data = await resp.json();
        return data.id;
        
    } catch (error) {
        console.error('Error posting your favourite cat', error.message);
        controlError('Error saving cat. Please try again.', 'favoritesContainer');
    }
}

export const deleteCatById = async( favoriteId ) => {
    const config = getConfig();
    const { API_URL_DELETE, API_KEY } = config;
    const url = API_URL_DELETE(favoriteId);
    
    try {
        const resp = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY,
            },
        });

        if (!resp.ok)
            throw new Error(`HTTP Error: ${resp.status}`);

    } catch (error) {
        console.error('Error deleting favourite cat:', error.message);
        controlError(error.message, 'favoritesContainer');
    }
}

export const handleReload = async( config ) => {
    const data = await getRandomCats(config);
    const images = document.querySelectorAll('img');    

    for (let i = 0; i < data.length; i++) {
        images[i].src = data[i].url;
        images[i].alt = data[i].id; 
    }
}