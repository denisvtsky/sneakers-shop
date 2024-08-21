import sendPostRequest from '../../sendPostRequest.js';

export default async function create(formData) {
    const url = '/api/sneakers/create';
    const response = await sendPostRequest(url, formData);

    if (!response.success && !response.message) {
        alert('Что-то пошло не так(');
    } else {
        alert(response.message);
    }

    return response;
}
