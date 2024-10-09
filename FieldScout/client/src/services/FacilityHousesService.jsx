const baseUrl = "https://localhost:5001/api/FacilityHouses"

export const addHouseToFacility = (facilityHouse) => {
    return fetch(`${baseUrl}/AddHouseToFacility`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(facilityHouse)
    })
}

export const deleteFacilityHouse = (houseId) => {
    return fetch(`${baseUrl}/${houseId}`, {
        method: "DELETE"
    })
}