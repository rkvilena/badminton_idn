import { Chart } from "react-google-charts";
import championsdata from "../../data/championstats.json";
import { nat2gcode, NationCodeMap } from "../../constant/nationcode";
import { useEffect, useState } from "react";
import DetailStats from "../../components/detailstats";

export const MainPage = () => {
    const processed = dataParser();
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [nation, setNation] = useState<string | number>("");
    const closeDetails = () => {
        setIsDetailsOpen((prevState) => !prevState);
    };

    return (
        <div className="w-screen h-full flex justify-center items-center">
            <Chart
                chartEvents={[
                    {
                        eventName: "select",
                        callback: ({ chartWrapper, eventArgs }) => {
                            const chart = chartWrapper.getChart();
                            const selection = chart.getSelection();
                            if (selection.length === 0) return;
                            const region = processed[selection[0].row + 1];
                            setNation(region[0]);
                            setIsDetailsOpen(true);
                            eventArgs.preventDefault();
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
            {isDetailsOpen && (
                <DetailStats nation={nation} toogle={closeDetails} />
            )}
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
    keys = changeNationFormat(keys, nat2gcode);
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
