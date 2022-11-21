import { refs } from "./refs";

export function createGalleryMarkup(dataArray) {
    return dataArray
        .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads, } = {}) =>
            `<div class="photo-card">
            <a href="${largeImageURL}">
  <img src="${largeImageURL}" alt="${tags}" loading="lazy" />
  </a>
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div>`
        )
        .join(''); 
}

export function removeMarkup(refKey1 = '', refKey2 = '') {
  refs[refKey1].innerHTML = '';
  if (refKey2 === '') return;
  refs[refKey2].innerHTML = '';
}
