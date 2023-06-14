import React from 'react';

const UrlContext = React.createContext({
    url: 'http://localhost:5000'
} as { url: string });

export default UrlContext;

//  code: https://dev.juliandworzycki.pl/api
//  localhost: http://localhost:5000