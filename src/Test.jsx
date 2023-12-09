import React, { useState } from 'react';
import Select from 'react-select';

// Sample data with main brands, sub-brands, models, and types
const mainBrands = [
  {
    value: 'apple',
    label: 'Apple',
    subBrands: [
      {
        value: 'iphone',
        label: 'iPhone',
        models: [
          {
            value: 'iphone11',
            label: 'iPhone 11',
            types: [
              { value: 'standard', label: 'Standard' },
              { value: 'pro', label: 'Pro' },
              // Add more types for iPhone 11
            ],
          },
          // Add more models for iPhone
        ],
      },
      // Add more sub-brands for Apple
    ],
  },
  {
    value: 'Samsung',
    label: 'Samsung',
    subBrands: [
      {
        value: 'sam',
        label: 'sam',
        models: [
          {
            value: 'iphone11',
            label: 'iPhone 11',
            types: [
              { value: 'standard', label: 'Standard' },
              { value: 'pro', label: 'Pro' },
              // Add more types for iPhone 11
            ],
          },
          // Add more models for iPhone
        ],
      },
      // Add more sub-brands for Apple
    ],
  },
  
  // Add more main brands with their sub-brands, models, and types as needed
];

const Test = () => {
  const [selectedMainBrands, setSelectedMainBrands] = useState([]);
  const [selectedSubBrands, setSelectedSubBrands] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);

  const handleMainBrandChange = (selectedOptions) => {
    if (selectedMainBrands.length === selectedOptions.length) {
      setSelectedMainBrands([]);
    } else {
      setSelectedMainBrands(selectedOptions);
    }
    setSelectedSubBrands([]);
    setSelectedModels([]);
    setSelectedTypes([]);
  };

  const handleSubBrandChange = (selectedOptions) => {
    if (selectedSubBrands.length === selectedOptions.length) {
      setSelectedSubBrands([]);
    } else {
      setSelectedSubBrands(selectedOptions);
    }
    setSelectedModels([]);
    setSelectedTypes([]);
  };

  const handleModelChange = (selectedOptions) => {
    if (selectedModels.length === selectedOptions.length) {
      setSelectedModels([]);
    } else {
      setSelectedModels(selectedOptions);
    }
    setSelectedTypes([]);
  };

  const handleTypeChange = (selectedOptions) => {
    if (selectedTypes.length === selectedOptions.length) {
      setSelectedTypes([]);
    } else {
      setSelectedTypes(selectedOptions);
    }
  };

  return (
    <div>
      <h2>Brand Filter</h2>
      <Select
        value={selectedMainBrands}
        onChange={handleMainBrandChange}
        options={mainBrands}
        placeholder="Select main brands..."
        isMulti
        isClearable
        isSearchable
      />
      {/* Display selected main brands */}

      {selectedMainBrands.length > 0 && (
        <div>
          <Select
            value={selectedSubBrands}
            onChange={handleSubBrandChange}
            options={selectedMainBrands.flatMap((brand) => brand.subBrands || [])}
            placeholder="Select sub-brands..."
            isMulti
            isClearable
            isSearchable
          />
          {/* Display selected sub-brands */}

          {selectedSubBrands.length > 0 && (
            <div>
              <Select
                value={selectedModels}
                onChange={handleModelChange}
                options={selectedSubBrands.flatMap((subBrand) => subBrand.models || [])}
                placeholder="Select models..."
                isMulti
                isClearable
                isSearchable
              />
              {/* Display selected models */}

              {selectedModels.length > 0 && (
                <div>
                  <Select
                    value={selectedTypes}
                    onChange={handleTypeChange}
                    options={selectedModels.flatMap((model) => model.types || [])}
                    placeholder="Select types..."
                    isMulti
                    isClearable
                    isSearchable
                  />
                  {/* Display selected types */}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Test;
