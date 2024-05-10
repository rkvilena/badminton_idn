import React from "react";
import { Chart } from "react-google-charts";
import nationdata from "../../data/nationmatchstats.json";
import {
	gcode2NationalName,
	gcode2Nat,
	NationCodeMap,
	NationsAllStats,
} from "../../constant/nationcode";

function data(
	ncode: string,
	codemap: NationCodeMap,
	datanation: NationsAllStats
) {
	console.log(codemap);
	const code = codemap[ncode];
	const ndata = datanation[code];
	console.log(ndata);
	const win = ndata.win,
		total = ndata.matches;
	const data = [
		[
			"Winrate Accumulation",
			"Win",
			{ role: "style" },
			"Lose",
			{ role: "style" },
		],
		[
			code,
			win,
			"fill-color: #ffffff; fill-opacity: 1; stroke-color: #cccccc; stroke-width: 2",
			total - win,
			"fill-color: #eb3b42; fill-opacity: 0.8; stroke-color: #dd0000; stroke-width: 2",
		],
	];
	return data;
}

const options = {
	isStacked: "percent",
	height: 100,
	legend: { position: "none" },
	hAxis: {
		minValue: 0,
		ticks: [0, 0.25, 0.5, 0.75, 1],
	},
	vAxis: { textPosition: "none" },
	backgroundColor: "#d9d9d9",
};

export function GeneralWinRate({
	nationcode,
}: Readonly<{ nationcode: string }>) {
	console.log(nationcode);
	const datas = data(nationcode, gcode2Nat, nationdata);
	return (
		<Chart
			chartType="BarChart"
			width="100%"
			data={datas}
			options={options}
		/>
	);
}
