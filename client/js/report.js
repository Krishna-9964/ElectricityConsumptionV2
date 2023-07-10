$('#charts-card').hide()

function getMonthwiseReport() {
    var uiState = document.getElementById("uiState").value;
    var uiYear = parseInt(document.getElementById("uiYear").value);
    var url = "http://127.0.0.1:5000/get_monthwise_report"; //Use this if you are NOT using nginx which is first 7 tutorials
    //var url = "/api/predict_electricity"; // Use this if  you are using nginx. i.e tutorial 8 and onwards

    $.post(url, {
        Year: uiYear,
        State: uiState
    }, function (data, status) {
        data = JSON.parse(data)
        console.log(data)
        const report = document.getElementById('report');
        $('#report').empty();
        let heading = document.createElement('h2');
        heading.innerText = uiState + " State's " + uiYear + " Monthly Report"
        report.appendChild(heading);

        var li_heading = document.createElement('li');
        li_heading.setAttribute('id','columns');
        li_heading.innerHTML = '<h5>Month</h5><h5>Usage</h5>'
        report.appendChild(li_heading)

        data.forEach(function (record) {
            var li = document.createElement('li');
            var month = document.createElement('h5');
            var usage = document.createElement('h5');

            var monthName = new Date(0, record['Month'] - 1).toLocaleString('default', { month: 'long' });
            month.innerText = monthName;
            usage.innerText = record['Usage'];


            li.appendChild(month);
            li.appendChild(usage);
            report.appendChild(li)

        });

        $('#charts-card').show();


        // console.log(data[0]);
    });
}
var url = "http://127.0.0.1:5000/get_State_names";
$.get(url, function (data, status) {
    if (data) {
        var States = data.States;
        var uiState = document.getElementById("uiState");
        // $('#uiState').empty();
        for (var i in States) {
            var opt = new Option(States[i]);
            $('#uiState').append(opt);
        }
    }
});