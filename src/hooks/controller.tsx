import axios from 'axios';

export const BACKEND_URL = "http://localhost:5000";
export const REGISTER_ROUTE = "/register";
export const LOGIN_ROUTE = "/login";

export const register = async (name: string, email: string, password: string, registerCallback: CallableFunction) => {
    await axios.post(BACKEND_URL + REGISTER_ROUTE, {
        name, email, password
    }).then(res => {
        registerCallback(true, res.data.message);
        return res.data.message;
    }).catch(err => {
        registerCallback(false, err.response.data);
        return err.response.data;
    })
}

export const login = async (email: string, password: string, loginCallback: CallableFunction) => {
    await axios.post(BACKEND_URL + LOGIN_ROUTE, {
        email, password
    }).then(res => {
        loginCallback(true, res.data.message, res.data);
        return res.data.message;
    }).catch(err => {
        loginCallback(false, err.response.data, undefined);
        return err.response.data;
    })
}
