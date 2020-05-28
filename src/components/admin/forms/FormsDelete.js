import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle, faTrash } from '@fortawesome/free-solid-svg-icons'
import { NotificationManager } from 'react-notifications';
import { Button } from 'reactstrap';

const FormsDelete = ({id, toggle, title, loadForms}) => {
    const deleteFormData = async () => {
        const deleteForm = await fetch(`${process.env.REACT_APP_BACKEND_URL}/forms`, {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json",
                'Authorization': 'Bearer '.concat(sessionStorage.getItem('token'))
            },
            body: JSON.stringify({
                id: id
            })
        })
        const response = await deleteForm.json()
        
        if(response.success) {
            NotificationManager.warning(`${title}`, 'Successfully Deleted!');
            loadForms()
            toggle()
        } else {
            NotificationManager.error('There has been a problem deleting', 'Error');
            toggle()
        }
    }

    return (
        <div>
            <p className="text-center"><FontAwesomeIcon icon={faExclamationTriangle} /> Are you sure you want to delete <strong>{title}</strong>?</p>
            <div className="d-flex justify-content-center mt-2">
                <Button className="mr-1 ml-1" onClick={deleteFormData} color="danger"><FontAwesomeIcon icon={faTrash} /> Delete</Button>
                <Button className="mr-1 ml-1" onClick={() => toggle()} color="secondary">Cancel</Button>
            </div>
        </div>
    )
}

export default FormsDelete
