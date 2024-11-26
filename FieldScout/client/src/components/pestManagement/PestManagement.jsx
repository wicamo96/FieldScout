import { useEffect, useState } from "react"
import { addPest, deletePest, editPest, getPests } from "../../services/PestsServices.jsx"
import { Button, Card, Modal, ModalBody, ModalFooter, ModalHeader, Table } from "reactstrap"
import './PestManagement.css'

export const PestManagement = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [pestList, setPestList] = useState([])
    const [modal, setModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [pestName, setPestName] = useState("")
    const [pestId, setPestId] = useState(0)
    const [title, setTitle] = useState("")

    const toggle = () => {
        setPestName("")
        setModal(!modal)
    }

    const toggleEdit = (pestObj) => {
        setTitle(pestObj.name)
        setPestName(pestObj.name)
        setPestId(pestObj.id)
        setEditModal(!editModal)
    }
    
    const toggleDelete = (pestObj) => {
        setPestName(pestObj.name)
        setPestId(pestObj.id)
        setDeleteModal(!deleteModal)
    }

    const getPestList = () => {
        getPests().then(pestsArr => {
            setPestList(pestsArr)
        }).then(setIsLoading(false))
    }
    
    const handleAddPest = () => {
        let pestObj = {
            name: pestName
        }

        addPest(pestObj).then(() => {
            toggle()
            getPestList()
        })
    }

    const handleEditPestSubmit = (pestObj) => {
        editPest(pestObj).then(() => {
            toggleEdit({name: null, id: 0})
            getPestList()
        })
    } 

    const handleDeletePestSubmit = (pestObj) => {
        deletePest(pestId).then(() => {
            toggleDelete({name: null, id: 0})
            getPestList()
        })
    }

    useEffect(() => {
        getPestList()
    }, [])


    return isLoading ?
        <h1>Loading</h1>
    :
        <main className="background">
            <article className="gmBackground">
                <Table>
                    <thead>
                        <tr>
                            <th>
                                Pests
                            </th>
                            <th></th>
                            <th>
                                <button className="buttonWSymbol" onClick={toggle}><i class="fa-solid fa-plus"></i></button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {pestList.map(pest => {
                            return (
                                <tr>
                                    <td>{pest.name}</td>
                                    <td>
                                        <button className="buttonWSymbol" onClick={() => toggleEdit(pest)}><i className="fa-regular fa-pen-to-square"></i></button>
                                        <Modal isOpen={editModal} toggle={() => toggleEdit(pest)}>
                                            <ModalHeader toggle={() => toggleEdit("")}>Edit {title}</ModalHeader>
                                            <ModalBody>
                                                <fieldset>
                                                    <input
                                                        type="text"
                                                        value={pestName}
                                                        onChange={(e) => setPestName(e.target.value)}
                                                        placeholder="Pest Name"
                                                    />
                                                </fieldset>
                                            </ModalBody>
                                            <ModalFooter>
                                            <Button className="greenButton" onClick={() => {
                                                let pestObject = {
                                                    id: pestId,
                                                    name: pestName
                                                }
                                                handleEditPestSubmit(pestObject)
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
                                        <button className="buttonWSymbol" onClick={() => toggleDelete(pest)}><i className="fa-solid fa-trash" /></button>
                                        <Modal isOpen={deleteModal} toggle={() => toggleDelete(pest)}>
                                            <ModalHeader toggle={() => toggleDelete("")}>Delete {pestName}</ModalHeader>
                                            <ModalBody>
                                                <div>
                                                    Are you sure you want to delete {pestName}?
                                                </div>
                                            </ModalBody>
                                            <ModalFooter>
                                            <Button className="deleteButton" color="danger" onClick={() => {
                                                handleDeletePestSubmit(pestId)
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
                        <ModalHeader toggle={toggle}>New Pest</ModalHeader>
                        <ModalBody>
                            <fieldset>
                                <input
                                    type="text"
                                    value={pestName}
                                    onChange={(e) => setPestName(e.target.value)}
                                    placeholder="Pest Name"
                                />
                            </fieldset>
                        </ModalBody>
                        <ModalFooter>
                        <Button className="greenButton" onClick={() => handleAddPest()}>
                            Add
                        </Button>
                        <Button className="cancelButton" onClick={toggle}>
                            Cancel
                        </Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </article>
        </main>
}