import { parse } from 'csv-string';

export default function kvCsvParse(csv_str: string) {
	const csv = parse(csv_str);

	if (csv[0]?.[0] != "key" || csv[0]?.[1] != "value")
		return null;

	return Object.fromEntries(
		csv.map(v => ([v[0], v[1]])).filter(v => !!v[0])
	);
}
