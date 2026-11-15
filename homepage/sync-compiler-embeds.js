/**
 * Syncs `WP_EMBEDDED_CLINIC_CONFIG` and `WP_EMBEDDED_VISIT_TRACKER` inside `bareun-detail-compiler.js`
 * with the live contents of `clinic-template-config.js` and `visit-tracker.js`.
 */
const fs = require('fs');
const path = require('path');

function syncCompilerEmbeds() {
  const dir = __dirname;
  const compilerPath = path.join(dir, 'bareun-detail-compiler.js');
  const clinicCfgPath = path.join(dir, 'clinic-template-config.js');
  const trackerPath = path.join(dir, 'visit-tracker.js');

  const clinicCfgRaw = fs.readFileSync(clinicCfgPath, 'utf8');
  const trackerRaw = fs.readFileSync(trackerPath, 'utf8');
  let compilerSrc = fs.readFileSync(compilerPath, 'utf8');

  compilerSrc = compilerSrc.replace(
    /^const WP_EMBEDDED_CLINIC_CONFIG = .*$/m,
    'const WP_EMBEDDED_CLINIC_CONFIG = ' + JSON.stringify(clinicCfgRaw) + ';'
  );
  compilerSrc = compilerSrc.replace(
    /^const WP_EMBEDDED_VISIT_TRACKER = .*$/m,
    'const WP_EMBEDDED_VISIT_TRACKER = ' + JSON.stringify(trackerRaw) + ';'
  );

  fs.writeFileSync(compilerPath, compilerSrc, 'utf8');
  console.log('[sync-compiler-embeds] Updated WP_EMBEDDED_CLINIC_CONFIG & WP_EMBEDDED_VISIT_TRACKER in bareun-detail-compiler.js');
}

if (require.main === module) {
  syncCompilerEmbeds();
}

module.exports = { syncCompilerEmbeds };
