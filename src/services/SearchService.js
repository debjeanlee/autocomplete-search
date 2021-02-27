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
    getAutoComplete: async function(word){
        let matches = [];

        function getFirstFew(res, user){
            if (res.data.total_count === 0) return;
            if (user) {
                let results = res.data.items.filter((item) => item.login.toLowerCase() !== word.toLowerCase());
                results.forEach(el => {
                    matches.push(el.login);
                })
            } else {
                let results = res.data.items.filter((item) => item.name.toLowerCase() !== word.toLowerCase());
                results.forEach(el => {
                    matches.push(el.name);
                })
            }           
        }
        try {
            await Axios.get(
                `${process.env.REACT_APP_API}/repositories?q=${word}&per_page=5`,
                    API_HEADER_CONFIG
                )
            .then(res => {
                getFirstFew(res);
            })

            await Axios.get(
                `${process.env.REACT_APP_API}/users?q=${word}&per_page=5`,
                    API_HEADER_CONFIG
                )
            .then(res => {
                getFirstFew(res, true);
            })

            const autocomplete = [...new Set(matches.sort())];
            return autocomplete;
        } catch (error) {
            console.log(error)
        }
    }
}

export default SearchService
