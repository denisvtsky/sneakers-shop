import sendPostRequest from '../../sendPostRequest.js';

export default async function edit(request) {
    const url = '/api/sneakers/edit';
    const response = await sendPostRequest(url, request);
    if (!response.success && !response.message) {
        alert('Что-то пошло не так(');
    } else {
        alert(response.message);
    }
};
