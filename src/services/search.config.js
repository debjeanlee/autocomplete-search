const API_HEADER_CONFIG = {
    "headers": {
        "Authorization": `Bearer ${process.env.REACT_APP_TOKEN}`,
        "Accept": "application/vnd.github.v3.text-match+json",
    }
}

export {API_HEADER_CONFIG};