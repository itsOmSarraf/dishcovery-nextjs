const callGeminiApi = async (imageBlob: Blob) => {
    try {
        const formData = new FormData();
        formData.append('file', imageBlob, 'screenshot.jpg');

        const response = await fetch('/api/geminiapi', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to get roast from Gemini API');
        }

        const result = await response.json();
        // setRoastResult(result);
        // setRoastReady(true);/
    } catch (error) {
        console.error('Error calling Gemini API:', error);
        // setError('Failed to generate roast. Please try again later.');
    }
};