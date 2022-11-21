import axios from 'axios';

export class PixabayApi {
    #BASE_URL = 'https://pixabay.com/api/';
    #page = 1;
    #perPage = 40;
    #query = '';

    async getPhotos() {
        const API_KEY = '31487679-f74d16d66b223008c42dbbdd0';
        return await axios.get(this.#BASE_URL, {
            params: {
                key: API_KEY,
                q: this.#query,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: 'true',
                per_page: this.#perPage,
                page: this.#page,
            },
        });
    }

    pageIncrement() {
        this.#page += 1;
    }
    
    pageReset() {
        this.#page = 1;
    }
    get query() {
        return this.#query;
    }

    set query(newQuery) {
        this.#query=newQuery;
    }

    get perPage() {
        return this.#perPage;
    }
    get page() {
        return this.#page;
    }
}