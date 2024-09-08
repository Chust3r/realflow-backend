export const matcher = (path: string, value: string) => {
	const regex = new RegExp(path, 'i')

	return regex.test(value)
}
