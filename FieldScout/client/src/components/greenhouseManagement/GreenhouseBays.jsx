import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { addBay, deleteBay, editBay, getBaysByHouseId } from "../../services/BayServices.jsx"
import { getHouseById } from "../../services/HousesService.jsx"
import { Button, Card, Modal, ModalBody, ModalFooter, ModalHeader, Table } from "reactstrap"
import { addBayToHouse, deleteHouseBay } from "../../services/HouseBaysService.jsx"
import './GreenhouseManagement.css'

export const GreenhouseBays = ({ currentUser }) => {
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [bayList, setBayList] = useState([])
    const [house, setHouse] = useState({})
    const [modal, setModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [bayName, setBayName] = useState("")
    const [bayId, setBayId] = useState(0)
    const [title, setTitle] = useState("")

    const navigate = useNavigate()

    const toggle = () => {
        setBayName("")
        setModal(!modal)
    }
    
    const toggleEdit = (bayObj) => {
        setBayName(bayObj.name)
        setTitle(bayObj.name)
        setBayId(bayObj.id)
        setEditModal(!editModal)
    }
    
    const toggleDelete = (bayObj) => {
        setBayName(bayObj.name)
        setBayId(bayObj.id)
        setDeleteModal(!deleteModal)
    }

    const getBaysList = () => {
        getBaysByHouseId(id).then(bayArr => {
            setBayList(bayArr)
        }).then(setIsLoading(false))
    }

    const addBayToTables = () => {
        let bay = {
            name: bayName
        }
        addBay(bay).then(res => {
            let houseBay = {
                bayId: res,
                houseId: id
            }

            addBayToHouse(houseBay).then(() => {
                toggle()
                setBayName("")
                getBaysList()
            })
        })
    }

    const handleEditBaySubmit = (bay) => {
        editBay(bay).then(() => {
            setBayName("")
            setTitle("")
            getBaysList()
            toggleEdit({name: null, id: 0})
        })
    }

    const handleDeleteBaySubmit = (bayId) => {
        deleteHouseBay(bayId).then(() => {
            deleteBay(bayId)
        }).then(() => {
            setBayName("")
            getBaysList()
            toggleDelete({name: null, id: 0})
        })
    }

    useEffect(() => {
        getBaysList()
    }, [id])

    useEffect(() => {
        getHouseById(id).then(houseObj => {
            setHouse(houseObj)
        })
    }, [id])


    return isLoading ?
        <div>Loading</div>
    :
        <main className="background">
            <article className="gmBackground">
                <Table>
                    <thead>
                        <tr>
                            <th>
                                {house.name}
                            </th>
                            <th></th>
                            <th><button className="buttonWSymbol" onClick={toggle}><i class="fa-solid fa-plus"></i></button></th>
                        </tr>
                    </thead>
                    <tbody>
                        {bayList.map(bay => {
                            return (
                                <tr>
                                    <td>
                                        <Button className="buttonWSymbol text" onClick={() => navigate(`/greenhouseManagement/${id}/${bay.id}`, { state: { bayName: bay.name }})}>{bay.name} Divisions</Button>
                                    </td>
                                    <td>
                                        <button className="buttonWSymbol" onClick={() => toggleEdit(bay)}><i className="fa-regular fa-pen-to-square" /></button>
                                        <Modal isOpen={editModal} toggle={() => toggleEdit(bay)}>
                                            <ModalHeader toggle={() => toggleEdit("")}>
                                                    Edit {title}
                                            </ModalHeader>
                                            <ModalBody>
                                                <fieldset>
                                                    <input
                                                        type="text"
                                                        placeholder="Bay Name"
                                                        value={bayName}
                                                        onChange={(e) => setBayName(e.target.value)}
                                                    />
                                                </fieldset>
                                            </ModalBody>
                                            <ModalFooter>
                                            <Button className="greenButton" onClick={() => {
                                                let bayObj = {
                                                    id: bayId,
                                                    name: bayName
                                                }
                                                handleEditBaySubmit(bayObj)
                                            }}>
                                                Submit Edit
                                            </Button>
                                            <Button className="cancelButton" onClick={() => toggleEdit("")}>
                                                Cancel
                                            </Button>
                                            </ModalFooter>
                                        </Modal>
                                    </td>
                                    <td>
                                        <button className="buttonWSymbol" onClick={() => toggleDelete(bay)}><i className="fa-solid fa-trash" /></button>
                                        <Modal isOpen={deleteModal} toggle={() => toggleDelete(bay)}>
                                            <ModalHeader toggle={() => toggleDelete("")}>Delete {bayName}</ModalHeader>
                                            <ModalBody>
                                                <div>
                                                    Are you sure you want to delete {bayName}?
                                                </div>
                                            </ModalBody>
                                            <ModalFooter>
                                            <Button className="deleteButton" color="danger" onClick={() => {
                                                handleDeleteBaySubmit(bayId)
                                            }}>
                                                Confirm Delete
                                            </Button>
                                            <Button className="cancelButton" onClick={() => toggleDelete("")}>
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
                    <Modal isOpen={modal} toggle={toggle}>
                        <ModalHeader toggle={() => {
                            toggle()
                            setBayName("")
                            }}>
                                New Bay
                        </ModalHeader>
                        <ModalBody>
                            <fieldset>
                                <input
                                    type="text"
                                    placeholder="Bay Name"
                                    value={bayName}
                                    onChange={(e) => setBayName(e.target.value)}
                                />
                            </fieldset>
                        </ModalBody>
                        <ModalFooter>
                        <Button className="greenButton" onClick={() => addBayToTables()}>
                            Add
                        </Button>
                        <Button className="cancelButton" onClick={() => {
                                                                toggle()
                                                                setBayName("")
                                                }}>
                            Cancel
                        </Button>
                        </ModalFooter>
                    </Modal>
                </div>
                <Link className="marginSmall gmText" to={'/greenhouseManagement'}>Return To Houses</Link>
            </article>
        </main>
}