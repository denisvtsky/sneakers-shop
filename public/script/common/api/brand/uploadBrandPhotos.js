import sendPostRequest from '../../sendPostRequest.js';

export default async (brandId, files) => {
    const formData = new FormData();
    formData.append('id', brandId);

    Array.from(files).forEach((file) => {
        formData.append(file.name, file);
    });

    const response = await sendPostRequest('/api/brands/uploadPhotos', formData);

    if (!response.success) {
        throw new Error(response.message ? response.message : 'Что-то пошло не так(');
    }

    return response.data;
};
