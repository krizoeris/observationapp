// Dependecies
import React, { useState } from 'react'
import Select from 'react-select'
import { 
    Form, FormGroup, Input, Label, Row, Col, Card,
    TabContent, TabPane, Nav, NavItem, NavLink, 
} from 'reactstrap';
import classnames from 'classnames';

// Shared
import Table from '../../../shared/components/Table'

// Local
import ComponentReport from './ComponentReport.js'
import AnalysisReport from './AnalysisReport.js'

const Reports = () => {
    const [activeTab, setActiveTab] = useState('1');
    const toggleTab = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }

    return (
        <div>
            <div className="Report container mt-4">
                <h3>Reports</h3>
                <Card className="shadow-sm border-0 mt-4 mb-4 p-3">
                    <Form>
                        <Row form>
                            <Col md={2}>
                                <FormGroup>
                                    <Label for="exampleDate">From</Label>
                                    <Input
                                        type="date"
                                        name="date"
                                        id="exampleDate"
                                        placeholder="date placeholder"
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={2}>
                                <FormGroup>
                                    <Label for="exampleDate">To</Label>
                                    <Input
                                    type="date"
                                    name="date"
                                    id="exampleDate"
                                    placeholder="date placeholder"
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="exampleEmail">Form</Label>
                                    <Input type="select" name="select" id="exampleSelect">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="exampleEmail">Subject</Label>
                                    <Select />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row form>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="exampleEmail">Teacher</Label>
                                    <Select />
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="exampleEmail">Observer</Label>
                                    <Select />
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="exampleEmail">Grade</Label>
                                    <Select />
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </Card>

                <br />

                <Nav tabs>
                    <NavItem>
                        <NavLink className={`text-dark ${classnames({ active: activeTab === '1' })}`} onClick={() => { toggleTab('1'); }} href="#" >
                            Component Report
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={`text-dark ${classnames({ active: activeTab === '2' })}`} onClick={() => { toggleTab('2'); }} href="#" >
                            Analysis Report
                        </NavLink>
                    </NavItem>
                </Nav>

                <TabContent activeTab={activeTab} className="border bg-white mb-2">
                    <TabPane tabId="1">
                        <ComponentReport />
                    </TabPane>
                    <TabPane tabId="2">
                        <AnalysisReport />
                    </TabPane>
                </TabContent>
            </div>
        </div>
    )
}

export default Reports
