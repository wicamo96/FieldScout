const baseUrl = "https://localhost:5001/api/Bays"

export const getBaysByHouseId = (houseId) => {
    return fetch(`${baseUrl}/GetByHouseId?houseId=${houseId}`).then(res => res.json())
}

export const addBay = (bay) => {
    return fetch(`${baseUrl}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bay)
    }).then(res => res.json()).then(data => {return data.id})
}

export const editBay = (bay) => {
    return fetch(`${baseUrl}/${bay.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bay)
    })
}

export const deleteBay = (bayId) => {
    return fetch(`${baseUrl}/${bayId}`, {
        method: "DELETE"
    })
}

export const getBayById = (bayId) => {
    return fetch(`${baseUrl}/${bayId}`).then(res => res.json())
}