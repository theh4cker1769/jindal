import React, { useState } from 'react'
import Filter from "./ElasticPricingTrackComponents/Filter"
import Products from "./ElasticPricingTrackComponents/Products"
import ProductDetails from "./ElasticPricingTrackComponents/ProductDetails"
import AdjustableFilters from "./ElasticPricingTrackComponents/AdjustableFilters"
import MultipleProductDetails from "./ElasticPricingTrackComponents/MultipleProductDetails"

const ElasticityPricingTrack = () => {

    // Filter Data
    const [filterValue, setFilterValue] = useState()
    const sendProductData = (filter: any) => {
        setFilterValue(filter)
    }

    // Inner Product Data
    const [dataProdDetails, setDataProdDetails] = useState();
    const sendProductDataToParent = (dataProd: any) => {
        setDataProdDetails(dataProd)
    }

    // Adjustable Filter Data
    const [adjustableFilters, setAdjustableFilters] = useState()
    const adjustablefiltersData = (adjustablefiltersData: any) => {
        setAdjustableFilters(adjustablefiltersData)
    }

    //Product Index
    const [activeIndex, setActiveIndex] = useState<any>()
    const sendActiveIndex = (i: any) => {
        setActiveIndex(i)
    }

    // Add Product 
    const [addProdPlusState, setAddProdPlusState] = useState<any>([])
    const addProdPlus = (item: any) => {
        setAddProdPlusState(item)
    }

    // Remove Product
    const [removeProductState, setRemoveProductState] = useState()
    const removeProduct = (v:any) => {
        setRemoveProductState(v)
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
            {filterValue &&
                <section className="product-details">
                    <Products removeProduct={removeProduct} addProdPlus={addProdPlus} filterValue={filterValue} sendProductDataToParent={sendProductDataToParent} sendActiveIndex={sendActiveIndex} />
                    {addProdPlusState.length
                        ? <MultipleProductDetails removeProductState={removeProductState} addProdPlusState={addProdPlusState} filterValue={filterValue} activeIndex={activeIndex} dataProdDetails={dataProdDetails}/>
                        :
                        <>
                            <ProductDetails addProdPlusState={addProdPlusState} filterValue={filterValue} activeIndex={activeIndex} adjustableFilters={adjustableFilters} dataProdDetails={dataProdDetails} />
                            <AdjustableFilters dataProdDetails={dataProdDetails} adjustablefiltersData={adjustablefiltersData} />
                        </>
                    }
                </section>
            }
        </div>
    )
}

export default ElasticityPricingTrack