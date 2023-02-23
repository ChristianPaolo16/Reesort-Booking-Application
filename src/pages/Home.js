import Banner from '../components/Banner.js'
import { Fragment } from 'react'
import AppNavBar from '../components/AppNavBar.js'
import Contact from '../components/Contact.js'
import React from 'react'

export default function Home() {

	return(
		<Fragment>
			<AppNavBar/>
			<Banner/>
			<Contact/>
		</Fragment>
	)

}