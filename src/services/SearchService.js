import Axios from 'axios';
import {API_HEADER_CONFIG} from './search.config'

const SearchService = {
    getSearch: async function(word, category, page){
        try {
            const res = await Axios.get(
                `${process.env.REACT_APP_API}/${category}?q=${word}&page=${page}`,
                API_HEADER_CONFIG
            )
            return res.data;
        } catch (error) {
            console.log(error)
        }
    },
    getAutoComplete: async function(word){
        let matches = [];

        function getFirstFew(res, category){
            if (res.data.total_count === 0) return;
            if (category === 'user') {
                let results = res.data.items.filter((item) => item.login.toLowerCase() !== word.toLowerCase());
                results.forEach(el => {
                    matches.push(el.login.toLowerCase());
                })
            } else if(category === 'issues') {
                let results = res.data.items.filter((item) => item.title.toLowerCase() !== word.toLowerCase());
                results.forEach(el => {
                    matches.push(el.title.toLowerCase());
                })          
            } else {
                let results = res.data.items.filter((item) => item.name.toLowerCase() !== word.toLowerCase());
                results.forEach(el => {
                    matches.push(el.name.toLowerCase());
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
                getFirstFew(res, 'user');
            })

            await Axios.get(
                `${process.env.REACT_APP_API}/issues?q=${word}&per_page=5`,
                    API_HEADER_CONFIG
                )
            .then(res => {
                getFirstFew(res, 'issues');
            })

            const autocomplete = [...new Set(matches)].sort();
            return autocomplete;
        } catch (error) {
            console.log(error)
        }
    }
}

export default SearchService
