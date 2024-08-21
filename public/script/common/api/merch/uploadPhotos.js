import sendPostRequest from '../../sendPostRequest.js';

export default async function (files, shopId, sneakersId) {
    const formData = new FormData();

    formData.append('shopId', shopId);
    formData.append('sneakersId', sneakersId);

    Array.from(files).forEach((file) => {
        formData.append(file.name, file);
    });

    const response = await sendPostRequest('/api/sneakers/uploadPhotos', formData);

    if (!response.success) {
        throw new Error(response.message ? response.message : 'Что-то пошло не так(');
    }

    return response.data;
};
