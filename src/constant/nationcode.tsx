// General properties
export type NationCodeMap = { [key: string]: string };
export const nat2gcode = {
	INA: "ID",
	MAS: "MY",
	DEN: "DK",
	JPN: "JP",
	CHN: "CN",
	TPE: "TW",
	IND: "IN",
	HKG: "HK",
	NED: "NL",
	KOR: "KR",
	THA: "TH",
	ENG: "GB",
	SGP: "SG",
	FRA: "FR",
	USA: "US",
	ESP: "ES",
	CAN: "CA",
	SCO: "Scotland",
	RUS: "RU",
	GER: "DE",
	BUL: "BG",
	AUS: "AU",
};

export const gcode2Nat = {
	ID: "INA",
	MY: "MAS",
	DK: "DEN",
	JP: "JPN",
	CN: "CHN",
	TW: "TPE",
	IN: "IND",
	HK: "HKG",
	NL: "NED",
	KR: "KOR",
	TH: "THA",
	GB: "ENG",
	SG: "SGP",
	FR: "FRA",
	US: "USA",
	ES: "ESP",
	CA: "CAN",
	Scotland: "SCO",
	RU: "RUS",
	DE: "GER",
	BG: "BUL",
	AU: "AUS",
};

export const gcode2NationalName = {
	ID: "Indonesia",
	MY: "Malaysia",
	DK: "Denmark",
	JP: "Japan",
	CN: "China",
	TW: "Taiwan",
	IN: "India",
	HK: "Hong Kong",
	NL: "Netherlands",
	KR: "South Korea",
	TH: "Thailand",
	GB: "England",
	SG: "Singapore",
	FR: "France",
	US: "United States",
	ES: "Spain",
	CA: "Canada",
	Scotland: "Scotland",
	RU: "Russia",
	DE: "Germany",
	BG: "Bulgaria",
	AU: "Australia",
};

export function convertNationCode(nation: any, mapper: NationCodeMap) {
	return mapper[nation];
}

// Championstats.json
export type NationTitleCount = { first: number; second: number };
export type NationTitleMap = { [key: string]: NationTitleCount };
export function getNationTitle(
	nat: string,
	mapper: NationTitleMap
): NationTitleCount {
	return mapper[nat];
}

// nationmatchstats.json
export type H2HStats = { win: number; matches: number };
export type NationStats = {
	win: number;
	matches: number;
	h2h: { [oppNation: string]: H2HStats };
};
export type NationsAllStats = { [key: string]: NationStats };
