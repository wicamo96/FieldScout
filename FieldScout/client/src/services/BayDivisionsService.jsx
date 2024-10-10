const baseUrl = "https://localhost:5001/api/BayDivisions"

export const getBayDivisionsByBayId = (bayId) => {
    return fetch(`${baseUrl}/GetByBayId?bayId=${bayId}`).then(res => res.json())
}

export const addBayDivision = (bayDivision) => {
    return fetch(`${baseUrl}/AddBayDivision`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bayDivision)
    })
}

export const editBayDivision = (bayDivision) => {
    return fetch(`${baseUrl}/${bayDivision.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bayDivision)
    })
}

export const deleteBayDivision = (divisionId) => {
    return fetch(`${baseUrl}/${divisionId}`, {
        method: "DELETE"
    })
}
