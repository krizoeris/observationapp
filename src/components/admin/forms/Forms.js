// Dependencies
import React from 'react'

// Shared
import Header from '../../../shared/components/Header'
import Table from '../../../shared/components/Table'
import Tab from '../../../shared/components/Tab'
import TabPane from '../../../shared/components/TabPane'

const Forms = () => {
    const ratings = [
        {name: 'Outstanding', score: 100},
        {name: 'Very Good', score: 75},
        {name: 'Good', score: 50},
        {name: 'Acceptable', score: 25},
        {name: 'Bad', score: 0},
    ]

    const forms = [
        {title: 'Evidence Gathering: Learning Walk Record Sheet 19-20'},
        {title: 'Evidence Gathering: Lesson Observation Rubric 1 19-20'},
        {title: 'Evidence Gathering: Lesson Observation Rubric 2 19-20'}
    ]

    return (
        <div className="Forms container mt-4">
            <Header title="Forms">
                <button className="btn btn-success mt-2">Create Form</button>
            </Header>

            <Tab tabs={['Forms', 'Ratings']}>
                
                <TabPane active={true} tab="Forms">
                    <Table class="m-0">
                        <tr class="bg-light">
                            <td colspan="2"><input type="text" class="form-control" placeholder="Filter form" /></td>
                        </tr>
                        {forms.map(form => 
                            <tr>
                                <td class="pt-3 pl-4">{form.title}</td>
                                <td width="200px">
                                    <button className="btn btn-success">Open</button> <button className="btn btn-dark">Archive</button> 
                                </td>
                            </tr>
                        )}
                    </Table>
                </TabPane>

                <TabPane tab="Ratings"> 
                    <div class="m-4 w-50">
                        <div class="d-flex justify-content-between mb-2">
                            <h5>Ratings</h5>
                        </div>

                        <Table class="table-bordered table-sm" columns={['Name', 'Score', '']}>
                            {ratings.map(rating => 
                                <tr>
                                    <td>
                                        <input type="text" class="form-control" value={rating.name} />
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" value={rating.score} />
                                    </td>
                                    <td>
                                        <button className="btn btn-danger btn-sm ml-2 mt-1"><i class="fa fa-times"></i></button>
                                    </td>
                                </tr>
                            )}
                                <tr>
                                    <td>
                                        <input type="text" class="form-control" />
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" />
                                    </td>
                                    <td>
                                        <button className="btn btn-success btn-sm ml-2 mt-1"><i class="fa fa-plus"></i></button>
                                    </td>
                                </tr>
                        </Table>

                        <button className="btn btn-warning">Save</button>
                    </div>
                </TabPane>
            </Tab>
        </div>
    )
}

export default Forms
