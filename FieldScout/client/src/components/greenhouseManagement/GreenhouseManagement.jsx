import { useEffect, useState } from "react"
import { Button, Table } from "reactstrap"
import { getByIdWithHouses } from "../../services/FacilityServices.jsx"

export const GreenhouseManagement = ({ currentUser }) => {
    const [houses, setHouses] = useState([])

    const getFacilityHouses = () => {
        getByIdWithHouses(currentUser.facilityId).then(facilityArr => {
            setHouses(facilityArr.houses)
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
            <h1>Houses</h1>
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
                            <tr>
                                <td>{house.name}</td>
                                <td><i className="fa-regular fa-pen-to-square"></i></td>
                                <td><FontAwesomeIcon icon="fa-solid fa-trash" /></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </>
    )
}