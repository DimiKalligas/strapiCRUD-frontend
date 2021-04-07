import { Menu } from 'antd'
import React, { useContext, useState, useEffect } from 'react'
import { Link } from "react-router-dom";
// import store from 'store'

// import { NavLink as Item } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const { SubMenu, Item } = Menu;
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
    const [current, setCurrent] = useState("home");
    const { user } = useContext(UserContext)

    const handleClick = (e) => {
        // console.log(e.key);
        setCurrent(e.key);
    };

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
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" style={{ paddingLeft: 40 }}>
            <span><Link to='/' > Home </Link></span>
            {user &&
                <>
                    <Item key="create" className="float-left">
                        <Link to="/create">Create</Link>
                    </Item>
                    {/* <Item key="logout" className="float-left">
                        <Link to="/logout">Logout</Link>
                    </Item> */}
                    {/* <Item to='/create' exact> Create </Item>
                    <Item to='/logout' exact> Logout </Item> */}
                </>
            }
            {!user &&
                <>
                    <Item key="login" className="float-right">
                        <Link to="/login">Login</Link>
                    </Item>
                    <Item key="signup" className="float-right">
                        <Link to="/signup">Signup</Link>
                    </Item>
                    {/* <Item to='/login' exact> Login </Item>
                    <Item to='/signup' exact> Signup </Item> */}
                </>
            }

        </Menu>
    )
}