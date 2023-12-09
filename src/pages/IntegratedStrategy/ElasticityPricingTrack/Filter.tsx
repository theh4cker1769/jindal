import { useEffect, useState } from "react";
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
    const [startDate, setStartDate] = useState(new Date());

    const mainOptions = [
        { value: 'Geo-Filters', label: 'Geo-Filters' },
        { value: 'Product Filters', label: 'Product Filters' }
    ]

    const geoFilters = {
        country: [
            { value: 'AUSTRALIA', label: 'AUSTRALIA' }
        ],
        geoLevel: [
            { value: '4A', label: '4A' }
        ],
        channel: [
            { value: 'ALL', label: 'ALL' },
            { value: 'GROCERY', label: 'GROCERY' },
            { value: 'PHARMACY', label: 'PHARMACY' }
        ],
        geoLevel2: [
            { value: '4A-RTLR-CHEMIST_WHS', label: '4A-RTLR-CHEMIST_WHS' },
            { value: '4A-RTLR-COLES', label: '4A-RTLR-COLES' },
            { value: '4A-RTLR-WOOLWORTHS', label: '4A-RTLR-WOOLWORTHS' }
        ]
    }

    const productFilters = {
        category: [
            {
                value: 'ADULT CARE',
                label: 'ADULT CARE',
                segment: [
                    { value: 'ANCILLARY-UNMAPPED', label: 'ANCILLARY-UNMAPPED' },
                    { value: 'BED MATS-UNMAPPED', label: 'BED MATS-UNMAPPED' },
                    { value: 'GARMENTS-UNMAPPED', label: 'GARMENTS-UNMAPPED' },
                    { value: 'LINERS-UNMAPPED', label: 'LINERS-UNMAPPED' },
                    { value: 'PADS-UNMAPPED', label: 'PADS-UNMAPPED' },
                    { value: 'REUSABLE-UNMAPPED', label: 'REUSABLE-UNMAPPED' },
                ]
            },
            { value: 'BABY WIPES', label: 'BABY WIPES' },
            { value: 'FAMILY CARE', label: 'FAMILY CARE' },
            { value: 'FEMININE HYGIENE', label: 'FEMININE HYGIENE' },
            {
                value: 'NAPPIES & CHILD CARE',
                label: 'NAPPIES & CHILD CARE',
                segment: [
                    { value: 'CHANGE MATS-UNMAPPED', label: 'CHANGE MATS-UNMAPPED' },
                    {
                        value: 'NAPPY PANTS-UNMAPPED',
                        label: 'NAPPY PANTS-UNMAPPED',
                        brand: [
                            {
                                value: 'HUGGIES',
                                label: 'HUGGIES',
                                subBrand: [
                                    {
                                        value: 'HUGGIES ULTIMATE',
                                        label: 'HUGGIES ULTIMATE',
                                        packSize: [
                                            {
                                                value: 'BULK PK-JUNIOR NAP', label: 'BULK PK-JUNIOR NAP'
                                            },
                                            { value: 'BULK PK-TODDLER NAP', label: 'BULK PK-TODDLER NAP' },
                                            {
                                                value: 'BULK PK-WALKER NAP',
                                                label: 'BULK PK-WALKER NAP',
                                                permutation: [
                                                    { value: 'HUGGIES ULTIMATE BULK PK-WALKER NAP', label: 'HUGGIES ULTIMATE BULK PK-WALKER NAP' }
                                                ]
                                            },
                                            {
                                                value: 'JUMBO PK-JUNIOR NAP',
                                                label: 'JUMBO PK-JUNIOR NAP',
                                                permutation: [
                                                    { value: 'HUGGIES ULTIMATE-JUMBO PK-JUNIOR NAP', label: 'HUGGIES ULTIMATE-JUMBO PK-JUNIOR NAP' }
                                                ]
                                            },
                                            { value: 'JUMBO PK-TODDLER NAP', label: 'JUMBO PK-TODDLER NAP' },
                                            { value: 'JUMBO PK-WALKER NAP', label: 'JUMBO PK-WALKER NAP' },
                                        ]
                                    },
                                    { value: 'HUGGIES ULTRA DRY', label: 'HUGGIES ULTRA DRY' },
                                ]
                            },
                        ]
                    },
                    { value: 'OPEN NAPPIES-UNMAPPED', label: 'OPEN NAPPIES-UNMAPPED' },
                    { value: 'SWIM PANTS-UNMAPPED', label: 'SWIM PANTS-UNMAPPED' },
                    { value: 'TRAINING PANTS-UNMAPPED', label: 'TRAINING PANTS-UNMAPPED' },
                    { value: 'YOUTH PANTS-UNMAPPED', label: 'YOUTH PANTS-UNMAPPED' }
                ]
            }
        ],

        // segment: [

        //     { value: 'DISPOSABLE PANTS-UNMAPPED', label: 'DISPOSABLE PANTS-UNMAPPED' },
        //     { value: 'FACIAL TISSUE-UNMAPPED', label: 'FACIAL TISSUE-UNMAPPED' },
        //     { value: 'LARGE PACKS (>320)-UNMAPPED', label: 'LARGE PACKS (>320)-UNMAPPED' },
        //     { value: 'MEDIUM PACKS (131-320)-UNMAPPED', label: 'MEDIUM PACKS (131-320)-UNMAPPED' },
        //     { value: 'PAPER TOWEL-UNMAPPED', label: 'PAPER TOWEL-UNMAPPED' },
        //     { value: 'SMALL PACKS (60-130)-UNMAPPED', label: 'SMALL PACKS (60-130)-UNMAPPED' },
        //     { value: 'TAMPONS-UNMAPPED', label: 'TAMPONS-UNMAPPED' },
        //     { value: 'TOILET TISSUE-DRY', label: 'TOILET TISSUE-DRY' },
        //     { value: 'TOILET TISSUE-WET', label: 'TOILET TISSUE-WET' },
        //     { value: 'TRAVEL PACKS (<60)-UNMAPPED', label: 'TRAVEL PACKS (<60)-UNMAPPED' },
        // ],

        // brand: [
        //     { value: 'DEPEND', label: 'DEPEND' },
        //     { value: 'KLEENEX', label: 'KLEENEX' },
        //     { value: 'KOTEX', label: 'KOTEX' },
        //     { value: 'OTHER SUPERBRAND', label: 'OTHER SUPERBRAND' },
        //     { value: 'POISE CORE', label: 'POISE CORE' },
        //     { value: 'POISE THIN & DISCREET', label: 'POISE THIN & DISCREET' },
        //     { value: 'SNUGGLERS BRAND', label: 'SNUGGLERS BRAND' },
        //     { value: 'THICK & THIRSTY', label: 'THICK & THIRSTY' },
        //     { value: 'U BY KOTEX', label: 'U BY KOTEX' },
        //     { value: 'VIVA', label: 'VIVA' },
        //     { value: 'WONDERSOFT', label: 'WONDERSOFT' }
        // ],

        // subBrand: [
        //     { value: 'DELSEY', label: 'DELSEY' },
        //     { value: 'DEPEND', label: 'DEPEND' },
        //     { value: 'DRYNITES', label: 'DRYNITES' },
        //     { value: 'HUGGIES B/WIPES', label: 'HUGGIES B/WIPES' },
        //     { value: 'HUGGIES ESSENTIALS', label: 'HUGGIES ESSENTIALS' },
        //     { value: 'HUGGIES MATS', label: 'HUGGIES MATS' },
        //     { value: 'KLEENEX COMFORT CARE', label: 'KLEENEX COMFORT CARE' },
        //     { value: 'KLEENEX COMPLETE CLEAN', label: 'KLEENEX COMPLETE CLEAN' },
        //     { value: 'KLEENEX COTTONELLE', label: 'KLEENEX COTTONELLE' },
        //     { value: 'KLEENEX DESGNR', label: 'KLEENEX DESGNR' },
        //     { value: 'KLEENEX ECO', label: 'KLEENEX ECO' },
        //     { value: 'KLEENEX FLUSHABLE FRESH WIPES', label: 'KLEENEX FLUSHABLE FRESH WIPES' },
        //     { value: 'KLEENEX HYPO', label: 'KLEENEX HYPO' },
        //     { value: 'KLEENEX PREMIUM', label: 'KLEENEX PREMIUM' },
        //     { value: 'KLEENEX REG', label: 'KLEENEX REG' },
        //     { value: 'KLEENEX STD', label: 'KLEENEX STD' },
        //     { value: 'KLEENEX STD PKT', label: 'KLEENEX STD PKT' },
        //     { value: 'KLEENEX X-CARE', label: 'KLEENEX X-CARE' },
        //     { value: 'KOTEX STANDARD', label: 'KOTEX STANDARD' },
        //     { value: 'LITTLE SWIMMERS', label: 'LITTLE SWIMMERS' },
        //     { value: 'POISE CORE', label: 'POISE CORE' },
        //     { value: 'POISE THIN & DISCREET', label: 'POISE THIN & DISCREET' },
        //     { value: 'PULL UPS', label: 'PULL UPS' },
        //     { value: 'SNUGGLERS', label: 'SNUGGLERS' },
        //     { value: 'THICK & THIRSTY', label: 'THICK & THIRSTY' },
        //     { value: 'UBK CORE', label: 'UBK CORE' },
        //     { value: 'UBK COTTON', label: 'UBK COTTON' },
        //     { value: 'UBK DESIGNER', label: 'UBK DESIGNER' },
        //     { value: 'UBK ECO', label: 'UBK ECO' },
        //     { value: 'UBK MATERNITY', label: 'UBK MATERNITY' },
        //     { value: 'UBK NIGHT', label: 'UBK NIGHT' },
        //     { value: 'UBK PETITE', label: 'UBK PETITE' },
        //     { value: 'UBK RU', label: 'UBK RU' },
        //     { value: 'UBK SPORT', label: 'UBK SPORT' },
        //     { value: 'UBK STD', label: 'UBK STD' },
        //     { value: 'VIVA', label: 'VIVA' },
        //     { value: 'WONDERSOFT REG', label: 'WONDERSOFT REG' }
        // ],

        // packSize: [
        //     { value: '140 - 170-UNMAPPED', label: '140 - 170-UNMAPPED' },
        //     { value: '171 - 220-UNMAPPED', label: '171 - 220-UNMAPPED' },
        //     { value: '221 - 300-UNMAPPED', label: '221 - 300-UNMAPPED' },
        //     { value: '2PK-55', label: '2PK-55' },
        //     { value: '2PK-60', label: '2PK-60' },
        //     { value: '30 - 40-UNMAPPED', label: '30 - 40-UNMAPPED' },
        //     { value: '301 - 400-UNMAPPED', label: '301 - 400-UNMAPPED' },
        //     { value: '3PK-60', label: '3PK-60' },
        //     { value: '3PK-70', label: '3PK-70' },
        //     { value: '4PK-60', label: '4PK-60' },
        //     { value: '61 - 79-UNMAPPED', label: '61 - 79-UNMAPPED' },
        //     { value: '6PK-60', label: '6PK-60' },
        //     { value: '80 - 90-UNMAPPED', label: '80 - 90-UNMAPPED' },
        //     { value: '8PK-60', label: '8PK-60' },
        //     { value: '>=401-UNMAPPED', label: '>=401-UNMAPPED' },
        //     { value: 'BOXED-16-99', label: 'BOXED-16-99' },
        //     { value: 'BOXED-20', label: 'BOXED-20' },
        //     { value: 'BOXED-40', label: 'BOXED-40' },
        //     { value: 'BULK PK-4-7 YRS', label: 'BULK PK-4-7 YRS' },
        //     { value: 'BULK PK-8-15 YRS', label: 'BULK PK-8-15 YRS' },
        //     { value: 'BULK PK-CRAWLER NAP', label: 'BULK PK-CRAWLER NAP' },
        //     { value: 'BULK PK-INFANT NAP', label: 'BULK PK-INFANT NAP' },
        //     { value: 'BULK PK-NEWBORN NAP', label: 'BULK PK-NEWBORN NAP' },
        //     { value: 'BULK-DAY MAXI PADS', label: 'BULK-DAY MAXI PADS' },
        //     { value: 'BULK-NA', label: 'BULK-NA' },
        //     { value: 'BULK-NIGHT ULTRA THIN PADS', label: 'BULK-NIGHT ULTRA THIN PADS' },
        //     { value: 'BULK-OTHER GARMENTS', label: 'BULK-OTHER GARMENTS' },
        //     { value: 'BULK-PANTS (PULL UPS)', label: 'BULK-PANTS (PULL UPS)' },
        //     { value: 'BULK-STANDARD', label: 'BULK-STANDARD' },
        //     { value: 'CONV PK-2-4 YRS', label: 'CONV PK-2-4 YRS' },
        //     { value: 'CONV PK-4-7 YRS', label: 'CONV PK-4-7 YRS' },
        //     { value: 'CONV PK-8-15 YRS', label: 'CONV PK-8-15 YRS' },
        //     { value: 'CONV PK-CRAWLER NAP', label: 'CONV PK-CRAWLER NAP' },
        //     { value: 'CONV PK-INFANT NAP', label: 'CONV PK-INFANT NAP' },
        //     { value: 'CONV PK-JUNIOR NAP', label: 'CONV PK-JUNIOR NAP' },
        //     { value: 'CONV PK-NEWBORN NAP', label: 'CONV PK-NEWBORN NAP' },
        //     { value: 'CONV PK-S.PT LARGE', label: 'CONV PK-S.PT LARGE' },
        //     { value: 'CONV PK-S.PT MEDIUM', label: 'CONV PK-S.PT MEDIUM' },
        //     { value: 'CONV PK-S.PT SMALL', label: 'CONV PK-S.PT SMALL' },
        //     { value: 'CONV PK-T.PT SIZE2', label: 'CONV PK-T.PT SIZE2' },
        //     { value: 'CONV PK-T.PT SIZE3', label: 'CONV PK-T.PT SIZE3' },
        //     { value: 'CONV PK-T.PT SIZE4', label: 'CONV PK-T.PT SIZE4' },
        //     { value: 'CONV PK-TODDLER NAP', label: 'CONV PK-TODDLER NAP' },
        //     { value: 'CONV PK-WALKER NAP', label: 'CONV PK-WALKER NAP' },
        //     { value: 'CONV-BED PADS', label: 'CONV-BED PADS' },
        //     { value: 'CONV-BRIEFS (OPEN DIAPERS)', label: 'CONV-BRIEFS (OPEN DIAPERS)' },
        //     { value: 'CONV-DAY MAXI PADS', label: 'CONV-DAY MAXI PADS' },
        //     { value: 'CONV-DAY ULTRA THIN PADS', label: 'CONV-DAY ULTRA THIN PADS' },
        //     { value: 'CONV-LONG', label: 'CONV-LONG' },
        //     { value: 'CONV-NA', label: 'CONV-NA' },
        //     { value: 'CONV-NIGHT ULTRA THIN PADS', label: 'CONV-NIGHT ULTRA THIN PADS' },
        //     { value: 'CONV-OTHER GARMENTS', label: 'CONV-OTHER GARMENTS' },
        //     { value: 'CONV-PANTS (PULL UPS)', label: 'CONV-PANTS (PULL UPS)' },
        //     { value: 'CONV-STANDARD', label: 'CONV-STANDARD' },
        //     { value: 'CONV-WIPES/TISSUES', label: 'CONV-WIPES/TISSUES' },
        //     { value: 'CUBES-16-99', label: 'CUBES-16-99' },
        //     { value: 'CYLINDER-16-99', label: 'CYLINDER-16-99' },
        //     { value: 'DOUBLE 2PK-120', label: 'DOUBLE 2PK-120' },
        //     { value: 'DOUBLE 2PK-60', label: 'DOUBLE 2PK-60' },
        //     { value: 'DOUBLE 3PK-120', label: 'DOUBLE 3PK-120' },
        //     { value: 'DOUBLE 3PK-180', label: 'DOUBLE 3PK-180' },
        //     { value: 'DOUBLE 4PK-120', label: 'DOUBLE 4PK-120' },
        //     { value: 'DOUBLE 8PK-120', label: 'DOUBLE 8PK-120' },
        //     { value: 'FLAT BOX-100-179', label: 'FLAT BOX-100-179' },
        //     { value: 'FLAT BOX-16-99', label: 'FLAT BOX-16-99' },
        //     { value: 'FLAT BOX-180-229', label: 'FLAT BOX-180-229' },
        //     { value: 'FLAT BOX-230-250', label: 'FLAT BOX-230-250' },
        //     { value: 'JUMBO PK-CRAWLER NAP', label: 'JUMBO PK-CRAWLER NAP' },
        //     { value: 'JUMBO PK-INFANT NAP', label: 'JUMBO PK-INFANT NAP' },
        //     { value: 'JUMBO PK-NEWBORN NAP', label: 'JUMBO PK-NEWBORN NAP' },
        //     { value: 'LARGE PACKS-180', label: 'LARGE PACKS-180' },
        //     { value: 'LARGE PACKS-200', label: 'LARGE PACKS-200' },
        //     { value: 'LARGE PACKS-84', label: 'LARGE PACKS-84' },
        //     { value: 'MATS REGULAR-NA', label: 'MATS REGULAR-NA' },
        //     { value: 'MEDIUM PACKS-10', label: 'MEDIUM PACKS-10' },
        //     { value: 'MEDIUM PACKS-160', label: 'MEDIUM PACKS-160' },
        //     { value: 'MEDIUM PACKS-180', label: 'MEDIUM PACKS-180' },
        //     { value: 'MEDIUM PACKS-200', label: 'MEDIUM PACKS-200' },
        //     { value: 'MEDIUM PACKS-270', label: 'MEDIUM PACKS-270' },
        //     { value: 'MEDIUM PACKS-360', label: 'MEDIUM PACKS-360' },
        //     { value: 'MEDIUM PACKS-40', label: 'MEDIUM PACKS-40' },
        //     { value: 'MEDIUM PACKS-42', label: 'MEDIUM PACKS-42' },
        //     { value: 'MEGA PK-CRAWLER NAP', label: 'MEGA PK-CRAWLER NAP' },
        //     { value: 'MEGA PK-INFANT NAP', label: 'MEGA PK-INFANT NAP' },
        //     { value: 'MEGA PK-JUNIOR NAP', label: 'MEGA PK-JUNIOR NAP' },
        //     { value: 'MEGA PK-NEWBORN NAP', label: 'MEGA PK-NEWBORN NAP' },
        //     { value: 'NON DISPOSABLES-NA', label: 'NON DISPOSABLES-NA' },
        //     { value: 'POCKET PACK-01/15/2023', label: 'POCKET PACK-01/15/2023' },
        //     { value: 'POCKET PACK-44576', label: 'POCKET PACK-44576' },
        //     { value: 'RESEALABLE-01/15/2023', label: 'RESEALABLE-01/15/2023' },
        //     { value: 'RESEALABLE-16-99', label: 'RESEALABLE-16-99' },
        //     { value: 'RESEALABLE-44576', label: 'RESEALABLE-44576' },
        //     { value: 'SAMPLE PK-JUNIOR NAP', label: 'SAMPLE PK-JUNIOR NAP' },
        //     { value: 'SMALL PACKS-1000', label: 'SMALL PACKS-1000' },
        //     { value: 'SMALL PACKS-150', label: 'SMALL PACKS-150' },
        //     { value: 'SMALL PACKS-160', label: 'SMALL PACKS-160' },
        //     { value: 'SMALL PACKS-180', label: 'SMALL PACKS-180' },
        //     { value: 'SMALL PACKS-270', label: 'SMALL PACKS-270' },
        //     { value: 'SMALL PACKS-360', label: 'SMALL PACKS-360' },
        //     { value: 'TRAVEL PK-16-99', label: 'TRAVEL PK-16-99' },
        //     { value: 'WALLET PK-01/15/2023', label: 'WALLET PK-01/15/2023' }
        // ],

        // permutation: [
        //     // { value: 'DEPEND-BULK-DAY MAXI PADS', label: 'DEPEND-BULK-DAY MAXI PADS' },
        //     // { value: 'DEPEND-BULK-OTHER GARMENTS', label: 'DEPEND-BULK-OTHER GARMENTS' },
        //     // { value: 'DEPEND-BULK-PANTS (PULL UPS)', label: 'DEPEND-BULK-PANTS (PULL UPS)' },
        //     // { value: 'DEPEND-CONV-BED PADS', label: 'DEPEND-CONV-BED PADS' },
        //     // { value: 'DEPEND-CONV-BRIEFS (OPEN DIAPERS)', label: 'DEPEND-CONV-BRIEFS (OPEN DIAPERS)' },
        //     // { value: 'DEPEND-CONV-DAY MAXI PADS', label: 'DEPEND-CONV-DAY MAXI PADS' },
        //     // { value: 'DEPEND-CONV-OTHER GARMENTS', label: 'DEPEND-CONV-OTHER GARMENTS' },
        //     // { value: 'DEPEND-CONV-PANTS (PULL UPS)', label: 'DEPEND-CONV-PANTS (PULL UPS)' },
        //     // { value: 'DRYNITES-CONV PK-2-4 YRS', label: 'DRYNITES-CONV PK-2-4 YRS' },
        //     // { value: 'DRYNITES-CONV PK-4-7 YRS', label: 'DRYNITES-CONV PK-4-7 YRS' },
        //     // { value: 'DRYNITES-CONV PK-8-15 YRS', label: 'DRYNITES-CONV PK-8-15 YRS' },
        //     // { value: 'HUGGIES B/WIPES-221 - 300-UNMAPPED', label: 'HUGGIES B/WIPES-221 - 300-UNMAPPED' },
        //     // { value: 'HUGGIES B/WIPES-301 - 400-UNMAPPED', label: 'HUGGIES B/WIPES-301 - 400-UNMAPPED' },
        //     // { value: 'HUGGIES B/WIPES-61 - 79-UNMAPPED', label: 'HUGGIES B/WIPES-61 - 79-UNMAPPED' },
        //     // { value: 'HUGGIES B/WIPES-80 - 90-UNMAPPED', label: 'HUGGIES B/WIPES-80 - 90-UNMAPPED' },
        //     // { value: 'HUGGIES B/WIPES->=401-UNMAPPED', label: 'HUGGIES B/WIPES->=401-UNMAPPED' },
        //     // { value: 'HUGGIES ESSENTIALS-80 - 90-UNMAPPED', label: 'HUGGIES ESSENTIALS-80 - 90-UNMAPPED' },
        //     // { value: 'HUGGIES ESSENTIALS-BULK PK-CRAWLER NAP', label: 'HUGGIES ESSENTIALS-BULK PK-CRAWLER NAP' },
        //     // { value: 'HUGGIES ESSENTIALS-BULK PK-INFANT NAP', label: 'HUGGIES ESSENTIALS-BULK PK-INFANT NAP' },
        //     // { value: 'HUGGIES ESSENTIALS-BULK PK-JUNIOR NAP', label: 'HUGGIES ESSENTIALS-BULK PK-JUNIOR NAP' },
        //     // { value: 'HUGGIES ESSENTIALS-BULK PK-TODDLER NAP', label: 'HUGGIES ESSENTIALS-BULK PK-TODDLER NAP' },
        //     // { value: 'HUGGIES ESSENTIALS-BULK PK-WALKER NAP', label: 'HUGGIES ESSENTIALS-BULK PK-WALKER NAP' },
        //     // { value: 'HUGGIES ESSENTIALS-CONV PK-NEWBORN NAP', label: 'HUGGIES ESSENTIALS-CONV PK-NEWBORN NAP' },
        //     // { value: 'HUGGIES ULTIMATE-171 - 220-UNMAPPED', label: 'HUGGIES ULTIMATE-171 - 220-UNMAPPED' },
        //     // { value: 'HUGGIES ULTIMATE-61 - 79-UNMAPPED', label: 'HUGGIES ULTIMATE-61 - 79-UNMAPPED' },
        //     // { value: 'HUGGIES ULTIMATE-JUMBO PK-CRAWLER NAP', label: 'HUGGIES ULTIMATE-JUMBO PK-CRAWLER NAP' },
        //     { value: 'HUGGIES ULTIMATE-JUMBO PK-TODDLER NAP', label: 'HUGGIES ULTIMATE-JUMBO PK-TODDLER NAP' },
        //     { value: 'HUGGIES ULTIMATE-JUMBO PK-WALKER NAP', label: 'HUGGIES ULTIMATE-JUMBO PK-WALKER NAP' },
        //     { value: 'HUGGIES ULTRA DRY-BULK PK-CRAWLER NAP', label: 'HUGGIES ULTRA DRY-BULK PK-CRAWLER NAP' },
        //     { value: 'HUGGIES ULTRA DRY-BULK PK-INFANT NAP', label: 'HUGGIES ULTRA DRY-BULK PK-INFANT NAP' },
        //     { value: 'HUGGIES ULTRA DRY-BULK PK-JUNIOR NAP', label: 'HUGGIES ULTRA DRY-BULK PK-JUNIOR NAP' },
        //     { value: 'HUGGIES ULTRA DRY-BULK PK-NEWBORN NAP', label: 'HUGGIES ULTRA DRY-BULK PK-NEWBORN NAP' },
        //     { value: 'HUGGIES ULTRA DRY-BULK PK-TODDLER NAP', label: 'HUGGIES ULTRA DRY-BULK PK-TODDLER NAP' },
        //     { value: 'HUGGIES ULTRA DRY-BULK PK-WALKER NAP', label: 'HUGGIES ULTRA DRY-BULK PK-WALKER NAP' },
        //     { value: 'HUGGIES ULTRA DRY-CONV PK-CRAWLER NAP', label: 'HUGGIES ULTRA DRY-CONV PK-CRAWLER NAP' },
        //     { value: 'HUGGIES ULTRA DRY-CONV PK-INFANT NAP', label: 'HUGGIES ULTRA DRY-CONV PK-INFANT NAP' },
        //     { value: 'HUGGIES ULTRA DRY-CONV PK-NEWBORN NAP', label: 'HUGGIES ULTRA DRY-CONV PK-NEWBORN NAP' },
        //     { value: 'HUGGIES ULTRA DRY-CONV PK-TODDLER NAP', label: 'HUGGIES ULTRA DRY-CONV PK-TODDLER NAP' },
        //     { value: 'HUGGIES ULTRA DRY-CONV PK-WALKER NAP', label: 'HUGGIES ULTRA DRY-CONV PK-WALKER NAP' },
        //     { value: 'HUGGIES ULTRA DRY-JUMBO PK-CRAWLER NAP', label: 'HUGGIES ULTRA DRY-JUMBO PK-CRAWLER NAP' },
        //     { value: 'HUGGIES ULTRA DRY-JUMBO PK-INFANT NAP', label: 'HUGGIES ULTRA DRY-JUMBO PK-INFANT NAP' },
        //     { value: 'HUGGIES ULTRA DRY-JUMBO PK-JUNIOR NAP', label: 'HUGGIES ULTRA DRY-JUMBO PK-JUNIOR NAP' },
        //     { value: 'HUGGIES ULTRA DRY-JUMBO PK-NEWBORN NAP', label: 'HUGGIES ULTRA DRY-JUMBO PK-NEWBORN NAP' },
        //     { value: 'HUGGIES ULTRA DRY-JUMBO PK-TODDLER NAP', label: 'HUGGIES ULTRA DRY-JUMBO PK-TODDLER NAP' },
        //     { value: 'HUGGIES ULTRA DRY-JUMBO PK-WALKER NAP', label: 'HUGGIES ULTRA DRY-JUMBO PK-WALKER NAP' },
        //     { value: 'KOTEX STANDARD-CONV-STANDARD', label: 'KOTEX STANDARD-CONV-STANDARD' },
        //     { value: 'LITTLE SWIMMERS-CONV PK-S.PT LARGE', label: 'LITTLE SWIMMERS-CONV PK-S.PT LARGE' },
        //     { value: 'LITTLE SWIMMERS-CONV PK-S.PT MEDIUM', label: 'LITTLE SWIMMERS-CONV PK-S.PT MEDIUM' },
        //     { value: 'LITTLE SWIMMERS-CONV PK-S.PT SMALL', label: 'LITTLE SWIMMERS-CONV PK-S.PT SMALL' },
        //     { value: 'POISE CORE-BULK-DAY MAXI PADS', label: 'POISE CORE-BULK-DAY MAXI PADS' },
        //     { value: 'POISE CORE-BULK-NIGHT ULTRA THIN PADS', label: 'POISE CORE-BULK-NIGHT ULTRA THIN PADS' },
        //     { value: 'POISE CORE-CONV-DAY MAXI PADS', label: 'POISE CORE-CONV-DAY MAXI PADS' },
        //     { value: 'POISE CORE-CONV-DAY ULTRA THIN PADS', label: 'POISE CORE-CONV-DAY ULTRA THIN PADS' },
        //     { value: 'POISE CORE-CONV-NIGHT ULTRA THIN PADS', label: 'POISE CORE-CONV-NIGHT ULTRA THIN PADS' },
        //     { value: 'POISE CORE-CONV-OTHER GARMENTS', label: 'POISE CORE-CONV-OTHER GARMENTS' },
        //     { value: 'POISE CORE-CONV-STANDARD', label: 'POISE CORE-CONV-STANDARD' },
        //     { value: 'POISE THIN & DISCREET-CONV-DAY MAXI PADS', label: 'POISE THIN & DISCREET-CONV-DAY MAXI PADS' },
        //     { value: 'POISE THIN & DISCREET-CONV-PANTS (PULL UPS)', label: 'POISE THIN & DISCREET-CONV-PANTS (PULL UPS)' },
        //     { value: 'PULL UPS-CONV PK-T.PT SIZE3', label: 'PULL UPS-CONV PK-T.PT SIZE3' },
        //     { value: 'PULL UPS-CONV PK-T.PT SIZE4', label: 'PULL UPS-CONV PK-T.PT SIZE4' },
        //     { value: 'UBK CORE-BULK-NA', label: 'UBK CORE-BULK-NA' },
        //     { value: 'UBK CORE-BULK-STANDARD', label: 'UBK CORE-BULK-STANDARD' },
        //     { value: 'UBK CORE-CONV-NA', label: 'UBK CORE-CONV-NA' },
        //     { value: 'UBK CORE-CONV-STANDARD', label: 'UBK CORE-CONV-STANDARD' },
        //     { value: 'UBK COTTON-CONV-STANDARD', label: 'UBK COTTON-CONV-STANDARD' },
        //     { value: 'UBK DESIGNER-BULK-STANDARD', label: 'UBK DESIGNER-BULK-STANDARD' },
        //     { value: 'UBK DESIGNER-CONV-NA', label: 'UBK DESIGNER-CONV-NA' },
        //     { value: 'UBK DESIGNER-CONV-STANDARD', label: 'UBK DESIGNER-CONV-STANDARD' },
        //     { value: 'UBK MATERNITY-CONV-STANDARD', label: 'UBK MATERNITY-CONV-STANDARD' },
        //     { value: 'UBK NIGHT-CONV-LONG', label: 'UBK NIGHT-CONV-LONG' },
        //     { value: 'UBK NIGHT-CONV-STANDARD', label: 'UBK NIGHT-CONV-STANDARD' },
        //     { value: 'UBK RU-NON DISPOSABLES-NA', label: 'UBK RU-NON DISPOSABLES-NA' },
        //     { value: 'UBK SPORT-CONV-NA', label: 'UBK SPORT-CONV-NA' },
        //     { value: 'UBK SPORT-CONV-STANDARD', label: 'UBK SPORT-CONV-STANDARD' },
        //     { value: 'UBK STD-CONV-NA', label: 'UBK STD-CONV-NA' },
        //     { value: 'UBK STD-CONV-STANDARD', label: 'UBK STD-CONV-STANDARD' }
        // ]
    }

    const InputOption = (props: any) => { return (<div> <components.Option {...props}> <input type="checkbox" checked={props.isSelected} onChange={() => null} /> <label>{props.value}</label> </components.Option> </div>); };

    const [selectedCategory, setSelectedCategory] = useState<any>([]);
    const [selectedSegment, setSelectedSegment] = useState<any>([]);
    const [selectedBrand, setSelectedBrand] = useState<any>([]);
    const [selectedSubBrand, setSelectedSubBrand] = useState<any>([]);
    const [selectedPackSize, setSelectedPackSize] = useState<any>([]);
    const [selectedPermutation, setSelectedPermutation] = useState<any>([]);

    const allFilterValues = {
        category: selectedCategory,
        segment: selectedSegment,
        brand: selectedBrand,
        subBrand: selectedSubBrand,
        packSize: selectedPackSize,
        permutation: selectedPermutation
    }

    const handleCategory = (selectedOptions: any) => {
        setSelectedCategory(selectedOptions);

        setSelectedSegment([]);

        setSelectedBrand([]);
        setSelectedSubBrand([]);
        setSelectedPackSize([]);
        setSelectedPermutation([]);
    };

    const handleSegment = (selectedOptions: any) => {
        setSelectedSegment(selectedOptions);

        setSelectedBrand([]);

        setSelectedSubBrand([]);
        setSelectedPackSize([]);
        setSelectedPermutation([]);
    };

    const handleBrand = (selectedOptions: any) => {
        setSelectedBrand(selectedOptions);

        setSelectedSubBrand([]);

        setSelectedPackSize([]);
        setSelectedPermutation([]);
    };

    const handleSubBrand = (selectedOptions: any) => {
        setSelectedSubBrand(selectedOptions);

        setSelectedPackSize([]);

        setSelectedPermutation([]);
    };

    const handlePackSize = (selectedOptions: any) => {
        setSelectedPackSize(selectedOptions);

        setSelectedPermutation([]);
    };

    const [productLoad, setProductLoad] = useState<any>([])

    const handlePermutation = (selectedOptions: any) => {
        setSelectedPermutation(selectedOptions);
        setProductLoad(selectedOptions)
    };

    const applyFilter = () => {
        props.sendProductData(productLoad, startDate, allFilterValues)
    }

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
                        defaultValue={{ value: 'Geo-Filters', label: 'Geo-Filters' }}
                    />
                </li>
                {selectedValue == "Geo-Filters" &&
                    <>
                        <li>
                            <Select
                                className="basic-single"
                                classNamePrefix="select"
                                isDisabled={true}
                                isSearchable={true}
                                options={geoFilters.country}
                                placeholder={'Country'}
                                menuPortalTarget={document.querySelector('body')}
                                defaultValue={{ value: 'AUSTRALIA', label: 'AUSTRALIA' }}
                            />
                        </li>
                        <li>
                            <Select
                                className="basic-single"
                                classNamePrefix="select"
                                isSearchable={true}
                                options={geoFilters.geoLevel}
                                placeholder={'Geo-Level'}
                                menuPortalTarget={document.querySelector('body')}
                            />
                        </li>
                        <li>
                            <Select
                                className="basic-single"
                                classNamePrefix="select"
                                isSearchable={true}
                                options={geoFilters.channel}
                                placeholder={'Channel'}
                                menuPortalTarget={document.querySelector('body')}
                            />
                        </li>
                        <li>
                            <Select
                                className="basic-single"
                                classNamePrefix="select"
                                isSearchable={true}
                                options={geoFilters.geoLevel2}
                                placeholder={'Geo-Level 2'}
                                menuPortalTarget={document.querySelector('body')}
                            />
                        </li>
                    </>
                }

                {selectedValue == "Product Filters" &&
                    <>
                        <li>
                            <Select
                                className="basic-single"
                                classNamePrefix="select"
                                isSearchable={true}
                                options={productFilters.category}
                                value={selectedCategory}
                                onChange={handleCategory}
                                placeholder={'Category (KCA)'}
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
                        <li>
                            <Select
                                className="basic-single"
                                classNamePrefix="select"
                                isSearchable={true}
                                options={selectedCategory.flatMap((v: any) => v.segment || [])}
                                value={selectedSegment}
                                onChange={handleSegment}
                                placeholder={'Segment (KCA)'}
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
                        <li>
                            <Select
                                className="basic-single"
                                classNamePrefix="select"
                                isSearchable={true}
                                options={selectedSegment.flatMap((v: any) => v.brand || [])}
                                value={selectedBrand}
                                onChange={handleBrand}
                                placeholder={'Brand (KCA)'}
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
                        <li>
                            <Select
                                className="basic-single"
                                classNamePrefix="select"
                                isSearchable={true}
                                options={selectedBrand.flatMap((v: any) => v.subBrand || [])}
                                value={selectedSubBrand}
                                onChange={handleSubBrand}
                                placeholder={'Sub Brand (KCA)'}
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
                        <li>
                            <Select
                                className="basic-single"
                                classNamePrefix="select"
                                isSearchable={true}
                                options={selectedSubBrand.flatMap((v: any) => v.packSize || [])}
                                value={selectedPackSize}
                                onChange={handlePackSize}
                                placeholder={'Pack Size (KCA)'}
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
                        <li>
                            <Select
                                className="basic-single"
                                classNamePrefix="select"
                                isSearchable={true}
                                options={selectedPackSize.flatMap((v: any) => v.permutation || [])}
                                value={selectedPermutation}
                                onChange={handlePermutation}
                                placeholder={"Permutation Computing"}
                                menuPortalTarget={document.querySelector('body')}
                                isMulti
                                components={{
                                    Option: InputOption
                                }}
                                closeMenuOnSelect={false}
                                hideSelectedOptions={false}
                                controlShouldRenderValue={false}
                                styles={{ menuPortal: (base) => ({ ...base, fontSize: '12px' }) }}
                            // onChange={handleChangeProduct}
                            />
                        </li>
                    </>
                }
            </ul>
            <div className="filter-datepicker">
                <DatePicker selected={startDate} onChange={(date: any) => setStartDate(date)} dateFormat="dd-MM-yyyy" />
                <LuCalendarCheck2 />
            </div>
            <button className="filterBtn" type="button" onClick={applyFilter}>Apply</button>
        </section>

    )
}

export default Filter