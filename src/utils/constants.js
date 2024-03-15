export const LOGO = "https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";

export const PHOTO_URL = "https://avatars.githubusercontent.com/u/119698725?v=4";

export const API_OPTIONS = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer '+process.env.REACT_APP_TMDB_KEY
    }
};

export const IMG_CDN_URL="https://image.tmdb.org/t/p/w500"

export const BG_URL = "https://assets.nflxext.com/ffe/siteui/vlv3/c38a2d52-138e-48a3-ab68-36787ece46b3/eeb03fc9-99c6-438e-824d-32917ce55783/IN-en-20240101-popsignuptwoweeks-perspective_alpha_website_large.jpg";

export const SUPPORTED_LANGUAGES = [{identifier: "en", name: "English"}, {identifier: "hindi", name: "Hindi"}, {identifier: "spanish", name: "Spanish"}]

export const OPENAI_KEY = process.env.REACT_APP_OPENAI_KEY;