import { defineConfig } from 'allure';

export default defineConfig({
    output: './allure-report',

    // Stores test history across report generations
    historyPath: './allure-history/history.jsonl',

    // Keep previous history and add the new run
    appendHistory: true,
});
//allurerc.mjs is an Allure runtime configuration file used to customize how Allure generates and manages the report.