import React, { Component } from 'react';
import './App.css';

import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

// import Classes from './Classes';

import gql from 'graphql-tag';

import { Query, Mutation } from 'react-apollo';

const cache = new InMemoryCache({
    dataIdFromObject: ({ nodeId }) => nodeId || null,
});

const client = new ApolloClient({
    uri: 'http://localhost:3456/graphql',
    cache,
});

const query = gql`query {
    allPeople{
        nodes{
            nodeId
            id
            firstName
            lastName
        }
    }
}`;

export default class App extends Component {

    state = {
        firstName: "",
        lastName: "",
    }

    handleChange = ({ target: { value, name } }) => this.setState({
        [name]: value,
    });

    render() {

        const {
            state: {
                firstName,
                lastName,
            },
            handleChange,
        } = this;

        return (
            <ApolloProvider client={client}>
                <div>
                    <Query
                        query={query}
                    >
                        {({
                            data: {
                                allPeople: {
                                    nodes: people = []
                                } = {}
                            } = {}
                        }) => (
                                <Mutation
                                    mutation={gql`
                                        mutation DeletePerson(
                                            $nodeId:ID!
                                            # id:Int!
                                        ){
                                            deletePerson(
                                                input:{
                                                    nodeId:$nodeId
                                                }
                                            ){
                                                person{
                                                    nodeId
                                                    id
                                                    firstName
                                                    lastName
                                                }
                                            }
                                        }
                                    `}
                                >
                                    {deletePerson => (
                                        <div>
                                            {people.map(({
                                                nodeId,
                                                id,
                                                firstName,
                                                lastName,
                                            }) => (
                                                    <h1 key={id}>
                                                        {firstName}
                                                        &nbsp;
                                                        {lastName}
                                                        <button
                                                            onClick={() => deletePerson({
                                                                variables: {
                                                                    nodeId
                                                                }
                                                            })}
                                                        >
                                                            DELETE
                                                            </button>
                                                    </h1>
                                                ))}
                                        </div>
                                    )}
                                </Mutation>
                            )}
                    </Query>
                    <Mutation
                        mutation={gql`mutation CreatePerson(
                            $firstName:String,
                            $lastName:String
                        ){
                            createPerson(
                                input:{
                                    person:{
                                        firstName:$firstName
                                        lastName:$lastName
                                    }
                                }
                            ){
                                person{
                                    nodeId
                                    id
                                    firstName
                                    lastName
                                }
                            }
                        }`}
                        variables={{
                            firstName,
                            lastName
                        }}
                        update={(cache, {
                            data: {
                                createPerson: {
                                    person
                                }
                            }
                        }) => {
                            const { allPeople } = cache.readQuery({ query });
                            cache.writeQuery({
                                query,
                                data: {
                                    allPeople: {
                                        ...allPeople,
                                        nodes: [...allPeople.nodes, person]
                                    }
                                }
                            });
                        }}
                    // refetchQueries={[{ query }]}
                    >
                        {createPerson => (
                            <div>
                                <input
                                    placeholder="First Name"
                                    value={firstName}
                                    name="firstName"
                                    onChange={handleChange}
                                />
                                <input
                                    placeholder="Last Name"
                                    value={lastName}
                                    name="lastName"
                                    onChange={handleChange}
                                />
                                <button
                                    onClick={() => {
                                        createPerson();
                                        this.setState({
                                            firstName: "",
                                            lastName: "",
                                        });
                                    }}
                                >
                                    CREATE
                                </button>
                            </div>
                        )}
                    </Mutation>
                </div>
                {/* <Classes/> */}
            </ApolloProvider>
        );
    }
}
