// Dependencies
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks, faPencilAlt, faTrash, faArchive } from '@fortawesome/free-solid-svg-icons'
import { 
    Card, CardBody, Container,
    Input, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';

// Shared
import Header from '../../../shared/components/Header'
import Table from '../../../shared/components/Table'

const Grades = () => {
    const grades = [
        {id: 1, name: 'Year 1'},
        {id: 2, name: 'Year 2'},
    ]

    const [dropdownOpen, setOpen] = useState(false)

    const toggle = (id) => (dropdownOpen === id) ? setOpen(false) : setOpen(id) 
    
    return (
        <div className="Grades">
            <Container className="mt-4">
                <Header title="Grades">
                    <button className="btn btn-success mt-2">Add New Grade</button>
                </Header>

                <Card className="shadow-sm border-0">
                    <CardBody className="p-0">
                        <Table class="m-0" columns={['', 'Grade', '']}>
                        <tr class="bg-light">
                            <td width="20px"><input type="checkbox" class="checkTable table-top"/></td>
                            <td class=""><input type="text" class="form-control" placeholder="Filter grade" /></td>
                            <td width="20px"></td>
                        </tr>
                        {grades.map(grade => 
                            <tr>
                                <td class="pt-3"><input type="checkbox" class="checkTable" /></td>
                                <td class="pt-3">{grade.name}</td>
                                <td>
                                    <ButtonDropdown isOpen={dropdownOpen === grade.id} toggle={() => toggle(grade.id)}>
                                        <DropdownToggle className="btn-light btn-sm action" caret>
                                            <FontAwesomeIcon icon={faTasks} /> Action
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem><FontAwesomeIcon icon={faPencilAlt} /> Edit</DropdownItem>
                                            <DropdownItem><FontAwesomeIcon icon={faTrash} /> Delete</DropdownItem>
                                            <DropdownItem divider />
                                            <DropdownItem><FontAwesomeIcon icon={faArchive} /> Archive</DropdownItem>
                                        </DropdownMenu>
                                    </ButtonDropdown>
                                </td>
                            </tr>
                        )}
                    </Table>
                    </CardBody>
                </Card>
            </Container>
        </div>
    )
}

export default Grades
