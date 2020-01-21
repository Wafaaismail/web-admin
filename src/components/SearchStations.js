import React, { Component } from 'react'
let test =
    [
        {
            "name": "cairo station3"
        },
        {
            "name": "cairo station2"
        },
        {
            "name": "cairo station1"
        }
    ]

export default class SearchStations extends Component {
    render() {
        return (
            <ul>{test.map(data => (
                    <div key={data.id}>
                        <input type="radio" name="gender" value={data.id}></input>
                        {data.name}
                    </div>
                ))
            }</ul>
        )
    }
}
