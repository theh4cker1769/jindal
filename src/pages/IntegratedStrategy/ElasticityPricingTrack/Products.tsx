import { useState, useEffect } from 'react'
import { TbTriangleFilled } from "react-icons/tb";

const Products = (props: any) => {

    useEffect(() => {

        const handleClickFirElem = () => {
            setSelectProd([props.dataArray[0].value])
        }

        if (props.countFirstProd > 0) {
            handleClickFirElem();
        }

    }, [props.countFirstProd]);



    const [dropdown, setDropdown] = useState(true);

    const toggleDropdown = () => {
        setDropdown(!dropdown)
    }

    const [activeIndex, setActiveIndex] = useState(0)
    const [selectProd, setSelectProd] = useState<any>([])
    const [dataProd, setDataProd] = useState<any>([])

    const handleItemClick = (v: any, i: any) => {
        setActiveIndex(i)
        setSelectProd([v.value])
        props.selectedProd(v.value)
    }

    const fetchData = async () => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXIiOiIiLCJqdGkiOiIiLCJpc3MiOiIiLCJhdWQiOiJhcGk6Ly9kZWZhdWx0IiwiaWF0IjoxNzAxOTQ4OTQ1LCJleHAiOjE3MDIwMzUzNDUsImNpZCI6IiIsInVpZCI6IiIsInNjcCI6IiIsImF1dGhfdGltZSI6IiIsInBlcGFwcG1pZWJhY2hyb2xlcyI6IiIsInBlcGFwcG1pZWJhY2h3YXJlaG91c2UiOiIiLCJwZXBSZWdpc3RlcmVkIjoiIiwibG9jYWxlIjoiIiwiRmlyc3ROYW1lIjoiTmFkZWVtIiwiTGFzdE5hbWUiOiJOYWthZGUiLCJlbWFpbCI6Im5hZGVlbS5uYWthZGVAamluZGFseC5jb20iLCJncGlkIjoibmFkZWVtLm5ha2FkZUBqaW5kYWx4LmNvbSIsIm5hbWUiOiJuYWRlZW0ubmFrYWRlQGppbmRhbHguY29tIiwidXNlcl9pZCI6IjEwMDU4Iiwic3ViIjoibmFkZWVtLm5ha2FkZUBqaW5kYWx4LmNvbSIsIm5iZiI6MTcwMTk0ODk0NX0.GppdaPFvMSlJAwUvesqPGhR3kRjy0p9cBEEjxxaZbBY';
        const url = 'https://client3.wisdomanalytics.com/server/api/dashboards/elasticitypricetracking/adjustablefilters';
        const payload = {
            "country": "AUSTRALIA",
            "geoLevel": ["4A-RTLR"],
            "channel": [
                "GROCERY",
                "PHARMACY"
            ],
            "geoLevel2": [
                "4A-RTLR-CHEMIST_WHS"
            ],
            "category": [
                "NAPPIES & CHILD CARE"
            ],
            "segment": [
                "NAPPY PANTS-UNMAPPED"
            ],
            "brand": [
                "HUGGIES"
            ],
            "subBrand": [
                "HUGGIES ULTIMATE",
                "HUGGIES ULTRA DRY"
            ],
            "packSize": [
                "BULK PK-CRAWLER NAP",
                "BULK PK-JUNIOR NAP",
                "BULK PK-TODDLER NAP",
                "BULK PK-WALKER NAP",
                "CONV PK-WALKER NAP",
                "JUMBO PK-JUNIOR NAP",
                "JUMBO PK-TODDLER NAP",
                "JUMBO PK-WALKER NAP"
            ],
            "permutation": selectProd,
            "regions": null,
            "date": "02/02/2023",
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
                setDataProd(result);
            } else {
                console.error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }


    };

    useEffect(() => {
        fetchData()
    }, [selectProd, props.countFirstProd]);

    useEffect(() => {
        if (dataProd.length > 0) {
            props.sendProductDataToParent(dataProd)
        }
    })

    return (
        <div className="products-main">
            <div className={`product-dropdown ${!dropdown ? 'show' : ''}`} onClick={toggleDropdown}>
                <h6>Products</h6>
                <TbTriangleFilled />
            </div>
            {dropdown &&
                <div className="collapse show" id="bodyLeft">
                    <ul className="bodyLeftList">
                        {props.dataArray.length > 0 ?
                            <>
                                {props.dataArray.map((v: any, i: any) => (
                                    <li key={i} onClick={() => handleItemClick(v, i)} className={activeIndex === i ? 'active' : ''}>{v.value}</li>
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