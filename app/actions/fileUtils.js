async function fileToGenerativePart(buffer, mimeType) {
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
