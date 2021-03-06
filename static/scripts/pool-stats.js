function renderHashrateChart() {
    $.get("https://api.flexpool.io/v2/pool/hashrateChart?coin=eth", {}, (function(t) {
        let newResult=[],i,j
        for (i=0;i<t.result.length;++i) {
         let aux={'timestamp':t.result[i].timestamp, 'total':t.result[i].total}
         let keys=Object.keys(t.result[i].regions)
         for (j=0;j<t.result.length;++j) {
          aux[keys[j]]=t.result[i].regions[keys[j]]
         }
         newResult.push(aux)
        }
        t.result=newResult
     
        data = t.result, SERVER_EXCLUDED = ["total", "timestamp"], total_data = [], servers_data = {}, si_data = [], data.forEach((function(t, a) {
            si_data.push(t.total)
        })), si_data = getSiOfData(si_data), data.forEach((function(t, a) {
            total_data.push([1e3 * t.timestamp, t.total / si_data[0]]);
            for (const a in t) - 1 == $.inArray(a, SERVER_EXCLUDED) && (old_data = servers_data[a], "undefined" == typeof old_data && (old_data = []), servers_data[a] = old_data.concat([
                [1e3 * t.timestamp, t[a] / si_data[0]]
            ]))
        })), hightcharts_data = [], hightcharts_data.push({
            name: _("Total"),
            className: "highcharts-color-server-total",
            data: highchartsSort(total_data)
        });
        for (const t in servers_data) hightcharts_data.push({
            name: t.toUpperCase(),
            className: "highcharts-color-server-" + t.toLowerCase(),
            data: highchartsSort(servers_data[t])
        });
        Highcharts.setOptions({
            colors: ["#000000", "#edb431", "#15cd72", "#0069ff"]
        }), $("#pool-hashrate-chart").highcharts({
            chart: {
                type: "spline",
                styledMode: !0
            },
            title: {
                text: _("Hashrate")
            },
            xAxis: {
                type: "datetime",
                dateTimeLabelFormats: {
                    month: "%e. %b",
                    year: "%b"
                },
                title: {
                    text: _("Date")
                }
            },
            yAxis: {
                title: {
                    text: _("Servers")
                },
                min: 0
            },
            time: {
                timezoneOffset: (new Date).getTimezoneOffset()
            },
            tooltip: {
                headerFormat: "<b>{series.name}</b><br>",
                pointFormat: `{point.x:%e. %b %H:%M}: {point.y:.2f} ${si_data[1]}H/s`
            },
            series: hightcharts_data
        })
    }))
}

//$(document).ready((function() {
//    renderHashrateChart()
//})), 

function getPoolHashrateData() {
    $.get("https://api.flexpool.io/v2/pool/averageLuck?coin=eth", {}, (function(t) {
    $("#avgluck_").removeClass("mainstats-flex-center"), color = "green", t.result < 1 && (color = "gray"), $("#avgluck_").html(`<mark class="luck-value ${color}">${formatLuck(t.result,isPro)}</mark>%`), $("#avgluck_ mark").attr("data-luck", t.result)
})).fail((function(t) {
    console.error("Unable to get avg luck", t)
})), $.get("https://api.flexpool.io/v2/pool/minerCount?coin=eth", {}, (function(t) {
    $("#total-miners").html(t.result)
})).fail((function(t) {
    console.error("Unable to get miners online", t)
})), $.get("https://api.flexpool.io/v2/pool/workerCount?coin=eth", {}, (function(t) {
    $("#total-workers").html(t.result)
})).fail((function(t) {
    console.error("Unable to get workers online", t)
})), $.get("https://api.flexpool.io/v2/pool/hashrate?coin=eth", {}, (function(t) {
    hashrate = getSi(t.result.total), $("#pool-hashrate").html(Math.round(t.result.total / hashrate[0] * 100) / 100), $("#pool-hashrate-si").html(hashrate[1])
})).fail((function(t) {
    console.error("Unable to get workers online", t)
}));
}
