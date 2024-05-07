import { Chart } from "react-google-charts";
import { H2HChart } from "../../components/h2hstats";

export const MainPage = () => {
	return (
		<div className="bg-white w-screen h-full p-4">
			<div className="grid grid-cols-3 gap-4">
				<div className="col-span-2 border-2 border-black p-2">
					<div className="border-2 border-black">
						<Dashboard />
					</div>
					<div className="border-2 border-black">
						<H2HChart />
					</div>
				</div>
				<div className="border-2 border-black">
					<Dashboard />
					<Dashboard />
				</div>
			</div>
		</div>
	);
};

export const Dashboard = () => {
	return (
		<Chart
			chartType="LineChart"
			data={[
				["Age", "Weight"],
				[4, 5.5],
				[8, 12],
			]}
			width="100%"
			height="400px"
			legendToggle
		/>
	);
};
