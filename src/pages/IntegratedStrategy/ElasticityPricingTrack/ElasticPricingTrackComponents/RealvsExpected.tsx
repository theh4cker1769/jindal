import React, { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables);

const RealvsExpected = (props: any) => {

    


    //Measurable Fiters
    const [measureFilters, setMesurableFilters] = useState<any>()
    useEffect(() => {
        if (props.measureFilters) {
            setMesurableFilters(props.measureFilters)
            setLoading(false)
        }
    }, [props.measureFilters])


    // Payload Values
    const [payloadValue, setPlayloadValue] = useState<any>({
        country: '',
        geoLevel: '',
        channel: '',
        geoLevel2: '',
        category: '',
        segment: '',
        brand: '',
        subBrand: '',
        packSize: '',
        permutation: '',
        date: ''
    })
    useEffect(() => {
        if (props.payloadValue) {
            setPlayloadValue(props.payloadValue)
        }
    }, [props.payloadValue])

    const [activeIndex, setActiveIndex] = useState<any>()
    useEffect(() => {
        if (props.activeIndex) {
            setActiveIndex(props.activeIndex)
            setLoading(true)
        }
    }, [props.activeIndex])

    // Fetch Data
    const [dataProd, setDataProd] = useState<any>()
    const fetchData = async () => {
        const token = process.env.REACT_APP_TOKEN;
        const url = 'https://client3.wisdomanalytics.com/server/api/dashboards/elasticitypricetracking/realvsexpected';
        const payload = {
            "country": payloadValue.country,
            "geoLevel": [payloadValue.geoLevel],
            "channel": payloadValue.channel,
            "geoLevel2": [payloadValue.geoLevel2],
            "category": payloadValue.category,
            "segment": payloadValue.segment,
            "brand": payloadValue.brand,
            "subBrand": payloadValue.subBrand,
            "packSize": payloadValue.packSize,
            "permutation": [payloadValue.permutation[activeIndex - 1]],
            "regions": null,

            //selectProd
            "measureFilters": [measureFilters],
            "date": "06/11/2023",
            "pricingDate": "2023-02-02T00:00:00.000+05:30",
            "variationType": "unit",
            "dataSource": "sellOut",
        }

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
                const resultData = result.brands[0].child[0]
                setDataProd(resultData.weekData1)
                localStorage.setItem(`product_realvsexp_${resultData.name}`, JSON.stringify(resultData.weekData1))
            } else {
                console.error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }

    }

    const [render, setRender] = useState(false)
    useEffect(() => {
        if (render) {
            if (measureFilters) {
                const cachedProduct = localStorage.getItem(`product_realvsexp_${props.activeProd}`);
                if (cachedProduct) {
                    setDataProd(JSON.parse(cachedProduct))
                } else {
                    fetchData()
                }
            }
        } else {
            setRender(true);
        }
    }, [measureFilters]);
    console.log('hello', dataProd)


    const [chartGraphDataState, setChartGraphDataState] = useState<any>()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (dataProd) {
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
        }
    }, [dataProd])

    useEffect(() => {
        if (chartGraphDataState) {
            setLoading(false)
        }
    }, [chartGraphDataState])

    return (
        <div className='realvsexpected card'>
            <div className="card-header">
                <h3>Price Elasticity Real Vs Expected</h3>
            </div>
            <div className="card-body">
                {loading ?
                    <div className="loader">
                        <div className="pl4">
                            <div className="pl4__a"></div>
                            <div className="pl4__b"></div>
                            <div className="pl4__c"></div>
                            <div className="pl4__d"></div>
                        </div>
                    </div>
                    :
                    <>
                        {chartGraphDataState &&
                            <Bar data={chartGraphDataState} />
                        }
                    </>
                }
            </div>
        </div>
    )
}

export default RealvsExpected