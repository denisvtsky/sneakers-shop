import sendPostRequest from '../../sendPostRequest.js';

export default async function (brandId, photos) {
    const requestBody = {
        id: +brandId,
        photos,
    };

    const response = await sendPostRequest('/api/brands/removePhotos', requestBody);

    if (!response.success) {
        throw new Error(response.message ? response.message : 'Что-то пошло не так(');
    }

    return response.data;
};
