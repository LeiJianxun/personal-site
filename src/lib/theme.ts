export const themeStorageKey = "jianxun-home-theme";

// Apply the saved or system theme before the page is painted.
export const themeInitializationScript = `(() => {
  let theme;
  try {
    theme = localStorage.getItem(${JSON.stringify(themeStorageKey)});
  } catch {}
  const isDark = theme !== "light";
  document.documentElement.classList.toggle("dark", isDark);
})();`;
