// SIDEBAR TOGGLE

var sidebarOpen = false;
var sidebar = document.getElementById("sidebar");

function openSidebar() {
  if (!sidebarOpen) {
    sidebar.classList.add("sidebar-responsive");
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if (sidebarOpen) {
    sidebar.classList.remove("sidebar-responsive");
    sidebarOpen = false;
  }
}

//datafetch

// ---------- CHARTS ----------

// BAR CHART

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




// AREA CHART
var areaChartOptions = {
  series: [{
    name: '2019',
    data: [31, 40, 28, 51, 42, 109, 100, 109, 62, 109, 100, 109]
  }, {
    name: '2020',
    data: [11, 32, 45, 32, 34, 52, 41, 51, 32, 34, 52, 41]
  }],
  chart: {
    height: 350,
    type: 'area',
    toolbar: {
      show: false,
    },
  },
  colors: ["#4f35a1", "#246dec"],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth'
  },
  labels: ["jan", "Feb", "March", "April", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  markers: {
    size: 0
  },
  yaxis: [
    {
      title: {
        text: 'Usage',
      },
    },

  ],
  tooltip: {
    shared: true,
    intersect: false,
  }
};

var areaChart = new ApexCharts(document.querySelector("#area-chart"), areaChartOptions);
areaChart.render();

async function get_state_usage() {
  url = "http://127.0.0.1:5000/get_state_usage"
  $.post(url, {
  }, function (data, status) {
    console.log(data);
    console.log(typeof data);
    data = JSON.parse(data)
    chart_state = [data[0].States, data[1].States, data[2].States, data[3].States, data[4].States]
    chart_usage = [data[0].Usage, data[1].Usage, data[2].Usage, data[3].Usage, data[4].Usage]
    // console.log(chart_state)
    // console.log(status);
    barchart(chart_state, chart_usage)
  });
}

var chart_states = []
get_state_usage()
data_vizualization()

var graphState = document.getElementById("graphState");
var graphYear = document.getElementById("graphYear");
graphState.addEventListener('change', data_vizualization);
graphYear.addEventListener('change', data_vizualization);


async function data_vizualization() {
  var state = document.getElementById("graphState").value;
  var year = document.getElementById("graphYear").value;
  var url = "http://127.0.0.1:5000/data_vizualization"
  $.post(url, {
    State: state,
    Year: year
  }, function (data, status) {
    data = JSON.parse(data)
    console.log(data);
    if (status == "success") {
      var months = [data[0].Month, data[1].Month, data[2].Month, data[3].Month, data[4].Month]
      var usage = [data[0].Usage, data[1].Usage, data[2].Usage, data[3].Usage, data[4].Usage]
      barchart(months, usage);
      document.getElementById("chart-title").innerText = "Highest Usage of " + state + " in " + year;
    }
  });
}



