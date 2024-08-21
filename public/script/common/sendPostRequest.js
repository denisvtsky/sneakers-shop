export default async function sendPostRequest(url, requestBody) {
    const options = {
        method: 'POST',
        body: requestBody,
    };

    if (!(requestBody instanceof FormData)) {
        options.headers = {'Content-Type': 'application/json'};
        options.body = JSON.stringify(requestBody);
    }

    const response = await fetch(url, options);
    const { message, data } = await response.json();

    if (!response.ok) {
        throw new Error(message || 'Что-то пошло не так(');
    }

    return data;
}
