
function barchart(States, Usage) {
    var barChartOptions = {
        series: [{
            data: [Usage[0], Usage[1], Usage[2], Usage[3], Usage[4]]
        }],
        chart: {
            type: 'bar',
            height: 350,
            toolbar: {
                show: false
            },
        },
        colors: [
            "#246dec",
            "#cc3c43",
            "#367952",
            "#f5b74f",
            "#4f35a1"
        ],
        plotOptions: {
            bar: {
                distributed: true,
                borderRadius: 4,
                horizontal: false,
                columnWidth: '40%',
            }
        },
        dataLabels: {
            enabled: false
        },
        legend: {
            show: false
        },
        xaxis: {
            categories: [States[0], States[1], States[2], States[3], States[4]],
        },
        yaxis: {
            title: {
                text: "Usage"
            }
        }
    };

    var barChart = new ApexCharts(document.querySelector("#bar-chart"), barChartOptions);
    barChart.render();
}


var graphState = document.getElementById("graphState");
var graphYear = document.getElementById("graphYear");
graphState.addEventListener('change', data_vizualization);
graphYear.addEventListener('change', data_vizualization);

var months = []
var usage = []


async function data_vizualization() {
    var state = document.getElementById("graphState").value;
    var year = document.getElementById("graphYear").value;
    var year = graphYear.value;
    var url = "http://127.0.0.1:5000/data_vizualization"
    $.post(url, {
        State: state,
        Year: year
    }, function (data, status) {
        console.log(data);
        months = data.months;
        usage = data.usage;
        // barchart(months, usage);
        console.log(months);
        console.log(usage);
    });
}
