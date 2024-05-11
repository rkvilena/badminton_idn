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
		colorAxis: { colors: ["#AFC7D0", "#799FCB"] },
		backgroundColor: "transparent",
		datalessRegionColor: "#EEF1E6",
		defaultColor: "#EEF1E6",
		haxis: {
			minValue: 0,
		},
		legend: {
			textStyle: {
				color: "#151825",
				bold: true,
			},
		},
	};

	return (
		<div className="flex flex-col h-full min-h-screen justify-between w-full gap-6 p-6 bg-[url('/background-image.png')] bg-right bg-cover">
			<div className="flex h-full gap-6">
				<div
					className={`flex flex-col ${
						isDetailsOpen ? "w-2/3" : "w-full"
					} h-full`}
				>
					<div className="w-full h-[85vh] m-auto rounded-sm p-5 border border-[#2E3A47] bg-[#24303F]/50">
						<div className="flex items-center gap-2 mb-2">
							<h4 className="text-3xl font-bold text-left text-white font-montserrat">
								World Badminton Performance in
							</h4>
							<img src="/bwf-logo.png" className="h-[30px]"></img>
						</div>
						<p className="text-sm text-left text-white font-montserrat">The <b>Badminton World Federation (BWF)</b> is the international governing body for the sport of badminton recognised by the International Olympic Committee.</p>
						<hr className="my-4 bg-gray-200 border-0 h-[1px] dark:bg-gray-700"></hr>
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
									},
								},
							]}
							chartType="GeoChart"
							height="90%"
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
			<div className="w-full h-fit rounded-sm p-2 border border-[#2E3A47] flex bg-[#24303F]/50 justify-center">
				<p className="text-xs text-left text-white font-montserrat"><b>Authors</b>: 13520074 - Eiffel Aqila Amarendra, 13520084 - Adelline Kania Setiyawan, 13520134 - Raka Wirabuana Ninagan</p></div>
		</div>
	);
};
