const toggle = document.getElementById("toggle-dark");

browser.storage.sync.get("darkModeEnabled").then((data) => {
    toggle.checked = data.darkModeEnabled || false;
});

toggle.addEventListener("change", () => {
    const enabled = toggle.checked;
    browser.storage.sync.set({ darkModeEnabled: enabled });

    // Send message to current tab
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, {
            action: "toggleDarkMode",
            enabled: enabled
        });
    });
});
