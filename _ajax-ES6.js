const ajax = {}
ajax.httpRequest = () => {

    // Chrome, Firefox, Opera 8.0+, Safari
    if (window.XMLHttpRequest) {
        return new XMLHttpRequest()
    }

    //Versões da microsfot
    const versions = [
        "MSXML2.XmlHttp.6.0",
        "MSXML2.XmlHttp.5.0",
        "MSXML2.XmlHttp.4.0",
        "MSXML2.XmlHttp.3.0",
        "MSXML2.XmlHttp.2.0",
        "Microsoft.XmlHttp"
    ]

    let httpRequest
    for (let i = 0; i < versions.length; i++) {
        try {
            httpRequest = new ActiveXObject(versions[i])
            break
        } catch (e) { }
    }
    return httpRequest
};

ajax.send = (url, callback, method, data, async) => {

    if (async === undefined) {
        async = true
    }
    
    let httpRequest = ajax.httpRequest()

    httpRequest.open(method, url, async)

    httpRequest.onreadystatechange = () => {

        if (httpRequest.readyState == 4) {
            callback(httpRequest.responseText)
        }
    }
    if (method == 'POST') {
        httpRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    }

    httpRequest.send(data)
};

ajax.get = (url, data, callback, async) => {
    const query = []
    for (let key in data) {
        query.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    }
    ajax.send(`${url}${query.length ? `?${query.join('&')}` : ''}`, callback, 'GET', null, async)
};

ajax.post = (url, data, callback, async) => {
    const query = []
    for (let key in data) {
        query.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    }
    ajax.send(url, callback, 'POST', query.join('&'), async)
};