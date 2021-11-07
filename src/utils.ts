export function stringToTitle(str: string) {
	return str.charAt(0).toUpperCase() + str.substring(1);
}

export function slugToText(slug: string) {
	return stringToTitle(slug.replace("-", " "));
}
