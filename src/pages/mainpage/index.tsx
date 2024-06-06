import { Chart } from "react-google-charts";
import championsdata from "../../data/championstats.json";
import {
    convertNationCode,
    nat2gcode,
    nationalName2gcode,
    NationCodeMap,
} from "../../constant/nationcode";
import { useState } from "react";
import DetailStats from "../../components/detailstats";
import * as FaIcons from "react-icons/fa";

export const MainPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isValidSearchTerm, setIsValidSearchTerm] = useState(true);

    const handleSearchEnter = (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === "Enter") {
            const nat = convertNationCode(
                searchTerm.toLowerCase(),
                nationalName2gcode
            );

            const isValid = nat !== undefined;

            setIsValidSearchTerm(isValid);

            if (isValid) {
                setNation(nat);
                setIsDetailsOpen(true);
            }
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!isValidSearchTerm) setIsValidSearchTerm(true);

        setSearchTerm(event.target.value);
    };

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

    const handleIncrementZoom = () => {
        setProcessed((prevProcessed) => {
            const newProcessed = [...prevProcessed];
            const previousZoom = parseFloat(newProcessed[newProcessed.length - 1][1].toString());
            if (previousZoom < 5) {
                newProcessed[newProcessed.length - 1] = ["Zoom", previousZoom + 0.5];
            }
            return newProcessed;
        })
    };

    const handleDecrementZoom = () => {
        setProcessed((prevProcessed) => {
            const newProcessed = [...prevProcessed];
            const previousZoom = parseFloat(newProcessed[newProcessed.length - 1][1].toString());
            if (previousZoom > 1) {
                newProcessed[newProcessed.length - 1] = ["Zoom", previousZoom - 0.5];
            }
            return newProcessed;
        })
    };

    const resetZoom = () => {
        setProcessed((prevProcessed) => {
            const newProcessed = [...prevProcessed];
            newProcessed[newProcessed.length - 1] = ["Zoom", 1];
            return newProcessed;
        })
    };

    const [processed, setProcessed] = useState([...dataParser(), ["Zoom", 1]]);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [nation, setNation] = useState<string | number>("ID");
    const closeDetails = () => {
        setIsDetailsOpen((prevState) => !prevState);
    };

    const options = {
        colorAxis: { colors: ["#D7EFEF", "#799FCB", "#57558E"] },
        backgroundColor: "transparent",
        datalessRegionColor: "#FAF6F2",
        defaultColor: "#FAF6F2",
        haxis: {
            minValue: 0,
        },
        legend: "none",
        height: 365,
        width: 700,
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
                        nation's title count in 2018-2021 period. Any nations
                        that never become a champions are not included here
                        (shown in the map by a <b>white color</b>).
                    </p>
                    <hr className="my-4 border-0 h-[1px] bg-gray-700"></hr>
                    <div className="flex justify-between">
                        <div className="gap-4 mb-4">
                            <p className="px-4 py-2 text-sm w-fit text-center text-white bg-[#24303F] border border-white rounded-full font-montserrat">
                                <b>Click the nation</b> on the map to see more.
                            </p>
                        </div>
                        <div className="flex flex-col items-end gap-1 min-w-[300px]">
                            <div className="flex items-center justify-center w-full gap-2">
                                <FaIcons.FaSearch
                                    className="w-8 h-8 p-2"
                                />
                                <input
                                    className="w-full rounded-sm bg-[#24303F] shadow appearance-none border-b focus:border border-white font-montserrat py-2.5 px-3 text-sm text-white-365 leading-tight focus:outline-none focus:shadow-outline"
                                    id="nationname"
                                    type="text"
                                    placeholder="Search a nation name"
                                    onChange={handleInputChange}
                                    onKeyDown={handleSearchEnter}
                                />
                            </div>
                            {!isValidSearchTerm && (
                                <span className="w-full text-xs text-right text-red-700">
                                    {searchTerm} is an invalid nation name, try{" "}
                                    <b>Indonesia</b>.
                                </span>
                            )}
                        </div>
                    </div>
                    <div className={`relative h-full max-h-[35vh] ${isDetailsOpen ? "md:max-h-[45vh]" : "md:max-h-[50vh]"}`}>
                        <div className={`relative overflow-auto max-h-[35vh] ${isDetailsOpen ? "md:max-h-[45vh]" : "md:max-h-[50vh]"}`}>
                            <Chart
                                chartEvents={[
                                    {
                                        eventName: "ready",
                                        callback: ({ chartWrapper }) => {
                                            const dataTable = chartWrapper.getDataTable();
                                            const zoomValue = dataTable?.getValue(dataTable?.getNumberOfRows() - 1, 1)?.toString() ?? "1";
                                            const zoomMultiplier = parseFloat(zoomValue);

                                            const currentHeight = chartWrapper.getOption("height")
                                            if (currentHeight !== Math.round(365 * zoomMultiplier)) {
                                                chartWrapper.setOption("height", Math.round(365 * zoomMultiplier));
                                                chartWrapper.setOption("width", Math.round(700 * zoomMultiplier));
                                                chartWrapper.draw();
                                            }
                                        },
                                    },
                                    {
                                        eventName: "select",
                                        callback: ({ chartWrapper }) => {
                                            const chart = chartWrapper.getChart();
                                            const selection = chart.getSelection();
                                            if (selection.length === 0) return;
                                            const region =
                                                processed[selection[0].row + 1];
                                            setNation(region[0]);
                                            setIsDetailsOpen(true);
                                            resetZoom();
                                        },
                                    },
                                ]}
                                chartType="GeoChart"
                                height="85%"
                                data={processed}
                                options={options}
                                style={{
                                    margin: "0 auto",
                                }}
                            />
                        </div>
                        <div className="absolute rounded-sm bottom-6 right-6 justify-center flex flex-col bg-[#24303F] border border-white z-10">
                            <FaIcons.FaPlus
                                className="w-8 h-8 p-2 hover:cursor-pointer"
                                onClick={handleIncrementZoom}
                            />
                            <FaIcons.FaMinus
                                className="w-8 h-8 p-2 hover:cursor-pointer"
                                onClick={handleDecrementZoom}
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-2 my-4">
                        <p className="text-sm text-left text-white bg-[#24303F] font-montserrat font-bold">1</p>
                        <div className="text-sm text-left bg-gradient-to-r from-[#D7EFEF] via-[#799FCB] to-[#57558E] w-[200px] h-[10px] font-montserrat" />
                        <p className="text-sm text-left text-white bg-[#24303F] font-montserrat font-bold">85</p>
                    </div>
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
