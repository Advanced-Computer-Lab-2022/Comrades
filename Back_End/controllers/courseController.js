const Course = require('../models/course')
const mongoose = require('mongoose')




// create a new course
const createCourse = async (req, res) => {
    const { Title, Subject, Subtitles, Instructor, Price, CreditHours, Discount, Description } = req.body
    const Rating = 5;
    var TotalHours = 0;
    for (let i = 0; i < Subtitles.length; i++) {
        TotalHours = TotalHours + Subtitles[i].Hours;
    }

    try {
        const data = await Course.create({ Title, Subject, Subtitles, Instructor, Price, TotalHours, CreditHours, Rating, Discount, Description })
        res.status(200).json(data)
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Get a country
const getCurrency = async (req, res) => {
    let code = "USD"
    let country = JSON.stringify(req.params.country)
    country = country.substring(1, country.length - 1)
    for (let i = 0; i < 243; i++) {
        if (countries[i].country == country) {
            code = countries[i].currency_code;
            break;
        }
    }
    const rate = currencies[code]

    res.status(200).json({
        "code": code,
        "rate": rate
    })
}
// get all courses
const getCourses = async (req, res) => {
    const courses = await Course.find({}, 'Title  Subject  Subtitles  Price  TotalHours  Rating  CreditHours  Discount');

    res.status(200).json(courses)
}


//filter courses of an instructor by Price
const filterCoursesByPriceInstructor = async (req, res) => {
    let query = req.params.query;
    console.log(query.length);
    const courses = await Course.find(
        {
            $and: [
                { "Instructor": "ahmedInstructor" },
                { "Price": { $lt: parseInt(query) + 1 } }
            ],
            

        },
        'Title  Instructor  Price  Subject'
    );
    res.status(200).json(courses)
}

//filter courses of an instructor by Subject
const filterCoursesBySubjectInstructor = async (req, res) => {
    let query = req.params.query;
    console.log(query.length);
    const courses = await Course.find(
        {
            $and: [
                { "Instructor": "ahmedInstructor" },
                { "Subject": query }
            ],
            

        },
        'Title  Instructor  Price  Subject'
    );
    res.status(200).json(courses)
}


//get courses of an instructor
const getCoursesInstructor = async (req, res) => {
    const courses = await Course.find({ "Instructor": "ahmedInstructor" }, 'Title Instructor Price Subject')
    res.status(200).json(courses)
}

//Search
const search = async (req, res) => {
    let query = JSON.stringify(req.params.query)
    query = query.substring(1, query.length - 1)
    const courses = await Course.find(
        { $or: [{ "Instructor": query }, { "Title": query }, { "Subject": query }] },
        // { "Instructor": query },
        'Title  Subject  Subtitles  Price  TotalHours  Rating  CreditHours  Discount');

    res.status(200).json(courses)
}

//Search Instructor
const searchInstructor = async (req, res) => {
    let query = JSON.stringify(req.params.query)
    query = query.substring(1, query.length - 1)
    const courses = await Course.find(
        {
            $and: [
                { "Instructor": "ahmedInstructor" },
                { $or: [{ "Title": query }, { "Subject": query }] }
            ]

        },
        // { "Instructor": query },
        'Title  Subject  Subtitles  Instructor  Price  TotalHours  Rating  CreditHours  Discount');

    res.status(200).json(courses)
}

const getCourseById = async (req, res) => {
    let query = JSON.stringify(req.params.query)
    query = query.substring(1, query.length - 1)
    const courses = await Course.find({ "_id": query }, 'Title  Rating  Description Price TotalHours')
    res.status(200).json(courses)
}

const getCountries = async (req, res) => {
    let ret = [];
    for (let i = 0; i < 243; i++) {
        ret.push(countries[i].country)
    }
    res.status(200).json(ret)
}
//filter courses by Price
const filterCoursesByPrice = async (req, res) => {
    let query = req.params.query;
    console.log(query.length);
    const courses = await Course.find({ "Price": { $lt: query + 1 } }, 'Title  Subject  Subtitles  Price  TotalHours  Rating  CreditHours  Discount');

    res.status(200).json(courses)
}

//filter courses by Subject and Rating
const filterCoursesBySubjectAndRating = async (req, res) => {
    let query = JSON.parse(req.params.query);
    let subject = query.subject;
    let rating = query.rating;
    const courses = await Course.find(
        {
            $and: [
                { "Subject": subject },
                { "Rating": { $gt: rating + 1 } }
            ]
        },
        'Title  Subject  Subtitles  Price  TotalHours  Rating  CreditHours  Discount');


    res.status(200).json(courses)
}




module.exports = {
    createCourse,
    getCurrency,
    getCourses,
    getCoursesInstructor,
    search,
    getCourseById,
    searchInstructor,
    getCountries,
    filterCoursesBySubjectInstructor,
    filterCoursesByPriceInstructor,
    filterCoursesBySubjectAndRating,
    filterCoursesByPrice


}


let currencies = {
    "USD": 1,
    "AED": 3.6725,
    "AFN": 88.8723,
    "ALL": 112.7083,
    "AMD": 395.3379,
    "ANG": 1.7900,
    "AOA": 510.5548,
    "ARS": 162.8600,
    "AUD": 1.5121,
    "AWG": 1.7900,
    "AZN": 1.6976,
    "BAM": 1.9100,
    "BBD": 2.0000,
    "BDT": 102.1055,
    "BGN": 1.9099,
    "BHD": 0.3760,
    "BIF": 2041.4837,
    "BMD": 1.0000,
    "BND": 1.3814,
    "BOB": 6.9256,
    "BRL": 5.3400,
    "BSD": 1.0000,
    "BTN": 81.5964,
    "BWP": 13.0637,
    "BYN": 2.4873,
    "BZD": 2.0000,
    "CAD": 1.3440,
    "CDF": 2086.7045,
    "CHF": 0.9581,
    "CLP": 941.3734,
    "CNY": 7.1599,
    "COP": 4971.0432,
    "CRC": 611.7210,
    "CUP": 24.0000,
    "CVE": 107.6832,
    "CZK": 23.7749,
    "DJF": 177.7210,
    "DKK": 7.2857,
    "DOP": 54.6648,
    "DZD": 139.3258,
    "EGP": 24.4970,
    "ERN": 15.0000,
    "ETB": 53.1723,
    "EUR": 0.9767,
    "FJD": 2.2340,
    "FKP": 0.8466,
    "FOK": 7.2857,
    "GBP": 0.8466,
    "GEL": 2.7168,
    "GGP": 0.8466,
    "GHS": 15.0782,
    "GIP": 0.8466,
    "GMD": 63.4161,
    "GNF": 8616.8380,
    "GTQ": 7.8181,
    "GYD": 209.4065,
    "HKD": 7.8052,
    "HNL": 24.7460,
    "HRK": 7.3581,
    "HTG": 137.1978,
    "HUF": 398.7324,
    "IDR": 15674.6971,
    "ILS": 3.4808,
    "IMP": 0.8466,
    "INR": 81.6157,
    "IQD": 1460.7645,
    "IRR": 42022.8978,
    "ISK": 145.0015,
    "JEP": 0.8466,
    "JMD": 153.9336,
    "JOD": 0.7090,
    "JPY": 141.7716,
    "KES": 122.6012,
    "KGS": 84.4241,
    "KHR": 4146.2104,
    "KID": 1.5120,
    "KMF": 480.4485,
    "KRW": 1355.7976,
    "KWD": 0.2996,
    "KYD": 0.8333,
    "KZT": 463.4259,
    "LAK": 17215.0546,
    "LBP": 1507.5000,
    "LKR": 361.4280,
    "LRD": 153.7686,
    "LSL": 17.3278,
    "LYD": 4.9041,
    "MAD": 10.7431,
    "MDL": 19.2064,
    "MGA": 4302.6990,
    "MKD": 59.4621,
    "MMK": 2670.7030,
    "MNT": 3410.2894,
    "MOP": 8.0389,
    "MRU": 37.9112,
    "MUR": 43.2303,
    "MVR": 15.3815,
    "MWK": 1035.9147,
    "MXN": 19.5333,
    "MYR": 4.5621,
    "MZN": 64.3557,
    "NAD": 17.3278,
    "NGN": 440.5570,
    "NIO": 36.1087,
    "NOK": 10.2588,
    "NPR": 130.5543,
    "NZD": 1.6382,
    "OMR": 0.3845,
    "PAB": 1.0000,
    "PEN": 3.8353,
    "PGK": 3.5158,
    "PHP": 57.3293,
    "PKR": 223.7640,
    "PLN": 4.5781,
    "PYG": 7124.0223,
    "QAR": 3.6400,
    "RON": 4.8194,
    "RSD": 114.5546,
    "RUB": 60.7914,
    "RWF": 1052.4996,
    "SAR": 3.7500,
    "SBD": 8.4294,
    "SCR": 13.7173,
    "SDG": 565.3181,
    "SEK": 10.7104,
    "SGD": 1.3814,
    "SHP": 0.8466,
    "SLE": 18.5202,
    "SLL": 18520.1933,
    "SOS": 569.0262,
    "SRD": 30.7577,
    "SSP": 629.6208,
    "STN": 23.9263,
    "SYP": 2508.1727,
    "SZL": 17.3278,
    "THB": 36.2313,
    "TJS": 10.1728,
    "TMT": 3.4999,
    "TND": 2.9107,
    "TOP": 2.3719,
    "TRY": 18.6115,
    "TTD": 6.7685,
    "TVD": 1.5120,
    "TWD": 31.0968,
    "TZS": 2332.3496,
    "UAH": 36.7805,
    "UGX": 3748.8011,
    "UYU": 39.9624,
    "UZS": 11243.2712,
    "VES": 9.9787,
    "VND": 24754.4166,
    "VUV": 120.9394,
    "WST": 2.7507,
    "XAF": 640.5980,
    "XCD": 2.7000,
    "XDR": 0.7680,
    "XOF": 640.5980,
    "XPF": 116.5379,
    "YER": 249.7973,
    "ZAR": 17.3284,
    "ZMW": 16.6957,
    "ZWL": 641.1260
}
let countries = [
    {
        "country": "Afghanistan",
        "currency_code": "AFN"
    },
    {
        "country": "Albania",
        "currency_code": "ALL"
    },
    {
        "country": "Algeria",
        "currency_code": "DZD"
    },
    {
        "country": "American Samoa",
        "currency_code": "USD"
    },
    {
        "country": "Andorra",
        "currency_code": "EUR"
    },
    {
        "country": "Angola",
        "currency_code": "AOA"
    },
    {
        "country": "Anguilla",
        "currency_code": "XCD"
    },
    {
        "country": "Antarctica",
        "currency_code": "XCD"
    },
    {
        "country": "Antigua and Barbuda",
        "currency_code": "XCD"
    },
    {
        "country": "Argentina",
        "currency_code": "ARS"
    },
    {
        "country": "Armenia",
        "currency_code": "AMD"
    },
    {
        "country": "Aruba",
        "currency_code": "AWG"
    },
    {
        "country": "Australia",
        "currency_code": "AUD"
    },
    {
        "country": "Austria",
        "currency_code": "EUR"
    },
    {
        "country": "Azerbaijan",
        "currency_code": "AZN"
    },
    {
        "country": "Bahamas",
        "currency_code": "BSD"
    },
    {
        "country": "Bahrain",
        "currency_code": "BHD"
    },
    {
        "country": "Bangladesh",
        "currency_code": "BDT"
    },
    {
        "country": "Barbados",
        "currency_code": "BBD"
    },
    {
        "country": "Belarus",
        "currency_code": "BYR"
    },
    {
        "country": "Belgium",
        "currency_code": "EUR"
    },
    {
        "country": "Belize",
        "currency_code": "BZD"
    },
    {
        "country": "Benin",
        "currency_code": "XOF"
    },
    {
        "country": "Bermuda",
        "currency_code": "BMD"
    },
    {
        "country": "Bhutan",
        "currency_code": "BTN"
    },
    {
        "country": "Bolivia",
        "currency_code": "BOB"
    },
    {
        "country": "Bosnia and Herzegovina",
        "currency_code": "BAM"
    },
    {
        "country": "Botswana",
        "currency_code": "BWP"
    },
    {
        "country": "Bouvet Island",
        "currency_code": "NOK"
    },
    {
        "country": "Brazil",
        "currency_code": "BRL"
    },
    {
        "country": "British Indian Ocean Territory",
        "currency_code": "USD"
    },
    {
        "country": "Brunei",
        "currency_code": "BND"
    },
    {
        "country": "Bulgaria",
        "currency_code": "BGN"
    },
    {
        "country": "Burkina Faso",
        "currency_code": "XOF"
    },
    {
        "country": "Burundi",
        "currency_code": "BIF"
    },
    {
        "country": "Cambodia",
        "currency_code": "KHR"
    },
    {
        "country": "Cameroon",
        "currency_code": "XAF"
    },
    {
        "country": "Canada",
        "currency_code": "CAD"
    },
    {
        "country": "Cape Verde",
        "currency_code": "CVE"
    },
    {
        "country": "Cayman Islands",
        "currency_code": "KYD"
    },
    {
        "country": "Central African Republic",
        "currency_code": "XAF"
    },
    {
        "country": "Chad",
        "currency_code": "XAF"
    },
    {
        "country": "Chile",
        "currency_code": "CLP"
    },
    {
        "country": "China",
        "currency_code": "CNY"
    },
    {
        "country": "Christmas Island",
        "currency_code": "AUD"
    },
    {
        "country": "Cocos (Keeling) Islands",
        "currency_code": "AUD"
    },
    {
        "country": "Colombia",
        "currency_code": "COP"
    },
    {
        "country": "Comoros",
        "currency_code": "KMF"
    },
    {
        "country": "Congo",
        "currency_code": "XAF"
    },
    {
        "country": "Cook Islands",
        "currency_code": "NZD"
    },
    {
        "country": "Costa Rica",
        "currency_code": "CRC"
    },
    {
        "country": "Croatia",
        "currency_code": "HRK"
    },
    {
        "country": "Cuba",
        "currency_code": "CUP"
    },
    {
        "country": "Cyprus",
        "currency_code": "EUR"
    },
    {
        "country": "Czech Republic",
        "currency_code": "CZK"
    },
    {
        "country": "Denmark",
        "currency_code": "DKK"
    },
    {
        "country": "Djibouti",
        "currency_code": "DJF"
    },
    {
        "country": "Dominica",
        "currency_code": "XCD"
    },
    {
        "country": "Dominican Republic",
        "currency_code": "DOP"
    },
    {
        "country": "East Timor",
        "currency_code": "USD"
    },
    {
        "country": "Ecuador",
        "currency_code": "ECS"
    },
    {
        "country": "Egypt",
        "currency_code": "EGP"
    },
    {
        "country": "El Salvador",
        "currency_code": "SVC"
    },
    {
        "country": "England",
        "currency_code": "GBP"
    },
    {
        "country": "Equatorial Guinea",
        "currency_code": "XAF"
    },
    {
        "country": "Eritrea",
        "currency_code": "ERN"
    },
    {
        "country": "Estonia",
        "currency_code": "EUR"
    },
    {
        "country": "Ethiopia",
        "currency_code": "ETB"
    },
    {
        "country": "Falkland Islands",
        "currency_code": "FKP"
    },
    {
        "country": "Faroe Islands",
        "currency_code": "DKK"
    },
    {
        "country": "Fiji Islands",
        "currency_code": "FJD"
    },
    {
        "country": "Finland",
        "currency_code": "EUR"
    },
    {
        "country": "France",
        "currency_code": "EUR"
    },
    {
        "country": "French Guiana",
        "currency_code": "EUR"
    },
    {
        "country": "French Polynesia",
        "currency_code": "XPF"
    },
    {
        "country": "French Southern territories",
        "currency_code": "EUR"
    },
    {
        "country": "Gabon",
        "currency_code": "XAF"
    },
    {
        "country": "Gambia",
        "currency_code": "GMD"
    },
    {
        "country": "Georgia",
        "currency_code": "GEL"
    },
    {
        "country": "Germany",
        "currency_code": "EUR"
    },
    {
        "country": "Ghana",
        "currency_code": "GHS"
    },
    {
        "country": "Gibraltar",
        "currency_code": "GIP"
    },
    {
        "country": "Greece",
        "currency_code": "EUR"
    },
    {
        "country": "Greenland",
        "currency_code": "DKK"
    },
    {
        "country": "Grenada",
        "currency_code": "XCD"
    },
    {
        "country": "Guadeloupe",
        "currency_code": "EUR"
    },
    {
        "country": "Guam",
        "currency_code": "USD"
    },
    {
        "country": "Guatemala",
        "currency_code": "QTQ"
    },
    {
        "country": "Guinea",
        "currency_code": "GNF"
    },
    {
        "country": "Guinea-Bissau",
        "currency_code": "CFA"
    },
    {
        "country": "Guyana",
        "currency_code": "GYD"
    },
    {
        "country": "Haiti",
        "currency_code": "HTG"
    },
    {
        "country": "Heard Island and McDonald Islands",
        "currency_code": "AUD"
    },
    {
        "country": "Holy See (Vatican City State)",
        "currency_code": "EUR"
    },
    {
        "country": "Honduras",
        "currency_code": "HNL"
    },
    {
        "country": "Hong Kong",
        "currency_code": "HKD"
    },
    {
        "country": "Hungary",
        "currency_code": "HUF"
    },
    {
        "country": "Iceland",
        "currency_code": "ISK"
    },
    {
        "country": "India",
        "currency_code": "INR"
    },
    {
        "country": "Indonesia",
        "currency_code": "IDR"
    },
    {
        "country": "Iran",
        "currency_code": "IRR"
    },
    {
        "country": "Iraq",
        "currency_code": "IQD"
    },
    {
        "country": "Ireland",
        "currency_code": "EUR"
    },
    {
        "country": "THIS COUNTRY DOSENT EXIST",
        "currency_code": "ILS"
    },
    {
        "country": "Italy",
        "currency_code": "EUR"
    },
    {
        "country": "Ivory Coast",
        "currency_code": "XOF"
    },
    {
        "country": "Jamaica",
        "currency_code": "JMD"
    },
    {
        "country": "Japan",
        "currency_code": "JPY"
    },
    {
        "country": "Jordan",
        "currency_code": "JOD"
    },
    {
        "country": "Kazakhstan",
        "currency_code": "KZT"
    },
    {
        "country": "Kenya",
        "currency_code": "KES"
    },
    {
        "country": "Kiribati",
        "currency_code": "AUD"
    },
    {
        "country": "Kuwait",
        "currency_code": "KWD"
    },
    {
        "country": "Kyrgyzstan",
        "currency_code": "KGS"
    },
    {
        "country": "Laos",
        "currency_code": "LAK"
    },
    {
        "country": "Latvia",
        "currency_code": "LVL"
    },
    {
        "country": "Lebanon",
        "currency_code": "LBP"
    },
    {
        "country": "Lesotho",
        "currency_code": "LSL"
    },
    {
        "country": "Liberia",
        "currency_code": "LRD"
    },
    {
        "country": "Libyan Arab Jamahiriya",
        "currency_code": "LYD"
    },
    {
        "country": "Liechtenstein",
        "currency_code": "CHF"
    },
    {
        "country": "Lithuania",
        "currency_code": "LTL"
    },
    {
        "country": "Luxembourg",
        "currency_code": "EUR"
    },
    {
        "country": "Macao",
        "currency_code": "MOP"
    },
    {
        "country": "North Macedonia",
        "currency_code": "MKD"
    },
    {
        "country": "Madagascar",
        "currency_code": "MGF"
    },
    {
        "country": "Malawi",
        "currency_code": "MWK"
    },
    {
        "country": "Malaysia",
        "currency_code": "MYR"
    },
    {
        "country": "Maldives",
        "currency_code": "MVR"
    },
    {
        "country": "Mali",
        "currency_code": "XOF"
    },
    {
        "country": "Malta",
        "currency_code": "EUR"
    },
    {
        "country": "Marshall Islands",
        "currency_code": "USD"
    },
    {
        "country": "Martinique",
        "currency_code": "EUR"
    },
    {
        "country": "Mauritania",
        "currency_code": "MRO"
    },
    {
        "country": "Mauritius",
        "currency_code": "MUR"
    },
    {
        "country": "Mayotte",
        "currency_code": "EUR"
    },
    {
        "country": "Mexico",
        "currency_code": "MXN"
    },
    {
        "country": "Micronesia, Federated States of",
        "currency_code": "USD"
    },
    {
        "country": "Moldova",
        "currency_code": "MDL"
    },
    {
        "country": "Monaco",
        "currency_code": "EUR"
    },
    {
        "country": "Mongolia",
        "currency_code": "MNT"
    },
    {
        "country": "Montserrat",
        "currency_code": "XCD"
    },
    {
        "country": "Morocco",
        "currency_code": "MAD"
    },
    {
        "country": "Mozambique",
        "currency_code": "MZN"
    },
    {
        "country": "Myanmar",
        "currency_code": "MMR"
    },
    {
        "country": "Namibia",
        "currency_code": "NAD"
    },
    {
        "country": "Nauru",
        "currency_code": "AUD"
    },
    {
        "country": "Nepal",
        "currency_code": "NPR"
    },
    {
        "country": "Netherlands",
        "currency_code": "EUR"
    },
    {
        "country": "Netherlands Antilles",
        "currency_code": "ANG"
    },
    {
        "country": "New Caledonia",
        "currency_code": "XPF"
    },
    {
        "country": "New Zealand",
        "currency_code": "NZD"
    },
    {
        "country": "Nicaragua",
        "currency_code": "NIO"
    },
    {
        "country": "Niger",
        "currency_code": "XOF"
    },
    {
        "country": "Nigeria",
        "currency_code": "NGN"
    },
    {
        "country": "Niue",
        "currency_code": "NZD"
    },
    {
        "country": "Norfolk Island",
        "currency_code": "AUD"
    },
    {
        "country": "North Korea",
        "currency_code": "KPW"
    },
    {
        "country": "Northern Ireland",
        "currency_code": "GBP"
    },
    {
        "country": "Northern Mariana Islands",
        "currency_code": "USD"
    },
    {
        "country": "Norway",
        "currency_code": "NOK"
    },
    {
        "country": "Oman",
        "currency_code": "OMR"
    },
    {
        "country": "Pakistan",
        "currency_code": "PKR"
    },
    {
        "country": "Palau",
        "currency_code": "USD"
    },
    {
        "country": "Palestine",
        "currency_code": null
    },
    {
        "country": "Panama",
        "currency_code": "PAB"
    },
    {
        "country": "Papua New Guinea",
        "currency_code": "PGK"
    },
    {
        "country": "Paraguay",
        "currency_code": "PYG"
    },
    {
        "country": "Peru",
        "currency_code": "PEN"
    },
    {
        "country": "Philippines",
        "currency_code": "PHP"
    },
    {
        "country": "Pitcairn",
        "currency_code": "NZD"
    },
    {
        "country": "Poland",
        "currency_code": "PLN"
    },
    {
        "country": "Portugal",
        "currency_code": "EUR"
    },
    {
        "country": "Puerto Rico",
        "currency_code": "USD"
    },
    {
        "country": "Qatar",
        "currency_code": "QAR"
    },
    {
        "country": "Reunion",
        "currency_code": "EUR"
    },
    {
        "country": "Romania",
        "currency_code": "RON"
    },
    {
        "country": "Russian Federation",
        "currency_code": "RUB"
    },
    {
        "country": "Rwanda",
        "currency_code": "RWF"
    },
    {
        "country": "Saint Helena",
        "currency_code": "SHP"
    },
    {
        "country": "Saint Kitts and Nevis",
        "currency_code": "XCD"
    },
    {
        "country": "Saint Lucia",
        "currency_code": "XCD"
    },
    {
        "country": "Saint Pierre and Miquelon",
        "currency_code": "EUR"
    },
    {
        "country": "Saint Vincent and the Grenadines",
        "currency_code": "XCD"
    },
    {
        "country": "Samoa",
        "currency_code": "WST"
    },
    {
        "country": "San Marino",
        "currency_code": "EUR"
    },
    {
        "country": "Sao Tome and Principe",
        "currency_code": "STD"
    },
    {
        "country": "Saudi Arabia",
        "currency_code": "SAR"
    },
    {
        "country": "Scotland",
        "currency_code": "GBP"
    },
    {
        "country": "Senegal",
        "currency_code": "XOF"
    },
    {
        "country": "Serbia",
        "currency_code": "RSD"
    },
    {
        "country": "Seychelles",
        "currency_code": "SCR"
    },
    {
        "country": "Sierra Leone",
        "currency_code": "SLL"
    },
    {
        "country": "Singapore",
        "currency_code": "SGD"
    },
    {
        "country": "Slovakia",
        "currency_code": "EUR"
    },
    {
        "country": "Slovenia",
        "currency_code": "EUR"
    },
    {
        "country": "Solomon Islands",
        "currency_code": "SBD"
    },
    {
        "country": "Somalia",
        "currency_code": "SOS"
    },
    {
        "country": "South Africa",
        "currency_code": "ZAR"
    },
    {
        "country": "South Georgia and the South Sandwich Islands",
        "currency_code": "GBP"
    },
    {
        "country": "South Korea",
        "currency_code": "KRW"
    },
    {
        "country": "South Sudan",
        "currency_code": "SSP"
    },
    {
        "country": "Spain",
        "currency_code": "EUR"
    },
    {
        "country": "Sri Lanka",
        "currency_code": "LKR"
    },
    {
        "country": "Sudan",
        "currency_code": "SDG"
    },
    {
        "country": "Suriname",
        "currency_code": "SRD"
    },
    {
        "country": "Svalbard and Jan Mayen",
        "currency_code": "NOK"
    },
    {
        "country": "Swaziland",
        "currency_code": "SZL"
    },
    {
        "country": "Sweden",
        "currency_code": "SEK"
    },
    {
        "country": "Switzerland",
        "currency_code": "CHF"
    },
    {
        "country": "Syria",
        "currency_code": "SYP"
    },
    {
        "country": "Tajikistan",
        "currency_code": "TJS"
    },
    {
        "country": "Tanzania",
        "currency_code": "TZS"
    },
    {
        "country": "Thailand",
        "currency_code": "THB"
    },
    {
        "country": "The Democratic Republic of Congo",
        "currency_code": "CDF"
    },
    {
        "country": "Togo",
        "currency_code": "XOF"
    },
    {
        "country": "Tokelau",
        "currency_code": "NZD"
    },
    {
        "country": "Tonga",
        "currency_code": "TOP"
    },
    {
        "country": "Trinidad and Tobago",
        "currency_code": "TTD"
    },
    {
        "country": "Tunisia",
        "currency_code": "TND"
    },
    {
        "country": "Turkey",
        "currency_code": "TRY"
    },
    {
        "country": "Turkmenistan",
        "currency_code": "TMT"
    },
    {
        "country": "Turks and Caicos Islands",
        "currency_code": "USD"
    },
    {
        "country": "Tuvalu",
        "currency_code": "AUD"
    },
    {
        "country": "Uganda",
        "currency_code": "UGX"
    },
    {
        "country": "Ukraine",
        "currency_code": "UAH"
    },
    {
        "country": "United Arab Emirates",
        "currency_code": "AED"
    },
    {
        "country": "United Kingdom",
        "currency_code": "GBP"
    },
    {
        "country": "United States",
        "currency_code": "USD"
    },
    {
        "country": "United States Minor Outlying Islands",
        "currency_code": "USD"
    },
    {
        "country": "Uruguay",
        "currency_code": "UYU"
    },
    {
        "country": "Uzbekistan",
        "currency_code": "UZS"
    },
    {
        "country": "Vanuatu",
        "currency_code": "VUV"
    },
    {
        "country": "Venezuela",
        "currency_code": "VEF"
    },
    {
        "country": "Vietnam",
        "currency_code": "VND"
    },
    {
        "country": "Virgin Islands, British",
        "currency_code": "USD"
    },
    {
        "country": "Virgin Islands, U.S.",
        "currency_code": "USD"
    },
    {
        "country": "Wales",
        "currency_code": "GBP"
    },
    {
        "country": "Wallis and Futuna",
        "currency_code": "XPF"
    },
    {
        "country": "Western Sahara",
        "currency_code": "MAD"
    },
    {
        "country": "Yemen",
        "currency_code": "YER"
    },
    {
        "country": "Zambia",
        "currency_code": "ZMW"
    },
    {
        "country": "Zimbabwe",
        "currency_code": "ZWD"
    }
]