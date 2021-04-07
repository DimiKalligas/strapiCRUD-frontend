import React, { useState, useContext, useEffect } from 'react'
// import { Row } from 'react-bootstrap'
import { UserContext } from '../context/UserContext'
import store from 'store'
// import axios from 'axios'

const Login = ({ history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const { user, setUser } = useContext(UserContext)
    // console.log("user", user)

    useEffect(() => {
        if (user) {
            // localStorage.setItem('user', JSON.stringify(user))
            store.set('user', { user: user.user.email })
            history.push('/')
        }
    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault()


        try {
            const response = await fetch('https://strapi-crud.herokuapp.com/auth/local/', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    identifier: email,
                    password
                })
            })

            // if (localStorage.getItem("cart")) {
            //     cart = JSON.parse(localStorage.getItem("cart"));
            // }

            // με axios αποφεύγουμε τα arrays:data.message[0].messages[0], αλλά με το fetch
            // μπορούμε και τσιμπάμε το error message του strapi
            //     axios 
            //         .post('https://strapi-crud.herokuapp.com/auth/local', {
            //             identifier: email,
            //             password,
            //         })
            //         .then(response => {
            //             // Handle success.
            //             console.log('User profile', response.data.user);
            //             console.log('User token', response.data.jwt);
            //         })
            //         .catch(error => {
            //             // Handle error.
            //             setError('Something went wrong ' + error)
            //         });
            // }

            const data = await response.json()
            console.log("login user", data)

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
            <h2>Login</h2>

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
                <button>Login</button>
            </form>

            {error && <p>{error}</p>}

        </div>
    )
}


export default Login
