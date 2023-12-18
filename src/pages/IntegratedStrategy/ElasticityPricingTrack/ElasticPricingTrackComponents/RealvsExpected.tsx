import React, { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables);

const RealvsExpected = (props: any) => {

    const [dataProd, setDataProd] = useState<any>()
    const [chartGraphDataState, setChartGraphDataState] = useState<any>()

    //Measurable Fiters
    const [measureFilters, setMesurableFilters] = useState<any>({})
    useEffect(() => {
        if (measureFilters) {
            setMesurableFilters(measureFilters)
        }
    }, [measureFilters])


    // Filter Values
    const [filterValues, setFilterValues] = useState<any>()
    useEffect(() => {
        if (props.filterValue) {
            setFilterValues(props.filterValue)
        }
    }, [props.filterValue])

    // All Payload State
    const [country, setCountry] = useState<any>()
    const [geoLevel, setGeoLevel] = useState<any>()
    const [channel, setChannel] = useState<any>()
    const [geoLevel2, setGeoLevel2] = useState<any>()
    const [category, setCategory] = useState<any>()
    const [segment, setSegment] = useState<any>()
    const [brand, setBrand] = useState<any>()
    const [subBrand, setSubBrand] = useState<any>()
    const [packSize, setPackSize] = useState<any>()
    const [permutation, setPermutation] = useState<any>()
    const [date, setDate] = useState<any>()

    useEffect(() => {
        if (filterValues) {
            if (filterValues.country) {
                setCountry(filterValues.country)
            }
            if (filterValues.geoLevel) {
                setGeoLevel(filterValues.geoLevel)
            }
            if (filterValues.channel) {
                const channelArr = filterValues.channel.map((item: any) => item.value)
                setChannel(channelArr)
            }
            if (filterValues.geoLevel2) {
                setGeoLevel2(filterValues.geoLevel2)
            }
            if (filterValues.category) {
                const categoryArr = filterValues.category.map((item: any) => item.value)
                setCategory(categoryArr)
            }
            if (filterValues.segment) {
                const segmentArr = filterValues.segment.map((item: any) => item.value)
                setSegment(segmentArr)
            }
            if (filterValues.brand) {
                const brandArr = filterValues.brand.map((item: any) => item.value)
                setBrand(brandArr)
            }
            if (filterValues.subBrand) {
                const subBrandArr = filterValues.subBrand.map((item: any) => item.value)
                setSubBrand(subBrandArr)
            }
            if (filterValues.packSize) {
                const packSizeArr = filterValues.packSize.map((item: any) => item.value)
                setPackSize(packSizeArr)
            }
            if (filterValues.permutation) {
                const permutationArr = filterValues.permutation.map((item: any) => item.value)
                setPermutation(permutationArr)
            }
            if (filterValues.date) {
                const date = filterValues.date
                const day = date.getDate();
                const month = date.getMonth() + 1;
                const year = date.getFullYear();

                const formattedDay = day < 10 ? `0${day}` : `${day}`;
                const formattedMonth = month < 10 ? `0${month}` : `${month}`;

                const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;

                setDate(formattedDate)
            }
        }
    }, [filterValues])

    const [activeIndex, setActiveIndex] = useState<any>(0)
    useEffect(() => {
        if (props.activeIndex) {
            setActiveIndex(props.activeIndex)
        }
    }, [props.activeIndex])

    const fetchData = async () => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXIiOiIiLCJqdGkiOiIiLCJpc3MiOiIiLCJhdWQiOiJhcGk6Ly9kZWZhdWx0IiwiaWF0IjoxNzAyODc1NDc0LCJleHAiOjE3MDI5NjE4NzQsImNpZCI6IiIsInVpZCI6IiIsInNjcCI6IiIsImF1dGhfdGltZSI6IiIsInBlcGFwcG1pZWJhY2hyb2xlcyI6IiIsInBlcGFwcG1pZWJhY2h3YXJlaG91c2UiOiIiLCJwZXBSZWdpc3RlcmVkIjoiIiwibG9jYWxlIjoiIiwiRmlyc3ROYW1lIjoiTmFkZWVtIiwiTGFzdE5hbWUiOiJOYWthZGUiLCJlbWFpbCI6Im5hZGVlbS5uYWthZGVAamluZGFseC5jb20iLCJncGlkIjoibmFkZWVtLm5ha2FkZUBqaW5kYWx4LmNvbSIsIm5hbWUiOiJuYWRlZW0ubmFrYWRlQGppbmRhbHguY29tIiwidXNlcl9pZCI6IjEwMDU4Iiwic3ViIjoibmFkZWVtLm5ha2FkZUBqaW5kYWx4LmNvbSIsIm5iZiI6MTcwMjg3NTQ3NH0.sQtqy2t7JDye91r9vYi8LcLPce87RHQ_q0mhNt_V3as';
        const url = 'https://client3.wisdomanalytics.com/server/api/dashboards/elasticitypricetracking/realvsexpected';
        const payload = {
            "country": country,
            "geoLevel": [geoLevel],
            "channel": channel,
            "geoLevel2": [geoLevel2],
            "category": category,
            "segment": segment,
            "brand": brand,
            "subBrand": subBrand,
            "packSize": packSize,
            "permutation": [permutation[activeIndex]],
            "regions": null,

            //selectProd
            "measureFilters": measureFilters,
            "date": "06/11/2023",
            "pricingDate": "2023-02-02T00:00:00.000+05:30",
            "variationType": "unit"
        }

        // const payload = props.payloadData

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            if (response.ok) {
                const result = await response.json()
                setDataProd(result.brands[0].child[0].weekData1)
                const chartGraphData = {
                    labels: dataProd.map((data: any) => data.date),
                    datasets: [
                        {
                            label: "Real",
                            data: dataProd.map((data: any) => data.real)
                        },
                        {
                            label: "Expected",
                            data: dataProd.map((data: any) => data.expected)
                        }
                    ]
                }
                setChartGraphDataState(chartGraphData)
            } else {
                console.error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }

    }

    useEffect(() => {
        if(measureFilters.length) {
            fetchData()
        }
        
    }, [measureFilters])

    return (
        <div className='realvsexpected card'>
            <div className="card-header">
                <h3>Price Elasticity Real Vs Expected</h3>
            </div>
            <div className="card-body">
                {chartGraphDataState &&
                    <Bar data={chartGraphDataState} />
                }
            </div>
        </div>
    )
}

export default RealvsExpected