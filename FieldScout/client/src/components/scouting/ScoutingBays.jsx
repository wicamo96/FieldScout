import { useEffect, useState } from "react"
import { getBaysByHouseId } from "../../services/BayServices.jsx"
import { useLocation, useParams } from "react-router-dom"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Table } from "reactstrap"
import { getBayDivisionsByBayId } from "../../services/BayDivisionsService.jsx"
import { getPests } from "../../services/PestsServices.jsx"

export const ScoutingBays = ({ currentUser }) => {
    const [baysList, setBaysList] = useState([])
    const [house, setHouse] = useState({})
    const [bayDivisions, setBayDivisions] = useState([])
    const [modal, setModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [pests, setPests] = useState([])
    const [scoutingReport, setScoutingReport] = useState([])
    
    const location = useLocation()
    const { shId } = useParams()

    const toggle = (bay) => {
        if (bay === undefined) {
            setModal(!modal)
            setScoutingReport([])
        } else {
            getBayDivisionsByBayId(bay.id).then(divArr => setBayDivisions(divArr))
            setModal(!modal)
        }
    }

    const handleScoutingReport = (reportObj) => {
        if (scoutingReport.length === 0) {
            let tmp = []
            tmp.push(reportObj)
            setScoutingReport(tmp)
        } else if (!scoutingReport.find(entry => entry.bayDivisionId === reportObj.bayDivisionId && entry.pestId === reportObj.pestId)) {
            let tmp = [...scoutingReport]
            tmp.push(reportObj)
            setScoutingReport(tmp)
        } else {
            let copy = scoutingReport.map(entry => {
                if (entry.bayDivisionId === reportObj.bayDivisionId && entry.pestId === reportObj.pestId) {
                    return { ...entry, pressure: reportObj.pressure}
                } else {
                    return entry
                }
            })
            setScoutingReport(copy)
        }
    }

    

    useEffect(() => {
        getBaysByHouseId(shId).then(baysArr => {
            setBaysList(baysArr)
        })        
    }, [shId])

    useEffect(() => {
        setHouse(location.state.houseObj)
    }, [])

    useEffect(() => {
        getPests().then(pestsArr => setPests(pestsArr))
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
                                    <Button color="" onClick={() => toggle(bay)}>
                                        <i className="fa-solid fa-plus" />
                                    </Button>
                                    <Modal isOpen={modal} toggle={() => toggle()}>
                                        <ModalHeader toggle={() => toggle()}>{bay.name} Scouting Report</ModalHeader>
                                        <ModalBody>
                                            <Table>
                                                <thead>
                                                    <tr>
                                                        <th>Pest</th>
                                                        <th>Pressure Level</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {bayDivisions.map(division => {
                                                        return (
                                                            <>
                                                                <tr bgcolor="lightgray">
                                                                    <td>{division.name}</td>
                                                                    <td></td>
                                                                </tr>
                                                                {pests.map(pest => {
                                                                    return (
                                                                        <tr>
                                                                            <td>{pest.name}</td>
                                                                            <td>
                                                                                <select onChange={(e) => {
                                                                                    let reportObj = {
                                                                                        userProfileId: currentUser.id,
                                                                                        pestId: pest.id,
                                                                                        pressure: e.target.value,
                                                                                        bayDivisionId: division.id
                                                                                    }
                                                                                    handleScoutingReport(reportObj)
                                                                                    }}>
                                                                                    <option selected disabled>Select Pressure</option>
                                                                                    <option value={1}>Low</option>
                                                                                    <option value={2}>Medium</option>
                                                                                    <option value={3}>High</option>
                                                                                </select>
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                })}
                                                            </>
                                                        )
                                                    })}    
                                                </tbody>
                                            </Table>
                                        </ModalBody>
                                        <ModalFooter>
                                        <Button color="primary" onClick={() => handleSubmitScoutingReport()}>
                                            Add
                                        </Button>
                                        <Button color="secondary" onClick={() => toggle()}>
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
