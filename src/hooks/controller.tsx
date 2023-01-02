import axios from 'axios';

export const BACKEND_URL = "http://localhost:8080/";
//export const BACKEND_URL = "https://ethansharedlibrary.azurewebsites.net/";
export const REGISTER_ROUTE = "register";
export const LOGIN_ROUTE = "login";
export const LOOKUP_ROUTE = "barcodeLookup";
export const BOOK_ROUTE = "book";
export const BOOKS_ROUTE = "books";
export const GAME_ROUTE = "game";
export const GAMES_ROUTE = "games";
export const MUSIC_ROUTE = "music";
export const MUSICS_ROUTE = "musics";
export const MOVIE_ROUTE = "movie";
export const MOVIES_ROUTE = "movies";

export const register = async (name: string, email: string, password: string, registerCallback: CallableFunction) => {
    await axios.post(BACKEND_URL + REGISTER_ROUTE, {
        name, email, password
    }).then(res => {
        registerCallback(true, res.data.message);
        return res.data.message;
    }).catch(err => {
        registerCallback(false, err.data);
        return err.data;
    })
}

export const login = async (email: string, password: string, loginCallback: CallableFunction) => {
    await axios.post(BACKEND_URL + LOGIN_ROUTE, {
        email, password
    }).then(res => {
        loginCallback(true, res.data.message, res.data);
        return res.data.message;
    }).catch(err => {
        loginCallback(false, err.data, undefined);
        return err.data;
    })
}

export const barcodeLookup = async (barcode: string, barcodeCallback: CallableFunction) => {
    axios.post(BACKEND_URL + LOOKUP_ROUTE, {
        barcode
    }).then(res => {
        barcodeCallback(res.data.products[0]);
    }).catch(err => {
        console.log(err.response.data);
    })
}

export const addBook = async(email: string, data: any, callback: CallableFunction) => {
    axios.post(BACKEND_URL + BOOK_ROUTE, {
        email,
        data
    }).then(res => {
        callback(true, res.data);
    }).catch(err => {
        console.log(err.response.data);
        callback(false, err.response.data);
    })
}

export const updateBook = async(email: string, data: any, callback: CallableFunction) => {
    axios.patch(BACKEND_URL + BOOK_ROUTE, {
        email,
        data
    }).then(res => {
        callback(true, res.data);
    }).catch(err => {
        console.log(err.response.data);
        callback(false, err.response.data);
    })
}

export const getBooks = async(email: string, successCallback: CallableFunction, errorCallback: CallableFunction) => {
    axios.get(BACKEND_URL + BOOKS_ROUTE + `?email=${email}`).then(res => {
        successCallback(res.data);
    }).catch(err => {
        console.log(err);
        //errorCallback(err.response.data);
    })
}

export const addGame = async(email: string, data: any, callback: CallableFunction) => {
    axios.post(BACKEND_URL + GAME_ROUTE, {
        email,
        data
    }).then(res => {
        callback(true, res.data);
    }).catch(err => {
        console.log(err.response.data);
        callback(false, err.response.data);
    })
}

export const updateGame = async(email: string, data: any, callback: CallableFunction) => {
    axios.patch(BACKEND_URL + GAME_ROUTE, {
        email,
        data
    }).then(res => {
        callback(true, res.data);
    }).catch(err => {
        console.log(err.response.data);
        callback(false, err.response.data);
    })
}

export const getGames = async(email: string, successCallback: CallableFunction, errorCallback: CallableFunction) => {
    axios.get(BACKEND_URL + GAMES_ROUTE + `?email=${email}`).then(res => {
        successCallback(res.data);
    }).catch(err => {
        console.log(err);
        //errorCallback(err.response.data);
    })
}

export const addMusic = async(email: string, data: any, callback: CallableFunction) => {
    axios.post(BACKEND_URL + MUSIC_ROUTE, {
        email,
        data
    }).then(res => {
        callback(true, res.data);
    }).catch(err => {
        console.log(err.response.data);
        callback(false, err.response.data);
    })
}

export const updateMusic = async(email: string, data: any, callback: CallableFunction) => {
    axios.patch(BACKEND_URL + MUSIC_ROUTE, {
        email,
        data
    }).then(res => {
        callback(true, res.data);
    }).catch(err => {
        console.log(err.response.data);
        callback(false, err.response.data);
    })
}

export const getMusic = async(email: string, successCallback: CallableFunction, errorCallback: CallableFunction) => {
    axios.get(BACKEND_URL + MUSICS_ROUTE + `?email=${email}`).then(res => {
        successCallback(res.data);
    }).catch(err => {
        console.log(err);
        //errorCallback(err.response.data);
    })
}

export const addMovie = async(email: string, data: any, callback: CallableFunction) => {
    axios.post(BACKEND_URL + MOVIE_ROUTE, {
        email,
        data
    }).then(res => {
        callback(true, res.data);
    }).catch(err => {
        console.log(err.response.data);
        callback(false, err.response.data);
    })
}

export const updateMovie = async(email: string, data: any, callback: CallableFunction) => {
    axios.patch(BACKEND_URL + MOVIE_ROUTE, {
        email,
        data
    }).then(res => {
        callback(true, res.data);
    }).catch(err => {
        console.log(err.response.data);
        callback(false, err.response.data);
    })
}

export const getMovies = async(email: string, successCallback: CallableFunction, errorCallback: CallableFunction) => {
    axios.get(BACKEND_URL + MOVIES_ROUTE + `?email=${email}`).then(res => {
        successCallback(res.data);
    }).catch(err => {
        console.log(err);
        //errorCallback(err.response.data);
    })
}