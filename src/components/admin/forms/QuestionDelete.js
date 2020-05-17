import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle, faTrash } from '@fortawesome/free-solid-svg-icons'
import { NotificationManager } from 'react-notifications';
import { Button } from 'reactstrap';

const QuestionDelete = ({id, questions, toggle, title, loadQuestion}) => {
    const deleteQuestionData = async () => {
        let qIndex = questions.findIndex(q => q.id === id)
        
        if(qIndex.order !== questions.length) {
            let qFiltered = questions.filter((q, index) => index > qIndex)

            let request = qFiltered.map(q => {
                return {
                    id: q.id,
                    order: q.order-1
                }
            })
            
            await fetch(process.env.REACT_APP_BACKEND_URL+'/questions/bulk', {
                method: 'PUT',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(request)
            })
        }
        
        const deleteQuestion = await fetch(`${process.env.REACT_APP_BACKEND_URL}/questions`, {
            method: 'DELETE',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                id: id
            })
        })
        const response = await deleteQuestion.json()
        
        if(response.success) {
            NotificationManager.warning(`${title}`, 'Successfully Deleted!');
            loadQuestion()
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
                <Button className="mr-1 ml-1" onClick={deleteQuestionData} color="danger"><FontAwesomeIcon icon={faTrash} /> Delete</Button>
                <Button className="mr-1 ml-1" onClick={() => toggle()} color="secondary">Cancel</Button>
            </div>
        </div>
    )
}

export default QuestionDelete
