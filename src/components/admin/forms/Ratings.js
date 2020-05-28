// Dependencies
import React, { useState, useEffect } from 'react';
import {NotificationManager} from 'react-notifications';
import { Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faPlus, faTimes, faPencilAlt } from '@fortawesome/free-solid-svg-icons'

// Shared
import Table from '../../../shared/components/Table'
import { ReactComponent as LoadingAnimation} from '../../../shared/images/spinGray.svg'

const Ratings = () => {
    const [ratings, setRatings] = useState([])
    const [loading, setLoading] = useState(true)
    const [input, setInput] = useState({
        name: '',
        score: '',
    })
    const [actions, setActions] = useState({
        add: [],
        update: [],
        delete: [],
    })

    const getRatings = async () => {
        let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/ratings`, {
                            headers: { 'Authorization': 'Bearer '.concat(sessionStorage.getItem('token')) }
                        })
        response = await response.json()
        response = await response.data
        
        setRatings(response)
        setLoading(false)
    }

    const toggleRating = (id, action) => {
        if(action === 'delete') {
            setActions({...actions, delete: [...actions.delete, id]})
            setRatings(ratings.filter(r => r.id !== id))
        }

        if(action === 'edit' && !actions.update.includes(id)) {
            setActions({...actions, update: [...actions.update, id]})
        }
    }

    const handleUpdate = (value, index, attr) => {
        ratings[index][attr] = (attr === 'score') ? parseInt(value) : value
        setRatings([...ratings])
    }

    const handleAdd = () => {
        if(input.name !== '' && input.score !== '') {
            let newRating = {
                name: input.name,
                score: parseInt(input.score)
            }
            setRatings([...ratings, newRating])
            setActions({...actions, add: [...actions.add, newRating]})
            setInput({ name: '', score: '' })
        }
    }

    const handleSave = async () => {
        let changed = false
        let addRating = actions.add
        let updateRating = []
        let deleteRating = {
            id: actions.delete
        }

        setLoading(true)

        actions.update.map(u => {
            if(!actions.delete.includes(u)) {
                let rating = ratings[ratings.findIndex(r => r.id === u)]
                updateRating.push(rating)
            }
        })

        if(addRating.length > 0) {
            let request = await fetch(`${process.env.REACT_APP_BACKEND_URL}/ratings/bulk`, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json",
                    'Authorization': 'Bearer '.concat(sessionStorage.getItem('token'))
                },
                body: JSON.stringify(addRating)
            })

            let response = await request.json()

            if(response.success) {
                NotificationManager.success(`Successfully added ${addRating.length} ratings`);
                changed = true
            }
        }
        if(updateRating.length > 0) {
            let request = await fetch(`${process.env.REACT_APP_BACKEND_URL}/ratings/bulk`, {
                method: 'PUT',
                headers: {
                    "Content-type": "application/json",
                    'Authorization': 'Bearer '.concat(sessionStorage.getItem('token'))
                },
                body: JSON.stringify(updateRating)
            })

            let response = await request.json()

            if(response.success) {
                NotificationManager.success(`Successfully updated ${updateRating.length} ratings`);
                changed = true
            }
        }
        if(deleteRating.id.length > 0) {
            let request = await fetch(`${process.env.REACT_APP_BACKEND_URL}/ratings`, {
                method: 'DELETE',
                headers: {
                    "Content-type": "application/json",
                    'Authorization': 'Bearer '.concat(sessionStorage.getItem('token'))
                },
                body: JSON.stringify(deleteRating)
            })

            let response = await request.json()

            console.log(response)

            if(response.success) {
                NotificationManager.warning(`Successfully deleted ${deleteRating.id.length} ratings`);
                changed = true
            }
        }

        if(changed) {
            setLoading(false)
            setActions({
                add: [],
                update: [],
                delete: []
            })
        } else {
            setLoading(false)
            NotificationManager.error('Nothing has saved');
        }
    }

    useEffect(() => {
        getRatings()
    }, [])

    return (
        <div>
            <div class="d-flex justify-content-between mb-2">
                <h5>Ratings</h5>
            </div>
            {!loading && 
            <Table class="table-bordered table-sm" columns={['Name', 'Score', '']}>
                {ratings.map((rating, index) => 
                    <tr>
                        <td>
                            <Input  type="text" value={rating.name} 
                                    disabled={(actions.update.includes(rating.id)) ? false : true} 
                                    onChange={e => handleUpdate(e.target.value, index, 'name')}         
                            />
                        </td>
                        <td>
                            <Input  type="number" value={rating.score} 
                                    disabled={(actions.update.includes(rating.id)) ? false : true}  
                                    onChange={e => handleUpdate(e.target.value, index, 'score')}   
                            />
                        </td>
                        <td width="86px">
                            <Button color="light" className="btn-sm ml-1 mt-1 action" onClick={() => toggleRating(rating.id, 'edit')} >
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </Button>
                            <Button color="light" className="btn-sm ml-2 mt-1 text-danger action" onClick={() => toggleRating(rating.id, 'delete')} >
                                <FontAwesomeIcon icon={faTimes} />
                            </Button>
                        </td>
                    </tr>
                )}
                    <tr>
                        <td>
                            <Input type="text" value={input.name} onChange={e => setInput({...input, name: e.target.value})} />
                        </td>
                        <td>
                            <Input type="number" value={input.score} onChange={e => setInput({...input, score: e.target.value})} />
                        </td>
                        <td>
                            <Button color="success" className="btn-sm ml-2 mt-1" onClick={handleAdd}><FontAwesomeIcon icon={faPlus} /></Button>
                        </td>
                    </tr>
                </Table> }
            {!loading && <Button color="warning" className=" mt-2 action" onClick={handleSave}> <FontAwesomeIcon icon={faSave} /> Save</Button> }
            {loading && 
                    <div height="300" width>
                        <center><LoadingAnimation style={{margin: '150 auto', height: 55, width: 55 }} /></center>
                    </div>
            }
        </div>
    )
}

export default Ratings
