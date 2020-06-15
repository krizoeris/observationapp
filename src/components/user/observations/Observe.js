import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft, faPencilAlt, faTrashAlt, faPlusCircle, faSave } from '@fortawesome/free-solid-svg-icons'
import { NotificationManager, NotificationContainer } from 'react-notifications';
import {    
    Container, Card, CardBody, Button, Row, Col, Input, Label, FormFeedback, Table
} from 'reactstrap';

// Local
import './Observations.css'

// Shared
import { ReactComponent as LoadingAnimation} from '../../../shared/images/spinGray.svg'

const checkParam = (val) => {
    try {
        return btoa(atob(val)) == val;
    } catch (err) {
        return false;
    }
}

const Observe = () => {
    const [form, setForm] = useState([])
    const [ratings, setRatings] = useState([])
    const [responses, setResponses] = useState([])

    let { id } = useParams();
    let history = useHistory()
    let data = (checkParam(id)) && JSON.parse(atob(id))

    const getFormData = async () => {
        let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/forms/details/${data.form_id}`, {
            headers: {'Authorization': 'Bearer '.concat(sessionStorage.getItem('token'))}
        })

        response = await response.json()
        response = response.data

        setResponses(response.questions.map(q => {
            return { question_id: q.id, response: 0 }
        }))

        setForm(response)
    }

    const getRatingsData = async () => {
        let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/ratings`, {
            headers: {'Authorization': 'Bearer '.concat(sessionStorage.getItem('token'))}
        })
        response = await response.json()

        if(response.success) {
            setRatings(response.data)
        }
    }

    const handleRespond = (qid, rid) => {
        let newResponse = responses
        newResponse[newResponse.findIndex(r => r.question_id === qid)].response = rid
        console.log(newResponse)
        setResponses(newResponse)
    }
    
    useEffect(() => {
        if(data) {
            if(data.form_id && data.teacher_id && data.subject_id && data.grade_id) {
                
            } else {
                history.push(`/observations`)
            }
        } else {
            history.push(`/observations`)
        }    

        getFormData()
        getRatingsData()
    }, [])

    console.log(responses)

    return (
        <div className="mb-4">
            <div className="bg-main p-2 d-flex">
                <Link to="/observations" className="m-2 text-light"><FontAwesomeIcon icon={faArrowAltCircleLeft} /> <strong>Go Back</strong></Link>
            </div>
            <Container>
                <div className="mt-4 mb-2">
                    <h3>{form.title}</h3>
                    <p>{form.description}</p>
                </div>

                {form.questions &&
                form.questions.map(question =>
                    <Card className="shadow-sm border-0 mb-2">
                        <CardBody>
                            <strong>{`${question.order}.) ${question.title}`}</strong>
                            <Table size="sm" className="mt-4" bordered>
                                {(question.type === 'rubric') &&
                                    <tbody>
                                        <tr>
                                            {ratings.map(rating => 
                                                <th width={`${100/ratings.length}%`}>
                                                    {rating.name}
                                                </th>
                                            )}
                                        </tr>
                                        <tr>
                                            {ratings.map(rating => 
                                                <td className="p-0">
                                                    <div className={(responses[responses.findIndex(r => r.question_id === question.id)].response === rating.id) && `ob-check`}>
                                                        <Label for={question.attributes[question.attributes.findIndex(attr => attr.rating_id === rating.id)].id} className="h-100">
                                                            <input type="radio" id={question.attributes[question.attributes.findIndex(attr => attr.rating_id === rating.id)].id} 
                                                                name={question.id} value={rating.id} onChange={() => handleRespond(question.id, rating.id)} />
                                                            {question.attributes[question.attributes.findIndex(attr => attr.rating_id === rating.id)].description}
                                                        </Label>
                                                    </div>
                                                </td>
                                            )}
                                        </tr>
                                    </tbody>
                                }
                            </Table>
                        </CardBody>
                    </Card>
                )}
            </Container>
        
        </div>
    )
}

export default Observe
