import React, { Component } from 'react';
import './App.css';

import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

import Classes from './Classes';

import gql from 'graphql-tag';

import { Query, Mutation } from 'react-apollo';

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
                <div>
                    <Query
                        query={gql`query {
                                allPeople{
                                    nodes{
                                        id
                                        firstName
                                        lastName
                                    }
                                }
                            }`}
                    >
                        {({
                            data: {
                                allPeople: {
                                    nodes: people = []
                                } = {}
                            } = {}
                        }) => (
                                <div>
                                    {people.map(person => (
                                    <h1>
                                        {person.firstName}
                                        {person.lastName}
                                    </h1>
                                ))}
                                </div>
                            )}
                    </Query>
                </div>
                {/* <Classes/> */}
            </ApolloProvider>
        );
    }
}
