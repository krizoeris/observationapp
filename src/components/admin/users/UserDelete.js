import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle, faTrash } from '@fortawesome/free-solid-svg-icons'
import { NotificationManager } from 'react-notifications';
import { Button } from 'reactstrap';

const UserDelete = ({id, toggle, fname, lname, loadUser}) => {
    const deleteUserData = async () => {
        const deleteUser = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, {
            method: 'DELETE',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                id: id
            })
        })
        const response = await deleteUser.json()
        
        if(response.success) {
            NotificationManager.warning(`${fname} ${lname}`, 'Successfully Deleted!');
            loadUser()
            toggle()
        } else {
            NotificationManager.error('There has been a problem deleting', 'Error');
            toggle()
        }
    }

    return (
        <div>
            <p className="text-center"><FontAwesomeIcon icon={faExclamationTriangle} /> Are you sure you want to delete <strong>{fname} {lname}</strong>?</p>
            <div className="d-flex justify-content-center mt-2">
                <Button className="mr-1 ml-1" onClick={deleteUserData} color="danger"><FontAwesomeIcon icon={faTrash} /> Delete</Button>
                <Button className="mr-1 ml-1" onClick={() => toggle()} color="secondary">Cancel</Button>
            </div>
        </div>
    )
}

export default UserDelete
