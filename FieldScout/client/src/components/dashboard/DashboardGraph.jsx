import * as d3 from 'd3'
import { useEffect, useRef, useState } from 'react'
import { getScoutingReportTrends } from '../../services/ScoutingReportServices.jsx'

export const DashboardGraph = ({ pest, houseId, currentUser, growingWeek }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [parsedData, setParsedData] = useState([])
    const [pressureData, setPressureData] = useState([])
    const svgRef = useRef()

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
    
    useEffect(() => {
        let growingWeekEnd = growingWeek
        let growingWeekStart = growingWeek - 3
        let bayId = 0
        let bayDivId = 0
        getScoutingReportTrends(growingWeekStart, growingWeekEnd, houseId, bayId, bayDivId, pest?.id).then(res => {
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
            parseScoutingInfo(gArr, pArr)
        })
    }, [pest, houseId, growingWeek])

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
           .duration(350)
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
            .duration(350)
            .attr('fill', 'none')
            .attr('stroke', 'black')
            .attr('stroke-width', 1)
            .attr('d', line)

        svg.select('.x-axis').call(xAxis)

        svg.append("text")
           .attr("class", "x-axis-label")
           .attr("text-anchor", "middle")
           .attr("x", w / 2)
           .attr("y", h + 40)
           .text("Growing Week")

        svg.append("text")
            .attr("class", "y-axis-label")
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
           .attr("x", -200)
           .attr("y", (-40))
           .text("Pressure")

        svg.select(".graph-title").remove()
        svg.append("text")
           .attr("class", "graph-title")
           .attr("text-anchor", "middle")
           .attr("x", w / 2)
           .attr("y", -10)
           .text(`${pest?.name}`)

    }, [parsedData, pressureData, pest?.id])

    return (
    // isLoading ?
    // <></>
    // :
    <>
        <svg ref={svgRef}>
            <g className="x-axis" />
        </svg>
    </>
    )
}