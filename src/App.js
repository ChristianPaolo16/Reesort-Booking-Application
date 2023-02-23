import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react';

import { UserProvider } from './UserContext.js'

import NotFound from './pages/NotFound.js'
import Home from './pages/Home.js';
import Register from './pages/Register.js';
import Login from './pages/Login.js';
import Logout from './pages/Logout.js';
import BookNow from './pages/BookNow.js';
import UserBookings from './pages/UserBookings';
import AdminHome from './pages/AdminHome.js'
import AdminRegister from './pages/AdminRegister.js'
import AdminLogin from './pages/AdminLogin.js'
import AddRoom from './pages/AddRoom.js'
import AdminViewRooms from './pages/AdminViewRooms.js';
import UpdateRoomInfo from './pages/UpdateRoomInfo.js';
import RoomView from './components/RoomView';

function App() {

	const [user, setUser] = useState(null);


	const unSetUser = () => {
		localStorage.clear();
	}

	useEffect(() => {

		fetch(`${process.env.REACT_APP_API_URL}/user/profile`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(result => result.json())
		.then(data => {

			if (localStorage.getItem('token') !== null) {	
				setUser({
					id: data._id,
					isAdmin: data.isAdmin
				})
			} else {
				setUser(null);
			}
		})
		
	}, [])



	return (
		<UserProvider value={ {user, setUser, unSetUser} }>
			<Router>
				<Routes>
					<Route path='/' element = {<Home/>}/>
					<Route path='/register' element = {<Register/>}/>
					<Route path='/login' element = {<Login/>}/>
					<Route path='/logout' element = {<Logout/>}/>
					<Route path='/bookNow' element = {<BookNow/>}/>
					<Route path='/room/:roomId' element = {<RoomView/>}/>
					<Route path='/userBookings' element = {<UserBookings/>}/>
					<Route path='/admin' element = {<AdminHome/>}/>
					<Route path='/adminRegister' element = {<AdminRegister/>}/>
					<Route path='/adminLogin' element = {<AdminLogin/>}/>
					<Route path='/adminAddRoom' element = {<AddRoom/>}/>
					<Route path='/adminViewRooms' element = {<AdminViewRooms/>}/>
					<Route path='/admin/updateRoomInfo/:roomId' element = {<UpdateRoomInfo/>}/>
					<Route path='*' element = {<NotFound/>}/>
				</Routes>
			</Router>
		</UserProvider>
	);
}

export default App;
