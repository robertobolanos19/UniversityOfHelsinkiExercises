//Importing react to the allow all react functionalities to work
import React from 'react'
//ReactDom is basically the glue for React and the DOM
import ReactDOM from 'react-dom/client'
//We are importing App so it can be rendered 
import App from './App'

//ReactDom.createRoot is used to render its contents into div-element, defined in the file public/html, having the id value 'root'
ReactDOM.createRoot(document.getElementById('root')).render(<App />)