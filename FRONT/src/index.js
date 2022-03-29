import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Home from './pages/home';
import Contact from './pages/contact';
import About from './pages/about_us';
import Blog from './pages/blog';
import Teacch from './pages/teacch';
import Panel from './pages/app';
import Login from './components/dashboard/login';

ReactDOM.render(
	<React.Fragment>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home/>} />
				<Route path="/contact" element={<Contact/>} />
				<Route path="/about_us" element={<About/>} />
				<Route path="/blog" element={<Blog/>} />
				<Route path="/teacch" element={<Teacch/>} />
				<Route path="/app/" element={<Panel/>} />
				<Route path="/login/" element={<Login/>} />
				<Route path="/app/:category" element={<Panel/>} />
				<Route path="/app/:category/:subcategory" element={<Panel/>} />
				<Route path="/app/:category/:subcategory/:id" element={<Panel/>} />
			</Routes>
		</BrowserRouter>
	</React.Fragment>
	,
	document.getElementById('root')
);