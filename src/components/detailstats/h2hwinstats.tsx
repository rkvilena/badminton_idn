import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import nationdata from "../../data/nationmatchstats.json";
import {
	convertNationCode,
	gcode2Nat,
	gcode2NationalName,
	nat2gcode,
	NationCodeMap,
	NationsAllStats,
} from "../../constant/nationcode";

export function H2HWinStats({ nationcode }: Readonly<{ nationcode: string }>) {
	let mostPlayedNat = "",
		mostWinAgainst = "",
		mostLoseAgainst = "";
	const nationname = convertNationCode(nationcode, gcode2NationalName);

	const [datas, setDatas] = useState(
		data(nationcode, gcode2Nat, nationdata, "matches", 5, "all")
	);

	const [totalH2h, setTotalH2h] = useState(0);

	const [showSortDropdown, setShowSortDropdown] = useState(false);
	const [showValueDropdown, setShowValueDropdown] = useState(false);

	const [sortByValue, setSortByValue] = useState("matches");
	const [showValue, setShowValue] = useState("all");
	const [totalH2hValue, setTotalH2hValue] = useState(5);

	useEffect(() => {
		setShowSortDropdown(false);
		setShowValueDropdown(false);
		setDatas(
			data(
				nationcode,
				gcode2Nat,
				nationdata,
				sortByValue,
				totalH2hValue,
				showValue
			)
		);
	}, [sortByValue, totalH2hValue, showValue]);

	useEffect(() => {
		resetFilterSort();

		updateTotalH2hData(nationcode, gcode2Nat, nationdata);
		setDatas(
			data(
				nationcode,
				gcode2Nat,
				nationdata,
				"matches",
				totalH2hValue,
				"all"
			)
		);
	}, [nationcode]);

	function resetFilterSort() {
		setSortByValue("matches");
		setShowValue("all");
		setShowSortDropdown(false);
		setShowValueDropdown(false);
		setTotalH2hValue(5);
	}

	function updateTotalH2hData(
		ncode: string,
		codemap: NationCodeMap,
		datanation: NationsAllStats
	) {
		const code = codemap[ncode];
		const h2h = Object.keys(datanation[code].h2h).length;
		setTotalH2h(h2h);
	}

	function getMostData(arr: any[]) {
		arr.shift();
		const mostplayed: any[] = arr.reduce(
			(a, b) => (b[1] + b[2] > a[1] + a[2] ? b : a),
			arr[0]
		);
		const mostwin: any[] = arr.reduce(
			(a, b) => (b[1] > a[1] ? b : a),
			arr[0]
		);
		const mostlose: any[] = arr.reduce(
			(a, b) => (b[2] > a[2] ? b : a),
			arr[0]
		);
		const mostgoodh2h: any[] = arr.reduce(
			(a, b) => (b[1] / (b[1] + b[2]) > a[1] / (a[1] + a[2]) ? b : a),
			arr[0]
		);
		const mostbadh2h: any[] = arr.reduce(
			(a, b) => (b[2] / (b[1] + b[2]) > a[2] / (a[1] + a[2]) ? b : a),
			arr[0]
		);
		console.log(mostplayed);
		console.log(mostwin);
		console.log(mostlose);
		console.log(mostgoodh2h);
		console.log(mostbadh2h);
		mostPlayedNat = convertNationCode(
			convertNationCode(mostplayed[0].slice(3), nat2gcode),
			gcode2NationalName
		);
		mostWinAgainst = convertNationCode(
			convertNationCode(mostwin[0].slice(3), nat2gcode),
			gcode2NationalName
		);
		mostLoseAgainst = convertNationCode(
			convertNationCode(mostlose[0].slice(3), nat2gcode),
			gcode2NationalName
		);
	}

	function data(
		ncode: string,
		codemap: NationCodeMap,
		datanation: NationsAllStats,
		sortBy: string,
		limit: number,
		show: string
	) {
		const arrdata = [];
		arrdata.push(["Head-to-Head", "Wins", "Losses"]);
		const code = codemap[ncode];
		const ndata = datanation[code].h2h;
		for (const oppNation in ndata) {
			const h2hStats = ndata[oppNation];
			const arr = [
				"vs " + oppNation,
				h2hStats.win,
				h2hStats.matches - h2hStats.win,
			];
			arrdata.push(arr);
		}

		getMostData(arrdata.slice());

		// Descending Sort
		let descendsort = arrdata.sort((a, b) => {
			let numA = a[1] as number;
			let numB = b[1] as number;

			if (sortBy === "matches") {
				numA += a[2] as number;
				numB += b[2] as number;
			} else if (sortBy === "losses") {
				numA = a[2] as number;
				numB = b[2] as number;
			}
			return numB - numA;
		});

		if (limit > 0) {
			descendsort = descendsort.slice(0, limit + 1);
		} else {
			descendsort = descendsort.slice(0, 11);
		}

		if (show === "wins") {
			descendsort.forEach((item) => {
				item.splice(2);
			});
		} else if (show === "losses") {
			descendsort.forEach((item) => {
				console.log(item);
				item.splice(1, 1);
			});
		}

		return descendsort;
	}

	const options = {
		isStacked: "true",
		legend: {
			position: "top",
			textStyle: {
				color: "#FFFFFF",
				fontSize: "10",
			},
		},
		hAxis: {
			minValue: 0,
			textStyle: {
				color: "#FFFFFF",
			},
		},
		vAxis: {
			textStyle: {
				color: "#FFFFFF",
				fontSize: "10",
			},
		},
		colors: ["#799FCB", "#F9665E"],
		chartArea: {
			top: 20,
			width: "70%",
			height: "90%",
		},
		backgroundColor: "#1A222C",
		barWidth: 50,
		height: 500,
	};

	const sortByOptions = [
		{ value: "matches", label: "Number of Matches" },
		{ value: "wins", label: "Number of Wins" },
		{ value: "losses", label: "Number of Losses" },
	];

	const showOptions = [
		{ value: "all", label: "All" },
		{ value: "wins", label: "Wins" },
		{ value: "losses", label: "Losses" },
	];

	return (
		<div className="h-full">
			<div className="flex flex-col w-full gap-4 mb-4">
				<div className="flex items-center gap-4">
					<div className="flex flex-col items-start w-full gap-2">
						<span className="text-xs">Sort By:</span>
						<div className="relative w-full" data-twe-dropdown-ref>
							<button
								className="flex items-center justify-between rounded bg-primary pl-4 pr-6 pb-2 pt-2.5 w-full text-xs font-medium leading-normal text-white transition duration-150 ease-in-out border-white focus:outline-none focus:ring-0 hover:border hover:border-red-500 focus:border-red-500"
								type="button"
								id="dropdownMenuButton1"
								data-twe-dropdown-toggle-ref
								aria-expanded="false"
								data-twe-ripple-init
								data-twe-ripple-color="light"
								onClick={() =>
									setShowSortDropdown(!showSortDropdown)
								}
							>
								{
									sortByOptions.find(
										(option) => option.value === sortByValue
									)?.label
								}
								<span className="ms-2 w-2 [&>svg]:h-5 [&>svg]:w-5">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fill-rule="evenodd"
											d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
											clip-rule="evenodd"
										/>
									</svg>
								</span>
							</button>
							{showSortDropdown && (
								<ul
									className="absolute z-[1000] float-left m-0 min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-base shadow-lg data-[twe-dropdown-show]:block dark:bg-surface-dark"
									aria-labelledby="dropdownMenuButton1"
									data-twe-dropdown-menu-ref
								>
									{sortByOptions.map((option) => (
										<li
											onClick={() =>
												setSortByValue(option.value)
											}
										>
											<a
												className="block w-full py-2 pl-4 pr-8 text-xs font-normal text-left text-black bg-white whitespace-nowrap hover:bg-zinc-200/60 hover:text-black"
												href="#"
												data-twe-dropdown-item-ref
											>
												{option.label}
											</a>
										</li>
									))}
								</ul>
							)}
						</div>
					</div>
					<div className="flex flex-col items-start gap-2">
						<span className="text-xs">Show Attributes:</span>
						<div className="relative" data-twe-dropdown-ref>
							<button
								className="flex items-center justify-between rounded bg-primary pl-4 pr-6 pb-2 pt-2.5 w-[106px] text-xs font-medium leading-normal text-white transition duration-150 ease-in-out border-white focus:outline-none focus:ring-0 hover:border hover:border-red-500 focus:border-red-500"
								type="button"
								id="dropdownMenuButton1"
								data-twe-dropdown-toggle-ref
								aria-expanded="false"
								data-twe-ripple-init
								data-twe-ripple-color="light"
								onClick={() =>
									setShowValueDropdown(!showValueDropdown)
								}
							>
								{
									showOptions.find(
										(option) => option.value === showValue
									)?.label
								}
								<span className="ms-2 w-2 [&>svg]:h-5 [&>svg]:w-5">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fill-rule="evenodd"
											d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
											clip-rule="evenodd"
										/>
									</svg>
								</span>
							</button>
							{showValueDropdown && (
								<ul
									className="absolute z-[1000] float-left m-0 min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-base shadow-lg data-[twe-dropdown-show]:block dark:bg-surface-dark"
									aria-labelledby="dropdownMenuButton1"
									data-twe-dropdown-menu-ref
								>
									{showOptions.map((option) => (
										<li
											onClick={() =>
												setShowValue(option.value)
											}
										>
											<a
												className="block w-full py-2 pl-4 pr-8 text-xs font-normal text-left text-black bg-white whitespace-nowrap hover:bg-zinc-200/60 hover:text-black"
												href="#"
												data-twe-dropdown-item-ref
											>
												{option.label}
											</a>
										</li>
									))}
								</ul>
							)}
						</div>
					</div>
				</div>
				<div className="flex items-center justify-between gap-4">
					<div className="flex flex-col items-start gap-2">
						<div className="flex items-center gap-2">
							<span className="text-xs">Show</span>
							<input
								className="shadow appearance-none border rounded w-[72px] py-2 px-3 text-xs text-white leading-tight focus:outline-none focus:shadow-outline"
								id="total-h2h"
								type="number"
								placeholder="5"
								value={totalH2hValue}
								onChange={(e) => {
									setTotalH2hValue(parseInt(e.target.value));
								}}
							></input>
							<span className="text-xs">
								from {totalH2h} data
							</span>
						</div>
						<span className="text-xs text-red-500">
							{totalH2hValue > totalH2h
								? `Total maximum data to show is ${totalH2h}`
								: ""}
							{totalH2hValue < 1
								? "Total minimum data to show is 0"
								: ""}
						</span>
					</div>
					<div
						className="pb-2 text-xs underline cursor-pointer"
						onClick={resetFilterSort}
					>
						Reset
					</div>
				</div>
			</div>
			<div className="max-h-[300px] overflow-auto">
				<Chart
					chartType="BarChart"
					width="100%"
					height="100%"
					data={datas}
					options={options}
					chartEvents={[
						{
							eventName: "ready",
							callback: ({ chartWrapper, eventArgs }) => {
								const dataTable = chartWrapper.getDataTable();
								const height = dataTable
									? dataTable.getNumberOfRows() * 50
									: 250;
								if (
									parseInt(
										chartWrapper.getOption("height"),
										10
									) != height
								) {
									chartWrapper.setOption("height", height);
									chartWrapper.draw();
								}
								const isChangeLabelColor =
									dataTable &&
									dataTable.getColumnLabel(1) == "Losses";
								if (
									isChangeLabelColor &&
									JSON.stringify(
										chartWrapper.getOption("colors")
									) == JSON.stringify(["#799FCB", "#F9665E"])
								) {
									chartWrapper.setOption("colors", [
										"#F9665E",
									]);
									chartWrapper.draw();
								}
							},
						},
					]}
				/>
			</div>
			<div className="py-4 text-xs text-justify text-white font-montserrat">
				<b>{nationname}</b>'s most played opponent nation is{" "}
				<b>{mostPlayedNat}</b>. Against <b>{mostWinAgainst}</b>,{" "}
				{nationname} triumph their biggest number of win games
				compared against any other nation, while{" "}
				{mostWinAgainst == mostLoseAgainst ? (
					"the very same nation "
				) : (
					<b>{mostLoseAgainst}</b>
				)}{" "}
				beat them the most.
			</div>
		</div>
	);
}
