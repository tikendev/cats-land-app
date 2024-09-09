import { getConfig } from './config.js';
import { postFavoriteCat, deleteCatById } from './apiService.js';

export const createImages = async( images ) => {
    const randomContainer = document.getElementById('randomContainer');
    randomContainer.innerHTML = '';

    await images.forEach( catImg => {
        createArticle( catImg, 'Save Cat', randomContainer.id );
    });

    addToFavorites();
}

export const createArticle = ( image, buttonText, idContainer ) => {
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

export const addToFavorites = () => {

    const randomContainer = document.getElementById('randomContainer');
    const favoritesContainer = document.getElementById('favoritesContainer');
    const saveButtons = randomContainer.querySelectorAll('[data-cat-id]');
    const config = getConfig();

    saveButtons.forEach( btn => {
        btn.addEventListener('click', async() => {

            const catId = btn.dataset.catId;
            const article = btn.closest('article');
            const imgSrc = article.querySelector('img').src;
            const favouriteId = await postFavoriteCat( config, catId );

            btn.disabled = true;
            btn.classList.add('disabled');
            

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

export const deleteCatOfFavorites = ( article, favouriteId ) => {
    const favoritesContainer = document.getElementById('favoritesContainer');
    const randomContainer = document.getElementById('randomContainer');    
    const buttonToEnable = randomContainer.querySelector(`[data-cat-id="${article.id}"]`);

    if (buttonToEnable) {
        buttonToEnable.disabled = false;
        buttonToEnable.classList.remove('disabled');
    }

    favoritesContainer.removeChild(article);
    deleteCatById( favouriteId );
}

export const controlError = ( respStatus ) => {
    const spanError = document.createElement('span');
    spanError.textContent = `There was an error: ${respStatus}❗️`;

    return spanError;
}