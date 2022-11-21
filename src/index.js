import { PixabayApi } from './js/pixabayApi';
import { Notify } from 'notiflix';
import { refs } from './js/refs';
import { removeMarkup, createGalleryMarkup } from './js/markupTools';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const pixabayApi = new PixabayApi();
let simpleGallery = null;

refs.form.addEventListener('submit', onSearchSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMoreClick);

refs.loadMoreBtn.classList.add('is-hidden');

function onSearchSubmit(e) {
  e.preventDefault();
    
  const searchQuery = refs.form.elements.searchQuery.value.trim();
    pixabayApi.query = searchQuery;

  refs.loadMoreBtn.classList.add('is-hidden');
  pixabayApi.pageReset();
  removeMarkup('gallery');

  pixabayApi
    .getPhotos()
    .then(res => {
      if (res.data.hits.length === 0 || !searchQuery) {
        Notify.warning(
          '😒Sorry, there are no images matching your search query. Please try again.',
          { position: 'center-center' }
        );
        return;
      }

      refs.gallery.innerHTML = createGalleryMarkup(res.data.hits);
      refs.loadMoreBtn.classList.remove('is-hidden');

      Notify.success(`🔥Hooray! We found ${res.data.totalHits} images.`);
      simpleGallery = new SimpleLightbox('.gallery a');
    })

    .catch(error => console.log(error));
}

function onLoadMoreClick() {
    
  pixabayApi.pageIncrement();
  pixabayApi.getPhotos().then(res => {
    const totalPages = Math.ceil(res.data.totalHits / pixabayApi.perPage);
    if (pixabayApi.page === totalPages) {
      refs.loadMoreBtn.classList.add('is-hidden');
      Notify.warning(
          "We're sorry, but you've reached the end of search results.",
          { position: 'center-bottom' }
      );
    }

    refs.gallery.insertAdjacentHTML(
      'beforeend',
        createGalleryMarkup(res.data.hits)
    );

    simpleGallery.refresh();

    const { height: cardHeight } = document
      .querySelector('.gallery')
          .firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  });
}
