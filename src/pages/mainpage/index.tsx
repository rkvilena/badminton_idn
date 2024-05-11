import { Chart } from "react-google-charts";
import championsdata from "../../data/championstats.json";
import { nat2gcode, NationCodeMap } from "../../constant/nationcode";
import { useState } from "react";
import DetailStats from "../../components/detailstats";

export const MainPage = () => {
	const dataParser = () => {
		const data = championsdata;
		let keys = Object.keys(data);
		keys = changeNationFormat(keys, nat2gcode);
		const values = Object.values(data);
		const result = [];
		for (let i = 0; i < keys.length; i++) {
			const arr = [keys[i], values[i].first];
			result.push(arr);
		}
		return [["Nations", "Champions Titles"], ...result];
	};

	const changeNationFormat = (
		arr: string[],
		codemap: NationCodeMap
	): string[] => {
		const result = [...arr];
		for (let i = 0; i < result.length; i++) {
			result[i] = codemap[result[i]];
		}
		return result;
	};

	const processed = dataParser();
	const [isDetailsOpen, setIsDetailsOpen] = useState(false);
	const [nation, setNation] = useState<string | number>("ID");
	const closeDetails = () => {
		setIsDetailsOpen((prevState) => !prevState);
	};

	const options = {
		colorAxis: { colors: ["#8FD0EF", "#3C50E0"] },
		backgroundColor: "#24303F",
		datalessRegionColor: "#C8D0D8",
		defaultColor: "#C8D0D8",
		haxis: {
			minValue: 0,
		},
		legend: {
			textStyle: {
				color: "#151825",
				bold: true,
			},
		},
		chartArea: {
			left: 0,
			top: 0,
			width: "80%",
			height: "100%",
		},
	};

	return (
		<div className="flex h-full min-h-screen w-full gap-6 p-6 bg-[#1A222C]">
			<div
				className={`flex flex-col ${
					isDetailsOpen ? "w-2/3" : "w-full"
				} h-full`}
			>
				{/* <h3 className="text-3xl font-bold text-left text-[#FFFFFF]">{title}</h3> */}
				<div className="w-full h-full m-auto rounded-sm p-5 border border-[#2E3A47] bg-[#24303F]">
					<h4 className="mb-2 text-3xl font-bold text-left text-white font-montserrat">
						World Badminton Performance
					</h4>
					<hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
					<Chart
						chartEvents={[
							{
								eventName: "select",
								callback: ({ chartWrapper, eventArgs }) => {
									const chart = chartWrapper.getChart();
									const selection = chart.getSelection();
									if (selection.length === 0) return;
									const region =
										processed[selection[0].row + 1];
									setNation(region[0]);
									setIsDetailsOpen(true);

									console.log(
										"DEBUG:",
										chartWrapper.getOptions()
									);
									// chartWrapper.setOption('chart', { width: '100%' });
									// console.log("DEBUG:", chartWrapper.getOptions());
								},
							},
						]}
						chartType="GeoChart"
						height="100%"
						width="80%"
						data={processed}
						options={options}
						style={{ margin: "0 auto" }} // Center the chart using CSS
					/>
				</div>
			</div>
			{isDetailsOpen && (
				<DetailStats nation={nation} toggle={closeDetails} />
			)}
		</div>
	);
};
