import sendPostRequest from '../../sendPostRequest.js';

export default async (id, description) => {
    const requestBody = {
        id,
        description,
    };
    const url = '/api/brands/edit';
    const response = await sendPostRequest(url, requestBody);
    if (!response.success) {
        throw new Error(response.message || 'Что-то пошло не так(');
    }
    return response.data;
};
