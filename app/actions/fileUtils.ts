async function fileToGenerativePart(
	buffer: { toString: (arg0: string) => any },
	mimeType: any
) {
	const base64String = buffer.toString('base64');
	const generativePart = {
		inlineData: {
			data: base64String,
			mimeType: mimeType
		}
	};

	return generativePart;
}

export { fileToGenerativePart };
