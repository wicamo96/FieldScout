import { useEffect, useRef, useState } from "react"
import { getByIdWithHouses } from "../../services/FacilityServices.jsx"
import * as d3 from 'd3'

export const FacilityMap = ({ currentUser }) => {
    const [facility, setFacility] = useState({})
    const [houses, setHouses] = useState([])
    const svgRef = useRef()

    useEffect(() => {
        getByIdWithHouses(currentUser.facilityId).then(res => {
            setHouses(res.houses)
            setFacility({id: res.id, name: res.name})
        })
    }, [currentUser])

    useEffect(() => {
        const w = 1000
        const h = 600
        const svg = d3.select(svgRef.current)
                      .attr("width", w)
                      .attr("height", h)
        if (houses) {
            svg.selectAll("rect")
               .data(houses)
               .enter()
               .append("rect")
               .attr("x", (d, i) => i * (w / houses.length))
               .attr("y", 0)
               .attr("width", (w / houses.length) - 5)
               .attr("height", h)
               .attr("fill", "gray")

            svg.selectAll("a")
               .data(houses)
               .enter()
               .append("a")
               .attr('href', (d, i) => `map/${houses[i].id}`)
               .append('text')
               .attr("x", (d, i) => i * (w / houses.length) + (((w / houses.length) - 5) / 2))
               .attr("y", h / 2)
               .attr('text-anchor', 'middle')
               .attr("fill", 'white')
               .text(d => d.name)
        }

        svg.exit().remove()

    }, [houses])

    return (
        <>
            <h2>{facility.name} Facility View</h2>
            <h5>Select a house to view its heat map</h5>
            <svg ref={svgRef} />  
        </>
    )
}