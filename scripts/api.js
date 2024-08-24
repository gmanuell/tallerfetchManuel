export const Url_API = 'https://api-colombia.com/api/v1/';

export function fetchData(endpoint) {
    return fetch(`${Url_API}${endpoint}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(data => data)
        .catch(error => {
            console.error("Error fetching data:", error);
            throw error;
        });
}
