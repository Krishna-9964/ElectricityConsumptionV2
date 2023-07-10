$('.charts-card').hide();
function getSummary() {
    uiState = document.getElementById('uiState');
    uiMonth = document.getElementById('uiMonth');
    uiYear = document.getElementById('uiYear');

    const url = "http://127.0.0.1:5000/get_month_usage_details"
    let heading = document.getElementById('chart-title');
    let max_value = document.getElementById('max-value');
    let min_value = document.getElementById('min-value');
    let total_value = document.getElementById('total-value');

    $.post(url, {
        Month: uiMonth.value,
        State: uiState.value,
        Year: uiYear.value
    }, function (data, status) {
        console.log(data)
        heading.innerHTML = '<h4>' + uiMonth.options[uiMonth.selectedIndex].text + '-' + uiYear.value + '  Summary</h4>';
        max_value.innerHTML = '<h4>' + data.max.toFixed(2) + 'Kw</h4>'
        min_value.innerHTML = '<h4>' + data.min.toFixed(2) + 'Kw</h4>'
        total_value.innerHTML = '<h4>' + data.total.toFixed(2) + 'Kw</h4>'
        $('.charts-card').show();

    });

}