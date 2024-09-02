module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.vue$": "@vue/vue3-jest",
    "^.+\\js$": "babel-jest",
    "^.+\\.svg$": "jest-transform-stub",
  },
  transformIgnorePatterns: ["/node_modules/(?!(@babel|vue)).+\\.js$"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts)$",
  moduleFileExtensions: ["vue", "js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/tests/unit/__mocks__/fileMock.js",
  },
  coveragePathIgnorePatterns: ["/node_modules/", "/tests/"],
  coverageReporters: ["text", "json-summary"],
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
