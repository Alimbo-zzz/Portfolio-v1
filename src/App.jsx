import React from 'react';
import { Landing, Error, Admin } from '@pages';
import { Route, RouterProvider, createBrowserRouter, createHashRouter, createRoutesFromElements } from 'react-router-dom';



const App = (props) => {


	const router = createHashRouter(createRoutesFromElements(<>
		<Route path='/' element={<Landing />} />
		<Route path='/admin/*' element={<Admin />} />
		<Route path='*' element={<Error />} />
	</>))


	return (<>
		<RouterProvider router={router} />
	</>);
}

export default App;