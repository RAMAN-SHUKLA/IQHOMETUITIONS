const url = "https://script.google.com/macros/s/AKfycbymP1quMApBKviLviuoQS9Ik06M6H8VT0B525AXiwr0lbd6IEoP3QnOowoV0UUz6y5gZg/exec";

(async () => {
    console.log("Testing POST to Apps Script URL...");
    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                timestamp: new Date().toISOString(),
                fullName: "Test Tutor",
                whatsapp: "9999999999",
                gender: "Male",
                residenceArea: "kidwai-nagar",
                experience: "1-3",
                subjects: "Maths",
                classes: "10th",
                boards: "CBSE",
                teachingMode: "Both",
                qualification: "B.Sc",
                introduction: "This is a test introduction to see if the connection is working correctly.",
                status: "Pending"
            })
        });

        console.log("Status Code:", res.status);
        console.log("Status Text:", res.statusText);
        const text = await res.text();
        console.log("Response Body (first 500 chars):", text.substring(0, 500));
    } catch (e) {
        console.error("Fetch failed:", e);
    }
})();
