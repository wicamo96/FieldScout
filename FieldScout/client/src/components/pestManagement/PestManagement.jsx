import { useEffect, useState } from "react"
import { addPest, deletePest, editPest, getPests } from "../../services/PestsServices.jsx"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Table } from "reactstrap"

export const PestManagement = () => {
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
        })
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

    if (!pestList.length > 0) {
        return (<h1>Loading</h1>)
    }

    return (
        <>
            <h1>Pests</h1>
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
                    {pestList.map(pest => {
                        return (
                            <tr>
                                <td>{pest.name}</td>
                                <td>
                                    <button onClick={() => toggleEdit(pest)}><i className="fa-regular fa-pen-to-square"></i></button>
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
                                        <Button color="primary" onClick={() => {
                                            let pestObject = {
                                                id: pestId,
                                                name: pestName
                                            }
                                            handleEditPestSubmit(pestObject)
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
                                    <button onClick={() => toggleDelete(pest)}><i className="fa-solid fa-trash" /></button>
                                    <Modal isOpen={deleteModal} toggle={() => toggleDelete(pest)}>
                                        <ModalHeader toggle={() => toggleDelete("")}>Delete {pestName}</ModalHeader>
                                        <ModalBody>
                                            <div>
                                                Are you sure you want to delete {pestName}?
                                            </div>
                                        </ModalBody>
                                        <ModalFooter>
                                        <Button color="danger" onClick={() => {
                                            handleDeletePestSubmit(pestId)
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
                <Button onClick={() => toggle()}>
                    Add New Pest
                </Button>
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
                    <Button color="primary" onClick={() => handleAddPest()}>
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