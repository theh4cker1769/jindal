import React, { useState } from 'react'
import Filter from "./ElasticPricingTrackComponents/Filter"
import Products from "./ElasticPricingTrackComponents/Products"
import ProductDetails from "./ElasticPricingTrackComponents/ProductDetails"
import AdjustableFilters from "./ElasticPricingTrackComponents/AdjustableFilters"

const ElasticityPricingTrack = () => {

    const [dataArray, setDataArray] = useState([]);
    const [countFirstProd, setCountFirstProd] = useState(0);
    const [filterDate, setFilterDate] = useState()
    const [filterValue, setFilterValue] = useState()

    const sendProductData = (data: any, date: any, filter: any) => {
        setDataArray(data)
        setCountFirstProd(current => current + 1)
        setFilterDate(date)
        setFilterValue(filter)
    }

    // Inner Product Data

    const [dataProdDetails, setDataProdDetails] = useState([]);

    const sendProductDataToParent = (dataProd: any) => {
        setDataProdDetails(dataProd)
    }

    const [selectedProdState, setSelectedProdState] = useState();

    const selectedProd = (v: any) => {
        setSelectedProdState(v)
    }

    
    // Adjustable Filter Data
    const [adjustableFilters, setAdjustableFilters] = useState()
    const adjustablefiltersData = (adjustablefiltersData: any) => {
        setAdjustableFilters(adjustablefiltersData)
    }

    return (
        <div id="content" className="p-4 p-md-4">
            <div className="row">
                <div className="col-md-6">
                    <h2 className="mb-4">Elasticity Pricing Track</h2>
                </div>
                <div className="col-md-6 text-right">
                    <img src="/images/save.svg" alt="save" />
                    <img src="/images/download.svg" alt="download" />
                    <img src="/images/share.svg" alt="share" />
                </div>
            </div>
            <Filter sendProductData={sendProductData} />
            <section className="product-details">
                <Products dataArray={dataArray} sendProductDataToParent={sendProductDataToParent} countFirstProd={countFirstProd} selectedProd={selectedProd}/>
                <ProductDetails adjustableFilters={adjustableFilters} filterValue={filterValue} filterDate={filterDate} dataProdDetails={dataProdDetails} selectedProdState={selectedProdState} dataArray={dataArray} countFirstProd={countFirstProd} />
                <AdjustableFilters dataProdDetails={dataProdDetails} adjustablefiltersData={adjustablefiltersData}/>
            </section>
        </div>
    )
}

export default ElasticityPricingTrack