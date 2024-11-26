import { useEffect, useRef, useState } from "react"
import { getBayDivisionsByHouseIdWithScoutingReport } from "../../services/BayDivisionsService.jsx"
import { useParams } from "react-router-dom"
import * as d3 from 'd3'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Table } from "reactstrap"
import "./HeatMap.css"
import { getPests } from "../../services/PestsServices.jsx"
import { getGrowingWeeksByHouseId } from "../../services/ScoutingReportServices.jsx"

export const HeatMap = ({ currentUser }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [bayDivisionsWithScoutingReport, setBayDivisionsWithScoutingReport] = useState([])
    const [house, setHouse] = useState({})
    const [pests, setPests] = useState([])
    const [growingWeeks, setGrowingWeeks] = useState([])
    const [heatMapSearch, setHeatMapSearch] = useState({})
    const [modal, setModal] = useState(false)
    
    const {hhId} = useParams()
    const svgRef = useRef()

    useEffect(() => {
        getBayDivisionsByHouseIdWithScoutingReport(hhId, 0, 0).then(res => {
            setBayDivisionsWithScoutingReport(res)
            setHouse({id: res[0].houseBay.houseId, name: res[0].house.name})
        })
    }, [hhId])

    useEffect(() => {
        if (!house.id) return

        getPests().then(res => setPests(res)).then(getGrowingWeeksByHouseId(house.id).then(res => setGrowingWeeks(res)))
    }, [house])

    useEffect(() => {
        setIsLoading(false)
    }, [growingWeeks])

    useEffect(() => {
        if (!bayDivisionsWithScoutingReport.length) return

        
        const w = 1000
        const h = window.innerHeight * 0.6
        
        const svg = d3.select(svgRef.current)
                      .attr("width", w)
                      .attr("height", h)
                      .style("overflow", "visible")

        svg.selectAll("rect").remove()
        svg.selectAll("text").remove()
        
        
        if (bayDivisionsWithScoutingReport[0]) {
            svg.selectAll("rect")
                .data(bayDivisionsWithScoutingReport)
                .enter()
                .append("rect")
                .attr("x", (d,i) => {
                        if (i % 2 === 0) {
                            return i * (w / bayDivisionsWithScoutingReport.length / 2)
                        } else {
                            return (i - 1) * (w / bayDivisionsWithScoutingReport.length / 2)
                        }
                    })
                .attr("y", (d, i) => {
                        if (i % 2 === 0) {
                            return 0
                        } else {
                            return h / 2
                        }
                })
                .attr("width", (w / bayDivisionsWithScoutingReport.length) - 5)
                .attr("height", h / 2)
                .attr("fill", (d, i) => {
                    
                    switch(d.scoutingReport?.pressure) {
                        case undefined:
                            return "gray"
                        case "1":
                            return "green"
                        case "2":
                            return "yellow"
                        case "3":
                            return "red"
                    }
                })

            svg.selectAll("text")
               .data(bayDivisionsWithScoutingReport)
               .enter()
               .append("text")
               .attr("x", (d, i) => {
                    if (i % 2 === 0) {                       return (i / 2) * (w / bayDivisionsWithScoutingReport.length) + (((w / bayDivisionsWithScoutingReport.length) - 5) / 2)
                    } else {
                        return ((i - 1) / 2) * (w / bayDivisionsWithScoutingReport.length) + (((w / bayDivisionsWithScoutingReport.length) - 5) / 2)
                    }
               })
               .attr("y", (d, i) => {
                    if (i % 2 === 0) {
                        return h / 4
                    } else {
                        return h * 0.75
                    }
               })
               .attr("text-anchor", "middle")
               .attr("fill", "black")
               .text(d => d.name)

            svg.selectAll("text.bay-label")
               .data(bayDivisionsWithScoutingReport)
               .enter()
               .append("text")
               .attr("class", "bay-label")
               .attr("x", (d, i) => {
                if (i % 2 === 0) {
                    return ((i / 2) * (w / bayDivisionsWithScoutingReport.length) + (((w / bayDivisionsWithScoutingReport.length) - 5) / 2))
                } else {
                    return (((i - 1) / 2) * (w / bayDivisionsWithScoutingReport.length) + (((w / bayDivisionsWithScoutingReport.length) - 5) / 2))
                }
               })
               .attr("y", (d, i) => {
                if (i % 2 === 0) {
                    return h + 20
                } else {
                    return h + 20
                }
               })
               .attr("text-anchor", "middle")
               .attr("fill", "black")
               .text(d => d.bay.name)
               
        }

    }, [bayDivisionsWithScoutingReport])
 

    const toggle = () => setModal(!modal)

    const handleHeatMapSearch = () => {
        if (!heatMapSearch.growingWeek || !heatMapSearch.pest) {
            toggle()
        } else {
            getBayDivisionsByHouseIdWithScoutingReport(hhId, heatMapSearch.growingWeek, heatMapSearch.pest).then(res => setBayDivisionsWithScoutingReport(res))
        }
    }

    return isLoading ? 
    <h1>Loading</h1>
    :
    <main className="background">
        <article className="gmBackground">
            <h2>{house.name}</h2>
            <Table>
                <thead>
                    <tr>
                        <th>
                            <select onChange={(e) => {
                                let copy = {...heatMapSearch}
                                copy.pest = parseInt(e.target.value)
                                setHeatMapSearch(copy)
                            }}>
                                <option>Select Pest</option>
                                {pests.map(pest => {
                                    return (
                                        <option value={pest.id}>{pest.name}</option>
                                    )
                                })}
                            </select>
                        </th>
                        <th>
                            <select onChange={(e) => {
                                let copy = {...heatMapSearch}
                                copy.growingWeek = parseInt(e.target.value)
                                setHeatMapSearch(copy)
                            }}>
                                <option>Select Growing Week</option>
                                {growingWeeks.length > 0 ? growingWeeks.map(week => {
                                    return (
                                        <option key={week} value={week}>{week}</option>
                                    )
                                })
                                :
                                <option>No Growing Weeks Exist</option>
                                }
                            </select>
                        </th>
                        <th>
                            <Button className="greenButton" onClick={handleHeatMapSearch}>Search</Button>
                            <Modal isOpen={modal} toggle={toggle}>
                                <ModalHeader toggle={toggle}>Error!</ModalHeader>
                                <ModalBody>
                                    You must select a pest and growing week before searching
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={toggle}>Close</Button>
                                </ModalFooter>
                            </Modal>
                        </th>
                    </tr>
                </thead>
            </Table>
            <svg className="marginBottom" ref={svgRef}></svg>
        </article>
    </main>
}