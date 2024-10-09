const baseUrl = "https://localhost:5001/api/Houses"

export const addHouse = (house) => {
    return fetch(`${baseUrl}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(house)
    }).then(res => res.json()).then(data => {return data.id})
}

export const editHouse = (house) => {
    return fetch(`${baseUrl}/${house.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(house)
    })
}

export const deleteHouse = (houseId) => {
    return fetch(`${baseUrl}/${houseId}`, {
        method: "DELETE"
    })
}