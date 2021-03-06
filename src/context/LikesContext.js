import React, { createContext, useState, useEffect, useContext } from 'react'
import { UserContext } from './UserContext'

export const LikesContext = createContext(null)

export default ({ children }) => {

    const { user } = useContext(UserContext)

    const [likesGiven, setLikesGiven] = useState([])
    const [likesReceived, setLikesReceived] = useState([])

    const reloader = () => {
        if (user) {
            const loadLikesGiven = async () => {
                const response = await fetch(`https://strapi-crud.herokuapp.com/likes/given?user=${user.user.id}`, {
                    headers: {
                        'Authorization': `Bearer ${user.jwt}`
                    }
                })
                const data = await response.json()
                setLikesGiven(data)
            }
            // useEffect does not allow any side-effect, so
            // we cannot return a promise that we want to await: so, 
            // in order to use await we first have to define a function
            // and then call it
            loadLikesGiven()

            const loadLikesReceived = async () => {
                const response = await fetch(`https://strapi-crud.herokuapp.com/likes/received?post.author=${user.user.id}`, {
                    headers: {
                        'Authorization': `Bearer ${user.jwt}`
                    }
                })
                const data = await response.json()
                setLikesReceived(data)
            }
            loadLikesReceived()
        }
    }

    useEffect(() => {
        reloader()
    }, [user])

    console.log("likesGiven", likesGiven)
    console.log("likesReceived", likesReceived)

    return (
        <LikesContext.Provider value={{ likesGiven, likesReceived, reloader }}>
            {children}
        </LikesContext.Provider>
    )
}