import React from "react";
import { Chart } from "react-google-charts";
import nationdata from "../../data/nationmatchstats.json";
import {
	convertNationCode,
	gcode2Nat,
	gcode2NationalName,
	NationCodeMap,
	NationsAllStats,
} from "../../constant/nationcode";

export const GeneralWinRate = ({
	nationcode,
}: Readonly<{ nationcode: string }>) => {
	const datas = data(nationcode, gcode2Nat, nationdata);
	return (
		<div>
			<Chart
				chartType="BarChart"
				height="100%"
				width="100%"
				data={datas}
				options={options}
			/>
			<div className="pt-4 text-xs text-justify text-white font-montserrat">
				<WinRateAnnotation
					nation={nationcode}
					win={datas[1][1] as number}
					lose={datas[1][2] as number}
				/>
			</div>
		</div>
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
		["Winrate Accumulation", "Win", "Lose"],
		[code, win, total - win],
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
	colors: ["#799FCB", "#F9665E"],
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

const WinRateAnnotation = ({
	nation,
	win,
	lose,
}: {
	nation: string;
	win: number;
	lose: number;
}) => {
	let natname = convertNationCode(nation, gcode2NationalName);
	return (
		<div>
			{win > lose
				? `${natname} has more than 50% win from their ${
						win + lose
				  } games. Good number based on result-based judgement`
				: `Has more loses than win games in their ${
						win + lose
				  } games, ${natname} is one of many nations that has a underwhelming performance despite their title(s) achievement.`}
		</div>
	);
};
