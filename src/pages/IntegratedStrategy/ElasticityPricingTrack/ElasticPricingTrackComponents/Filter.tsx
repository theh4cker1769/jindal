import React, { useEffect, useState } from "react";
import Select, { components } from 'react-select'
import DatePicker from "react-datepicker";
import { LuCalendarCheck2 } from "react-icons/lu";

import "react-datepicker/dist/react-datepicker.css";

const Filter = (props: any) => {

    const [selectedValue, setSelectedValue] = useState('Geo-Filters');

    const handleChange = (e: any) => {
        setSelectedValue(e.value)
    };

    // Date Picker
    const [startDate, setStartDate] = useState(null);

    const mainOptions = [
        { value: 'Geo-Filters', label: 'Geo-Filters' },
        { value: 'Product Filters', label: 'Product Filters' }
    ]

    const InputOption = (props: any) => { return (<div> <components.Option {...props}> <input type="checkbox" checked={props.isSelected} onChange={() => null} /> <label>{props.value}</label> </components.Option> </div>); };


    // Geo Filters

    const [parentKey, setParentKey] = useState<any>('COUNTRY')
    const [multipleChildItems, setMultipleChildItems] = useState<any>('COUNTRY')
    const [resultData, setResultData] = useState<any>()

    const fetchData = async (type: string) => {
        const token = process.env.REACT_APP_TOKEN_FILTER;
        const url = `http://localhost:81/api/configuration/GetDropDownItems/${parentKey}/${multipleChildItems}`

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            if (response.ok) {
                const result = await response.json()
                if (type == 'initial') {
                    setResultData(result)
                } else if (type == 'Geo-Level') {
                    const data = result.map((v: any) => ({ value: v.lkP_DESCRIPTION, label: v.lkP_DESCRIPTION, }))
                    setGeoLevelData(data)
                } else if (type == "Channel") {
                    const data = result.map((v: any) => ({ value: v.lkP_DESCRIPTION, label: v.lkP_DESCRIPTION, }))
                    setChannelData(data)
                } else if (type == "geoLevel2") {
                    const data = result.map((v: any) => ({ value: v.lkP_DESCRIPTION, label: v.lkP_DESCRIPTION, }))
                    setGeolevel2Data(data)
                } else {
                    console.log("select")
                }
            } else {
                console.error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchData('initial')
    }, [])


    // Country
    const [countryData, setCountryData] = useState<any>()
    const [countryDataVal, setCountryDataVal] = useState<any>()

    useEffect(() => {
        if (resultData) {
            const countryActData: any = { value: resultData[0].lkP_DESCRIPTION, label: resultData[0].lkP_DESCRIPTION }
            setCountryData([countryActData])
            setTimeout(() => {
                setCountryDataVal(countryActData.value)
            }, 1000)
        }
    }, [resultData])


    // Geo-Level 
    const [geoLevelData, setGeoLevelData] = useState<any>()
    const [geoLevelDataVal, setGeoLevelDataVal] = useState<any>()

    useEffect(() => {
        if (countryDataVal) {
            setParentKey('GEO_LEVEL')
            setMultipleChildItems(countryDataVal)
        }
    }, [countryDataVal])

    useEffect(() => {
        if (parentKey == 'GEO_LEVEL') {
            fetchData('Geo-Level')
        }
    }, [parentKey, multipleChildItems])

    const geolevel = (selectedOption: any) => {
        setGeoLevelDataVal(selectedOption.value)
    }


    // Channel
    const [channelData, setChannelData] = useState<any>()
    const [channelDataVal, setChannelDataVal] = useState<any>()

    useEffect(() => {
        if (geoLevelDataVal) {
            setParentKey('CHANNEL')
            setMultipleChildItems(geoLevelDataVal)
        }
    }, [geoLevelDataVal])

    useEffect(() => {
        if (parentKey == 'CHANNEL') {
            fetchData('Channel')
        }
    }, [parentKey, multipleChildItems])

    const channel = (selectedOption: any) => {
        setChannelDataVal(selectedOption)
    }


    // Geo-Level 2
    const [geolevel2Data, setGeolevel2Data] = useState<any>()
    const [geolevel2DataVal, setGeolevel2DataVal] = useState<any>()

    useEffect(() => {
        if (channelDataVal) {
            setParentKey('GEO_LEVEL2')
            const channelSelectVal = channelDataVal.map((item: any) => item.value)
            const channelSelectValString = channelSelectVal.join(',');
            setMultipleChildItems(channelSelectValString)
        }
    }, [channelDataVal])

    useEffect(() => {
        if (parentKey == 'GEO_LEVEL2') {
            fetchData('geoLevel2')
        }
    }, [parentKey, multipleChildItems])

    const geolevel2 = (selectedOption: any) => {
        setGeolevel2DataVal(selectedOption.value)
    }


    // Product Filters

    const [parentKeyProduct, setParentKeyProduct] = useState<any>('PRODUCT_CATEGORY')
    const [multipleChildItemsProduct, setMultipleChildItemsProduct] = useState<any>('PRODUCT_CATEGORY')
    const [resultDataProduct, setResultDataProduct] = useState<any>()

    const fetchDataProduct = async (type: string) => {
        const token = process.env.REACT_APP_TOKEN_FILTER;
        const url = `http://localhost:81/api/configuration/GetDropDownItems/${parentKeyProduct}/${multipleChildItemsProduct}`

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            if (response.ok) {
                const result = await response.json()
                if (type == 'initialProduct') {
                    const data = result.map((v: any) => ({ value: v.lkP_DESCRIPTION, label: v.lkP_DESCRIPTION, }))
                    setResultDataProduct(data)
                } else if (type == 'PRODUCT_SEGMENT') {
                    const data = result.map((v: any) => ({ value: v.lkP_DESCRIPTION, label: v.lkP_DESCRIPTION, }))
                    setProductSegmentData(data)
                } else if (type == 'PRODUCT_BRAND') {
                    const data = result.map((v: any) => ({ value: v.lkP_DESCRIPTION, label: v.lkP_DESCRIPTION, }))
                    setProductBrandData(data)
                } else if (type == 'PRODUCT_SUB_BRAND') {
                    const data = result.map((v: any) => ({ value: v.lkP_DESCRIPTION, label: v.lkP_DESCRIPTION, }))
                    setProductSubBrandData(data)
                } else if (type == 'PRODUCT_PACK_SIZE') {
                    const data = result.map((v: any) => ({ value: v.lkP_DESCRIPTION, label: v.lkP_DESCRIPTION, }))
                    setProductPackSizeData(data)
                } else if (type == 'PRODUCT_PERMUTATION_COMPUTAION') {
                    const data = result.map((v: any) => ({ value: v.lkP_DESCRIPTION, label: v.lkP_DESCRIPTION, }))
                    setProductPermutationData(data)
                } else {
                    console.log("Something is wrong")
                }
            } else {
                console.error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchDataProduct('initialProduct')
    }, [])


    // product category
    const [productCategoryData, setProductCategoryData] = useState<any>()
    const [productCategoryDataVal, setProductCategoryDataVal] = useState<any>()

    useEffect(() => {
        if (resultDataProduct) {
            setProductCategoryData(resultDataProduct)
        }
    }, [resultDataProduct])

    const handleCategory = (selectedValue: any) => {
        setProductCategoryDataVal(selectedValue)
    }


    // product segment 
    const [productSegmentData, setProductSegmentData] = useState<any>()
    const [productSegmentDataVal, setProductSegmentDataVal] = useState<any>()

    useEffect(() => {
        if (productCategoryDataVal) {
            setParentKeyProduct('PRODUCT_SEGMENT')
            const main = productCategoryDataVal.map((item: any) => item.value)
            const string = main.join(',');
            setMultipleChildItemsProduct(string)
        }
    }, [productCategoryDataVal])

    useEffect(() => {
        if (parentKeyProduct == 'PRODUCT_SEGMENT') {
            fetchDataProduct('PRODUCT_SEGMENT')
        }
    }, [parentKeyProduct, multipleChildItemsProduct])

    const handleSegment = (selectedValue: any) => {
        setProductSegmentDataVal(selectedValue)
    }


    // product brand 
    const [productBrandData, setProductBrandData] = useState<any>()
    const [productBrandDataVal, setProductBrandtDataVal] = useState<any>()

    useEffect(() => {
        if (productSegmentDataVal) {
            setParentKeyProduct('PRODUCT_BRAND')
            const main = productSegmentDataVal.map((item: any) => item.value)
            const string = main.join(',');
            setMultipleChildItemsProduct(string)
        }
    }, [productSegmentDataVal])

    useEffect(() => {
        if (parentKeyProduct == 'PRODUCT_BRAND') {
            fetchDataProduct('PRODUCT_BRAND')
        }
    }, [parentKeyProduct, multipleChildItemsProduct])

    const handleBrand = (selectedValue: any) => {
        setProductBrandtDataVal(selectedValue)
    }


    // product sub brand 
    const [productSubBrandData, setProductSubBrandData] = useState<any>()
    const [productSubBrandDataVal, setProductSubBrandDataVal] = useState<any>()

    useEffect(() => {
        if (productBrandDataVal) {
            setParentKeyProduct('PRODUCT_SUB_BRAND')
            const main = productBrandDataVal.map((item: any) => item.value)
            const string = main.join(',');
            setMultipleChildItemsProduct(string)
        }
    }, [productBrandDataVal])

    useEffect(() => {
        if (parentKeyProduct == 'PRODUCT_SUB_BRAND') {
            fetchDataProduct('PRODUCT_SUB_BRAND')
        }
    }, [parentKeyProduct, multipleChildItemsProduct])

    const handleSubBrand = (selectedValue: any) => {
        setProductSubBrandDataVal(selectedValue)
    }


    // product pack size
    const [productPackSizeData, setProductPackSizeData] = useState<any>()
    const [productPackSizeDataVal, setProductPackSizeDataVal] = useState<any>()

    useEffect(() => {
        if (productSubBrandDataVal) {
            setParentKeyProduct('PRODUCT_PACK_SIZE')
            const main = productSubBrandDataVal.map((item: any) => item.value)
            const string = main.join(',');
            setMultipleChildItemsProduct(string)
        }
    }, [productSubBrandDataVal])

    useEffect(() => {
        if (parentKeyProduct == 'PRODUCT_PACK_SIZE') {
            fetchDataProduct('PRODUCT_PACK_SIZE')
        }
    }, [parentKeyProduct, multipleChildItemsProduct])

    const handlePackSize = (selectedValue: any) => {
        setProductPackSizeDataVal(selectedValue)
    }


    // product permutation
    const [productPermutationData, setProductPermutationData] = useState<any>()
    const [productPermutationDataVal, setProductPermutationDataVal] = useState<any>()

    useEffect(() => {
        if (productPackSizeDataVal) {
            setParentKeyProduct('PRODUCT_PERMUTATION_COMPUTAION')
            const main = productPackSizeDataVal.map((item: any) => item.value)
            const string = main.join(',');
            setMultipleChildItemsProduct(string)
        }
    }, [productPackSizeDataVal])

    useEffect(() => {
        if (parentKeyProduct == 'PRODUCT_PERMUTATION_COMPUTAION') {
            fetchDataProduct('PRODUCT_PERMUTATION_COMPUTAION')
        }
    }, [parentKeyProduct, multipleChildItemsProduct])

    const handlePermutation = (selectedValue: any) => {
        setProductPermutationDataVal(selectedValue)
    }


    // All  Filter Values
    const allFilterValues = {
        country: countryDataVal,
        geoLevel: geoLevelDataVal,
        channel: channelDataVal,
        geoLevel2: geolevel2DataVal,
        category: productCategoryDataVal,
        segment: productSegmentDataVal,
        brand: productBrandDataVal,
        subBrand: productSubBrandDataVal,
        packSize: productPackSizeDataVal,
        permutation: productPermutationDataVal,
        date: startDate
    }

    // Apply Button
    const applyFilter = () => {
        props.sendProductData(allFilterValues)
    }

    // Client Configuration Local Storage
    const [localDataClientConfiguration, setLocalDataClientConfiguration] = useState<any>({
        country: true,
        geoLevel: true,
        channel: true,
        geoLevel2: true,
        category: true,
        segment: true,
        brand: true,
        subBrand: true,
        packSize: true,
        permutation: true
    })
    useEffect(() => {
        const storedValue = localStorage.getItem('clientConfiguration');
        if (storedValue !== null) {
            setLocalDataClientConfiguration(JSON.parse(storedValue))
        }
    }, [])

    return (
        <section className="filter-main">
            <ul className="filter-List table-responsive">
                <li className="main-li">
                    <img src="/images/filter.svg" alt="" />
                    <Select
                        className="basic-single"
                        classNamePrefix="select"
                        isSearchable={true}
                        options={mainOptions}
                        menuPortalTarget={document.querySelector('body')}
                        onChange={handleChange}
                        isClearable={false}
                        defaultValue={{ value: 'Geo-Filters', label: 'Geo-Filters' }}
                    />
                </li>
                {selectedValue == "Geo-Filters" &&
                    <>
                        {localDataClientConfiguration && localDataClientConfiguration.country &&
                            <li>
                                <Select
                                    className="basic-single"
                                    classNamePrefix="select"
                                    isDisabled={true}
                                    isSearchable={true}
                                    options={countryData}
                                    placeholder={'Country'}
                                    isClearable={false}
                                    menuPortalTarget={document.querySelector('body')}
                                    value={countryData && countryData[0]}
                                />
                            </li>
                        }
                        {localDataClientConfiguration && localDataClientConfiguration.geoLevel &&
                            <li>
                                <Select
                                    className="basic-single"
                                    classNamePrefix="select"
                                    isSearchable={true}
                                    options={geoLevelData}
                                    value={geoLevelData && geoLevelData.filter(function (option: any) {
                                        return option.value === geoLevelDataVal;
                                    })}
                                    placeholder={'Geo-Level'}
                                    isClearable={false}
                                    menuPortalTarget={document.querySelector('body')}
                                    onChange={geolevel}
                                />
                            </li>
                        }
                        {localDataClientConfiguration && localDataClientConfiguration.channel &&
                            <li>
                                <Select
                                    className="basic-single"
                                    classNamePrefix="select"
                                    isSearchable={true}
                                    options={channelData}
                                    value={channelDataVal}
                                    placeholder={'Channel'}
                                    isClearable={false}
                                    menuPortalTarget={document.querySelector('body')}
                                    onChange={channel}
                                    isMulti
                                    components={{
                                        Option: InputOption
                                    }}
                                    closeMenuOnSelect={false}
                                    hideSelectedOptions={false}
                                    controlShouldRenderValue={false}
                                />
                            </li>
                        }
                        {localDataClientConfiguration && localDataClientConfiguration.geoLevel2 &&
                            <li>
                                <Select
                                    className="basic-single"
                                    classNamePrefix="select"
                                    isSearchable={true}
                                    options={geolevel2Data}
                                    value={geolevel2Data && geolevel2Data.filter(function (option: any) {
                                        return option.value === geolevel2DataVal;
                                    })}
                                    placeholder={'Geo-Level 2'}
                                    isClearable={false}
                                    menuPortalTarget={document.querySelector('body')}
                                    onChange={geolevel2}
                                />
                            </li>
                        }
                    </>
                }

                {selectedValue == "Product Filters" &&
                    <>
                        {localDataClientConfiguration && localDataClientConfiguration.category &&
                            <li>
                                <Select
                                    className="basic-single"
                                    classNamePrefix="select"
                                    isSearchable={true}
                                    options={productCategoryData}
                                    value={productCategoryDataVal}
                                    onChange={handleCategory}
                                    placeholder={'Category (KCA)'}
                                    isClearable={false}
                                    menuPortalTarget={document.querySelector('body')}
                                    isMulti
                                    components={{
                                        Option: InputOption
                                    }}
                                    closeMenuOnSelect={false}
                                    hideSelectedOptions={false}
                                    controlShouldRenderValue={false}
                                    styles={{ menuPortal: (base) => ({ ...base, fontSize: '12px' }) }}
                                />
                            </li>
                        }
                        {localDataClientConfiguration && localDataClientConfiguration.segment &&
                            <li>
                                <Select
                                    className="basic-single"
                                    classNamePrefix="select"
                                    isSearchable={true}
                                    options={productSegmentData}
                                    value={productSegmentDataVal}
                                    onChange={handleSegment}
                                    placeholder={'Segment (KCA)'}
                                    isClearable={false}
                                    menuPortalTarget={document.querySelector('body')}
                                    isMulti
                                    components={{
                                        Option: InputOption
                                    }}
                                    closeMenuOnSelect={false}
                                    hideSelectedOptions={false}
                                    controlShouldRenderValue={false}
                                    styles={{ menuPortal: (base) => ({ ...base, fontSize: '12px' }) }}
                                />
                            </li>
                        }
                        {localDataClientConfiguration && localDataClientConfiguration.brand &&
                            <li>
                                <Select
                                    className="basic-single"
                                    classNamePrefix="select"
                                    isSearchable={true}
                                    options={productBrandData}
                                    value={productBrandDataVal}
                                    onChange={handleBrand}
                                    placeholder={'Brand (KCA)'}
                                    isClearable={false}
                                    menuPortalTarget={document.querySelector('body')}
                                    isMulti
                                    components={{
                                        Option: InputOption
                                    }}
                                    closeMenuOnSelect={false}
                                    hideSelectedOptions={false}
                                    controlShouldRenderValue={false}
                                    styles={{ menuPortal: (base) => ({ ...base, fontSize: '12px' }) }}
                                />
                            </li>
                        }
                        {localDataClientConfiguration && localDataClientConfiguration.subBrand &&
                            <li>
                                <Select
                                    className="basic-single"
                                    classNamePrefix="select"
                                    isSearchable={true}
                                    options={productSubBrandData}
                                    value={productSubBrandDataVal}
                                    onChange={handleSubBrand}
                                    placeholder={'Sub Brand (KCA)'}
                                    isClearable={false}
                                    menuPortalTarget={document.querySelector('body')}
                                    isMulti
                                    components={{
                                        Option: InputOption
                                    }}
                                    closeMenuOnSelect={false}
                                    hideSelectedOptions={false}
                                    controlShouldRenderValue={false}
                                    styles={{ menuPortal: (base) => ({ ...base, fontSize: '12px' }) }}
                                />
                            </li>
                        }
                        {localDataClientConfiguration && localDataClientConfiguration.packSize &&
                            <li>
                                <Select
                                    className="basic-single"
                                    classNamePrefix="select"
                                    isSearchable={true}
                                    options={productPackSizeData}
                                    value={productPackSizeDataVal}
                                    onChange={handlePackSize}
                                    placeholder={'Pack Size (KCA)'}
                                    isClearable={false}
                                    menuPortalTarget={document.querySelector('body')}
                                    isMulti
                                    components={{
                                        Option: InputOption
                                    }}
                                    closeMenuOnSelect={false}
                                    hideSelectedOptions={false}
                                    controlShouldRenderValue={false}
                                    styles={{ menuPortal: (base) => ({ ...base, fontSize: '12px' }) }}
                                />
                            </li>
                        }
                        {localDataClientConfiguration && localDataClientConfiguration.permutation &&
                            <li>
                                <Select
                                    className="basic-single"
                                    classNamePrefix="select"
                                    isSearchable={true}
                                    options={productPermutationData}
                                    value={productPermutationDataVal}
                                    onChange={handlePermutation}
                                    placeholder={"Permutation Computing"}
                                    isClearable={false}
                                    menuPortalTarget={document.querySelector('body')}
                                    isMulti
                                    components={{
                                        Option: InputOption
                                    }}
                                    closeMenuOnSelect={false}
                                    hideSelectedOptions={false}
                                    controlShouldRenderValue={false}
                                    styles={{ menuPortal: (base) => ({ ...base, fontSize: '12px' }) }}
                                />
                            </li>
                        }
                    </>
                }
            </ul>
            <div className="filter-datepicker">
                <DatePicker selected={startDate} placeholderText={'Pricing Date'}  onChange={(date: any) => setStartDate(date)} dateFormat="dd-MM-yyyy" />
                <LuCalendarCheck2 />
            </div>
            <button className={`filterBtn ${startDate ? '' : 'disabled'}`} type="button" onClick={applyFilter} disabled={startDate ? false : true}>Apply</button>
        </section>

    )
}

export default Filter