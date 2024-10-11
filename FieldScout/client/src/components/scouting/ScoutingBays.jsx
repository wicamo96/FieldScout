import { useEffect, useState } from "react"
import { getBaysByHouseId } from "../../services/BayServices.jsx"
import { useLocation, useParams } from "react-router-dom"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Table } from "reactstrap"

export const ScoutingBays = ({ currentUser }) => {
    const [baysList, setBaysList] = useState([])
    const [house, setHouse] = useState({})
    const [bayDivisions, setBayDivisions] = useState([])
    const [modal, setModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    
    const location = useLocation()
    const { shId } = useParams()

    const toggle = () => setModal(!modal)

    useEffect(() => {
        getBaysByHouseId(shId).then(baysArr => {
            setBaysList(baysArr)
        })        
    }, [shId])

    useEffect(() => {
        setHouse(location.state.houseObj)
    }, [])

    return !baysList.length ?
        <div>loading</div>
    :
        <>
            <h1>{house.name} Scouting Menu</h1>
            <Table>
                <thead>
                    <tr>
                        <th>Bay</th>
                        <th>Add Data</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {baysList.map(bay => {
                        return (
                            <tr>
                                <td>{bay.name}</td>
                                <td>
                                    <Button color="" onClick={toggle}>
                                        <i className="fa-solid fa-plus" />
                                    </Button>
                                    <Modal isOpen={modal} toggle={toggle}>
                                        <ModalHeader toggle={toggle}>New House</ModalHeader>
                                        <ModalBody>
                                            <fieldset>
                                                <input
                                                    type="text"
                                                    placeholder="House Name"
                                                />
                                            </fieldset>
                                        </ModalBody>
                                        <ModalFooter>
                                        <Button color="primary" onClick={toggle}>
                                            Add
                                        </Button>
                                        <Button color="secondary" onClick={toggle}>
                                            Cancel
                                        </Button>
                                        </ModalFooter>
                                    </Modal>
                                </td>
                                <td><i className="fa-regular fa-pen-to-square" /></td>
                                <td><i className="fa-solid fa-trash" /></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </>
}