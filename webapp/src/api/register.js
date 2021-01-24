import httpClient from './httpClient';

const END_POINT = '/register';

const register = (user) => httpClient.post(END_POINT, user);

export {
    register
}