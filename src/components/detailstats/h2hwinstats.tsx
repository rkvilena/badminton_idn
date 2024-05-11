import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import nationdata from "../../data/nationmatchstats.json";
import {
    gcode2Nat,
    NationCodeMap,
    NationsAllStats,
} from "../../constant/nationcode";

export function H2HWinStats({ nationcode }: Readonly<{ nationcode: string }>) {
    const [datas, setDatas] = useState(
        data(nationcode, gcode2Nat, nationdata, "", 10)
    );

    const [totalH2h, setTotalH2h] = useState(0);

    const [showSortDropdown, setShowSortDropdown] = useState(false);

    const [sortByValue, setSortByValue] = useState("");
    const [totalH2hValue, setTotalH2hValue] = useState(10);

    useEffect(() => {
        setShowSortDropdown(false);
        setDatas(
            data(nationcode, gcode2Nat, nationdata, sortByValue, totalH2hValue)
        );
    }, [sortByValue, totalH2hValue]);

    useEffect(() => {
        setShowSortDropdown(false);
        setSortByValue("");
        setTotalH2hValue(10);
        updateTotalH2hData(nationcode, gcode2Nat, nationdata);
        setDatas(data(nationcode, gcode2Nat, nationdata, "", totalH2hValue));
    }, [nationcode]);

    function updateTotalH2hData(
        ncode: string,
        codemap: NationCodeMap,
        datanation: NationsAllStats
    ) {
        const code = codemap[ncode];
        const h2h = Object.keys(datanation[code].h2h).length;
        setTotalH2h(h2h);
    }

    function data(
        ncode: string,
        codemap: NationCodeMap,
        datanation: NationsAllStats,
        sortBy: string,
        limit: number
    ) {
        const arrdata = [];
        arrdata.push([
            "Head-to-Head",
            "Win",
            { role: "style" },
            "Lose",
            { role: "style" },
        ]);
        const code = codemap[ncode];
        const ndata = datanation[code].h2h;
        for (const oppNation in ndata) {
            const h2hStats = ndata[oppNation];
            const arr = [
                "vs " + oppNation,
                h2hStats.win,
                "fill-color: #ffffff; fill-opacity: 1",
                h2hStats.matches - h2hStats.win,
                "fill-color: #eb3b42; fill-opacity: 1",
            ];
            arrdata.push(arr);
        }

        // Descending Sort
        const descendsort = arrdata.sort((a, b) => {
            let numA = a[1] as number;
            let numB = b[1] as number;

            if (sortBy === "match") {
                numA += a[3] as number;
                numB += b[3] as number;
            } else if (sortBy === "lose") {
                numA = a[3] as number;
                numB = b[3] as number;
            }
            return numB - numA;
        });

        if (limit > 0) {
            return descendsort.slice(0, limit + 1);
        }

        return descendsort.slice(0, 11);
    }

    const options = {
        isStacked: "true",
        legend: { position: "none" },
        hAxis: {
            minValue: 0,
            ticks: [0, 0.25, 0.5, 0.75, 1],
        },
        backgroundColor: "#d9d9d9",
        barWidth: 100,
    };

    const sortByOptions = [
        { value: "match", label: "Number of Match" },
        { value: "win", label: "Number of Win" },
        { value: "lose", label: "Number of Lose" },
    ];

    return (
        <>
            <div className="flex flex-col gap-4 my-4">
                <div className="relative" data-twe-dropdown-ref>
                    <button
                        className="flex items-center rounded bg-primary pl-4 pr-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white transition duration-150 ease-in-out border-white focus:outline-none focus:ring-0 hover:border hover:border-red-500 focus:border-red-500"
                        type="button"
                        id="dropdownMenuButton1"
                        data-twe-dropdown-toggle-ref
                        aria-expanded="false"
                        data-twe-ripple-init
                        data-twe-ripple-color="light"
                        onClick={() => setShowSortDropdown(!showSortDropdown)}
                    >
                        {sortByValue === ""
                            ? "Sort By"
                            : sortByOptions.find(
                                  (option) => option.value === sortByValue
                              )?.label}
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
                                    onClick={() => setSortByValue(option.value)}
                                >
                                    <a
                                        className="block w-full whitespace-nowrap bg-white pl-4 pr-8 py-2 text-sm font-normal text-black hover:bg-zinc-200/60 hover:text-black text-left"
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
                <div className="flex flex-col items-start gap-2">
                    <div className="flex items-center gap-2">
                        <span className="text-sm">Show</span>
                        <input
                            className="shadow appearance-none border rounded w-[72px] py-2 px-3 text-xs text-white leading-tight focus:outline-none focus:shadow-outline"
                            id="total-h2h"
                            type="number"
                            placeholder="10"
                            value={totalH2hValue}
                            onChange={(e) => {
                                setTotalH2hValue(parseInt(e.target.value));
                            }}
                        ></input>
                        <span className="text-sm">from {totalH2h} data</span>
                    </div>
                    <span className="text-xs text-red-500">
                        {totalH2hValue > totalH2h
                            ? `Total maximum data is ${totalH2h}`
                            : ""}
                    </span>
                </div>
            </div>
            <Chart
                chartType="BarChart"
                width="100%"
                height="500px"
                data={datas}
                options={options}
            />
        </>
    );
}
