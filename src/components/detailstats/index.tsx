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
	toggle,
}: {
	nation: any;
	toggle: () => void;
}) => {
	let convertedcode = convertNationCode(nation, gcode2Nat);
	let titles1st = getNationTitle(convertedcode, championsdata).first;
	return (
		<div
			className="flex flex-col w-1/3 h-[90vh] overflow-auto font-montserrat bg-[#24303F]"
		>
			<div className="w-full h-full flex flex-col m-auto gap-2 rounded-sm p-5 border border-[#2E3A47] bg-[#24303F]">
				<h4 className="mb-2 text-xl font-semibold text-left text-white font-montserrat">
					Detailed Country Badminton Performance
				</h4>
				<hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
				<div className="flex flex-col">
					{/* FLAG <img src="" alt="" /> */}
					<div className="flex flex-row items-center justify-between">
						<h2 className="mb-2 text-3xl font-bold text-left text-white font-montserrat">
							{convertNationCode(nation, gcode2NationalName)}
						</h2>
						<FaIcons.FaArrowCircleRight
							className="h-full hover:cursor-pointer"
							style={{ fontSize: "30px" }}
							onClick={toggle}
						/>
					</div>
					<div className="flex ">
						<h2>Champions : {titles1st} Titles</h2>
					</div>
				</div>

				<div className="w-full mt-4 m-auto rounded-sm p-5 border border-[#2E3A47] bg-[#1A222C]">
					<h4 className="mb-2 font-semibold text-left text-white text-md font-montserrat">
						Accumulated Win Rate
					</h4>
					<hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
					<div className="w-full pt-4">
						<GeneralWinRate nationcode={nation} />
					</div>
				</div>
				<div className="w-full h-full m-auto rounded-sm p-5 border border-[#2E3A47] bg-[#1A222C]">
					<h4 className="mb-2 font-semibold text-left text-white text-md font-montserrat">
						Head-to-head
					</h4>
					<hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
					<div className="w-full pt-4">
						<H2HWinStats nationcode={nation} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default DetailStats;
