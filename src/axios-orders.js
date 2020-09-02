import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://burger-app-c692d.firebaseio.com/'
});

export default instance