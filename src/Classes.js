import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export default function Classes() {
    return (
        <Query
            query={gql`{
                allClasses{
                    nodes{
                        nodeId
                        id
                        subjectBySubjectId{
                            nodeId
                            id
                            name
                        }
                        personByTeacherId{
                            nodeId
                            id
                            firstName
                            lastName
                        }
                        enrollmentsByClassId{
                            nodes{
                                personByStudentId{
                                    nodeId
                                    id
                                    firstName
                                    lastName
                                }
                            }
                        }
                    }
                }
            }`}
        >
            {({
                data: {
                    allClasses: {
                        nodes: allClasses = []
                    } = {}
                } = {}
            }) => (
                    <ul>
                        {allClasses.map(({
                            subjectBySubjectId: {
                                name: subject
                            } = {},
                            personByTeacherId: {
                                firstName: teacherFirstName,
                                lastName: teacherLastName
                            } = {},
                            enrollmentsByClassId: {
                                nodes: enrollments = []
                            } = {}
                        }) => (
                                <li>
                                    <h1>Class: {subject}</h1>
                                    <h2>Teacher: {teacherFirstName} {teacherLastName}</h2>
                                    <h3>Students:</h3>
                                    <ol>
                                        {enrollments.map(({
                                            personByStudentId: {
                                                firstName,
                                                lastName,
                                            }
                                        }) => (
                                                <li>
                                                    <h4>{firstName} {lastName}</h4>
                                                </li>
                                            ))}
                                    </ol>
                                </li>
                            ))}
                    </ul>
                )}
        </Query>
    );
}
