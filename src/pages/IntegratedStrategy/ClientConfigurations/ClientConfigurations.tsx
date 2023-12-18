import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import Switch from 'react-switch'

const ClientConfigurations = () => {

  // Switch 
  const switchProps = {
    handleDiameter: 21,
    checkedIcon: false,
    uncheckedIcon: false,
    height: 14,
    width: 40,
    onColor: '#977cd5',
    onHandleColor: '#3700b3',
    offHandleColor: '#3700b3'
  };

  const [showElementsGeo, setShowElementsGeo] = useState(false);

  const toggleSwitchGeo = (checked: any) => {
    setShowElementsGeo(checked);
  };

  const [showElementsProd, setShowElementsProd] = useState(false);

  const toggleSwitchProd = (checked: any) => {
    setShowElementsProd(checked);
  };

  // Geo Location

  // Country
  const [showCountry, setShowCountry] = useState(true);
  const toggleCountry = (checked: any) => {
    setShowCountry(checked);
  };

  // Geo Level
  const [showGeoLevel, setShowGeoLevel] = useState(true);
  const toggleGeoLevel = (checked: any) => {
    setShowGeoLevel(checked);
  };

  // Channel
  const [showChannel, setShowChannel] = useState(true);
  const toggleChannel = (checked: any) => {
    setShowChannel(checked);
  };

  // Geo Level 2
  const [showGeoLevel2, setShowGeoLevel2] = useState(true);
  const toggleGeoLevel2 = (checked: any) => {
    setShowGeoLevel2(checked);
  };


  // Product Filter

  // Category
  const [showCategory, setShowCategory] = useState(true);
  const toggleCategory = (checked: any) => {
    setShowCategory(checked);
  };

  // Segment
  const [showSegment, setShowSegment] = useState(true);
  const toggleSegment = (checked: any) => {
    setShowSegment(checked);
  };

  // Brand
  const [showBrand, setShowBrand] = useState(true);
  const toggleBrand = (checked: any) => {
    setShowBrand(checked);
  };

  // Sub Brand
  const [showSubBrand, setShowSubBrand] = useState(true);
  const toggleSubBrand = (checked: any) => {
    setShowSubBrand(checked);
  };

  // Pack Size
  const [showPackSize, setShowPackSize] = useState(true);
  const togglePackSize = (checked: any) => {
    setShowPackSize(checked);
  };

  // Permutation
  const [showPermutation, setShowPermutation] = useState(true);
  const togglePermutation = (checked: any) => {
    setShowPermutation(checked);
  };


  // Local Storage Data
  const [data, setData] = React.useState<any>('');

  const saveToLocalStorage = () => {
    setData({
      country: showCountry,
      geoLevel: showGeoLevel,
      channel: showChannel,
      geoLevel2: showGeoLevel2,
      category: showCategory,
      segment: showSegment,
      brand: showBrand,
      subBrand: showSubBrand,
      packSize: showPackSize,
      permutation: showPermutation
    });
  };

  useEffect(() => {
    if (data) {
      localStorage.setItem('clientConfiguration', JSON.stringify(data))
    }
  }, [data])


  // Client Configuration Local Storage
  const [localDataClientConfiguration, setLocalDataClientConfiguration] = useState<any>()
  useEffect(() => {
      const storedValue = localStorage.getItem('clientConfiguration');
      if (storedValue !== null) {
          setLocalDataClientConfiguration(JSON.parse(storedValue))
      }
  }, [])

  useEffect(() => {
    if(localDataClientConfiguration) {
      setShowCountry(localDataClientConfiguration.country)
      setShowGeoLevel(localDataClientConfiguration.geoLevel)
      setShowChannel(localDataClientConfiguration.channel)
      setShowGeoLevel2(localDataClientConfiguration.geoLevel2)
      setShowCategory(localDataClientConfiguration.category)
      setShowSegment(localDataClientConfiguration.segment)
      setShowBrand(localDataClientConfiguration.brand)
      setShowSubBrand(localDataClientConfiguration.subBrand)
      setShowPackSize(localDataClientConfiguration.packSize)
      setShowPermutation(localDataClientConfiguration.permutation)
    }
  }, [localDataClientConfiguration])

  return (
    <div className='client-configurations'>
      <h2 className='heading'>Client Configurations</h2>
      <div className="main-box">
        <div className="control-switch-sec">
          <div className="switch-box">
            <h6>Geo-Location</h6>
            <span>Turned {showElementsGeo ? 'On' : 'Off'} </span>
            <Switch {...switchProps} onChange={toggleSwitchGeo} checked={showElementsGeo} />
          </div>
          <div className="switch-box">
            <h6>Define Product Search</h6>
            <span>Turned {showElementsProd ? 'On' : 'Off'} </span>
            <Switch {...switchProps} onChange={toggleSwitchProd} checked={showElementsProd} />
          </div>
        </div>

        {showElementsGeo &&
          <div className="geo-location">
            <h4>Geo-Location</h4>
            <div className="operator">
              <div className="item">
                <h6> &#9679; &nbsp; Country</h6>
                <div className="switch-area">
                  <span>Turned {showCountry ? 'On' : 'Off'} </span>
                  <Switch {...switchProps} onChange={toggleCountry} checked={showCountry} />
                </div>
              </div>
              <div className="item">
                <h6> &#9679; &nbsp; Geo-Level</h6>
                <div className="switch-area">
                  <span>Turned {showGeoLevel ? 'On' : 'Off'} </span>
                  <Switch {...switchProps} onChange={toggleGeoLevel} checked={showGeoLevel} />
                </div>
              </div>
              <div className="item">
                <h6> &#9679; &nbsp; Channel</h6>
                <div className="switch-area">
                  <span>Turned {showChannel ? 'On' : 'Off'} </span>
                  <Switch {...switchProps} onChange={toggleChannel} checked={showChannel} />
                </div>
              </div>
              <div className="item">
                <h6> &#9679; &nbsp; Geo-Level 2</h6>
                <div className="switch-area">
                  <span>Turned {showGeoLevel2 ? 'On' : 'Off'} </span>
                  <Switch {...switchProps} onChange={toggleGeoLevel2} checked={showGeoLevel2} />
                </div>
              </div>
            </div>
          </div>
        }

        {showElementsProd &&
          <div className="geo-location">
            <h4>Define Product Search</h4>
            <div className="operator">
              <div className="item">
                <h6> &#9679; &nbsp; Category (KCA)</h6>
                <div className="switch-area">
                  <span>Turned {showCategory ? 'On' : 'Off'} </span>
                  <Switch {...switchProps} onChange={toggleCategory} checked={showCategory} />
                </div>
              </div>
              <div className="item">
                <h6> &#9679; &nbsp; Segment (KCA)</h6>
                <div className="switch-area">
                  <span>Turned {showSegment ? 'On' : 'Off'} </span>
                  <Switch {...switchProps} onChange={toggleSegment} checked={showSegment} />
                </div>
              </div>
              <div className="item">
                <h6> &#9679; &nbsp; Brand (KCA)</h6>
                <div className="switch-area">
                  <span>Turned {showBrand ? 'On' : 'Off'} </span>
                  <Switch {...switchProps} onChange={toggleBrand} checked={showBrand} />
                </div>
              </div>
              <div className="item">
                <h6> &#9679; &nbsp; Sub Brand (KCA)</h6>
                <div className="switch-area">
                  <span>Turned {showSubBrand ? 'On' : 'Off'} </span>
                  <Switch {...switchProps} onChange={toggleSubBrand} checked={showSubBrand} />
                </div>
              </div>
              <div className="item">
                <h6> &#9679; &nbsp; Pack Size (KCA)</h6>
                <div className="switch-area">
                  <span>Turned {showPackSize ? 'On' : 'Off'} </span>
                  <Switch {...switchProps} onChange={togglePackSize} checked={showPackSize} />
                </div>
              </div>
              <div className="item">
                <h6> &#9679; &nbsp; Permutation Computation</h6>
                <div className="switch-area">
                  <span>Turned {showPermutation ? 'On' : 'Off'} </span>
                  <Switch {...switchProps} onChange={togglePermutation} checked={showPermutation} />
                </div>
              </div>
            </div>
          </div>
        }
        <div className="text-right">
          <button className='client-con-btn' onClick={saveToLocalStorage}>Save</button>
        </div>
      </div>
    </div>
  )
}

export default ClientConfigurations