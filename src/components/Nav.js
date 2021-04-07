import { Menu } from 'antd'
import React, { useContext, useState, useEffect } from 'react'
// import store from 'store'

import { NavLink } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

// if (localStorage.getItem('cart')) {
//     cart = JSON.parse(localStorage.getItem('cart'))
// }
// cart.map((product, i) => {
//     if (product._id == p._id) {
//         cart[i].count = count;
//     }
// })
// localStorage.setItem('cart', JSON.stringify(cart))
// dispatch({
//     type: "ADD_TO_CART",
//     payload: cart,
// });


export default () => {
    const { user } = useContext(UserContext)
    // const [user, setuser] = useState('')
    // let user = store.get('user')
    // console.log('user from store:', user)
    // console.log('from localstorage', user.email)


    // let user
    // useEffect(() => {
    //     if (localStorage.getItem('user')) {
    //         user = JSON.parse(localStorage.getItem('user'))
    //     }
    // }, [])

    return (
        <div className="Nav">
            <NavLink to='/' exact> Home </NavLink>
            {user &&
                <>
                    <NavLink to='/create' exact className="alink"> Create </NavLink>
                    <NavLink to='/logout' exact> Logout </NavLink>
                </>
            }
            {!user &&
                <>
                    <NavLink to='/login' exact> Login </NavLink>
                    <NavLink to='/signup' exact> Signup </NavLink>
                </>
            }

        </div>
    )
}