import { useEffect, useState } from "react"
import { Button, ModalBody, ModalFooter, ModalHeader, Table } from "reactstrap"
import { getByIdWithHouses } from "../../services/FacilityServices.jsx"
import { Modal } from "reactstrap"
import { addHouse, deleteHouse, editHouse } from "../../services/HousesService.jsx"
import { addHouseToFacility, deleteFacilityHouse } from "../../services/FacilityHousesService.jsx"
import { Link } from "react-router-dom"

export const GreenhouseManagement = ({ currentUser }) => {
    const [houses, setHouses] = useState([])
    const [facility, setFacility] = useState({})
    const [modal, setModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [newHouse, setNewHouse] = useState([])
    const [houseName, setHouseName] = useState("")
    const [houseId, setHouseId] = useState(0)

    const toggle = () => setModal(!modal)
    const toggleEdit = (houseObj) => {
        setHouseName(houseObj.name)
        setNewHouse(houseObj.name)
        setHouseId(houseObj.id)
        setEditModal(!editModal)
    }
    const toggleDelete = (houseObj) => {
        setHouseName(houseObj.name)
        setHouseId(houseObj.id)
        setDeleteModal(!deleteModal)
    }

    const getFacilityHouses = () => {
        getByIdWithHouses(currentUser.facilityId).then(facilityArr => {
            setHouses(facilityArr.houses)
            setFacility(facilityArr)
        })
    }

    const addHouseToTables = () => {
        let house = {
            name: newHouse
        }
        addHouse(house).then(res => {
            let facilityHouse = {
                houseId: res,
                facilityId: facility.id
            }

            addHouseToFacility(facilityHouse).then(() => {
                toggle()
                setNewHouse([])
                getFacilityHouses()
            })
        })
    }

    const handleEditHouseSubmit = (house) => {
        editHouse(house).then(() => {
            setNewHouse([])
            getFacilityHouses()
            toggleEdit({name: null, id: 0})
        })
    }

    const handleDeleteHouse = (houseId) => {
        deleteFacilityHouse(houseId).then(() => {
            deleteHouse(houseId)
        }).then(() => {
            setHouseName("")
            getFacilityHouses()
            toggleDelete({name: null, id: 0})
        })
    }

    useEffect(() => {
        getFacilityHouses()
    }, [currentUser])

    if (!houses) {
        return (<h1>Loading</h1>)
    }
    
    return (
        <>
            <h1>{facility.name} Houses</h1>
            <Table>
                <thead>
                    <tr>
                        <th>
                            Name
                        </th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {houses.map(house => {
                        return (
                            <tr value={house.id}>
                                <td><Link to={{pathname: `/greenhouseManagement/${house.id}`, state: { house: house}}}>{house.name}</Link></td>
                                <td>
                                    <button onClick={() => toggleEdit(house)}><i className="fa-regular fa-pen-to-square"></i></button>
                                    <Modal isOpen={editModal} toggle={() => toggleEdit(house)}>
                                        <ModalHeader toggle={() => toggleEdit("")}>Edit {houseName}</ModalHeader>
                                        <ModalBody>
                                            <fieldset>
                                                <input
                                                    type="text"
                                                    value={newHouse}
                                                    onChange={(e) => setNewHouse(e.target.value)}
                                                    placeholder="House Name"
                                                />
                                            </fieldset>
                                        </ModalBody>
                                        <ModalFooter>
                                        <Button color="primary" onClick={() => {
                                            let houseObject = {
                                                id: houseId,
                                                name: newHouse
                                            }
                                            handleEditHouseSubmit(houseObject)
                                        }}>
                                            Submit Edit
                                        </Button>
                                        <Button color="secondary" onClick={() => toggleEdit("")}>
                                            Cancel
                                        </Button>
                                        </ModalFooter>
                                    </Modal>
                                </td>
                                <td>
                                    <button onClick={() => toggleDelete(house)}><i className="fa-solid fa-trash" /></button>
                                    <Modal isOpen={deleteModal} toggle={() => toggleDelete(house)}>
                                        <ModalHeader toggle={() => toggleDelete("")}>Delete {houseName}</ModalHeader>
                                        <ModalBody>
                                            <div>
                                                Are you sure you want to delete {houseName}?
                                            </div>
                                        </ModalBody>
                                        <ModalFooter>
                                        <Button color="danger" onClick={() => {
                                            handleDeleteHouse(houseId)
                                        }}>
                                            Confirm Delete
                                        </Button>
                                        <Button color="secondary" onClick={() => toggleDelete("")}>
                                            Cancel
                                        </Button>
                                        </ModalFooter>
                                    </Modal>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <div>
                <Button color="" onClick={toggle}>
                    Add New House
                </Button>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>New House</ModalHeader>
                    <ModalBody>
                        <fieldset>
                            <input
                                type="text"
                                value={newHouse}
                                onChange={(e) => setNewHouse(e.target.value)}
                                placeholder="House Name"
                            />
                        </fieldset>
                    </ModalBody>
                    <ModalFooter>
                    <Button color="primary" onClick={() => addHouseToTables()}>
                        Add
                    </Button>
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                    </ModalFooter>
                </Modal>
            </div>
        </>
    )
}