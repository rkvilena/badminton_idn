import { NationCodeMap } from "./nationcode";

export const nationAnnotation = {
	CHN: "In tie with Japan as the most successful nation in BWF World Tour 2018-2021, as they has 85 titles with less runner-up status (83 times). Chen Yufei dominating the Women's Single sector in 2019 with 8 titles.",
	JPN: "Arguably the best nation in BWF World Tour 2018-2021 with 85 titles as their Women's Doubles players achieving 35 titles, mainly by Yuki Fukushima / Sayaka Hirota. Tie with China but with more runner-up status (86 times).",
	INA: "The third best nation based on the achieved titles in BWF World Tour 2018-2021 with 58 titles. Dominating the Men's Double competition with 29 titles, mostly by Marcus Fernaldi Gideon / Kevin Sanjaya Sukamuljo.",
	MAS: "Achieved 17 BWF World Tour titles from 2018-2021 with Mixed Doubles sector as their most prolific title achiever (7 titles).",
	DEN: "The best european nation in BWF World Tour 2018-2021 by achieving 29 titles and 31 runner-up position.",
	TPE: "A strong nation in their BWF World Tour 2018-2021 campaign with Tai Tzu-ying being the number 1 Women's Single player for the whole 2018 until mid-2019.",
	IND: "Achieved 13 BWF World Tour titles from 2018-2021 with Men's Single sector won 10 titles, their best sector on that period.",
	HKG: "Reaching a podium 13 times, with 8 titles and 5 runner-up position.",
	NED: "Reaching a podium 7 times, with 3 titles and 4 runner-up position.",
	KOR: "Achieving an amazing result by reaching a podium 81 times, 42 times as a champions.",
	THA: "One of the strong nation in the competition with 21 titles and 27 runner-up position.",
	ENG: "The second-best nation in Europe for 2018-2021 period with 10 titles and 9 runner-up position.",
	SGP: "Won 3 titles with 2 times as a runner-up.",
	FRA: "Reaching a podium 11 times, with 4 titles and 7 runner-up position.",
	USA: "Won 1 titles with 2 times as a runner-up.",
	ESP: "Reaching a podium 14 times, with Carolina Marin as their best player and one of the strongest Women's Single player at the time.",
	CAN: "Won 2 titles with 1 times as a runner-up.",
	SCO: "Won 2 titles with 2 times as a runner-up.",
	RUS: "Won 3 titles with 3 times as a runner-up.",
	GER: "Won 3 titles with 9 times as a runner-up.",
	BUL: "Won 6 titles with 5 times as a runner-up. Stoeva Sisters as the superstar pair for Bulgaria.",
	AUS: "Won 1 title without ever touching a runner-up place.",
};

export function getNationAnnotate(nation: string) {
	const annoMapper = nationAnnotation as NationCodeMap;
	return annoMapper[nation];
}
