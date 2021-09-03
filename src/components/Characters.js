import React, { useState, useEffect } from 'react'
import md5 from 'md5'
import axios from 'axios'
import { offset } from '@popperjs/core'

export const Characters = () => {
    const [characters, setCharacters] = useState([])
    const [hash] = useState(md5(1 + process.env.REACT_APP_PRIVATE_KEY + process.env.REACT_APP_PUBLIC_KEY))
    const [pagination, setPagination] = useState({
        limit: 100,
        total: 0,
        current: 1
    })

    const getCharacters = (offset, page) => {
        const chars = {
            method: 'GET',
            url: `${process.env.REACT_APP_API_URL}/characters`,
            params: {
                ts: 1,
                apikey: process.env.REACT_APP_PUBLIC_KEY,
                hash: hash,
                offset: offset,
                limit: pagination.limit
            }
        }
        axios(chars)
            .then(res => {
                console.log(res.data)
                const { total } = res.data.data
                setCharacters(res.data.data.results)
                setPagination({...pagination, total: total, current: page})
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getCharacters(0,1)
    }, [])

    return (
        <div className="text-center pt-3">
            <h1 className="mb-4">Marvel characters</h1>
            <div className="row">
                {characters.map(character => {
                    return (
                        <div className="col col-12 col-md-4 col-lg-3 mb-3 d-flex" key={character.id}>
                            <div className="card char-card bg-dark text-white h-100 w-100 d-flex">
                                <img className="img-fit" src={`${character.thumbnail.path}.${character.thumbnail.extension}`} />
                                <div className="card-img-overlay d-flex align-items-end">
                                    <div className="bg-white text-black p-2 p-md-3">
                                        <h5 className="card-title">{character.name}</h5>
                                        <p className="card-text char-description">
                                            {character.description.length === 0 ? 'No description provided' : character.description}
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )
                })}
            </div>
            <div className="w-100 d-flex justify-content-center my-4 py-3">
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        {Array.apply(null, { length: pagination.total / pagination.limit }).map((pag, index) => {
                            return <li key={index} onClick={() => getCharacters(index * pagination.limit, index + 1 )} className={`page-item ${(pagination.current === index + 1 ? 'active' : '')}`}>
                                <a className="page-link" href="#">
                                    {index + 1}
                                </a>
                            </li>
                        })}
                    </ul>
                </nav>
            </div>

        </div>
    )
}
