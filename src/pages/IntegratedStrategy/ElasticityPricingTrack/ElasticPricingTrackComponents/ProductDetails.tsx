import { useEffect, useState } from 'react'
import RealvsExpected from './RealvsExpected'
import { Line } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js';
import { FiPlus, FiMinus } from "react-icons/fi";
Chart.register(...registerables);

const ProductDetails = (props: any) => {

    const [pricePerUnitFrom, setPricePerUnitFrom] = useState()
    const [pricePerUnitTo, setPricePerUnitTo] = useState()
    const [pricePerUnitVar, setPricePerUnitVar] = useState()
    const [filterDate, setFilterDate] = useState()
    const [filterValue, setFilterValue] = useState<any>([])

    // Adjustable Filters
    const [adjustableFiltersData, setAdjustableFiltersData] = useState<any>({})

    useEffect(() => {
        if (props.adjustableFilters) {
            setAdjustableFiltersData(props.adjustableFilters)
        }
    }, [props.adjustableFilters])

    useEffect(() => {
        if (props.dataProdDetails.length > 0) {
            setPricePerUnitFrom(props.dataProdDetails[0].pricePerUnitFrom.toFixed(2))
            setPricePerUnitTo(props.dataProdDetails[0].pricePerUnitTo.toFixed(2))
            setPricePerUnitVar(props.dataProdDetails[0].pricePerUnitVar.toFixed(2))
        }
    }, [props.dataProdDetails])

    useEffect(() => {
        if (props.filterDate) {
            const day = props.filterDate.getDate().toString().padStart(2, '0');
            const month = (props.filterDate.getMonth() + 1).toString().padStart(2, '0');
            const year = props.filterDate.getFullYear();
            const date: any = `${day}/${month}/${year}`
            setFilterDate(date)
        }
    }, [props.filterDate])

    useEffect(()=>{
        if (props.filterValue) {
            setFilterValue(props.filterValue)
        }
    }, [props.filterValue])


    const [selectProd, setSelectProd] = useState<any>()

    useEffect(() => {

        const handleClickFirElem = () => {
            setSelectProd(props.dataArray[0].value)
        }

        if (props.countFirstProd > 0) {
            handleClickFirElem();
        }

    }, [props.countFirstProd]);

    useEffect(() => {
        setSelectProd(props.selectedProdState)
    }, [props.selectedProdState])

    const [dataProd, setDataProd] = useState<any>()
    const [chartGraphDataState, setChartGraphDataState] = useState<any>()
    const [payloadData, setPayloadData] = useState<any>()

    const fetchData = async () => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXIiOiIiLCJqdGkiOiIiLCJpc3MiOiIiLCJhdWQiOiJhcGk6Ly9kZWZhdWx0IiwiaWF0IjoxNzAyNDQ5NTkxLCJleHAiOjE3MDI1MzU5OTEsImNpZCI6IiIsInVpZCI6IiIsInNjcCI6IiIsImF1dGhfdGltZSI6IiIsInBlcGFwcG1pZWJhY2hyb2xlcyI6IiIsInBlcGFwcG1pZWJhY2h3YXJlaG91c2UiOiIiLCJwZXBSZWdpc3RlcmVkIjoiIiwibG9jYWxlIjoiIiwiRmlyc3ROYW1lIjoiTmFkZWVtIiwiTGFzdE5hbWUiOiJOYWthZGUiLCJlbWFpbCI6Im5hZGVlbS5uYWthZGVAamluZGFseC5jb20iLCJncGlkIjoibmFkZWVtLm5ha2FkZUBqaW5kYWx4LmNvbSIsIm5hbWUiOiJuYWRlZW0ubmFrYWRlQGppbmRhbHguY29tIiwidXNlcl9pZCI6IjEwMDU4Iiwic3ViIjoibmFkZWVtLm5ha2FkZUBqaW5kYWx4LmNvbSIsIm5iZiI6MTcwMjQ0OTU5MX0.D-PvrNKTpYGED_9MCcwd0NzGFTvaUC2A2BGUPRZQl_w';
        const url = 'https://client3.wisdomanalytics.com/server/api/dashboards/elasticitypricetracking/unitvariationsexpected';
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
            "category": filterValue.category.map((v: any) => v.value) || [],
            "segment": filterValue.segment.map((v: any) => v.value) || [],
            "brand": filterValue.brand.map((v: any) => v.value) || [],
            "subBrand": filterValue.subBrand.map((v: any) => v.value) || [],
            "packSize": filterValue.packSize.map((v: any) => v.value) || [],
            "permutation": filterValue.permutation.map((v: any) => v.value) || [],
            //selectProd
            "measureFilters": [
                {
                    "productName": "HUGGIES",
                    "productInfo": selectProd,
                    "subBrandName": "HUGGIES ULTIMATE",
                    "packSize": "JUMBO PK-WALKER NAP",
                    "displayName": selectProd,
                    "pricePerUnitFrom": pricePerUnitFrom,
                    "pricePerUnitTo": pricePerUnitTo,
                    "pricePerUnitVar": pricePerUnitVar,
                    "gramPerUnitFrom": 52,
                    "gramPerUnitTo": 52,
                    "gramPerUnitVar": 0,
                    "priceElasticityExpected": adjustableFiltersData.priceElasticityExpected,
                    "gramsElasticityExpected": adjustableFiltersData.gramsElasticityExpected,
                    "modelPriceElasticity": adjustableFiltersData.modelPriceElasticity,
                    "modelGramsElasticityCurve": adjustableFiltersData.modelGramElasticity,
                    "date": "06/11/2023",
                    "mixSellIn": 1,
                    "mixSellInBrandLevel": 1
                }
            ],
            "date": "06/11/2023",
            "pricingDate": "2023-02-01T00:00:00.000+05:30"
        }

        setPayloadData(payload)

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
                setDataProd(result.brands[0].child[0].week)
                const chartGraphData = {
                    labels: dataProd.map((_: any, i: any) => i + 1),
                    datasets: [
                        {
                            label: "Gram Effect",
                            data: dataProd.map((data: any) => data.gramEffect)
                        },
                        {
                            label: "Price Effect",
                            data: dataProd.map((data: any) => data.priceEffect)
                        },
                        {
                            label: "Total Effect",
                            data: dataProd.map((data: any) => data.totalEffect)
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
        if (selectProd) {
            fetchData();
        }
        if (adjustableFiltersData.length > 0) {
            fetchData();
        }
    }, [selectProd, adjustableFiltersData])


    const options = {
        scales: {
            x: {
                ticks: {
                    autoSkip: false
                }
            }
        }
    };


    const [priceEffectToggleState, setPriceEffectToggleState] = useState(true)
    const priceEffectToggle = () => {
        setPriceEffectToggleState(!priceEffectToggleState)
    }

    const [gramEffectToggleState, setGramEffectToggleState] = useState(false)
    const gramEffectToggle = () => {
        setGramEffectToggleState(!gramEffectToggleState)
    }

    const [totalEffectToggleState, setTotalEffectToggleState] = useState(false)
    const totalEffectToggle = () => {
        setTotalEffectToggleState(!totalEffectToggleState)
    }

    return (
        <div className="product-details-main-graph">
            <h3 className="text-center p-2" id="sectionHead">
                Units Variation Expected
            </h3>

            <div className="graph-card card mt-3 mb-3">
                <div className="card-header py-0 px-2">
                    <div className="row align-items-start">
                        <div className="col-md-12">
                            <div className="listGroup w-100 table-responsive">
                                <ul className="legendList p-0">
                                    <li><span></span> Price effect</li>
                                    <li><span></span> Total effect</li>
                                </ul>

                                <ul className="zoom p-0">
                                    <li>
                                        <img
                                            src="/images/full_screen.svg"
                                            alt=""
                                        />
                                    </li>
                                    <li>
                                        <img src="/images/zoom.svg" alt="" />
                                    </li>
                                </ul>

                                <ul className="PriceList p-0">
                                    <li>
                                        <label htmlFor="">
                                            Price Per <br />
                                            Pack From
                                        </label>
                                        <input type="text" name="" id="" value={pricePerUnitFrom} onChange={(e: any) => setPricePerUnitFrom(e.target.value)} />
                                    </li>
                                    <li>
                                        <label htmlFor="">
                                            Price Per <br />
                                            Pack To
                                        </label>
                                        <input type="text" name="" id="" value={pricePerUnitTo} onChange={(e: any) => setPricePerUnitTo(e.target.value)} />
                                    </li>
                                    <li>
                                        Var : <span className="highlight"> {pricePerUnitVar}</span>
                                    </li>

                                    <li>
                                        <img src="/images/plus.svg" alt="" />
                                        <img src="/images/camera.svg" alt="" />
                                        <img src="/images/gallary.svg" alt="" />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="headline">
                        <ul className="graph_head">
                            <li className="mr-5">HUGGIES MATS MATS REGULAR-NA</li>
                            <li>HUGGIES MATS MATS REGULAR-NA</li>
                        </ul>
                    </div>
                    <div className="graph-cus">
                        {chartGraphDataState &&
                            <Line data={chartGraphDataState} options={options} />
                        }
                    </div>
                    {chartGraphDataState &&
                        <div className="data-column">
                            <div className="price-effect">
                                <div className="heading" onClick={priceEffectToggle}>
                                    <h3>Price effect</h3>
                                    {!priceEffectToggleState ? <FiPlus /> : <FiMinus />}
                                </div>
                                {priceEffectToggleState &&
                                    <div className="content">
                                        {dataProd && dataProd.map((v: any, i: any) => (
                                            <span className="item" key={i}>
                                                {i + 1} <br />
                                                <i>{v.priceEffect.toFixed(2)}</i>
                                            </span>
                                        ))}
                                    </div>
                                }
                            </div>
                            <div className="price-effect gram-effect">
                                <div className="heading" onClick={gramEffectToggle}>
                                    <h3>Gram effect</h3>
                                    {!gramEffectToggleState ? <FiPlus /> : <FiMinus />}
                                </div>
                                {gramEffectToggleState &&
                                    <div className="content">
                                        {dataProd && dataProd.map((v: any, i: any) => (
                                            <span className="item" key={i}>
                                                {i + 1} <br />
                                                <i>{v.gramEffect.toFixed(2)}</i>
                                            </span>
                                        ))}
                                    </div>
                                }
                            </div>
                            <div className="price-effect total-effect">
                                <div className="heading" onClick={totalEffectToggle}>
                                    <h3>Total effect</h3>
                                    {!totalEffectToggleState ? <FiPlus /> : <FiMinus />}
                                </div>
                                {totalEffectToggleState &&
                                    <div className="content">
                                        {dataProd && dataProd.map((v: any, i: any) => (
                                            <span className="item" key={i}>
                                                {i + 1} <br />
                                                <i>{v.totalEffect.toFixed(2)}</i>
                                            </span>
                                        ))}
                                    </div>
                                }
                            </div>
                        </div>
                    }
                </div>
                
            </div>
            <RealvsExpected payloadData={payloadData} selectProd={selectProd} adjustableFiltersData={adjustableFiltersData}/>
        </div>
    )
}

export default ProductDetails