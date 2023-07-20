async function onPageLoad() {
    console.log("document loaded");
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

}
window.onload = onPageLoad;





usage_btn = document.getElementById('add_usage');
usage_state = document.getElementById('uiState');
usage_date = document.getElementById('uiDate');
usage_usage = document.getElementById('uiUsage');

usage_btn.addEventListener('click', () => {
    yyyy_mm_dd = usage_date.value;
    arr_date = yyyy_mm_dd.split('-')
    dd_mm_yyyy = '' + arr_date[2] + '-' + arr_date[1] + '-' + arr_date[0];
    url = "http://127.0.0.1:5000/add_usage"

    if (usage_state.value === '' || usage_date.value === '' || usage_usage.value === '') {
        alert("Enter valid details")
        return
    }
    $.post(url, {
        State: usage_state.value,
        Date: dd_mm_yyyy,
        Usage: usage_usage.value
    }, function (data, status) {
        if (status === "success") {
            window.alert("Added successfully :)")
            // window.location.reload()
            usage_state.value = ''
            usage_date.value = ''
            usage_usage.value = ''
        }
        else {
            window.alert("Failed to add :(")
        }

    });
})



