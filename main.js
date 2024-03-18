let electromotive_force_text = document.getElementById("electromotive_force_id");
let inductance_text = document.getElementById("inductance_id");
let resistence_text = document.getElementById("resistence_id");
let button = document.getElementById("button_id");

let electromotive_force = electromotive_force_text.value;
let inductance = inductance_text.value;
let resistence = resistence_text.value;
let tau = inductance / resistence;
let I_0 = electromotive_force / resistence;

function CircuitOpening(time){
    return I_0 * Math.exp(-1 * time / tau);
}

function CircuitClosure(time){
    return I_0 * (1 - Math.exp(-1 * time / tau));
}

function PlotEMF() {

    let time_coordinates = [];
    let closure_coordinates = [];
    let opening_coordinates = [];

    let i = 0;

    for (let time = 0; time < 10000; ++time) {
        time_coordinates[i] = time;
        closure_coordinates[i] = CircuitClosure(time / 1000 * tau);
        opening_coordinates[i] = CircuitOpening(time / 1000 * tau);
        // console.log(time_coordinates[i], closure_coordinates[i], opening_coordinates[i]);
        time += 0.01;
        ++i;
    }

    let close = {
        x: time_coordinates, 
        y: closure_coordinates, 
        mode: 'lines',
		name: 'ЭДС'
    };

    let open = {
        x: time_coordinates,
        y: opening_coordinates,
        mode: 'lines',
        xaxis: 'x2',
        yaxis: 'y2',
		name: 'Инд. ток'
    };

    let data = [close, open];

    let layout = {
        grid: { rows: 1, columns: 2, pattern: 'independent'},
        annotations: [ 
            { 
				text: "График зависимости тока от времени при замыкании",
				font: { size: 16, color: 'blue' },
				showarrow: false,
				align: 'center',
				x: -0.05,
				y: 1.2,
				xref: 'paper',
				yref: 'paper',
            },
			{ 
				text: 'График зависимости тока от времени при размыкании',
                font: { size: 16, color: 'blue' },
				showarrow: false,
				align: 'center',
				x: 0.85,
				y: 1.2,
				xref: 'paper',
				yref: 'paper',
            },
			{
				xref: 'paper',
				yref: 'paper',
				x: 0.05,
				xanchor: 'right',
				y: 1,
				yanchor: 'bottom',
				text: 'Сила тока, А',
				showarrow: false
			},
			{
				xref: 'paper',
				yref: 'paper',
				x: 0.4,
				xanchor: 'left',
				y: -0.05,
				yanchor: 'top',
				text: 'Время, c',
				showarrow: false
			},
			{
				xref: 'paper',
				yref: 'paper',
				x: 0.55,
				xanchor: 'right',
				y: 1,
				yanchor: 'bottom',
				text: 'Сила тока, А',
				showarrow: false
			},
			{
				xref: 'paper',
				yref: 'paper',
				x: 0.95,
				xanchor: 'left',
				y: -0.05,
				yanchor: 'top',
				text: 'Время, c',
				showarrow: false
			},
        ],
    };


    Plotly.newPlot('tester', data, layout);
}

button.addEventListener("click", function(e){
    electromotive_force = electromotive_force_text.value;
    inductance = inductance_text.value;
    resistence = resistence_text.value;
    tau = inductance / resistence;
    I_0 = electromotive_force / resistence;

    if (electromotive_force < 0){
        alert("ЭДС должна быть больше 0!");
        return;
    }
    if (inductance < 0) {
        alert("Индукция должна быть больше 0!");
        return;
    }
    if (resistence < 0) {
        alert("Сопротивление должно быть больше 0!");
        return;
    }

    PlotEMF();
});