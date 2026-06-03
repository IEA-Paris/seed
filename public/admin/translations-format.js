// Custom Decap format for the flat translation JSON files (translations/*.json).
//
// CONSTRAINT: the on-disk files must stay BARE root maps — { "about": "About" }
// — because @nuxtjs/i18n loads them directly. Decap's data model can only bind
// widgets to NAMED fields, so it cannot read/write a bare-root object on its
// own. This custom format bridges the two:
//
//   fromFile(text): bare JSON on disk  ->  { strings: {...} } for Decap's model
//   toFile(value):  { strings: {...} } from Decap  ->  bare JSON on disk
//
// The `strings` envelope therefore exists ONLY inside Decap's runtime. The file
// written back to git is byte-for-byte the same shape it had before. Pair this
// with a file-collection entry whose single field is named `strings`.
//
// Loaded by public/admin/index.html BEFORE CMS.init(), then selected per
// collection via `format: json-flat`.
(function () {
  function fromFile(text) {
    var data = text && text.trim() ? JSON.parse(text) : {};
    var out = { strings: data };
    // TEMP DIAGNOSTIC
    try {
      console.log("[json-flat] fromFile ran. text length:", (text || "").length,
        "| parsed keys:", Object.keys(data).length,
        "| returning:", out);
    } catch (e) {}
    return out;
  }

  function toFile(value) {
    var strings = (value && value.strings) || {};
    // 2-space indent + trailing newline reproduces the existing file format.
    return JSON.stringify(strings, null, 2) + "\n";
  }

  // window.CMS is provided by the decap-cms CDN bundle.
  if (typeof window !== "undefined") {
    // TEMP DIAGNOSTIC — does the API exist and does registration run?
    console.log("[json-flat] script loaded. window.CMS:", !!window.CMS,
      "| registerCustomFormat type:",
      window.CMS && typeof window.CMS.registerCustomFormat);
    if (window.CMS && typeof window.CMS.registerCustomFormat === "function") {
      window.CMS.registerCustomFormat("json-flat", "json", {
        fromFile: fromFile,
        toFile: toFile,
      });
      console.log("[json-flat] registered ✓");
    } else {
      console.warn("[json-flat] registerCustomFormat NOT available ✗");
    }
  }

  // Export for Node round-trip testing (ignored in the browser).
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { fromFile: fromFile, toFile: toFile };
  }
})();
