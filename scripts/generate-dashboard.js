const fs = require('fs')
const path = require('path')

const browsers = [
    {
        name: 'Electron',
        file: 'reports/electron/combined.json'
    },
    {
        name: 'Chrome',
        file: 'reports/chrome/combined.json'
    },
    {
        name: 'Firefox',
        file: 'reports/firefox/combined.json'
    },
    {
        name: 'Edge',
        file: 'reports/edge/combined.json'
    }
]

let total = 0
let passed = 0
let failed = 0
let skipped = 0
let duration = 0

const results = []

for (const browser of browsers) {

    if (!fs.existsSync(browser.file)) {
        results.push({
            name: browser.name,
            status: '⏭️ Skipped',
            tests: '—'
        })

        continue
    }

    const report = JSON.parse(
        fs.readFileSync(browser.file, 'utf8')
    )

    const stats = report.stats

    total += stats.tests
    passed += stats.passes
    failed += stats.failures
    skipped += stats.pending
    duration += stats.duration

    let status = '❌ Failed'

    if (stats.failures === 0) {
        status = '✅ Passed'
    }

    results.push({
        name: browser.name,
        status,
        tests: `${stats.passes}/${stats.tests}`
    })
}

const successRate =
    total > 0
        ? ((passed / total) * 100).toFixed(2)
        : '0.00'

const durationSeconds = Math.round(duration / 1000)

const minutes = Math.floor(durationSeconds / 60)
const seconds = durationSeconds % 60

const formattedDuration =
    minutes > 0
        ? `${minutes}m ${seconds}s`
        : `${seconds}s`

let dashboard = ''

dashboard += '# 🧪 Cypress E2E Test Report\n\n'

dashboard += '## 📊 Overall\n\n'

dashboard += '| Metric | Result |\n'
dashboard += '|---|---:|\n'
dashboard += `| 🧪 Total | ${total} |\n`
dashboard += `| ✅ Passed | ${passed} |\n`
dashboard += `| ❌ Failed | ${failed} |\n`
dashboard += `| ⏭️ Skipped | ${skipped} |\n`
dashboard += `| 📈 Success Rate | ${successRate}% |\n`
dashboard += `| ⏱️ Duration | ${formattedDuration} |\n\n`

dashboard += '## 🌐 Browser Results\n\n'

dashboard += '| Browser | Status | Tests |\n'
dashboard += '|---|---|---:|\n'

for (const result of results) {
    dashboard += `| ${result.name} | ${result.status} | ${result.tests} |\n`
}

dashboard += '\n'

dashboard += '## 📎 Artifacts\n\n'

dashboard += '- 📸 Screenshots\n'
dashboard += '- 🎥 Videos\n'
dashboard += '- 📄 Mochawesome Reports\n\n'

dashboard += '## ⚙️ Environment\n\n'

dashboard += '| Configuration | Value |\n'
dashboard += '|---|---|\n'
dashboard += '| Runner | ubuntu-latest |\n'
dashboard += '| Node | 24.20.0 |\n'
dashboard += '| Browser Image | cypress/browsers |\n'
dashboard += '| Framework | Cypress |\n\n'

dashboard += '---\n\n'
dashboard += 'Generated automatically by **GitHub Actions + Cypress** 🚀\n'

fs.writeFileSync(
    'dashboard.md',
    dashboard
)

console.log(dashboard)
