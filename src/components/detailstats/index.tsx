import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import { GeneralWinRate } from "./generalwinrate";
import {
	convertNationCode,
	gcode2Nat,
	gcode2NationalName,
	getNationTitle,
} from "../../constant/nationcode";
import championsdata from "../../data/championstats.json";
import { H2HWinStats } from "./h2hwinstats";

const DetailStats = ({
	nation,
	toogle,
}: {
	nation: any;
	toogle: () => void;
}) => {
	let convertedcode = convertNationCode(nation, gcode2Nat);
	let titles1st = getNationTitle(convertedcode, championsdata).first;
	return (
		<div
			className="w-1/4 h-full absolute right-0 flex flex-col p-4 font-montserrat"
			style={{ backgroundColor: "#1e1e1e" }}
		>
			<div className="flex flex-col">
				{/* FLAG <img src="" alt="" /> */}
				<div className="flex flex-row justify-between items-center">
					<h1 className="font-bold">
						{convertNationCode(nation, gcode2NationalName)}
					</h1>
					<FaIcons.FaArrowCircleRight
						className="h-full hover:cursor-pointer"
						style={{ fontSize: "30px" }}
						onClick={toogle}
					/>
				</div>
				<div className="flex ">
					<h2>Champions : {titles1st} Titles</h2>
				</div>
			</div>

			<div className="pt-4">
				<h3 className="w-full flex">Accumulated Win Rate</h3>
				<GeneralWinRate nationcode={nation} />
			</div>
			<div className="pt-4">
				<h3 className="w-full flex">Head-to-head</h3>
				<H2HWinStats nationcode={nation} />
			</div>
		</div>
	);
};

export default DetailStats;
