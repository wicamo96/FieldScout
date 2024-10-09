import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { getBaysByHouseId } from "../../services/BayServices.jsx"
import { getHouseById } from "../../services/HousesService.jsx"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Table } from "reactstrap"

export const GreenhouseBays = ({ currentUser }) => {
    const { id } = useParams()
    const [bayList, setBayList] = useState([])
    const [house, setHouse] = useState({})
    const [modal, setModal] = useState(false)
    const [bayName, setBayName] = useState("")

    const toggle = () => setModal(!modal)

    useEffect(() => {
        getBaysByHouseId(id).then(bayArr => {
            setBayList(bayArr)
        })
    }, [id])

    useEffect(() => {
        getHouseById(id).then(houseObj => {
            setHouse(houseObj)
        })
    }, [id])

    if (!bayList) {
        return (<div>Loading</div>)
    }
    

    return (
        <>
            <h1>{house.name} Bays</h1>
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
                    {bayList.map(bay => {
                        return (
                            <tr>
                                <td>{bay.name}</td>
                                <td>
                                    <button><i className="fa-regular fa-pen-to-square" /></button>
                                </td>
                                <td>
                                    <button><i className="fa-solid fa-trash" /></button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <div>
                <Button onClick={toggle}>Add New Bay</Button>
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
                    <Button color="primary" onClick={toggle}>
                        Add
                    </Button>
                    <Button color="secondary" onClick={() => {
                                                            toggle()
                                                            setBayName("")
                                              }}>
                        Cancel
                    </Button>
                    </ModalFooter>
                </Modal>
            </div>
        </>
    )
}