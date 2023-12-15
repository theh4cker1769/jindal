import React, { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables);

const RealvsExpected = (props: any) => {

    const [dataProd, setDataProd] = useState<any>()
    const [chartGraphDataState, setChartGraphDataState] = useState<any>()

    const fetchData = async () => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXIiOiIiLCJqdGkiOiIiLCJpc3MiOiIiLCJhdWQiOiJhcGk6Ly9kZWZhdWx0IiwiaWF0IjoxNzAyNTQyMjUyLCJleHAiOjE3MDI2Mjg2NTIsImNpZCI6IiIsInVpZCI6IiIsInNjcCI6IiIsImF1dGhfdGltZSI6IiIsInBlcGFwcG1pZWJhY2hyb2xlcyI6IiIsInBlcGFwcG1pZWJhY2h3YXJlaG91c2UiOiIiLCJwZXBSZWdpc3RlcmVkIjoiIiwibG9jYWxlIjoiIiwiRmlyc3ROYW1lIjoiTmFkZWVtIiwiTGFzdE5hbWUiOiJOYWthZGUiLCJlbWFpbCI6Im5hZGVlbS5uYWthZGVAamluZGFseC5jb20iLCJncGlkIjoibmFkZWVtLm5ha2FkZUBqaW5kYWx4LmNvbSIsIm5hbWUiOiJuYWRlZW0ubmFrYWRlQGppbmRhbHguY29tIiwidXNlcl9pZCI6IjEwMDU4Iiwic3ViIjoibmFkZWVtLm5ha2FkZUBqaW5kYWx4LmNvbSIsIm5iZiI6MTcwMjU0MjI1Mn0.3vXE_hPFBBOxvCc0IzGss_UByHCbnTB1-bDlZM-5-aw';
        const url = 'https://client3.wisdomanalytics.com/server/api/dashboards/elasticitypricetracking/realvsexpected';
        const payload = {
            "country": "AUSTRALIA",
            "geoLevel": [
                "4A-RTLR"
            ],
            "channel": [
                "GROCERY",
                "PHARMACY"
            ],
            "geoLevel2": [
                "4A-RTLR-WOOLWORTHS"
            ],
            "dataSource": "sellOut",
            "regions": null,
            "category": [
                "NAPPIES & CHILD CARE"
            ],
            "segment": [
                "NAPPY PANTS-UNMAPPED"
            ],
            "brand": [
                "HUGGIES"
            ],
            "subBrand": [
                "HUGGIES ULTIMATE"
            ],
            "packSize": [
                "BULK PK-JUNIOR NAP",
                "BULK PK-TODDLER NAP",
                "BULK PK-WALKER NAP",
                "JUMBO PK-JUNIOR NAP",
                "JUMBO PK-TODDLER NAP",
                "JUMBO PK-WALKER NAP"
            ],
            "permutation": [
                "HUGGIES ULTIMATE-BULK PK-WALKER NAP"
            ],
            "measureFilters": [
                {
                    "productName": "HUGGIES",
                    "productInfo": "HUGGIES ULTIMATE-BULK PK-WALKER NAP",
                    "subBrandName": "HUGGIES ULTIMATE",
                    "packSize": "BULK PK-WALKER NAP",
                    "displayName": "HUGGIES ULTIMATE BULK PK-WALKER NAP",
                    "pricePerUnitFrom": 19.8990001678467,
                    "pricePerUnitTo": 19.8990001678467,
                    "pricePerUnitVar": 0,
                    "gramPerUnitFrom": 28,
                    "gramPerUnitTo": 28,
                    "gramPerUnitVar": 0,
                    "priceElasticityExpected": 0,
                    "gramsElasticityExpected": 0,
                    "modelPriceElasticity": "High",
                    "modelGramsElasticityCurve": "High",
                    "date": "03/12/2023",
                    "mixSellIn": 1,
                    "mixSellInBrandLevel": 1
                }
            ],
            "date": "03/12/2023",
            "pricingDate": "2023-02-01T00:00:00.000+05:30",
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
                console.log(dataProd)
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
        if (props.selectProd) {
            fetchData();
        }
        if (props.adjustableFiltersData.length > 0) {
            fetchData();
        }
    }, [props.selectProd, props.adjustableFiltersData])

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