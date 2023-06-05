import React from 'react';

const UrlContext = React.createContext({
    url: 'http://localhost:5000'
} as { url: string });

export default UrlContext;

//  code: /api
//  localhost: http://localhost:5000