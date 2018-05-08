function ajax(url, port, type, params = [ { name, id } ]) {
    let httpRequest
    // url = montaUrl(url, port, params)
    url += `:${port}/${params[0].name}`
    console.log(url)
    
    if (window.XMLHttpRequest) {
        httpRequest = new XMLHttpRequest()
    } else if (window.ActiveXObject) {
        try {
            httpRequest = new ActiveXObject("Msxml2.XMLHTTP")
            console.log(`Requisição efetuada!`)
        } catch (e) {
            try {
                httpRequest = new ActiveXObject("Microsoft.XMLHTTP")
                console.log(`Messagem do primeiro Catch: ${e.description}`)
            } catch (e) {
                console.log(`Messagem ultimo Catch: ${e.description}`)
            }
        }
    }

    if (!httpRequest) {
        console.log('Não foi possível achar nenhuma instancia suportada pelo seu navegador')
        return false
    }

    httpRequest.onreadystatechange = function () {
        try {
            if (httpRequest.readyState === 4) {
                if (httpRequest.status === 200) {
                    console.log(`On ready State Change: ${httpRequest.responseText}`)
                } else {
                    console.log(
                        "Infelizmente ocorreu algum problema com a requisição ajax"
                    )
                }
            }
        } catch (e) {
            console.log(`Exception: ${e.description}`)
        }
    }

    httpRequest.open(type, url)
    httpRequest.send()
}



function montaUrl(url, port, params = [{ name, id }]) {
    console.log(params[0].id)
    console.log(params[0].name)
    url += `:${port}/${params[0].name}`

    if (params[0].id !== undefined || params[0].id !== null) {
        url += `?id=${params[0].id}`
    }

    return url
}