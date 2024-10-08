import { useEffect, useState } from "react"
import { Button, Table } from "reactstrap"
import { getByIdWithHouses } from "../../services/FacilityServices.jsx"

export const GreenhouseManagement = ({ currentUser }) => {
    const [houses, setHouses] = useState([])

    useEffect(() => {
        getByIdWithHouses(currentUser.facilityId).then(facilityArr => {
            setHouses(facilityArr.houses)
        })
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
                                <Button><i className="fa-regular fa-pen-to-square"></i></Button>
                                <Button><FontAwesomeIcon icon="fa-solid fa-trash" /></Button>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </>
    )
}