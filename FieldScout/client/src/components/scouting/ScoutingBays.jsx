import { useEffect, useState } from "react"
import { getBaysByHouseId } from "../../services/BayServices.jsx"
import { Link, useLocation, useParams } from "react-router-dom"
import { Button, Card, Modal, ModalBody, ModalFooter, ModalHeader, Table } from "reactstrap"
import { getBayDivisionsByBayId } from "../../services/BayDivisionsService.jsx"
import { getPests } from "../../services/PestsServices.jsx"
import { deleteScoutingReport, editScoutingReport, getCurrentGrowingWeek, getScoutingReportBayIds, getScoutingReportByBayDivIdAndGrowingWeek, postScoutingReport } from "../../services/ScoutingReportServices.jsx"

export const ScoutingBays = ({ currentUser }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [baysList, setBaysList] = useState([])
    const [house, setHouse] = useState({})
    const [bayDivisions, setBayDivisions] = useState([])
    const [modal, setModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [pests, setPests] = useState([])
    const [scoutingReport, setScoutingReport] = useState([])
    const [growingWeek, setGrowingWeek] = useState(0)
    const [editedScoutingReport, setEditedScoutingReport] = useState([])
    const [bayIdsWithScoutingData, setBayIdsWithScoutingData] = useState([{id: 0, name: null}])
    const [bayObj, setBayObj] = useState({})
    
    const location = useLocation()
    const { shId } = useParams()

    const toggle = (bay) => {
        if (bay === undefined) {
            setModal(!modal)
            setScoutingReport([])
        } else {
            setBayObj(bay)
            getBayDivisionsByBayId(bay.id).then(divArr => setBayDivisions(divArr))
            setModal(!modal)
            scoutingReportBayIds()
        }
    }

    const toggleEdit = (bay) => {
        if (bay === undefined) {
            setEditModal(!editModal)
            setScoutingReport([])
        } else {
            setBayObj(bay)
            getBayDivisionsByBayId(bay.id).then(divArr => {
                setBayDivisions(divArr)
                let tmp = []
                divArr.forEach(div => {
                    getScoutingReportByBayDivIdAndGrowingWeek(growingWeek, div.id).then(reportArr => {
                        reportArr.forEach(entry => {
                            tmp.push(entry)
                        })
                    })
                })
                setScoutingReport(tmp)
            }).then(() => getPests().then(pestsArr => setPests(pestsArr)).then(setEditModal(!editModal)))
        }
    }

    const toggleDelete = (bay) => {
        if (bay === undefined) {
            setDeleteModal(!deleteModal)
            setScoutingReport([])
        } else {
            setBayObj(bay)
            getBayDivisionsByBayId(bay.id).then(divArr => {
                setBayDivisions(divArr)
                let tmp = []
                divArr.forEach(div => {
                    getScoutingReportByBayDivIdAndGrowingWeek(growingWeek, div.id).then(reportArr => {
                        reportArr.forEach(entry => {
                            tmp.push(entry)
                        })
                    })
                })
                setScoutingReport(tmp)
            }).then(() => getPests().then(pestsArr => setPests(pestsArr)).then(setDeleteModal(!deleteModal))).then(scoutingReportBayIds())
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

    const handleSubmitScoutingReport = () => {
        scoutingReport.forEach(reportObj => {
            postScoutingReport(reportObj).then(scoutingReportBayIds())
        })
        toggle()
    }

    const handleEditScoutingReport = (reportObj) => {
        if (editedScoutingReport.length === 0) {
            let tmp = []
            let obj = scoutingReport.find(obj => obj.bayDivisionId === reportObj.bayDivisionId && obj.pestId === reportObj.pestId)
            obj.pressure = reportObj.pressure
            tmp.push(obj)
            setEditedScoutingReport(tmp)
        } else if (!editedScoutingReport.find(entry => entry.bayDivisionId === reportObj.bayDivisionId && entry.pestId === reportObj.pestId)) {
            let tmp = [...editedScoutingReport]
            let obj = scoutingReport.find(obj => obj.bayDivisionId === reportObj.bayDivisionId && obj.pestId === reportObj.pestId)
            obj.pressure = reportObj.pressure
            tmp.push(obj)
            setEditedScoutingReport(tmp)
        } else {
            let copy = editedScoutingReport.map(entry => {
                if (entry.bayDivisionId === reportObj.bayDivisionId && entry.pestId === reportObj.pestId) {
                    return { ...entry, pressure: reportObj.pressure}
                } else {
                    return entry
                }
            })
            setEditedScoutingReport(copy)
        }
    }

    const handleSubmitEditedScoutingReport = () => {
        editedScoutingReport.forEach(entry => {
            editScoutingReport(entry)
        })
        toggleEdit()
    }

    const scoutingReportBayIds = () => {
        getScoutingReportBayIds(growingWeek, house.id).then(resArr => {
            setBayIdsWithScoutingData(resArr)
        })
    }
    
    const handleSubmitDeleteScoutingReport = () => {
        scoutingReport.forEach(entry => {
            deleteScoutingReport(entry.id)
        })
        toggleDelete()
    }

    useEffect(() => {
        getBaysByHouseId(shId).then(baysArr => {
            setBaysList(baysArr)
        }).then(setIsLoading(false))
    }, [shId])

    useEffect(() => {
        setHouse(location.state.houseObj)
    }, [])

    useEffect(() => {
        getPests().then(pestsArr => setPests(pestsArr))
    }, [])

    useEffect(() => {
        getCurrentGrowingWeek().then(res => setGrowingWeek(res))
    }, [])

    useEffect(() => {
        scoutingReportBayIds()
    }, [growingWeek, house])

    return isLoading ?
        <div>loading</div>
    :
        <main className="background">
            <article className="gmBackground">
                <h3>{house.name} Scouting Menu</h3>
                <Table>
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
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
                                        <Modal isOpen={modal} toggle={() => toggle(bay)}>
                                            <ModalHeader toggle={() => toggle()}>{bayObj.name} Scouting Report</ModalHeader>
                                            <ModalBody>
                                                {!bayIdsWithScoutingData[0]?.id ? 
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
                                                                                            bayDivisionId: division.id,
                                                                                            facilityId: currentUser.facilityId,
                                                                                            bay: null,
                                                                                            house: null
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
                                                :
                                                bayIdsWithScoutingData.find(entry => entry.id === bayObj.id) ?
                                                <div>Data already exists in this bay for week {growingWeek}</div>
                                                :
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
                                                                                            bayDivisionId: division.id,
                                                                                            facilityId: currentUser.facilityId,
                                                                                            bay: null,
                                                                                            house: null
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
                                                }
                                            </ModalBody>
                                            <ModalFooter>
                                            {!bayIdsWithScoutingData[0]?.id ? 
                                                <Button className="greenButton" onClick={() => handleSubmitScoutingReport()}>
                                                    Add
                                                </Button>
                                            : 
                                            bayIdsWithScoutingData.find(entry => entry.id === bayObj.id) ? 
                                            "" 
                                            :
                                                <Button className="greenButton" onClick={() => handleSubmitScoutingReport()}>
                                                    Add
                                                </Button>
                                            }
                                            <Button className="cancelButton" onClick={() => toggle()}>
                                                Cancel
                                            </Button>
                                            </ModalFooter>
                                        </Modal>
                                    </td>
                                    <td>
                                        <Button color="" onClick={() => toggleEdit(bay)} >
                                            <i className="fa-regular fa-pen-to-square" />
                                        </Button>
                                        <Modal isOpen={editModal} toggle={() => toggleEdit(bay)}>
                                            <ModalHeader toggle={() => toggleEdit()}>Edit</ModalHeader>
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
                                                                    {scoutingReport[0]?.id ?
                                                                    pests.map(pest => {
                                                                        return (
                                                                            <tr>
                                                                                <td>{pest.name}</td>
                                                                                <td>
                                                                                    <select onChange={(e) => {
                                                                                        let reportObj = {
                                                                                            bayDivisionId: division.id,
                                                                                            pestId: pest.id,
                                                                                            pressure: e.target.value,
                                                                                            bay: null,
                                                                                            house: null
                                                                                        }
                                                                                        handleEditScoutingReport(reportObj)
                                                                                    }}>
                                                                                        <option disabled>Select Pressure</option>
                                                                                        {scoutingReport.find(reportObj => reportObj.pestId === pest.id && reportObj.bayDivisionId === division.id)?.pressure === "1" ? <option selected value={1}>Low</option> : <option value={1}>Low</option>}
                                                                                        {scoutingReport.find(reportObj => reportObj.pestId === pest.id && reportObj.bayDivisionId === division.id)?.pressure === "2" ? <option selected value={2}>Medium</option> : <option value={2}>Medium</option>}
                                                                                        {scoutingReport.find(reportObj => reportObj.pestId === pest.id && reportObj.bayDivisionId === division.id)?.pressure === "3" ? <option selected value={3}>High</option> : <option value={3}>High</option>}
                                                                                    </select>
                                                                                </td>
                                                                            </tr>
                                                                        )                                                                    
                                                                    })
                                                                    :
                                                                    <div>No Data</div>
                                                                    }
                                                                </>
                                                            )
                                                        })}
                                                    </tbody>
                                                </Table>
                                            </ModalBody>
                                            <ModalFooter>
                                                {scoutingReport[0]?.id ? 
                                                    <Button className="greenButton"  onClick={() => handleSubmitEditedScoutingReport()}>
                                                        Submit Edit
                                                    </Button>
                                                :
                                                ""    
                                                }
                                                <Button className="cancelButton" onClick={() => toggleEdit()}>
                                                    Cancel
                                                </Button>
                                            </ModalFooter>
                                        </Modal>
                                    </td>
                                    <td>
                                        <Button color="" onClick={() => toggleDelete(bay)} >
                                            <i className="fa-solid fa-trash" />
                                        </Button>
                                        <Modal isOpen={deleteModal} toggle={() => toggleDelete(bay)}>
                                            <ModalHeader toggle={() => toggleDelete()}>Delete</ModalHeader>
                                            {scoutingReport[0]?.id ?
                                            <>
                                                <ModalBody>
                                                Are you sure you want to delete week {growingWeek} scouting data for {bayObj.name}?
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button className="deleteButton" color="danger" onClick={() => handleSubmitDeleteScoutingReport()}>
                                                        Confirm Delete
                                                    </Button>
                                                    <Button className="cancelButton" onClick={() => toggleDelete()}>
                                                        Cancel
                                                    </Button>
                                                </ModalFooter>
                                            </>
                                            :
                                            <>
                                                <ModalBody>
                                                No Data To Delete!
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button className="cancelButton" onClick={() => toggleDelete()}>
                                                        Cancel
                                                    </Button>
                                                </ModalFooter>
                                            </>
                                            }
                                        </Modal>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                <Link className="gmText" to={'/scouting'}>Return To House List</Link>
            </article>
        </main>
}
