import { Menu } from 'antd'
import React, { useContext, useState, useEffect } from 'react'
import { Nav, Navbar } from 'react-bootstrap'
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
        <Navbar bg="light" expand="sm" fixed="top">
            <Navbar.Brand href="/">Home</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {user &&
                        <>
                            <Nav.Link href='/create' exact> Create </Nav.Link>
                            <Nav.Link href="/logout">Logout</Nav.Link>
                        </>
                    }
                    {!user &&
                        <>
                            <Nav.Link href='/login' exact> Login </Nav.Link>
                            <Nav.Link href='/signup' exact> Signup </Nav.Link>
                        </>
                    }

                    {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown> */}
                </Nav>
                {/* <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                </Form> */}
            </Navbar.Collapse>
        </Navbar>
        // <div className="Nav">
        //     <NavLink to='/' exact> Home </NavLink>
        //     {user &&
        //         <>
        //             <NavLink to='/create' exact className="alink"> Create </NavLink>
        //             <NavLink to='/logout' exact> Logout </NavLink>
        //         </>
        //     }
        //     {!user &&
        //         <>
        //             <NavLink to='/login' exact> Login </NavLink>
        //             <NavLink to='/signup' exact> Signup </NavLink>
        //         </>
        //     }

        // </div>

    )
}