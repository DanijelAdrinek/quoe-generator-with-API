// gets quotes trough API
async function getQuote() {

    // localhost cant call some sites that arnt properly configured directly
    // so we use a proxy server to contact taht first, and fetch info
    // trough that proxy server
    const proxyUrl = 'https://cors-anywhere.heroku.com/'

    const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';
    
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = response.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

// on load
getQuote();