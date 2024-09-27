import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer';
import  { withRouter } from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { compose } from 'redux';
import Preloader from './components/common/Preloader/Preloader';
import { initializeApp } from './redux/app-reducer';
import { Provider, connect } from 'react-redux'; 
import store from './redux/redux-store';
import { withSuspense } from './hoc/withSuspense';

const DialogsContainer = React.lazy(() => import ('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import ('./components/Profile/ProfileContainer'));

class App extends React.Component {
  componentDidMount () {
    this.props.initializeApp();
  }
  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }
    return (
        <div className='app-wrapper'>
          <HeaderContainer />
          <Navbar />
          <div className='app-wrapper-content'>
            <Routes>
              <Route exact path='/' element={() => <Navigate to={'/profile'}></Navigate>}/>
              <Route path='/dialogs' element={withSuspense(DialogsContainer)}/>
              <Route path='/profile/:userId?' element={withSuspense(ProfileContainer)}/>
              <Route path='/users' element={<UsersContainer />} />
              <Route path='/login' element={<Login />} />
              <Route path='*' element={<div>404 NOT FOUND</div>} />
            </Routes>
          </div>
        </div>
        )
  }
}
const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})
let AppContainer =  compose(withRouter,connect (mapStateToProps, {initializeApp})) (App);
const SamuraiJSApp = (props) => {
  return <Router>
    <Provider store={store}>
    < AppContainer />
   </Provider> 
  </Router>
}
export default SamuraiJSApp;
 
