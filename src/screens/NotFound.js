import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className='content-wrapper'>
    <div className="text-justify"> 
    <h1>404 - Not Found!</h1>
    <Link to="/">Go Home</Link>
    </div>
  </div>
);

export default NotFound;