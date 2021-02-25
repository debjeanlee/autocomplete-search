import Axios from 'axios';
import API_HEADER_CONFIG from './search.config'

const SearchService = {
    getRepositories: async function(searchword){
        try {
            const res = await Axios.get(
                `${process.env.REACT_APP_API}/repositories?q=${searchword}`,
                API_HEADER_CONFIG
            )
            return res.data;
        } catch (error) {
            console.log(error)
        }
    }
}

export default SearchService