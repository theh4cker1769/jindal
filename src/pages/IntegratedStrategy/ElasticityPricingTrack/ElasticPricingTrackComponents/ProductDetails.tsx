import React, { useEffect, useState } from 'react'
import RealvsExpected from './RealvsExpected'
import { Line } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js';
import { FiPlus, FiMinus } from "react-icons/fi";
Chart.register(...registerables);

const ProductDetails = (props: any) => {

    const [measureFilters, setMesurableFilters] = useState<any>({
        // productName: "",
        // productInfo: "",
        // subBrandName: "",
        // packSize: "",
        // displayName: "",
        // pricePerUnitFrom: '',
        // pricePerUnitTo: '',
        // pricePerUnitVar: '',
        // gramPerUnitFrom: '',
        // gramPerUnitTo: '',
        // gramPerUnitVar: '',
        // priceElasticityExpected: '',
        // gramsElasticityExpected: '',
        // modelPriceElasticity: "",
        // modelGramsElasticityCurve: "",
        // date: "",
        // mixSellIn: '',
        // mixSellInBrandLevel: ''
    })

    useEffect(() => {
        if (props.dataProdDetails) {

            const objectWithoutArray = props.dataProdDetails[0]
            setMesurableFilters(objectWithoutArray)
        }
    }, props.dataProdDetails)


    const [adjustableFiltersData, setAdjustableFiltersData] = useState<any>()
    useEffect(() => {
        if (props.adjustableFilters) {
            setAdjustableFiltersData(props.adjustableFilters)
            setLoading(true)
            sessionStorage.removeItem(`product_${props.activeProd}`)
            sessionStorage.removeItem(`product_realvsexp_${props.activeProd}`)
        }
    }, [props.adjustableFilters])

    useEffect(() => {
        if (adjustableFiltersData) {
            if (adjustableFiltersData.priceElasticityExpected) {
                setMesurableFilters((item: any) => ({
                    ...item,
                    priceElasticityExpected: adjustableFiltersData.priceElasticityExpected
                }))
            }
            if (adjustableFiltersData.gramsElasticityExpected) {
                setMesurableFilters((item: any) => ({
                    ...item,
                    gramsElasticityExpected: adjustableFiltersData.gramsElasticityExpected
                }))
            }
            if (adjustableFiltersData.modelGramElasticity) {
                setMesurableFilters((item: any) => ({
                    ...item,
                    modelGramElasticity: adjustableFiltersData.modelGramElasticity
                }))
            }
            if (adjustableFiltersData.modelPriceElasticity) {
                setMesurableFilters((item: any) => ({
                    ...item,
                    modelPriceElasticity: adjustableFiltersData.modelPriceElasticity
                }))
            }
        }
        if (pricePerUnitFrom || pricePerUnitTo || pricePerUnitVar) {
            setMesurableFilters((item: any) => ({
                ...item,
                pricePerUnitFrom: pricePerUnitFrom,
                pricePerUnitTo: pricePerUnitTo,
                pricePerUnitVar: pricePerUnitVar
            }))
        }
    }, [adjustableFiltersData])


    const [pricePerUnitFrom, setPricePerUnitFrom] = useState()
    const [pricePerUnitTo, setPricePerUnitTo] = useState()
    const [pricePerUnitVar, setPricePerUnitVar] = useState()


    const [dataProdDetails, setDataProdDetails] = useState<any>()
    useEffect(() => {
        if (props.dataProdDetails) {
            setDataProdDetails(props.dataProdDetails[0])
        }
    }, [props.dataProdDetails])

    useEffect(() => {
        if (dataProdDetails) {
            setPricePerUnitFrom(dataProdDetails.pricePerUnitFrom.toFixed(2))
            setPricePerUnitTo(dataProdDetails.pricePerUnitTo.toFixed(2))
            setPricePerUnitVar(dataProdDetails.pricePerUnitVar.toFixed(2))
        }
    }, [dataProdDetails])

    // Filter Values
    const [filterValues, setFilterValues] = useState<any>()
    useEffect(() => {
        if (props.filterValue) {
            setFilterValues(props.filterValue)
        }
    }, [props.filterValue])

    // All Payload State
    const [payloadValue, setPayLoadValue] = useState<any>({
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
        if (filterValues) {
            if (filterValues.country) {
                setPayLoadValue((item: any) => ({
                    ...item,
                    country: filterValues.country
                }));
            }
            if (filterValues.geoLevel) {
                setPayLoadValue((item: any) => ({
                    ...item,
                    geoLevel: filterValues.geoLevel
                }));
            }
            if (filterValues.channel) {
                const channelArr = filterValues.channel.map((item: any) => item.value)
                setPayLoadValue((item: any) => ({
                    ...item,
                    channel: channelArr
                }));
            }
            if (filterValues.geoLevel2) {
                setPayLoadValue((item: any) => ({
                    ...item,
                    geoLevel2: filterValues.geoLevel2
                }));
            }
            if (filterValues.category) {
                const categoryArr = filterValues.category.map((item: any) => item.value)
                setPayLoadValue((item: any) => ({
                    ...item,
                    category: categoryArr
                }));
            }
            if (filterValues.segment) {
                const segmentArr = filterValues.segment.map((item: any) => item.value)
                setPayLoadValue((item: any) => ({
                    ...item,
                    segment: segmentArr
                }));
            }
            if (filterValues.brand) {
                const brandArr = filterValues.brand.map((item: any) => item.value)
                setPayLoadValue((item: any) => ({
                    ...item,
                    brand: brandArr
                }));
            }
            if (filterValues.subBrand) {
                const subBrandArr = filterValues.subBrand.map((item: any) => item.value)
                setPayLoadValue((item: any) => ({
                    ...item,
                    subBrand: subBrandArr
                }));
            }
            if (filterValues.packSize) {
                const packSizeArr = filterValues.packSize.map((item: any) => item.value)
                setPayLoadValue((item: any) => ({
                    ...item,
                    packSize: packSizeArr
                }));
            }
            if (filterValues.permutation) {
                const permutationArr = filterValues.permutation.map((item: any) => item.value)
                setPayLoadValue((item: any) => ({
                    ...item,
                    permutation: permutationArr
                }));
            }
            if (filterValues.date) {
                const date = filterValues.date
                const day = date.getDate();
                const month = date.getMonth() + 1;
                const year = date.getFullYear();

                const formattedDay = day < 10 ? `0${day}` : `${day}`;
                const formattedMonth = month < 10 ? `0${month}` : `${month}`;

                const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
                setPayLoadValue((item: any) => ({
                    ...item,
                    date: formattedDate
                }));
            }
        }
    }, [filterValues])


    // Active Index
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
        const url = 'https://client3.wisdomanalytics.com/server/api/dashboards/elasticitypricetracking/unitvariationsexpected';
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
            "pricingDate": "2023-02-02T00:00:00.000+05:30"
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
                setDataProd(resultData.week)
                sessionStorage.setItem(`product_${resultData.name}`, JSON.stringify(resultData.week))
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
                const cachedProduct = sessionStorage.getItem(`product_${props.activeProd}`);
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

    const [chartGraphDataState, setChartGraphDataState] = useState<any>()
    const [loading, setLoading] = useState<any>();

    useEffect(() => {
        if (dataProd) {
            const chartGraphData = {
                labels: dataProd.map((_: any, i: any) => i + 1),
                datasets: [
                    {
                        label: "Price Effect",
                        data: dataProd.map((data: any) => data.priceEffect),
                        lineTension: 0.5
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

    // const [gramEffectToggleState, setGramEffectToggleState] = useState(false)
    // const gramEffectToggle = () => {
    //     setGramEffectToggleState(!gramEffectToggleState)
    // }

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
                                {/* <ul className="legendList p-0">
                                    <li><span></span> Price effect</li>
                                    <li><span></span> Total effect</li>
                                </ul> */}

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
                                        <input type="text" value={pricePerUnitFrom && pricePerUnitFrom} onChange={(e: any) => setPricePerUnitFrom(e.target.value)} />
                                    </li>
                                    <li>
                                        <label htmlFor="">
                                            Price Per <br />
                                            Pack To
                                        </label>
                                        <input type="text" value={pricePerUnitFrom && pricePerUnitTo} onChange={(e: any) => setPricePerUnitTo(e.target.value)} />
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
                    <div className="card-body">
                        <div className="graph-cus">
                            {chartGraphDataState &&
                                <Line data={chartGraphDataState} options={options} />
                            }
                        </div>
                        {chartGraphDataState &&
                            <div className="data-column">
                                {/* <div className="price-effect">
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
                                </div> */}
                                <div className="price-effect horizontal">
                                    <div className="heading">
                                        <h3>Price effect</h3>
                                    </div>
                                    <div className="content">
                                        {dataProd && dataProd.map((v: any, i: any) => (
                                            <span className="item" key={i}>
                                                {i + 1} <br />
                                                <i>{v.priceEffect.toFixed(2)}</i>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                {/* <div className="price-effect gram-effect">
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
                                    </div> */}
                                {/* <div className="price-effect total-effect">
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
                                </div> */}
                                <div className="price-effect horizontal total-effect">
                                    <div className="heading">
                                        <h3>Total effect</h3>
                                    </div>
                                    <div className="content">
                                        {dataProd && dataProd.map((v: any, i: any) => (
                                            <span className="item" key={i}>
                                                {i + 1} <br />
                                                <i>{v.totalEffect.toFixed(2)}</i>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                }
            </div>
            <RealvsExpected activeProd={props.activeProd} payloadValue={payloadValue} activeIndex={activeIndex} filterValues={filterValues} measureFilters={measureFilters} adjustableFiltersData={adjustableFiltersData} />
        </div>
    )
}

export default ProductDetails