var axios = require('axios');
var cheerio = require('cheerio');

function params(code) {
    return {
        accion: 6,
        NumDistribuidor: 99,
        NomUsuario: "usuInternet",
        NomHost: "AFT",
        NomDominio: "aft.cl",
        Trx: "",
        RutUsuario: 0,
        NumTarjeta: code,
        bloqueable: ""
    };
}

const selectors = {
    "code": "body > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(1) > td:nth-child(2) > table > tbody > tr > td > table > tbody > tr:nth-child(3) > td > table > tbody > tr > td > table > tbody > tr:nth-child(1) > td:nth-child(2)",
    "balance": "body > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(1) > td:nth-child(2) > table > tbody > tr > td > table > tbody > tr:nth-child(3) > td > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td:nth-child(2)",
    "lastupdate": "body > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(1) > td:nth-child(2) > table > tbody > tr > td > table > tbody > tr:nth-child(3) > td > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td:nth-child(4)"
}

const url = "http://200.46.245.230:8080/PortalCAE-WAR-MODULE/SesionPortalServlet";


exports.obtenerDatoTarjeta = async function (codigo) {
    try {
        var solicitud = await axios.get(url, {
            params: params(codigo)
        })

        //console.log(solicitud.data)
    
        var $ = cheerio.load(solicitud.data);

        var tarjeta = {
            balance: $(selectors.balance).text(),
            code: codigo,
            lastupdate: $(selectors.lastupdate).text()
        };
    
        return tarjeta
    } catch (error) {
        return {error: error}
    }
}