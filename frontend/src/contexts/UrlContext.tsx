import React from 'react';

const UrlContext = React.createContext({
    url: 'https://dev.juliandworzycki.pl/api'
} as { url: string });

export default UrlContext;

//  code: https://dev.juliandworzycki.pl/api
//  localhost: http://localhost:5000