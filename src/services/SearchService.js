import Axios from 'axios';
import {API_HEADER_CONFIG} from './search.config'

const SearchService = {
    getRepositories: async function(word){
        try {
            const res = await Axios.get(
                `${process.env.REACT_APP_API}/repositories?q=${word}`,
                API_HEADER_CONFIG
            )
            return res.data;
        } catch (error) {
            console.log(error)
        }
    },
    getCode: async function(word){
        try {
            const res = await Axios.get(
                `${process.env.REACT_APP_API}/code?q=${word}`,
                API_HEADER_CONFIG
            )
            return res.data;
        } catch (error) {
            console.log(error)
        }
    },
    getUsers: async function(word){
        try {
            const res = await Axios.get(
            `${process.env.REACT_APP_API}/users?q=${word}`,
                API_HEADER_CONFIG
            )
            return res.data;
        } catch (error) {
            console.log(error)
        }
    },
}

export default SearchService
