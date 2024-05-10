import React from "react";
import { Chart } from "react-google-charts";
import nationdata from "../../data/nationmatchstats.json";
import {
	gcode2NationalName,
	gcode2Nat,
	NationCodeMap,
	NationsAllStats,
} from "../../constant/nationcode";

export function H2HWinStats({ nationcode }: Readonly<{ nationcode: string }>) {
	const datas = data(nationcode, gcode2Nat, nationdata);
	return (
		<Chart
			chartType="BarChart"
			width="100%"
			height="500px"
			data={datas}
			options={options}
		/>
	);
}

function data(
	ncode: string,
	codemap: NationCodeMap,
	datanation: NationsAllStats
) {
	const arrdata = [];
	arrdata.push([
		"Head-to-Head",
		"Win",
		{ role: "style" },
		"Lose",
		{ role: "style" },
	]);
	const code = codemap[ncode];
	const ndata = datanation[code].h2h;
	for (const oppNation in ndata) {
		const h2hStats = ndata[oppNation];
		let arr = [
			"vs " + oppNation,
			h2hStats.win,
			"fill-color: #ffffff; fill-opacity: 1",
			h2hStats.matches - h2hStats.win,
			"fill-color: #eb3b42; fill-opacity: 1",
		];
		arrdata.push(arr);
	}
	// Descending Sort
	const descendsort = arrdata.sort((a, b) => {
		const numA = a[1] as number;
		const numB = b[1] as number;
		return numB - numA;
	});
	return descendsort.slice(0, 11);
}

const options = {
	isStacked: "true",
	legend: { position: "none" },
	hAxis: {
		minValue: 0,
		ticks: [0, 0.25, 0.5, 0.75, 1],
	},
	backgroundColor: "#d9d9d9",
	barWidth: 100,
};
