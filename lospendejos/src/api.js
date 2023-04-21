import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api/'
});

export function getHello() {
    return api.get('hello');
}
