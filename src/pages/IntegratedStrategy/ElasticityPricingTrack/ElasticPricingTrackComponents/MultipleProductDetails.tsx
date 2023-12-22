import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';

const MultipleProductDetails = (props: any) => {

    // Measureable Filterrs
    const [measureFilters, setMesurableFilters] = useState<any>()
    useEffect(() => {
        if (props.dataProdDetails) {
            const objectWithoutArray = props.dataProdDetails[0]
            setMesurableFilters(objectWithoutArray)
        }
    }, props.dataProdDetails)


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

    // Fetch Multiproduct Data
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
                setDataProd(result.brands[0].child[0])

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
                fetchData()
            }
        } else {
            setRender(true);
        }
    }, [measureFilters]);

    // const [addProdPlusState, setAddProdPlusState] = useState<any>([])
    // useEffect(() => {
    //     if (props.addProdPlusState) {
    //         setAddProdPlusState(props.addProdPlusState)
    //     }
    // }, [props.addProdPlusState])


    const [selectedProdMes, setSelectedProdMes] = useState<any>([]);
    useEffect(() => {
        if (dataProd) {
            if (selectedProdMes.length < 3) {
                setSelectedProdMes([...selectedProdMes, dataProd]);
            }
        }
    }, [dataProd])

    

    useEffect(() => {
        if (props.removeProductState) {
            setSelectedProdMes(selectedProdMes.filter((v: any) => !props.removeProductState.includes(v.name)))
        }
    }, [props.removeProductState])

    const [loading, setLoading] = useState<any>();
    const [chartGraphDataState, setChartGraphDataState] = useState<any>()
    useEffect(() => {
        if (selectedProdMes.length) {
            const chartGraphData = {
                labels: selectedProdMes[0].week.map((_: any, i: any) => i + 1),
                datasets: selectedProdMes.map((item: any) => ({
                    label: item.displayName,
                    data: item.week.map((weekData: any) => weekData.priceEffect),
                    fill: false,
                    borderColor: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`,
                    tension: 0.5
                }))
            }
            setChartGraphDataState(chartGraphData)
        }
    }, [selectedProdMes])

    useEffect(()=>{
        if(selectedProdMes) {
            setLoading(false)
        }
    }, [chartGraphDataState])

    
    return (
        <div className="product-details-main-graph multiple-products">
            <h3 className="text-center p-2" id="sectionHead">
                Units Variation Expected
            </h3>

            <div className="graph-card card mt-3 mb-3">
                <div className="card-header py-0 px-2">
                    <div className="row align-items-start">
                        <div className="col-md-12">
                            <div className="listGroup w-100 table-responsive">

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
                                <Line
                                    data={chartGraphDataState}
                                    options={{
                                        responsive: true,
                                        scales: {
                                            y: {
                                                beginAtZero: true
                                            }
                                        }
                                    }}
                                />
                            }
                        </div>
                        <div className="data-column">
                            {selectedProdMes.map((v: any, i: any) => (
                                <div className="price-effect" key={i}>
                                    <div className="heading">
                                        <h3>{v.displayName}</h3>
                                    </div>
                                    <div className="content">
                                        {v.week.map((v: any, i: any) => (
                                            <span className="item" key={i}>
                                                {i+1}
                                                <br />
                                                <i>{v.priceEffect.toFixed(2)}</i>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default MultipleProductDetails