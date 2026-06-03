// Custom Decap widget: an editable key/value table for a flat translation map.
//
// Used together with the `json-flat` custom format (translations-format.js),
// which hands Decap a { strings: { key: "value", ... } } object. This widget
// binds to the `strings` field and lets editors change the VALUE of each key.
//
// Scope decision: keys are shown read-only (editors edit values, not the key
// set), matching the agreed "edit values only" behaviour and avoiding broken
// i18n lookups from renamed/removed keys. The control still returns the full
// map so nothing is dropped on save.
//
// Loaded by index.html before CMS.init(); referenced as `widget: key-values`.
(function () {
  if (typeof window === "undefined" || !window.CMS) return;

  var h = window.h; // Decap exposes preact/react hyperscript as window.h
  var createClass = window.createClass;
  if (!h || !createClass) return;

  var Control = createClass({
    getValue: function () {
      // value is an Immutable.Map (Decap wraps objects). Normalise to a POJO.
      var v = this.props.value;
      // TEMP DIAGNOSTIC — remove once widget confirmed working.
      try {
        console.log("[key-values] raw value:", v,
          "| type:", Object.prototype.toString.call(v),
          "| hasToJS:", v && typeof v.toJS === "function",
          "| field:", this.props.field && this.props.field.toJS && this.props.field.toJS());
      } catch (e) { console.log("[key-values] diag error", e); }
      if (!v) return {};
      if (typeof v.toJS === "function") return v.toJS();
      return v;
    },

    handleChange: function (key, next) {
      var obj = Object.assign({}, this.getValue());
      obj[key] = next;
      // onChange accepts a plain object; the json-flat format serialises it.
      this.props.onChange(obj);
    },

    render: function () {
      var self = this;
      var obj = this.getValue();
      var keys = Object.keys(obj).sort();
      return h(
        "div",
        { className: this.props.classNameWrapper },
        keys.map(function (key) {
          return h(
            "div",
            {
              key: key,
              style: {
                display: "flex",
                gap: "12px",
                alignItems: "center",
                padding: "4px 0",
                borderBottom: "1px solid #eee",
              },
            },
            h(
              "label",
              {
                style: {
                  flex: "0 0 38%",
                  fontFamily: "monospace",
                  fontSize: "12px",
                  color: "#555",
                  wordBreak: "break-all",
                },
              },
              key
            ),
            h("input", {
              type: "text",
              value: obj[key] == null ? "" : String(obj[key]),
              style: { flex: "1 1 62%", padding: "6px 8px" },
              onChange: function (e) {
                self.handleChange(key, e.target.value);
              },
            })
          );
        })
      );
    },
  });

  var Preview = createClass({
    render: function () {
      return h("div", {}, "Translation strings");
    },
  });

  window.CMS.registerWidget("key-values", Control, Preview);
})();
