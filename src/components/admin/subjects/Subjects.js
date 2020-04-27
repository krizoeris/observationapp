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

const Subjects = () => {
    const subjects = [
        {id: 1, name: 'Maths', observer: 2, facilitator: 1, teacher: 15},
        {id: 2, name: 'Maths', observer: 2, facilitator: 1, teacher: 15}
    ]

    const [dropdownOpen, setOpen] = useState(false)

    const toggle = (id) => (dropdownOpen === id) ? setOpen(false) : setOpen(id) 

    return (
        <div className="Subjects">
            <Container className="mt-4">
                <Header title="Subjects">
                    <button className="btn btn-success mt-2">Add New Subject</button>
                </Header>

                <Card className="shadow-sm border-0">
                    <CardBody className="p-0">
                        <Table class="m-0" columns={['', 'Subject', '', '', '', '']}>
                        <tr class="bg-light">
                            <td width="20px"><input type="checkbox" class="checkTable table-top"/></td>
                            <td colspan="4" class=""><input type="text" class="form-control" placeholder="Filter subject" /></td>
                            <td width="20px"></td>
                        </tr>
                        {subjects.map(subject => 
                            <tr>
                                <td class="pt-3"><input type="checkbox" class="checkTable" /></td>
                                <td class="pt-3">{subject.name}</td>
                                <td class="pt-3"><strong>{subject.observer}</strong> Observer</td>
                                <td class="pt-3"><strong>{subject.facilitator}</strong> Facilitator</td>
                                <td class="pt-3"><strong>{subject.teacher}</strong> Teacher</td>
                                <td>
                                    <ButtonDropdown isOpen={dropdownOpen === subject.id} toggle={() => toggle(subject.id)}>
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

export default Subjects
