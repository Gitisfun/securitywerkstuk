import httpClient from './httpClient';

const END_POINT = '/login';

const login = (user) => httpClient.post(END_POINT, user);

export {
    login
}