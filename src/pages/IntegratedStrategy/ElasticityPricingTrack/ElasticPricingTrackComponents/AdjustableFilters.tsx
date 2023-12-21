import React, { useState, useEffect } from 'react'
import { TbTriangleFilled } from "react-icons/tb";

const AdjustableFilters = (props: any) => {

    const [dropdown, setDropdown] = useState(true);

    const toggleDropdown = () => {
        setDropdown(!dropdown)
    }

    const [priceElasticityExpected, setPriceElasticityExpected] = useState()
    const [gramsElasticityExpected, setGramsElasticityExpected] = useState()
    const [modelPriceElasticity, setModelPriceElasticity] = useState()
    const [modelGramElasticity, setModelGramElasticity] = useState()

    const [dataProdDetails, setDataProdDetails] = useState<any>()
    useEffect(() => {
        if (props.dataProdDetails) {
            setDataProdDetails(props.dataProdDetails[0])
        }
    }, [props.dataProdDetails])

    useEffect(() => {
        if (dataProdDetails) {
            setPriceElasticityExpected(dataProdDetails.priceElasticityExpected.toFixed(2))
            setGramsElasticityExpected(dataProdDetails.gramsElasticityExpected.toFixed(2))
            if (dataProdDetails.modelPriceElasticity) {
                setModelPriceElasticity(dataProdDetails.modelPriceElasticity)
            }
            if (dataProdDetails.modelGramsElasticityCurve) {
                setModelGramElasticity(dataProdDetails.modelGramsElasticityCurve)
            }
        }
    }, [dataProdDetails])

    const [selectedOptionPrice, setSelectedOptionPrice] = useState<any>();
    const handleOptionChangePrice = (event: any) => {
        setSelectedOptionPrice(event.target.value)
    }

    const [selectedOptionGram, setSelectedOptionGram] = useState<any>();
    const handleOptionChangeGram = (event: any) => {
        setSelectedOptionGram(event.target.value)
    }

    useEffect(() => {
        if (modelPriceElasticity != null && modelGramElasticity != null) {
            setSelectedOptionPrice(modelPriceElasticity)
            setSelectedOptionGram(modelGramElasticity)
        }
    }, [modelPriceElasticity, modelGramElasticity])


    const adjustablefiltersData = {
        priceElasticityExpected: priceElasticityExpected,
        gramsElasticityExpected: gramsElasticityExpected,
        modelPriceElasticity: selectedOptionPrice,
        modelGramElasticity: selectedOptionGram
    }

    const applyAdjust = () => {
        props.adjustablefiltersData(adjustablefiltersData)
    }


    return (
        <div className="product-details-main-settings products-main">
            <div className={`media product-dropdown ${!dropdown ? 'show' : ''}`} onClick={toggleDropdown}>
                <h6 className="media-body">
                    Adjustable <br /> Measure Filters
                </h6>
                <div>
                    <img src="/images/filter.svg" alt="" />
                    <TbTriangleFilled />
                </div>
            </div>
            {dropdown &&
                <div className="collapse show" id="bodyRight">
                    <div className="bodyRightList">
                        <div className="item">
                            <h6>Price elasticity expected</h6>
                            <input type="text" value={priceElasticityExpected} onChange={(e: any) => setPriceElasticityExpected(e.target.value)} />
                        </div>
                        <div className="item">
                            <h6>Gram elasticity expected</h6>
                            <input type="text" value={gramsElasticityExpected} onChange={(e: any) => setGramsElasticityExpected(e.target.value)} />
                        </div>
                        <div className="item">
                            <div className="filter-radio">
                                <h6>Model price elasticity curve</h6>
                                <div className="custom-radio">
                                    <input type="radio" id="radio1" name="radiosPrice" value="High" onChange={handleOptionChangePrice} checked={selectedOptionPrice == "High" ? true : false} />
                                    <label htmlFor="radio1">High</label>
                                </div>
                                <div className="custom-radio">
                                    <input type="radio" id="radio2" name="radiosPrice" value="Medium" onChange={handleOptionChangePrice} checked={selectedOptionPrice == "Medium" ? true : false} />
                                    <label htmlFor="radio2">Medium</label>
                                </div>
                                <div className="custom-radio">
                                    <input type="radio" id="radio3" name="radiosPrice" value="Low" onChange={handleOptionChangePrice} checked={selectedOptionPrice == "Low" ? true : false} />
                                    <label htmlFor="radio3">Low</label>
                                </div>
                                <div className="custom-radio">
                                    <input type="radio" id="radio4" name="radiosPrice" value="No Curve" onChange={handleOptionChangePrice} checked={selectedOptionPrice == "No Curve" ? true : false} />
                                    <label htmlFor="radio4">No Curve</label>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="filter-radio">
                                <h6>Model gram elasticity curve</h6>
                                <div className="custom-radio">
                                    <input type="radio" id="radio5" name="radiosGram" value="High" onChange={handleOptionChangeGram} checked={selectedOptionGram == "High" ? true : false} />
                                    <label htmlFor="radio5">High</label>
                                </div>
                                <div className="custom-radio">
                                    <input type="radio" id="radio6" name="radiosGram" value="Medium" onChange={handleOptionChangeGram} checked={selectedOptionGram == "Medium" ? true : false} />
                                    <label htmlFor="radio6">Medium</label>
                                </div>
                                <div className="custom-radio">
                                    <input type="radio" id="radio7" name="radiosGram" value="Low" onChange={handleOptionChangeGram} checked={selectedOptionGram == "Low" ? true : false} />
                                    <label htmlFor="radio7">Low</label>
                                </div>
                                <div className="custom-radio">
                                    <input type="radio" id="radio8" name="radiosGram" value="No Curve" onChange={handleOptionChangeGram} checked={selectedOptionGram == "No Curve" ? true : false} />
                                    <label htmlFor="radio8">No Curve</label>
                                </div>
                            </div>
                        </div>
                        <button className="filterBtn" type="button" onClick={applyAdjust}>Apply</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default AdjustableFilters