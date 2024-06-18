document.addEventListener('DOMContentLoaded', function() {
    const howToUse = chrome.i18n.getMessage("howToUse") || "How to use:";
    const usage = chrome.i18n.getMessage("usage") || "Right-click on an image to open it in a new tab or download as JPG/PNG. The extension will search for an image within the element.";
    const madeBy = chrome.i18n.getMessage("madeBy") || "Made by";
    const githubLink = chrome.i18n.getMessage("githubLink") || "https://github.com/TedjFerhati";

    document.getElementById('how-to-use').innerText = howToUse;
    document.getElementById('usage').innerText = usage;
    document.getElementById('made-by').innerHTML = `${madeBy} <a href="${githubLink}" target="_blank">Tedj Ferhati</a>`;
});
