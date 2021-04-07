import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Container, Row } from 'react-bootstrap'
import Nav from './components/Nav'
import Home from './pages/Home'
import Create from './pages/Create'
import SinglePost from './pages/SinglePost'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Signup from './pages/Signup'
import './App.css'

function App() {

  return (
    // <div className="App">
    <Container fluid>
      <BrowserRouter>
        <Row md={10} className="rows">
          <Nav />
        </Row>
        <Row md={12}>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/create' exact component={Create} />
            <Route path='/login' exact component={Login} />
            <Route path='/signup' exact component={Signup} />
            <Route path='/logout' exact component={Logout} />
            <Route path='/:id' exact component={SinglePost} />
          </Switch>
        </Row>
      </BrowserRouter>
    </Container>
    // </div>
  )
}

export default App;
