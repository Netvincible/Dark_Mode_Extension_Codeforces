function toggleDarkMode(enabled) {
    const existing = document.getElementById("dark-mode-style");
    if (enabled && !existing) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = browser.runtime.getURL("dark-mode.css");
        link.id = "dark-mode-style";
        document.head.appendChild(link);
    } else if (!enabled && existing) {
        existing.remove();
    }
}

// Initial check
browser.storage.sync.get("darkModeEnabled").then((data) => {
    toggleDarkMode(data.darkModeEnabled);
});

// Listen for messages from popup
browser.runtime.onMessage.addListener((msg) => {
    if (msg.action === "toggleDarkMode") {
        toggleDarkMode(msg.enabled);
    }
});
