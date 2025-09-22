import packageJson from "../../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: "TurfConnect",
  version: packageJson.version,
  copyright: `© ${currentYear}, TurfConnect`,
  meta: {
    title: "TurfConnect - do easy",
    description: "",
  },
};
