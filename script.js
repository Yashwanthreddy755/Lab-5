const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const output = document.getElementById("output");
const language = document.getElementById("language");

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

if (!SpeechRecognition) {
    alert("Speech Recognition is not supported in this browser.");
}

const recognition = new SpeechRecognition();

recognition.continuous = true;
recognition.interimResults = true;

startBtn.addEventListener("click", () => {

    recognition.lang = language.value;

    output.value = "";

    recognition.start();
});

stopBtn.addEventListener("click", () => {
    recognition.stop();
});

recognition.onresult = (event) => {

    let transcript = "";

    for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript + " ";
    }

    output.value = transcript;
};

recognition.onerror = (event) => {
    console.log(event.error);
    alert("Error: " + event.error);
};

function copyText() {

    navigator.clipboard.writeText(output.value);

    alert("Text Copied Successfully!");
}

function downloadText() {

    const text = output.value;

    const blob = new Blob([text], {
        type: "text/plain"
    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "speech-text.txt";

    link.click();
}