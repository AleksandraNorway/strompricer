async function apiData() {
    const apiLink = 'https://www.hvakosterstrommen.no/api/v1/prices/2024/01-08_NO5.json '
    const response = await fetch(apiLink)
    const datapoints = await response.json()
    console.log(datapoints)
}
