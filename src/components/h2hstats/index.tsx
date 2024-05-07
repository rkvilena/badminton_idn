import React from "react";
import { Chart } from "react-google-charts";

function data() {
	const wjpn = 124,
		tjpn = 342;
	const wchn = 149,
		tchn = 364;
	const wmas = 155,
		tmas = 299;
	const wtpe = 197,
		ttpe = 310;
	const wind = 167,
		tind = 247;
	const data = [
		["Head-to-Head", "Win", { role: "style" }, "Lose", { role: "style" }],
		[
			"INA vs JPN",
			wjpn,
			"fill-color: #ff0000; fill-opacity: 1; stroke-color: #ffffff; stroke-width: 2",
			tjpn - wjpn,
			"fill-color: white; fill-opacity: 0.8; stroke-color: #dd0000; stroke-width: 2",
		],
		[
			"INA vs CHN",
			wchn,
			"fill-color: #ff0000; fill-opacity: 1; stroke-color: #ffffff; stroke-width: 2",
			tchn - wchn,
			"fill-color: #ee1c25; fill-opacity: 0.8; stroke-color: #ffff00; stroke-width: 2",
		],
		[
			"INA vs MAS",
			wmas,
			"fill-color: #ff0000; fill-opacity: 1; stroke-color: #ffffff; stroke-width: 2",
			tmas - wmas,
			"fill-color: #ffcc00; fill-opacity: 0.8; stroke-color: #000066; stroke-width: 2",
		],
		[
			"INA vs TPE",
			wtpe,
			"fill-color: #ff0000; fill-opacity: 1; stroke-color: #ffffff; stroke-width: 2",
			ttpe - wtpe,
			"fill-color: #003283; fill-opacity: 0.6; stroke-color: #003283; stroke-width: 2",
		],
		[
			"INA vs IND",
			wind,
			"fill-color: #ff0000; fill-opacity: 1; stroke-color: #ffffff; stroke-width: 2",
			tind - wind,
			"fill-color: #ff6820; fill-opacity: 0.8; stroke-color: #ff6820; stroke-width: 2",
		],
	];
	return data;
}

const options = {
	isStacked: "percent",
	height: 300,
	legend: { position: "none" },
	hAxis: {
		minValue: 0,
		ticks: [0, 0.25, 0.5, 0.75, 1],
	},
	backgroundColor: "#d9d9d9",
};

export function H2HChart() {
	return (
		<Chart
			chartType="BarChart"
			width="100%"
			height="400px"
			data={data()}
			options={options}
		/>
	);
}
