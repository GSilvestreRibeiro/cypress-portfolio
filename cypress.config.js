const { defineConfig } = require('cypress')
module.exports = defineConfig({
  // === CYPRESS CLOUD (Dashboard) ===
  // Gere em: cloud.cypress.io > seu projeto > Project Settings
  // Remova o comentário abaixo e substitua pelo seu Project ID
  projectId: 'gsqqyg',
  e2e: {
    // === URL BASE ===
    // Substitua pela URL do site que voce escolheu
    baseUrl: "https://northwind-test-platform.vercel.app/",

    // === VIEWPORT ===
    viewportWidth: 1280, // desktop
    viewportHeight: 720,

    // === VIDEOS E SCREENSHOTS ===
    video: true, // grava video de cada spec
    videoCompression: 32, // qualidade vs tamanho
    screenshotOnRunFailure: true, // screenshot em falha

    // === RETRIES (tentativas em falha) ===
    retries: {
      runMode: 1, // 1 retry no CI (nao mascara flaky, mas evita ruido)
      openMode: 0, // 0 no dev — queremos ver a falha imediatamente
    },
    // === TIMEOUTS ===
    defaultCommandTimeout: 8000, // espera max por elemento (ms)
    pageLoadTimeout: 30000, // espera max por
    requestTimeout: 10000, // timeout de cy.request()
    responseTimeout: 30000, // timeout de cy.intercept() wait

    // === REPORTER (Mochawesome) ===
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false, // nao sobrescreve — merge depois
      html: false, // gera so JSON — merge via script npm
      json: true,
    },
    screenshotsFolder: 'cypress/reports/mochawesome-report/screenshots',
    videosFolder: 'cypress/reports/mochawesome-report/videos',
    // === DE AMBIENTE ===
    env: {
      // Valores nao-sensiveis podem ficar aqui
      // Senhas e tokens: use cypress.env.json (no .gitignore)
      ENVIRONMENT: 'local',
    },
    // === ARQUIVOS IGNORADOS ===
    excludeSpecPattern: [
      'cypress/e2e/**/*.skip.cy.js', // specs temporariamente desativadas
    ],
    // === NODE EVENTS (plugins) ===
    setupNodeEvents(on, config) {
      // Deletar video de specs que passaram (economiza espaco no CI)
      //on('after:spec', (spec, results) => {
      //  if (results && results.stats.failures === 0) {
      //    const fs = require('fs')
      //    if (results.video && fs.existsSync(results.video)) {
      //      fs.unlinkSync(results.video)
      //    }
      //  }
      //})
      return config
    },
  },
})