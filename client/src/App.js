import React from "react";
import { ThemeProvider, Input } from "navi-design-system";
import JssButton from "./components/JssButton/JssButton";
import token from "./token";
import { create } from "jss";
import { JssProvider } from "react-jss";

import functions from "jss-plugin-rule-value-function";
import global from "jss-plugin-global";
import nested from "jss-plugin-nested";
import camelCase from "jss-plugin-camel-case";
import defaultUnit from "jss-plugin-default-unit";
import vendorPrefixer from "jss-plugin-vendor-prefixer";
import propsSort from "jss-plugin-props-sort";

function jssPreset() {
  return {
    plugins: [
      functions(),
      global(),
      nested(),
      camelCase(),
      defaultUnit(),
      vendorPrefixer(),
      propsSort(),
    ]
  };
}


// Create a new stylesheet
const styleSheet = new CSSStyleSheet();
// set the title of the stylesheet
// styleSheet.title = "Navi Design System JSS Styles";
styleSheet.insertRule("body { color: red; }", 0);
// Attach the stylesheet to the document
document.adoptedStyleSheets = [...document.adoptedStyleSheets, styleSheet];
const cssStyleSheet = styleSheet;


let style = document.getElementById("csp-styles")

console.log("style: ", style)


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
}


console.log("cssStyleSheetPlugin(cssStyleSheet): ", cssStyleSheetPlugin(cssStyleSheet))

const App = () => {
  // Pass the reference of CSSStyleSheet to <ThemeProvider/>
  const _jss = create({
    plugins: [
      ...jssPreset().plugins,
      cssStyleSheet ? cssStyleSheetPlugin(cssStyleSheet) : {},
    ],
    insertionPoint: style,
  });
  return (
    <>
      {/* <Button variant="primary" label="Navi Button">NaviButton</Button> */}

      <div style={{ color: "blue", fontSize: "2rem" }}>
        Inline style test in CSP compliant way
      </div>

      <div>
        <JssButton variant="primary" label="Navi JssButton">NaviJssButton</JssButton>
        <Input inputType="critical" variant="critical" label="Navi Input" placeholder="Enter your name">NaviButton</Input>
        {/* <ReactJssButton variant="primary" label="Navi ReactJssButton">NaviReactJssButton</ReactJssButton> */}
      </div>

      <p />

      <JssProvider jss={_jss}>
        <JssButton variant="primary" label="Navi JssButton">NaviJssButton</JssButton>
        {/* <ReactJssButton variant="primary" label="Navi ReactJssButton">NaviReactJssButton</ReactJssButton> */}
        <Input inputType="critical" variant="critical" label="Navi Input" placeholder="Enter your name">NaviButton</Input>
      </JssProvider>

      <p />

      <ThemeProvider theme={token} cssStyleSheet={styleSheet} insertionPoint={styleSheet}>
        {/* <Button variant="primary" label="Navi Button">NaviButton</Button> */}
        {/* <ReactJssButton variant="primary" label="Navi ReactJssButton">NaviReactJssButton</ReactJssButton> */}
        <Input inputType="critical" variant="critical" label="Navi Input" placeholder="Enter your name">NaviButton</Input>
      </ThemeProvider>
    </>
  );
};

export default App;
