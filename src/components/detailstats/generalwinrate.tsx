import React from "react";
import { Chart } from "react-google-charts";
import nationdata from "../../data/nationmatchstats.json";
import {
	gcode2Nat,
	NationCodeMap,
	NationsAllStats,
} from "../../constant/nationcode";

export const GeneralWinRate = ({
	nationcode,
}: Readonly<{ nationcode: string }>) => {
	const datas = data(nationcode, gcode2Nat, nationdata);
	return (
		<Chart
			chartType="BarChart"
			height="100%"
			width="100%"
			data={datas}
			options={options}
		/>
	);
};

function data(
	ncode: string,
	codemap: NationCodeMap,
	datanation: NationsAllStats
) {
	const code = codemap[ncode];
	const ndata = datanation[code];
	const win = ndata.win,
		total = ndata.matches;
	const data = [
		[
			"Winrate Accumulation",
			"Win",
			"Lose",
		],
		[
			code,
			win,
			total - win,
		],
	];
	return data;
}

const options = {
	isStacked: "percent",
	height: 100,
	legend: { 
		position: "bottom",
		textStyle: {
			color: "#FFFFFF",
		},
	},
	hAxis: {
		minValue: 0,
		textStyle: {
			color: "#FFFFFF",
		},
	},
	colors: ['#3C50E0', '#FF0000'],
	vAxis: {
		textPosition: "none",
	},
	backgroundColor: "#1A222C",
	chartArea: {
		top: 0,
		left: 0,
		width: "100%",
		height: "50%",
	},
};
