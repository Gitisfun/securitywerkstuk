import axios from "axios";
//import store from "../store";

const httpClient = axios.create({
    baseURL: "https://opdracht-security.herokuapp.com/api/",
    timeout: 10000, // indicates, 1000ms ie. 1 second
    headers: {
        "Content-Type": "application/json",
        // anything you want to add to the headers
    }
});

httpClient.defaults.headers.common['authorization'] = `Bearer ${JSON.parse(localStorage.getItem("authtokenws"))}`

export default httpClient;