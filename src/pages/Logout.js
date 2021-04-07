// import React, { useState, useContext, useEffect } from 'react'
// import { UserContext } from '../context/UserContext'
// import store from 'store'

export default ({ history }) => {
    // const { user } = useContext(UserContext)

    // store.remove('user')
    history.push('/')

    return (
        <h2>Logout...</h2>
    )
}