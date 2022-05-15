import { ACCESS_TOKEN, CLIENT_ID } from '../constants/constants';

export const igdbSettings = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Client-ID': CLIENT_ID,
        'Authorization': 'Bearer ' + ACCESS_TOKEN,
    },
    body: "fields id;limit 70;sort rating asc;where rating > 90;"
}
