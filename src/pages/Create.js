import React, { useState, useContext } from 'react'
import { UserContext } from '../context/UserContext'

export default () => {

    const [description, setDescription] = useState('')
    const [file, setFile] = useState(null)
    const [error, setError] = useState('')

    console.log("file", file)

    const { user } = useContext(UserContext)

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!user) {
            setError('Please log in first')

            return
        }

        if (!description) {
            setError('Please add a description')
            return
        }

        if (!file) {
            setError('Please add a file')
            return
        }

        // formData is a way to create multi-part data to send
        const formData = new FormData()
        formData.append('data', JSON.stringify({ description }))
        formData.append('files.image', file)

        // without formData
        // const response = await fetch('https://strapi-crud.herokuapp.com/posts', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         description
        //     })
        // })

        try {
            // with formData
            const response = await fetch('https://strapi-crud.herokuapp.com/posts', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.jwt}`
                },
                body: formData
            })

            const data = await response.json()

            console.log("data", data)
        } catch (err) {
            console.log("Exception ", err)
            setError(err)
        }
    }

    return (
        <div className="Create">
            <h2>Create</h2>

            {error && <p>{error}</p>}

            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Description"
                    value={description}
                    onChange={(event) => {
                        setError('')
                        setDescription(event.target.value)
                    }}
                />
                <input
                    type="file"
                    placeholder="Add a File"
                    onChange={(event) => {
                        setError('')
                        setFile(event.target.files[0])
                    }}
                />
                <button>Submit</button>
            </form>

        </div>
    )

}