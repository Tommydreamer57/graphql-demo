import React, { Component } from 'react';
import './App.css';

import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

import Classes from './Classes';

const cache = new InMemoryCache({
    dataIdFromObject: ({ nodeId }) => nodeId || null,
});

const client = new ApolloClient({
    uri: 'http://localhost:3456/graphql',
    cache,
});

export default class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <Classes/>
            </ApolloProvider>
        );
    }
}
