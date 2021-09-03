import React, { useState, useEffect } from 'react'
import md5 from 'md5'
import axios from 'axios'

export const Characters = () => {
    const [characters, setCharacters] = useState([])
    const [hash] = useState(md5(1 + process.env.REACT_APP_PRIVATE_KEY + process.env.REACT_APP_PUBLIC_KEY))

    const getCharacters = () => {
        const chars = {
            method: 'GET',
            url: `${process.env.REACT_APP_API_URL}/characters`,
            params: {
                ts: 1,
                apikey: process.env.REACT_APP_PUBLIC_KEY,
                hash: hash
            }
        }
        axios(chars)
            .then(res => {
                console.log(res.data)
                setCharacters(res.data.data.results)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getCharacters()
    }, [])

    return (
        <div>
            <h2>Characters</h2>
            <div className="row row-flex">
                {characters.map(character => {
                    return (
                        <div className="col col-12 col-md-4 mb-3 d-flex" key={character.index}>
                            <div className="card char-card bg-dark text-white h-100 w-100">
                                <img className="img-fit" src={`${character.thumbnail.path}.${character.thumbnail.extension}`} />
                                <div className="card-img-overlay d-flex align-items-end">
                                    <div className="bg-white text-black p-2 p-md-3">
                                    <h5 className="card-title">{ character.name }</h5>
                                    <p className="card-text">
                                        { character.description }
                                    </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )
                })}
            </div>
        </div>
    )
}
