import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-app-burgerr.firebaseio.com/'
});


export default instance;