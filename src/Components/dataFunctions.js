import axios from 'axios';
import api from './api';

const loadUsers = (url = 'users') => {
    let data = axios.get(api+url).then((res) => {
        return res.data;
    })

    return data;
}

export default loadUsers;