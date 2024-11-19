import React, { useContext, useMemo, FC } from "react";
import tokenObj from "../../tokens/build/json/tokens.json";
import { create } from "jss";
import { JssProvider } from "react-jss";
import jssPreset from "./jssPreset";
import { generateThemeObj } from "./Themer";

export const ThemeContext =
  React.createContext<DefaultTheme | undefined>(undefined);

export const ThemeConsumer = ThemeContext.Consumer;

export const useTheme = () => {
  const theme = useContext(ThemeContext);
  return theme || { tokens: tokenObj, jss: create(jssPreset()) };
};

// Plugin to handle style insertion into style sheet.
// This is to prevent JSS from inserting styles into the DOM by creating <style> tags
// Instead, we insert the styles into a CSSStyleSheet object provided by the user for CSP compliance
const cssStyleSheetPlugin = (styleSheet) => {
  function onProcessStyle(style, rule) {
    // If a style sheet is provided, insert the rule into the style sheet
    if (styleSheet && rule && rule.options) {
      const selector = rule.selectorText;
      try {
        const css = `${selector} { ${Object.entries(style)
          .map(([key, value]) => `${key}: ${value};`)
          .join(" ")} }`;
        styleSheet.insertRule(css, styleSheet.cssRules.length);
      } catch (error) {
        console.warn("Failed to insert rule:", rule.key, error);
      }
    }

    // Returning a blank object prevents creating a <style> tag in the DOM
    return {};
  }

  return { onProcessStyle };
};

const ThemeProvider = ({
  theme,
  insertionPoint,
  children,
  cssStyleSheet,
}) => {
  const outerTheme = useContext(ThemeContext) || tokenObj;

  const tokens = useMemo(() => {
    return { ...generateThemeObj(theme) };
  }, [theme, outerTheme, insertionPoint, cssStyleSheet]);

  if (!children) return null;

  console.log("cssStyleSheet: ", cssStyleSheet);

  // If insertionPoint is provided, configure JSS insertion point to inject the styles at the correct place
  // This is to inject the styles in shadow roots or at the end of the head tag
  const _jss = create({
    plugins: [
      ...jssPreset().plugins,
      cssStyleSheet ? cssStyleSheetPlugin(cssStyleSheet) : {},
    ],
    insertionPoint: insertionPoint,
  });

  return insertionPoint || cssStyleSheet ? (
    <ThemeContext.Provider value={{ tokens, jss: _jss, insertionPoint }}>
      <JssProvider jss={_jss}>{children}</JssProvider>
    </ThemeContext.Provider>
  ) : (
    <ThemeContext.Provider value={{ tokens, jss: _jss, insertionPoint }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.displayName = "ThemeProvider";

export default ThemeProvider;
