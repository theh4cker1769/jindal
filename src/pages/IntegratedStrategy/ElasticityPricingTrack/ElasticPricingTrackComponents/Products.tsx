import React, { useState, useEffect, useRef } from 'react'
import { FiMinus, FiPlus } from 'react-icons/fi';
import { TbTriangleFilled } from "react-icons/tb";

const Products = (props: any) => {

    const [dropdown, setDropdown] = useState(true);

    const toggleDropdown = () => {
        setDropdown(!dropdown)
    }

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

    const [activeIndex, setActiveIndex] = useState<any>()
    const handleItemClick = (v: any, i: any) => {
        setActiveIndex(i)
        props.sendActiveIndex(v, i)
    }

    useEffect(() => {
        if (payloadValue.permutation.length) {
            setActiveIndex(1)
        }
    }, [payloadValue.permutation])

    const fetchData = async () => {
        const token = process.env.REACT_APP_TOKEN;
        const url = 'https://client3.wisdomanalytics.com/server/api/dashboards/elasticitypricetracking/adjustablefilters';
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
            "date": payloadValue.date,
            "dataSource": "sellOut"
        }

        try {

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
            });
            if (response.ok) {
                const result = await response.json();
                setDataProd(result)
            } else {
                console.error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }


    };

    const [render, setRender] = useState(false)

    useEffect(() => {
        if (render) {
            fetchData()
        } else {
            setRender(true);
        }
    }, [activeIndex])


    // Send Data 
    const [dataProd, setDataProd] = useState<any>()
    useEffect(() => {
        if (dataProd) {
            props.sendProductDataToParent(dataProd)
        }
    }, [dataProd])


    // Multile Products Select

    const [selectedProd, setSelectedProd] = useState<any>([]);
    const handlePlus = (v: any, i: any) => {
        if (!selectedProd.length && !selectedProd.includes(payloadValue.permutation[activeIndex - 1])) {
            if (v !== payloadValue.permutation[activeIndex - 1]) {
                selectedProd.push(payloadValue.permutation[activeIndex - 1]);
            }
        }
        if (selectedProd.length < 3) {
            setSelectedProd([...selectedProd, v]);
        }
    }
    console.log(selectedProd)

    useEffect(() => {
        props.addProdPlus(selectedProd)
    }, [selectedProd])

    const removeProduct = (v: any) => {
        props.removeProduct(v)
        const isSelected = selectedProd.includes(v)
        if (isSelected) {
            setSelectedProd(selectedProd.filter((key: any) => key !== v));
        }
    }

    return (
        <div className="products-main">
            <div className={`product-dropdown ${!dropdown ? 'show' : ''}`} onClick={toggleDropdown}>
                <h6>Products</h6>
                <TbTriangleFilled />
            </div>
            {dropdown &&
                <div className="collapse show" id="bodyLeft">
                    <ul className="bodyLeftList">
                        {payloadValue.permutation && payloadValue.permutation.length > 0 ?
                            <>
                                {payloadValue.permutation.map((v: any, i: any) => (
                                    <li key={i + 1} onClick={() => handleItemClick(v, i + 1)} className={`${activeIndex === i + 1 && !selectedProd.length ? 'active' : ''} ${selectedProd.includes(v) ? 'multiProd' : ''}`}>
                                        {v} <i className='icon' onClick={(e: any) => (handlePlus(v, i + 1))}> {selectedProd.includes(v) ? <FiMinus onClick={(e: any) => (removeProduct(v), e.stopPropagation())} /> : <> {selectedProd.length !== 3 && <FiPlus />} </>}</i>
                                    </li>
                                ))}
                            </>
                            :
                            <h6>Select Products</h6>
                        }
                    </ul>
                </div>
            }
        </div>
    )
}

export default Products