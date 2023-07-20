
function onClickedEstimateUsage() {
    console.log("Estimate Usage button clicked");
    var uiState = document.getElementById("uiState").value;
    var uiMonth = document.getElementById("uiMonth").value;
    var uiDay = document.getElementById("uiDay").value;
    var estUsage = document.getElementById("uiEstimatedUsage");
    var url = "http://127.0.0.1:5000/predict_electricity_lazy_predict"; //Use this if you are NOT using nginx which is first 7 tutorials
    //var url = "/api/predict_electricity"; // Use this if  you are using nginx. i.e tutorial 8 and onwards


    //Monthwise day list
    if (uiMonth === '' || uiDay === '--Select Day--' || uiState === '') {
        alert("Please select all the fields");
        return;
    }
    $.post(url, {
        Month: uiMonth,
        State: uiState,
        Day: uiDay
    }, function (data, status) {
        console.log(data.estimated_usage);
        estUsage.innerHTML = "<h2>" + data.estimated_usage.toString() + " Kw" + " </h2>";
        // console.log(status);
    });
}



async function onPageLoad() {
    console.log("document loaded");
    var url = "http://127.0.0.1:5000/get_State_names";

    // await fetch(url).then(data=>{
    //     // console.log(data.json())
    //     st = data.json();
    //     console.log(st)

    //     console.log(st[2])
    //     // console.log(data)
    // })
    var uiMonth = document.getElementById("uiMonth");
    var uiDay = document.getElementById("uiDay");

    uiMonth.addEventListener('change', () => {
        // console.log("Day" + e)
        var month = parseInt(uiMonth.value);
        var full_months = [1, 3, 5, 7, 8, 10, 12];
        $('#uiDay').empty();
        var select = document.createElement('option');
        select.innerText = "--Select Day--";
        select.setAttribute('disabled', 'disabled');
        select.setAttribute('selected', 'selected');
        uiDay.appendChild(select);
        if (full_months.includes(month)) {
            for (i = 1; i <= 31; i++) {
                var opt = document.createElement('option');
                opt.innerText = i;
                uiDay.appendChild(opt);
            }
        }
        else if (month === 2) {
            for (i = 1; i <= 29; i++) {
                var opt = document.createElement('option');
                opt.innerText = i;
                uiDay.appendChild(opt);
            }
        }
        else {
            for (i = 1; i <= 30; i++) {
                var opt = document.createElement('option');
                opt.innerText = i;
                uiDay.appendChild(opt);
            }
        }
    })


    $.get(url, function (data, status) {
        if (data) {
            var States = data.States;
            var uiState = document.getElementById("uiState");
            // $('#graphState').empty();
            for (var i in States) {
                var opt = new Option(States[i]);
                var opt1 = new Option(States[i]);
                $('#uiState').append(opt);
                $('#graphState').append(opt1);
            }
        }
    });

}

window.onload = onPageLoad;

