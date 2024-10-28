import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { addBayDivision, deleteBayDivision, editBayDivision, getBayDivisionsByBayId } from "../../services/BayDivisionsService.jsx"
import { getHouseById } from "../../services/HousesService.jsx"
import { getBayById } from "../../services/BayServices.jsx"
import { Button, Card, Modal, ModalBody, ModalFooter, ModalHeader, Table } from "reactstrap"
import './GreenhouseManagement.css'

export const GreenhouseBayDivision = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [bayId, setBayId] = useState(0)
    const [houseId, setHouseId] = useState(0)
    const [bayDivisions, setBayDivisions] = useState([])
    const [houseName, setHouseName] = useState("")
    const [bayName, setBayName] = useState("")
    const [modal, setModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [divisionName, setDivisionName] = useState("")
    const [divisionId, setDivisionId] = useState(0)
    const [title, setTitle] = useState("")

    const { id } = useParams()
    const { bId } = useParams()

    const toggle = () => {
        setDivisionName("")
        setModal(!modal)
    }

    const toggleEdit = (divisionObj) => {
        setDivisionName(divisionObj.name)
        setDivisionId(divisionObj.id)
        setTitle(divisionObj.name)
        setEditModal(!editModal)
    }

    const toggleDelete = (divisionObj) => {
        setDivisionName(divisionObj.name)
        setDivisionId(divisionObj.id)
        setDeleteModal(!deleteModal)
    }

    useEffect(() => {
        setBayId(bId)
        setHouseId(id)
    }, [id, bId])

    useEffect(() => {
        getBayDivisionsList()
        
    }, [bayId])

    useEffect(() => {
        getHouseById(houseId).then(houseObj => {
            setHouseName(houseObj.name)
        }).then(() => {
            getBayById(bayId).then(bayObj => {
                setBayName(bayObj.name)
            })
        })
    }, [houseId, bayId])

    useEffect(() => {
        if (houseName != undefined || bayName != undefined || bayDivisions[0]?.id != undefined) {
            setIsLoading(false)
        }
    }, [bayDivisions, houseName, bayName])

    const getBayDivisionsList = () => {
        getBayDivisionsByBayId(bayId).then(divArr => {
            setBayDivisions(divArr)
        })
    }

    const handleBayDivisionSubmit = () => {
        let bayDivision = {
            name: divisionName,
            bayId: bayId
        }

        addBayDivision(bayDivision).then(() => {
            toggle()
            setDivisionName("")
            getBayDivisionsList()
        })
    }

    const handleEditDivisionSubmit = (divisionObj) => {
        editBayDivision(divisionObj).then(() => {
            toggleEdit({name: null, id: 0})
            getBayDivisionsList()
        })
    }

    const handleDeleteDivision = (divId) => {
        deleteBayDivision(divId).then(() => {
            toggleDelete({name: null, id: 0})
            getBayDivisionsList()
        })
    }

    

    
    

    return isLoading ?
            <h1>Loading</h1>
        :
            <>
                <Card className="cardFix">
                    <h1>{houseName}, {bayName} Divisions </h1>
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
                            {bayDivisions.map(division => {
                                return (
                                    <tr>
                                        <td>{division.name}</td>
                                        <td>
                                            <button onClick={() => toggleEdit(division)}><i className="fa-regular fa-pen-to-square" /></button>
                                            <Modal isOpen={editModal} toggle={() => toggleEdit(division)}>
                                                <ModalHeader toggle={() => toggleEdit("")}>Edit {title}</ModalHeader>
                                                <ModalBody>
                                                    <fieldset>
                                                        <input
                                                            type="text"
                                                            value={divisionName}
                                                            onChange={(e) => setDivisionName(e.target.value)}
                                                            placeholder="House Name"
                                                        />
                                                    </fieldset>
                                                </ModalBody>
                                                <ModalFooter>
                                                <Button color="primary" onClick={() => {
                                                    let divisionObject = {
                                                        id: divisionId,
                                                        name: divisionName,
                                                        bayId: bayId
                                                    }
                                                    handleEditDivisionSubmit(divisionObject)
                                                }}>
                                                    Submit Edit
                                                </Button>
                                                <Button color="secondary" onClick={() => toggleEdit("")}>
                                                    Cancel
                                                </Button>
                                                </ModalFooter>
                                            </Modal>
                                        </td>
                                        <td><button onClick={() => toggleDelete(division)}><i className="fa-solid fa-trash" /></button></td>
                                        <Modal isOpen={deleteModal} toggle={() => toggleDelete(division)}>
                                            <ModalHeader toggle={() => toggleDelete("")}>Delete {divisionName}</ModalHeader>
                                            <ModalBody>
                                                <div>
                                                    Are you sure you want to delete {divisionName}?
                                                </div>
                                            </ModalBody>
                                            <ModalFooter>
                                            <Button color="danger" onClick={() => {
                                                handleDeleteDivision(divisionId)
                                            }}>
                                                Confirm Delete
                                            </Button>
                                            <Button color="secondary" onClick={() => toggleDelete("")}>
                                                Cancel
                                            </Button>
                                            </ModalFooter>
                                        </Modal>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    <div>
                        <Button className="marginSmall greenButton" onClick={() => toggle()}>Add New Division</Button>
                        <Modal isOpen={modal} toggle={toggle}>
                            <ModalHeader toggle={toggle}>New Bay Division</ModalHeader>
                            <ModalBody>
                                <fieldset>
                                    <input
                                        type="text"
                                        value={divisionName}
                                        onChange={(e) => setDivisionName(e.target.value)}
                                        placeholder="Divsion Name"
                                    />
                                </fieldset>
                            </ModalBody>
                            <ModalFooter>
                            <Button color="primary" onClick={() => handleBayDivisionSubmit()}>
                                Add
                            </Button>
                            <Button color="secondary" onClick={toggle}>
                                Cancel
                            </Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                    <Link className="marginSmall" to={`/greenhouseManagement/${houseId}`}>Return To Bays</Link>
                </Card>
            </>
        
}