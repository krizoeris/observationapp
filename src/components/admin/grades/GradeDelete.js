import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle, faTrash } from '@fortawesome/free-solid-svg-icons'
import { NotificationManager } from 'react-notifications';
import { Button } from 'reactstrap';

const GradeDelete = ({id, toggle, name, loadGrades}) => {
    const deleteGradeData = async () => {
        const deleteGrade = await fetch(`${process.env.REACT_APP_BACKEND_URL}/grades`, {
            method: 'DELETE',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                id: id
            })
        })
        const response = await deleteGrade.json()
        
        if(response.success) {
            NotificationManager.warning(`${name}`, 'Successfully Deleted!');
            loadGrades()
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
                <Button className="mr-1 ml-1" onClick={deleteGradeData} color="danger"><FontAwesomeIcon icon={faTrash} /> Delete</Button>
                <Button className="mr-1 ml-1" onClick={() => toggle()} color="secondary">Cancel</Button>
            </div>
        </div>
    )
}

export default GradeDelete
