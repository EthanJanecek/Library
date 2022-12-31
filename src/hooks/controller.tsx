import axios from 'axios';

//export const BACKEND_URL = "http://localhost:8080/";
export const BACKEND_URL = "https://ethansharedlibrary.azurewebsites.net/";
export const REGISTER_ROUTE = "register";
export const LOGIN_ROUTE = "login";
export const LOOKUP_ROUTE = "barcodeLookup";
export const BOOK_ROUTE = "book";
export const BOOKS_ROUTE = "books";

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

export const getBooks = async(email: string, successCallback: CallableFunction, errorCallback: CallableFunction) => {
    axios.get(BACKEND_URL + BOOKS_ROUTE + `?email=${email}`).then(res => {
        successCallback(res.data);
    }).catch(err => {
        console.log(err);
        //errorCallback(err.response.data);
    })
}