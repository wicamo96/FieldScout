const baseUrl = "https://localhost:5001/api/HouseBays"

export const addBayToHouse = (houseBay) => {
    return fetch(`${baseUrl}/AddBayToHouse`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(houseBay)
    })
}

export const deleteHouseBay = (bayId) => {
    return fetch(`${baseUrl}/${bayId}`, {
        method: "DELETE"
    })
}