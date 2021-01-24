import httpClient from './httpClient';

const END_POINT = '/comments';


const getAllComments = (params) => httpClient.get(`${END_POINT}${params}`);

const getComment = (id) => httpClient.get(`${END_POINT}/${id}`);

const createComment = (comment) => httpClient.post(END_POINT, comment);

const updateComment = (id, comment) => httpClient.put(`${END_POINT}/${id}`, comment);

const deleteComment = (id) => httpClient.delete(`${END_POINT}/${id}`)

export {
    getAllComments,
    getComment,
    createComment,
    updateComment,
    deleteComment
}