'use clint';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Neo4JUser } from '@/types';
import * as React from 'react';
import TinderCard from 'react-tinder-card';
import { neo4jSwipe } from '../neo4j.action';

interface IHomepageClientComponentProps {
    currentUser: Neo4JUser;
    users: Neo4JUser[];
}

const HomepageClientComponent: React.FC<IHomepageClientComponentProps> = ({ currentUser, users }) => {

    const handleSwipe = async (direction: string, userId: string) => {
        const isMatch = await neo4jSwipe(currentUser.applicationId, direction, userId);
        if(isMatch) alert(`Congrats!! It's a match.`)
    }

    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <div className=''>
                <div className='text-center'>
                    <h1 className='text-4xl'>Hello, {currentUser.firstname} {currentUser.lastname}</h1>
                </div>
                <div className='mt-4 relative'>
                    {users.map((user) => (
                        <TinderCard onSwipe={(direction) => { handleSwipe(direction, user.applicationId) }} key={user.applicationId} className='absolute'>
                            <Card>
                                <CardHeader>
                                    <CardTitle>{user.firstname} {user.lastname}</CardTitle>
                                </CardHeader>
                                <CardDescription>{user.email}</CardDescription>
                            </Card>
                        </TinderCard>
                    ))}
                </div>
            </div>
        </div>)
}

export default HomepageClientComponent;