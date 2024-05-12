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
		colorAxis: { colors: ["#C9D9EA", "#799FCB"] },
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
		<div className="flex h-full min-h-screen justify-between w-full gap-6 p-6 bg-[url('/background-image.png')] bg-right bg-cover">
			<div
				className={`flex flex-col ${
					isDetailsOpen ? "w-2/3" : "w-full"
				} h-full gap-6`}
			>
				<div className="w-full h-[calc(100vh-7.5rem)] m-auto rounded-sm p-5 border border-[#2E3A47] bg-[#24303F]/50">
					<div className="flex items-center gap-2 mb-2">
						<h4 className="text-3xl font-bold text-left text-white font-montserrat">
							World Performance in
						</h4>
						<img
							src="/bwf-logo.png"
							alt="BWF"
							className="h-[30px]"
						/>
						<h4 className="text-3xl font-bold text-left text-white font-montserrat">
							WT 2018-2021
						</h4>
					</div>
					<p className="text-sm text-left text-white font-montserrat">
						The <b>Badminton World Federation (BWF)</b> is the
						international governing body for the sport of badminton
						recognised by the International Olympic Committee.
						Here's a <b>champions distribution</b> map that show
						nation's title count in 2018-2021 period.{" "}
						<b>Click the nation</b> on the map to see more.
					</p>
					<hr className="my-4 border-0 h-[1px] bg-gray-700"></hr>
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
						height="88%"
						data={processed}
						options={options}
						style={{ margin: "0 auto" }} // Center the chart using CSS
					/>
				</div>
				<div className="w-full h-12 items-center rounded-sm p-2 border border-[#2E3A47] flex bg-[#24303F]/50 justify-center">
					<p className="text-xs text-center text-white font-montserrat">
						<b>Source</b>:{" "}
						<a href="https://www.kaggle.com/datasets/sanderp/badminton-bwf-world-tour">
							Badminton BWF World Tour Dataset - by SanderP
						</a>
						<br />
						<b>Authors</b>: 13520074 - Eiffel Aqila Amarendra,
						13520084 - Adelline Kania Setiyawan, 13520134 - Raka
						Wirabuana Ninagan
					</p>
				</div>
			</div>
			{isDetailsOpen && (
				<DetailStats nation={nation} toggle={closeDetails} />
			)}
		</div>
	);
};
