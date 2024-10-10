const baseUrl = "https://localhost:5001/api/Pests"

export const getPests = () => {
    return fetch(`${baseUrl}`).then(res => res.json())
}

export const addPest = (pestObj) => {
    return fetch(`${baseUrl}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(pestObj)
    })
}

export const editPest = (pestObj) => {
    return fetch(`${baseUrl}/${pestObj.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(pestObj)
    })
}

export const deletePest = (pestId) => {
    return fetch(`${baseUrl}/${pestId}`, {
        method: "DELETE"
    })
}