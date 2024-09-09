const init = async() => {
    const config = getConfig();

    getRandomCats(config);
    getFavoriteCats(config);

    const reloadBtn = document.getElementById('reloadBtn');
    reloadBtn.addEventListener('click', () => handleReload(config));
}

const getConfig = () => {
    return {
        API_URL_RANDOM: 'https://api.thecatapi.com/v1/images/search',
        API_URL_FAVORITES: 'https://api.thecatapi.com/v1/favourites',
        API_URL_DELETE: (favoriteId) => `https://api.thecatapi.com/v1/favourites/${favoriteId}`,
        API_KEY: 'live_pHP2KVRJ1HplQBSJNt5DdLSClZhh8eMxdcnTPKPrDQRL7HCLCnYHw1Dgp7HPsuFQ',
        queryString: '?limit=4',
    }
}

const controlError = ( respStatus ) => {
    const spanError = document.createElement('span');
    spanError.textContent = `There was an error: ${respStatus}❗️`;

    return spanError;
}

const getRandomCats = async( config ) => {
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
        const randomContainer = document.getElementById('randomContainer');
        const spanError = controlError(error.message);
        randomContainer.appendChild(spanError);
    }
}

const getFavoriteCats = async( config ) => {
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
        const favoritesContainer = document.getElementById('favoritesContainer');
        const spanError = controlError(error.message);
        favoritesContainer.appendChild(spanError);
    }
}

const postFavoriteCat = async( config, catId ) => {
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
        console.error('Error posting your favourite cata', error.message);
    }
}

const deleteCatById = async( favoriteId ) => {
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
    }
}

const createImages = async( images ) => {
    const randomContainer = document.getElementById('randomContainer');
    randomContainer.innerHTML = '';

    await images.forEach( catImg => {
        createArticle( catImg, 'Save Cat', randomContainer.id );
    });

    addToFavorites();
}

const handleReload = async( config ) => {
    const data = await getRandomCats(config);
    const images = document.querySelectorAll('img');    

    for (let i = 0; i < data.length; i++) {
        images[i].src = data[i].url;
        images[i].alt = data[i].id; 
    }
}

const createArticle = ( image, buttonText, idContainer ) => {
    const article = document.createElement('article');
    const button = document.createElement('button');
    const img = document.createElement('img');
    const imagesContainer = document.getElementById(idContainer);

    article.classList.add('article');
    article.id = image.id;

    button.classList.add('button');
    button.textContent = buttonText;
    button.setAttribute('data-cat-id', image.id);

    img.src = image.url;
    img.alt = image.id;
    article.appendChild(img);
    article.appendChild(button);

    imagesContainer.append(article);

    return article;
}

const addToFavorites = () => {

    const randomContainer = document.getElementById('randomContainer');
    const saveButtons = randomContainer.querySelectorAll('[data-cat-id]');
    const config = getConfig();

    saveButtons.forEach( btn => {
        btn.addEventListener('click', async() => {

            const catId = btn.dataset.catId;
            const article = btn.closest('article');
            const imgSrc = article.querySelector('img').src;
            const favouriteId = await postFavoriteCat( config, catId );

            btn.disabled = true;
            btn.classList.add('not-disabled');
            
            const favoritesContainer = document.getElementById('favoritesContainer');

            const newArticle = createArticle(
                { id: catId, url: imgSrc },
                'Delete Cat',
                favoritesContainer.id,
            )

            const deleteButton = newArticle.querySelector('button');
            deleteButton.addEventListener('click', () => deleteCatOfFavorites( newArticle, favouriteId ));
        });
    });
}

const deleteCatOfFavorites = ( article, favouriteId ) => {
    const favoritesContainer = document.getElementById('favoritesContainer');
    const randomContainer = document.getElementById('randomContainer');
    
    const catId = article.id;
    const buttonToEnable = randomContainer.querySelector(`[data-cat-id="${catId}"]`);

    if (buttonToEnable) {
        buttonToEnable.disabled = false;
        buttonToEnable.classList.remove('not-disabled');
    }

    favoritesContainer.removeChild(article);
    deleteCatById( favouriteId );
}


document.addEventListener('DOMContentLoaded', init);