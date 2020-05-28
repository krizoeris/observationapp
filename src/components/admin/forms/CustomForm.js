// Dependencies
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft, faPencilAlt, faTrashAlt, faPlusCircle, faSave } from '@fortawesome/free-solid-svg-icons'
import { NotificationManager, NotificationContainer } from 'react-notifications';
import {    
    Container, Card, CardBody, Button, Row, Col, Input, Label, FormFeedback
} from 'reactstrap';

// Shared
import Table from '../../../shared/components/Table'
import Modal from '../../../shared/components/ModalAction'
import { ReactComponent as LoadingAnimation} from '../../../shared/images/spinGray.svg'

// Local
import QuestionForm from './QuestionForm'
import QuestionDelete from './QuestionDelete'

const CustomForm = ({match}) => {
    const [loading, setLoading] = useState(false)
    const [formInput, setFormInput] = useState([])
    const [ratings, setRatings] = useState({
        ratings: [],
        ratingsTable: []
    })

    const [errors, setErrors] = useState({
        titleError: "", 
    })
    
    const [editQuestion, setEditQuestion] = useState({
        id: 0,
        index: 0
    })
    const [modal, setModalOpen] = useState(false)
    const [modalDelete, setModalDelete] = useState({
        open: false,
        id: 0,
        title: '',
    })

    const toggleModalDelete = (id = 0, title = '') => {
        setModalDelete({
            open: !modalDelete.open,
            id: id,
            title: title,
        })
    }
    const toggleModal = () => setModalOpen(!modal)

    const toggleEditQuestion = (id, index) => {
        if(id === 0) {
            let qChanged = formInput.questions
            qChanged[index] = {
                ...qChanged[index],
                title: editQuestion.edit.title,
                type: editQuestion.edit.type,
                order: editQuestion.edit.order,
                attributes: (editQuestion.edit.attributes) ? editQuestion.edit.attributes : [],
            }
            setFormInput({...formInput, questions: qChanged})
            setEditQuestion({
                id: 0,
                index: 0,
            })
        } else {
            let qEdit = formInput.questions[index]
            let attr = []
            
            attr = qEdit.type === 'rubric' && ratings.ratings.map(r => {
                if(qEdit.attributes[qEdit.attributes.findIndex(qa => qa.rating_id === r.id)]) {
                    return {
                        ...qEdit.attributes[qEdit.attributes.findIndex(qa => qa.rating_id === r.id)],
                        id: qEdit.attributes[qEdit.attributes.findIndex(qa => qa.rating_id === r.id)]['id'],
                        description: qEdit.attributes[qEdit.attributes.findIndex(qa => qa.rating_id === r.id)]['description']
                    }
                } 
            })

            setEditQuestion({
                id: id,
                index: index,
                edit: {
                    title: qEdit.title,
                    type: qEdit.type,
                    order: qEdit.order,
                    attributes: attr
                }
            })
        }
    }

    const getFormData = async () => {
        let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/forms/details/${match.params.id}`, {
            headers: {'Authorization': 'Bearer '.concat(sessionStorage.getItem('token'))}
        })
        response = await response.json()

        if(response.success) {
            setFormInput(response.data)
        }
    }

    const getRatingsData = async () => {
        let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/ratings`, {
            headers: {'Authorization': 'Bearer '.concat(sessionStorage.getItem('token'))}
        })
        response = await response.json()

        if(response.success) {
            setRatings({
                ratings: response.data,
                ratingsTable: response.data.map(r => r.name)
            })
        }
    }

    const setQuestionInput = (attr, index, value) => {
        let qChanged = formInput.questions
        qChanged[index][attr] = value

        if(value === 'rubric' && qChanged[index].type === 'rubric' && qChanged[index].attributes.length === 0) {
            let attrInputs = ratings.ratings.map(r => {
                let attr = {
                    question_id: qChanged[index].id,
                    rating_id: parseInt(r.id),
                    description: ''
                }
                return attr
            })

            qChanged[index].attributes = attrInputs
        }

        setFormInput({...formInput, questions: qChanged})
    }

    const setAttributeInput = (qIndex, id, value) => {
        let qChanged = formInput.questions
        let aIndex = qChanged[qIndex].attributes.findIndex(qa => qa.rating_id === id)
        
        qChanged[qIndex].attributes[aIndex].description = value
        
        setFormInput({
            ...formInput, 
            questions: qChanged
        })
    }

    const validate = (index) => {
        let titleError = ""

        if(!formInput.questions[index].title) {
            titleError = "Question Title must not be empty"
        }

        if(titleError) {
            setErrors({
                titleError: titleError,
            })
            return false
        } else {
            setErrors({
                titleError: "",
            })
            return true
        }
    }

    const handleUpdate = async () => {
        setLoading(true)
        if(validate(editQuestion.index)) {
            let qEdit = formInput.questions[editQuestion.index]
            let data = {
                id: qEdit.id,
                form_id: parseInt(formInput.id),
                title: qEdit.title,
                type: qEdit.type,
                order: qEdit.order
            }

            // Order
            if(parseInt(qEdit.order) !== parseInt(editQuestion.edit.order)) {
                let qNewIndex = formInput.questions.findIndex(q => q.order === parseInt(qEdit.order) && editQuestion.id !== q.id)
                let qFiltered = (qEdit.order > editQuestion.edit.order)
                                ? formInput.questions.filter((q, index) => (editQuestion.index < index && index <= qNewIndex))
                                : formInput.questions.filter((q, index) => (editQuestion.index > index && index >= qNewIndex))
                
                let request = qFiltered.map(q => {
                    return {
                        id: q.id,
                        title: q.title,
                        order: (qEdit.order > editQuestion.edit.order) ? parseInt(q.order)-1 : parseInt(q.order)+1
                    }
                })

                //console.log('Questions to update: ', request)

                await fetch(process.env.REACT_APP_BACKEND_URL+'/questions/bulk', {
                    method: 'PUT',
                    headers: {
                        "Content-type": "application/json",
                        'Authorization': 'Bearer '.concat(sessionStorage.getItem('token'))
                    },
                    body: JSON.stringify(request)
                })
            }

            // Type
            if(qEdit.type !== editQuestion.edit.type) {
                if(qEdit.type === 'rubric') {
                    // console.log('Edit Attributes: ', qEdit.attributes)

                    await fetch(process.env.REACT_APP_BACKEND_URL+'/attributes/bulk', {
                        method: 'POST',
                        headers: {
                            "Content-type": "application/json",
                            'Authorization': 'Bearer '.concat(sessionStorage.getItem('token'))
                        },
                        body: JSON.stringify(qEdit.attributes)
                    })
                }

                if(qEdit.type === 'rating') {
                    let attrInput = []
                    qEdit.attributes.map(attr => {
                        attrInput.push(attr.id)
                    })

                    // console.log(attrInput)

                    await fetch(process.env.REACT_APP_BACKEND_URL+'/attributes', {
                        method: 'DELETE',
                        headers: {
                            "Content-type": "application/json",
                            'Authorization': 'Bearer '.concat(sessionStorage.getItem('token'))
                        },
                        body: JSON.stringify({
                            id: attrInput
                        })
                    })
                }
            }

            const updateAttributes = await fetch(process.env.REACT_APP_BACKEND_URL+'/attributes/bulk', {
                method: 'PUT',
                headers: {
                    "Content-type": "application/json",
                    'Authorization': 'Bearer '.concat(sessionStorage.getItem('token'))
                },
                body: JSON.stringify(qEdit.attributes)
            })
    
            const updateQuestion = await fetch(process.env.REACT_APP_BACKEND_URL+'/questions', {
                method: 'PUT',
                headers: {
                    "Content-type": "application/json",
                    'Authorization': 'Bearer '.concat(sessionStorage.getItem('token'))
                },
                body: JSON.stringify(data)
            })
            
            const qResponse = await updateQuestion.json()
            const aResponse = await updateAttributes.json()

            if(qResponse.success && aResponse.success) {
                NotificationManager.success(`${data.title}`, 'Successfully Edited Question');
                setEditQuestion({
                    id: 0,
                    index: 0,
                })
                getFormData()
                setLoading(false)
            }

        } else {
            setLoading(false)
        }
    }

    useEffect(() => {
        getFormData()
        getRatingsData()
    }, [])

    return (
        <div className="mb-4">
            <div className="bg-white p-2 d-flex">
                <Link to="/admin/forms" className="m-2 text-success"><FontAwesomeIcon icon={faArrowAltCircleLeft} /> <strong>Go Back</strong></Link>
                <Container style={{maxWidth: '1240px'}}>
                    <Button color="success" onClick={toggleModal}><FontAwesomeIcon icon={faPlusCircle} /> Add Question</Button>
                </Container>
            </div>

            <Container>
                <div className="mt-4 mb-2">
                    <h3>{formInput.title}</h3>
                    <p>{formInput.description}</p>
                </div>

                {formInput.questions &&
                formInput.questions.map((q, index) =>
                    <Card className="shadow-sm border-0 mb-2">
                        <CardBody>
                            <strong>Question</strong>
                            <Input  type="text" value={q.title} disabled={editQuestion.id!==q.id}
                                    onChange={e => setQuestionInput('title', index, e.target.value)}
                                    invalid={(!errors.titleError || editQuestion.id!==q.id) ? false : true} />
                            <FormFeedback>{errors.titleError}</FormFeedback>
                            <Table class="table-bordered table-sm mt-4" columns={ratings.ratingsTable} width={`${100/ratings.ratings.length}%`}>
                                {(q.type === 'rubric') &&
                                    <tr>
                                        {ratings.ratings.map((r, aIndex) => 
                                            <td>
                                                <Input  type="textarea" size="sm"
                                                        className="p-1" rows="5"
                                                        disabled={editQuestion.id!==q.id}
                                                        onChange={e => setAttributeInput(index, r.id, e.target.value)}
                                                        value={(q.attributes[q.attributes.findIndex(qa => qa.rating_id === r.id)]) && q.attributes[q.attributes.findIndex(qa => qa.rating_id === r.id)].description}
                                                />
                                            </td>
                                        )}
                                    </tr>
                                }
                            </Table>
                            <hr />
                            <div className="d-flex justify-content-between">
                                <div>
                                    <div className="d-inline mr-2">
                                        <strong className="d-inline mr-1">Order</strong>
                                        <Input  className="d-inline form-control-sm" type="select" 
                                                value={q.order} onChange={e => setQuestionInput('order', index, e.target.value)} 
                                                disabled={editQuestion.id!==q.id} style={{width: "80px"}}>
                                            {formInput.questions.map((q, index) => 
                                                <option>{index+1}</option>
                                            )}
                                        </Input>
                                    </div>
                                    <div className="d-inline">
                                        <strong className="d-inline mr-1">Type</strong>
                                        <Input  className="d-inline form-control-sm" type="select" 
                                                value={q.type} onChange={e => setQuestionInput('type', index, e.target.value)} 
                                                disabled={editQuestion.id!==q.id} style={{width: "100px"}}>
                                            <option value='rubric'>Rubric</option>
                                            <option value='rating'>Rating</option>
                                        </Input>
                                    </div>
                                </div>
                                    {editQuestion.id === q.id &&
                                        <div>
                                            <Button color="light" onClick={() => toggleEditQuestion(0, index)} className="btn-sm ml-2 mt-1 action" >
                                                Cancel
                                            </Button>
                                            <Button color="warning" onClick={handleUpdate} className="btn-sm ml-1 mt-1 action" >
                                                <FontAwesomeIcon icon={faSave} /> Save
                                            </Button>
                                        </div>
                                    }
                                    {editQuestion.id !== q.id &&
                                        <div>
                                            <Button color="light" onClick={() => {toggleModalDelete(q.id, q.title)} } className="btn-sm ml-2 mt-1 text-danger action" >
                                                <FontAwesomeIcon icon={faTrashAlt} /> Delete
                                            </Button>
                                            <Button color="light" onClick={() => toggleEditQuestion(q.id, index)} className="btn-sm ml-1 mt-1 action" >
                                                <FontAwesomeIcon icon={faPencilAlt} /> Edit
                                            </Button>
                                        </div>
                                    }
                            </div>
                        </CardBody>
                    </Card>
                )}
                
                <Modal modal={modal} toggle={toggleModal} title='Add new Question' size='lg'>
                    <QuestionForm   questions={formInput.questions} ratings={ratings.ratings} ratingsTable={ratings.ratingsTable}
                                    formId={formInput.id} toggle={toggleModal} loadQuestion={getFormData} />
                </Modal>

                <Modal modal={modalDelete.open} toggle={toggleModalDelete} title={'Delete Question'}>
                    <QuestionDelete toggle={toggleModalDelete} questions={formInput.questions}
                                    title={modalDelete.title} id={modalDelete.id}
                                    loadQuestion={getFormData} />
                </Modal>
            </Container>
            <NotificationContainer />
        </div>
    )
}

export default CustomForm
