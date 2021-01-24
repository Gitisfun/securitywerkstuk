import httpClient from './httpClient';

const END_POINT = '/users';


const getUser = (id) => httpClient.get(`${END_POINT}/${id}`);

const updateUser = (id, user) => httpClient.put(`${END_POINT}/${id}`, user);

const deleteUser = (id) => httpClient.delete(`${END_POINT}/${id}`)

export {
    getUser,
    updateUser,
    deleteUser
}