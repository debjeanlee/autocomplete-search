import React from 'react'

function Autocomplete() {

    const temp = [
        {
            name: "deb",
            url: "https://github.com/debjeanlee"
        },
        {
            name: "deb",
            url: "https://github.com/debjeanlee"
        },
        {
            name: "deb",
            url: "https://github.com/debjeanlee"
        },
        {
            name: "deb",
            url: "https://github.com/debjeanlee"
        }
    ]

    const data = temp.map(el => {
        return <li>{el.name} - {el.url}</li>
    })

    return (
        <div className="autocomplete-results__container">
            <ul>
                {/* autocomplete list */}
                {data}
            </ul>
        </div>
    )
}

export default Autocomplete
