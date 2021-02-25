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
        const matches = [];

        function getFirstFew(res, user){
            if (res.data.total_count === 0) return;
            if (res.data.total_count > 100) {
                for (let x = 0; x < 3; x++) {
                    if(user){
                        matches.push(res.data.items[x].login)
                    } else {
                        matches.push(res.data.items[x].name);
                    }
                }
            } else {
                // FIX THIS LOGIC
                let twoPercent = Math.floor(parseInt(res.data.total_count) * 0.02)
                for (let x = 0; x < twoPercent; x++) {
                    if (user) {
                        matches.push(res.data.items[x].login)
                    } else {
                        matches.push(res.data.items[x].name);
                    }
                }
            }
        }
        try {
            await Axios.get(
                `${process.env.REACT_APP_API}/repositories?q=${word}&sort=name&order=asc`,
                    API_HEADER_CONFIG
                )
            .then(res => {
                getFirstFew(res);
            })
            await Axios.get(
                `${process.env.REACT_APP_API}/code?q=${word}&sort=name&order=asc`,
                    API_HEADER_CONFIG
                )
            .then(res => {
                getFirstFew(res);
            })

            await Axios.get(
                `${process.env.REACT_APP_API}/users?q=${word}&sort=name&order=asc`,
                    API_HEADER_CONFIG
                )
            .then(res => {
                getFirstFew(res, true);
            })
            
            return matches;
        } catch (error) {
            console.log(error)
        }
    }
}

export default SearchService
