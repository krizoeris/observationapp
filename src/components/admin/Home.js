import React, { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { NotificationContainer, NotificationManager } from 'react-notifications';

const Home = () => {

    let history = useHistory()
    let location = useLocation()

    useEffect(() => {
        console.log(location)
        if(location.state) {
            NotificationManager.success(location.state.message);
            history.replace({ ...history.location, state: undefined });
        }
    }, [location])

    return (
        <div className="Home container mt-4">
            <h1>Home</h1>
            <NotificationContainer />
        </div>
        
    )
}

export default Home
