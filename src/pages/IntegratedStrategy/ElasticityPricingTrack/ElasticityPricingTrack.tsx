import React, { useRef, useState } from 'react'
import Filter from "./Filter"
import Products from "./Products"
import ProductDetails from "./ProductDetails"
import AdjustableFilters from "./AdjustableFilters"

const ElasticityPricingTrack = () => {

    const [dataArray, setDataArray] = useState([]);
    const [countFirstProd, setCountFirstProd] = useState(0);
    const sendProductData = (data: any) => {
        setDataArray(data)
        setCountFirstProd(current => current + 1)
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
                <ProductDetails dataProdDetails={dataProdDetails} selectedProdState={selectedProdState} dataArray={dataArray} countFirstProd={countFirstProd} />
                <AdjustableFilters dataProdDetails={dataProdDetails} />
            </section>
        </div>
    )
}

export default ElasticityPricingTrack