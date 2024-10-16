const baseUrl = "https://localhost:5001/api/ScoutingReport"

export const postScoutingReport = (reportObj) => {
    return fetch(`${baseUrl}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reportObj)
    })
}

export const getCurrentGrowingWeek = () => {
    return fetch(`${baseUrl}/GetGrowingWeek`).then(res => res.json())
}

export const getScoutingReportByBayDivIdAndGrowingWeek = (growingWeek, bayDivisionId) => {
    return fetch(`${baseUrl}/${bayDivisionId}/${growingWeek}`).then(res => res.json())
}

export const editScoutingReport = (reportObj) => {
    return fetch(`${baseUrl}/${reportObj.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reportObj)
    })
}

export const getScoutingReportBayIds = (growingWeek, houseId) => {
    return fetch(`${baseUrl}/ScoutingReportBayIds/${houseId}/${growingWeek}`).then(res => res.json())
}

export const deleteScoutingReport = (reportId) => {
    return fetch(`${baseUrl}/${reportId}`, {
        method: "DELETE"
    })
}