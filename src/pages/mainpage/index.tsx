import { Chart } from "react-google-charts";
import championsdata from "../../data/championstats.json";
import { nationCodeMap, NationCodeMap } from "../../constant/nationcode";
import { H2HChart } from "../../components/h2hstats";

export const MainPage = () => {
	const processed = dataParser();
	return (
		<div className="w-screen h-full flex justify-center items-center">
			<Chart
				chartEvents={[
					{
						eventName: "select",
						callback: ({ chartWrapper }) => {
							const chart = chartWrapper.getChart();
							const selection = chart.getSelection();
							if (selection.length === 0) return;
							const region = processed[selection[0].row + 1];
							console.log("Selected : " + region);
						},
					},
				]}
				chartType="GeoChart"
				width="87%"
				height="80%"
				data={processed}
				options={options}
				style={{ margin: "0 auto", backgroundColor: "#1e1e1e" }} // Center the chart using CSS
			/>
		</div>
	);
};

const options = {
	colorAxis: { colors: ["#e3e3e3", "#eb3b42"] },
	backgroundColor: "#1e1e1e",
	datalessRegionColor: "#ffffff",
	defaultColor: "#f5f5f5",
	haxis: {
		minValue: 0,
	},
};

function dataParser() {
	let data = championsdata;
	let keys = Object.keys(data);
	keys = changeNationFormat(keys, nationCodeMap);
	const values = Object.values(data);
	const result = [];
	for (let i = 0; i < keys.length; i++) {
		const arr = [keys[i], values[i].first];
		result.push(arr);
	}
	return [["Nations", "Champions Count"], ...result];
}

function changeNationFormat(arr: string[], codemap: NationCodeMap): string[] {
	const result = [...arr];
	for (let i = 0; i < result.length; i++) {
		result[i] = codemap[result[i]];
	}
	return result;
}
