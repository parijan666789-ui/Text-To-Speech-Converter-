let voices = [];
let synth = window.speechSynthesis;
let voiceSelect = document.getElementById("voices");

function loadVoices() {
    voices = synth.getVoices();
    voiceSelect.innerHTML = "";

    voices.forEach((voice, index) => {
        let option = document.createElement("option");
        option.value = index;
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
    });
}

loadVoices();
speechSynthesis.onvoiceschanged = loadVoices;

// 🔊 Speak function
function speakText() {
    let text = document.getElementById("text").value;

    let utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voices[voiceSelect.value];
    utterance.rate = document.getElementById("speed").value;
    utterance.volume = document.getElementById("volume").value;

    synth.speak(utterance);
}

// 🔍 Search filter
document.getElementById("search").addEventListener("input", function () {
    let search = this.value.toLowerCase();

    for (let i = 0; i < voiceSelect.options.length; i++) {
        let option = voiceSelect.options[i];
        let text = option.text.toLowerCase();

        option.style.display = text.includes(search) ? "" : "none";
    }
});

// ⬇️ Download (basic workaround)
function downloadAudio() {
    alert("Download feature needs backend or advanced API (not supported directly in browser).");
}