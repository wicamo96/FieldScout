import { useEffect, useState } from "react"
import { getCurrentGrowingWeek } from "../../services/ScoutingReportServices.jsx"
import { getByIdWithHouses } from "../../services/FacilityServices.jsx"
import { getPests } from "../../services/PestsServices.jsx"
import { Card, CardBody, CardTitle, Carousel, CarouselControl, CarouselIndicators, CarouselItem, Table } from "reactstrap"
import { DashboardGraph } from "./DashboardGraph.jsx"
import './Dashboard.css'

export const Dashboard = ({ currentUser }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [growingWeek, setGrowingWeek] = useState(0)
    const [facility, setFacility] = useState({})
    const [pests, setPests] = useState([])
    const [rows, setRows] = useState(0)
    const [even, setEven] = useState(false)
    const [houseList, setHouseList] = useState([])
    const [houseSelection, setHouseSelection] = useState({})
    const [activeIndex, setActiveIndex] = useState(0)
    const [animating, setAnimating] = useState(false)
    const [scoutingData, setScoutingData] = useState([])

    useEffect(() => {
        setHouseList(facility.houses)
    }, [facility])

    useEffect(() => {
        getCurrentGrowingWeek().then(res => setGrowingWeek(res))
    }, [])

    useEffect(() => {
        getByIdWithHouses(currentUser.facilityId).then(res => setFacility(res))
    }, [currentUser])

    useEffect(() => {
        getPests().then(res => {
            setPests(res)
            let rows = res.length / 2
            setRows(rows)
            if (rows % 2 === 0) {
                setEven(true)
            } else {
                setEven(false)
            }

        })
    }, [])

    useEffect(() => {
        if (growingWeek != 0 || facility != {}) {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        let tmp = []
        pests.map(pest => {
            tmp.push({pest: pest, houseId: houseSelection, growingWeek: growingWeek})
        })
        setScoutingData(tmp)
    }, [growingWeek, pests, houseSelection])

    const next = () =>{
        if (animating) return
        const nextIndex = activeIndex === scoutingData.length - 1 ? 0 : activeIndex + 1
        setActiveIndex(nextIndex)
    }

    const previous = () => {
        if (animating) return
        const nextIndex = activeIndex === 0 ? scoutingData.length - 1: activeIndex - 1
        setActiveIndex(nextIndex)
    }

    const goToIndex = (newIndex) => {
        if (animating) return
        setActiveIndex(newIndex)
    }

    const slides = scoutingData.map(data => {
        return (
            <CarouselItem
            className="sizeUp"
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={data.id}
            >
                <DashboardGraph pest={data.pest} houseId={data.houseId} growingWeek={data.growingWeek} />
            </CarouselItem>
        )
    })

    return isLoading ?
        <div>Loading!</div>
    :
        <main className="background">
            <article className="dashboardBackground">
                <Card className="smallCard">
                    <CardTitle>
                    <h2>{facility.name} Week {growingWeek}</h2>
                    </CardTitle>
                    <CardBody>
                        <label>
                            <span>Last four growing weeks of data for </span>
                            <select onClick={(e) => setHouseSelection(e.target.value)}>
                                <option selected disabled>Filter By House</option>
                                {houseList?.map(house => {
                                    return (
                                        <option value={house.id}>{house.name}</option>
                                    )
                                })}
                            </select>
                        </label>
                    </CardBody>
                </Card>
                <Carousel
                    activeIndex={activeIndex}
                    next={next}
                    previous={previous}
                    pause='hover'
                    keyboard='true'
                    className="carousel"
                >
                    <CarouselIndicators
                        items={pests}
                        activeIndex={activeIndex}
                        onClickHandler={goToIndex}
                    />
                    {slides}
                    <CarouselControl
                        direction="prev"
                        directionText="Previous"
                        onClickHandler={previous}
                    />
                    <CarouselControl
                        direction="next"
                        directionText="Next"
                        onClickHandler={next}
                    />
                </Carousel>
            </article>
        </main>
}