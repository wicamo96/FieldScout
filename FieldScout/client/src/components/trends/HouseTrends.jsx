import { useEffect, useState, useRef } from "react"
import { useLocation } from "react-router-dom"
import { getBaysByHouseId } from "../../services/BayServices.jsx"
import { getCurrentGrowingWeek, getScoutingReportTrends } from "../../services/ScoutingReportServices.jsx"
import { getBayDivisionsByBayId } from "../../services/BayDivisionsService.jsx"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Table } from "reactstrap"
import { getPests } from "../../services/PestsServices.jsx"
import * as d3 from 'd3'

export const HouseTrends = ({ currentUser }) => {
    const [modal, setModal] = useState(false)
    const [growingWeekStart, setGrowingWeekStart] = useState(0)
    const [growingWeekEnd, setGrowingWeekEnd] = useState(0)
    const [house, setHouse] = useState({})
    const [bayId, setBayId] = useState(0)
    const [bayDivId, setBayDivId] = useState(0)
    const [pestId, setPestId] = useState(0)
    const [pestList, setPestList] = useState([])
    const [growingWeek, setGrowingWeek] = useState(0)
    const [bayList, setBayList] = useState([])
    const [bayDivList, setBayDivList] = useState([])
    const [trendData, setTrendData] = useState([])
    const [parsedData, setParsedData] = useState([])
    const [pressureData, setPressureData] = useState([])
    const svgRef = useRef()

    const location = useLocation()

    const toggle = () => setModal(!modal)

    const parseTimeFrame = (weeks) => {
        setGrowingWeekEnd(growingWeek)
        setGrowingWeekStart(growingWeek - weeks)
    }

    const parseScoutingInfo = (gwArr, prArr) => {
        let gArr = []
        for (let i = 0; i < gwArr.length; i++) {
            if (!gArr.includes(gwArr[i])) {
                gArr.push(gwArr[i])
            }
        }
        
        let count = []
        let pArr = []
        let copy = [...prArr]
        for (let i = 0; i < copy.length; i++) {
            if (!count.find(entry => entry === copy[i].growingWeek)) {
                let weekArr = prArr.filter(entry => entry.growingWeek === copy[i].growingWeek)
                if (weekArr.length > 1) {
                    let num = 0
                    for (let j = 0; j < weekArr.length; j++) {
                        num += weekArr[j].pressure
                        count.push(weekArr[j].growingWeek)
                    }
                    pArr.push(Math.round(num / weekArr.length))
                } else {
                    pArr.push(weekArr[0].pressure)
                    count.push(weekArr[0].growingWeek)
                }
            }
        }

        let data = []
        for (let k = 0; k < pArr.length; k++) {
            data.push({pressure: pArr[k], growingWeek: gArr[k]})
        }
     
        setParsedData(data)
        setPressureData(pArr)
        
    }

    const handleFetchData = () => {
        if (!pestId > 0 || !growingWeekEnd > 0 || !growingWeekEnd > 0) {
            toggle()
            return
        } else {
            getScoutingReportTrends(growingWeekStart, growingWeekEnd, house.id, bayId, bayDivId, pestId).then(res => {
                                                                                                                let copy = []
                                                                                                                let gArr = []
                                                                                                                let pArr = []
                                                                                                                res.forEach(entry => {
                                                                                                                    let tmp = {...entry}
                                                                                                                    tmp.pressure = parseInt(entry.pressure)
                                                                                                                    gArr.push(tmp.growingWeek)
                                                                                                                    pArr.push(tmp)
                                                                                                                    copy.push(tmp)
                                                                                                                })
                                                                                                                setTrendData(copy)
                                                                                                                parseScoutingInfo(gArr, pArr)
                                                                                                            })
        }
    }

    useEffect(() => {
        setHouse(location.state.houseObj)
    }, [location])

    useEffect(() => {
        getBaysByHouseId(house.id).then(bayArr => setBayList(bayArr))
    }, [house])

    useEffect(() => {
        getPests().then(pestArr => setPestList(pestArr))
    }, [])

    useEffect(() => {
        getCurrentGrowingWeek().then(res => setGrowingWeek(res))
    }, [])

    useEffect(() => {
        getBayDivisionsByBayId(bayId).then(divArr => setBayDivList(divArr))
    }, [bayId])

    useEffect(() => {
        getBayDivisionsByBayId(bayId).then(res => setBayDivList(res))
    }, [bayId])

    useEffect(() => {
        if (bayId === "0") {
            setBayDivId(0)
        }
    }, [bayId])

    useEffect(() => {
        const w = 500
        const h = 400
        const svg = d3.select(svgRef.current)
                      .attr("width", w)
                      .attr("height", h)
                      .style('background', '#d3d3d3')
                      .style('overflow', 'visible')

        const xScale = d3.scaleLinear()
                         .domain(d3.extent(parsedData, d => d.growingWeek))
                         .range([0, w])

        const yScale = d3.scaleLinear()
                         .domain([0, 3])
                         .range([h, 0])

        const line = d3.line()
                        .x((d, i) => xScale(d.growingWeek))
                        .y(d => yScale(d.pressure))
                        .curve(d3.curveCardinal)

        let xAxis = d3.axisBottom(xScale)
                      .ticks(parsedData.length - 1)
                        
        svg.select(".x-axis")
           .transition()
           .duration(250)
           .call(xAxis)
           .attr('transform', `translate(0, ${h})`)

        const yAxis = d3.axisLeft(yScale)
                        .ticks(3)

        svg.append('g')
           .call(yAxis)

        svg.selectAll('path').remove()
        svg.append('path')
            .datum(parsedData)
            .join('path')
            .transition()
            .duration(250)
            .attr('fill', 'none')
            .attr('stroke', 'black')
            .attr('stroke-width', 1)
            .attr('d', line)

        svg.select('.x-axis').call(xAxis)

    }, [parsedData, pressureData])


    return (
        <>
            <Table>
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th><h3>{house.name}</h3></th>
                        <th></th>
                        <th></th>
                    </tr>
                    <tr>
                        <td>
                            <select onChange={(e) => setPestId(e.target.value)}>
                                <option selected disabled>Select Pest</option>
                                {pestList.map(pest => {
                                    return (
                                        <option value={pest.id}>{pest.name}</option>
                                    )
                                })}
                            </select>
                        </td>
                        <td>
                            <select onChange={(e) => parseTimeFrame(e.target.value)}>
                                <option selected disabled>Select Time Frame</option>
                                <option value={1}>2 Weeks</option>
                                <option value={2}>3 Weeks</option>
                                <option value={3}>4 Weeks</option>
                                <option value={4}>5 Weeks</option>
                                <option value={5}>6 Weeks</option>
                            </select>
                        </td>
                        <td>
                            <select onChange={(e) => setBayId(e.target.value)}>
                                {bayList[0]?.id ?
                                <>
                                    <option selected disabled>Select Bay</option>
                                    <option value={0}>None</option>
                                    {bayList?.map(bay => {
                                        return (
                                            <option value={bay.id}>{bay.name}</option>
                                        )
                                    })}
                                </>
                                :
                                ""
                                }
                            </select>
                        </td>
                        <td>
                            <select onChange={(e) => setBayDivId(e.target.value)}>
                                {bayDivList[0]?.id ?
                                <>
                                    <option selected disabled>Select Bay Division</option>
                                    <option value={0}>None</option>
                                    {bayDivList?.map(div => {
                                        return (
                                            <option value={div.id}>{div.name}</option>
                                        )
                                    })}
                                </>
                                :
                                <option selected disabled>Chose Bay To Select Div</option>
                                }
                            </select>
                        </td>
                        <td>
                            <button onClick={handleFetchData}>View Trends</button>
                        </td>
                    </tr>
                    <Modal isOpen={modal} toggle={toggle}>
                        <ModalHeader toggle={toggle}>Data Error</ModalHeader>
                        <ModalBody>
                            You Must Select A Pest And Time Frame <strong>Minimum</strong> Before Viewing Trends!
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={toggle}>Close</Button>
                        </ModalFooter>
                    </Modal>
                </thead>
            </Table>
            <svg ref={svgRef}>
                <g className="x-axis" />
            </svg>
        </>
    )
}