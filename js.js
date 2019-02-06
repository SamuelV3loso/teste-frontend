let xhr = new XMLHttpRequest();
xhr.open("GET", 'http://5c5872d89815f6001490363e.mockapi.io/avgTotal');//URL api
xhr.onload = function(){//Tratando resposta do servidor
        
     if (this.status >= 200 && this.status <= 300) {

        let data = popularMap(JSON.parse(this.responseText));
        nationailAvg(JSON.parse(this.responseText).national);
        construirMapa(data);
          
    } else {  
         console.log("Erro: " + status);
    }
        
};
xhr.send();//Enviando Requisição

function nationailAvg(data){
    let a = document.getElementById('nationalAvg');
    a.innerHTML = data;
}

function popularMap(dados){
    data = [
        ['br-ac', 0],
        ['br-al', 0],
        ['br-am', 0],
        ['br-ap', 0],
        ['br-ba', 0],
        ['br-ce', 0],
        ['br-df', 0],
        ['br-es', 0],
        ['br-go', 0],
        ['br-ma', 0],
        ['br-mg', 0],
        ['br-ms', 0],
        ['br-mt', 0],
        ['br-pa', 0],
        ['br-pb', 0],
        ['br-pe', 0],
        ['br-pi', 0],
        ['br-pr', 0],
        ['br-rj', 0],
        ['br-rn', 0],
        ['br-ro', 0],
        ['br-rr', 0],
        ['br-rs', 0],
        ['br-sc', 0],
        ['br-se', 0],
        ['br-sp', 0],
        ['br-to', 0]
    ];

    for(let i = 0; i < data.length; i++){
        data[i][1] = dados.regionals[i].average;
    }

    return data;
}

function construirMapa(data)
{
    Highcharts.mapChart('container', {
    chart: {
        map: 'countries/br/br-all'
    },

    title: {
        text: 'SENAI'
    },

    subtitle: {
        text: 'Taxa de ex-alunos que continuam estudando'
    },

    mapNavigation: {
        enabled: true,
        buttonOptions: {
            verticalAlign: 'bottom'
        }
    },

    colorAxis: {
        min: 0
    },
    series: [{
        data: data,
        name: 'Taxa:',
        states: {
            hover: {
                color: '#BADA55'
            }
        },
        dataLabels: {
            enabled: true,
            format: '{point.name}'
        }
    }]
});
}