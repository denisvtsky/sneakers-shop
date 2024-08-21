import sendPostRequest from '../../sendPostRequest.js';

export default async function (shopId, sneakersId, photos) {
    const requestBody = {
        shopId: +shopId,
        sneakersId: +sneakersId,
        photos,
    };

    const response = await sendPostRequest('/api/sneakers/removePhotos', requestBody);

    if (!response.success) {
        throw new Error(response.message ? response.message : 'Что-то пошло не так(');
    }

    return response.data;
};
