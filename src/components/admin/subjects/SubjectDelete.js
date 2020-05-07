import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle, faTrash } from '@fortawesome/free-solid-svg-icons'
import { NotificationManager } from 'react-notifications';
import { Button } from 'reactstrap';

const SubjectDelete = ({id, toggle, name, loadSubjects}) => {
    const deleteSubjectData = async () => {
        const deleteSubject = await fetch(`${process.env.REACT_APP_BACKEND_URL}/subjects`, {
            method: 'DELETE',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                id: id
            })
        })
        const response = await deleteSubject.json()
        
        if(response.success) {
            NotificationManager.warning(`${name}`, 'Successfully Deleted!');
            loadSubjects()
            toggle()
        } else {
            NotificationManager.error('There has been a problem deleting', 'Error');
            toggle()
        }
    }

    return (
        <div>
            <p className="text-center"><FontAwesomeIcon icon={faExclamationTriangle} /> Are you sure you want to delete <strong>{name}</strong>?</p>
            <div className="d-flex justify-content-center mt-2">
                <Button className="mr-1 ml-1" onClick={deleteSubjectData} color="danger"><FontAwesomeIcon icon={faTrash} /> Delete</Button>
                <Button className="mr-1 ml-1" onClick={() => toggle()} color="secondary">Cancel</Button>
            </div>
        </div>
    )
}

export default SubjectDelete
