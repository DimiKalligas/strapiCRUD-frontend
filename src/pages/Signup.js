import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext'
// import axios from 'axios'

const Login = ({ history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const { user, setUser } = useContext(UserContext)
    // console.log("user", user)

    useEffect(() => {
        if (user) {
            history.push('/')
        }
    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch('https://strapi-crud.herokuapp.com/auth/local/register', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    username: email,
                    email,
                    password
                })
            })

            const data = await response.json()
            console.log("data", data)

            if (data.message) {
                setError(data.message[0].messages[0].message)

                return //Stop execution
            }

            setUser(data)

        } catch (err) {
            setError('Something went wrong ' + err)
        }
    }

    return (
        <div className="piokatw">
            <h2>Signup</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                        setError('')
                        setEmail(e.target.value)
                    }}
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                        setError('')
                        setPassword(e.target.value)
                    }}
                />
                <button>Signup</button>
            </form>

            {error && <p>{error}</p>}

        </div>
    )
}


export default Login
