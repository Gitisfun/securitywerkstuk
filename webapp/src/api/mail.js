import httpClient from './httpClient';

const END_POINT = '/bezwaar';

const getAllBezwaren = () => httpClient.get(`${END_POINT}`);

const sendMail = (email) => httpClient.post(END_POINT, email);

export {
    getAllBezwaren,
    sendMail
}