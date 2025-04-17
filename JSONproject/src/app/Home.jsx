import React, { Suspense } from 'react';
import Header from '../components/Header.jsx';
import * as Tabs from '@radix-ui/react-tabs';
import PostContainer from '../components/PostContainer.jsx';
import UsersContainer from '../components/UsersContainer.jsx';
import { Toaster } from 'react-hot-toast';

export default function Home() {
    return (
        <main className='main-container'>
            <Header />
            <Tabs.Root defaultValue='posts' className='tabs-root'>
                <Tabs.List className='tabs-list'>
                    <Tabs.Trigger value='posts' className='tab-content'>Posts</Tabs.Trigger>
                    <Tabs.Trigger value='users' className='tab-content'>Users</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value='posts' className='tabs-content'>
                    <Suspense fallback={<div className='loading'>Loading...</div>}>
                        <PostContainer />
                    </Suspense>
                </Tabs.Content>
                <Tabs.Content value="users" className="tabs-content">
                <Suspense fallback={<div className="loading-container">Loading users...</div>}>
                    <UsersContainer />
                </Suspense>
                </Tabs.Content>  
            </Tabs.Root>
            <Toaster />
        </main>
    )
}