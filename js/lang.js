/* Bilingual toggle (EN / 日本語) + petal animation + nav highlight.
   Language choice persists across pages via localStorage. */
(function () {
  var KEY = "mt-lang";

  function apply(lang) {
    document.body.classList.toggle("lang-ja", lang === "ja");
    document.documentElement.setAttribute("lang", lang === "ja" ? "ja" : "en");
    var btns = document.querySelectorAll(".lang-switch");
    btns.forEach(function (b) {
      b.textContent = lang === "ja" ? "English" : "日本語";
      b.setAttribute("aria-label", lang === "ja" ? "Switch to English" : "Switch to Japanese");
    });
  }

  function getLang() {
    try { return localStorage.getItem(KEY) || "en"; } catch (e) { return "en"; }
  }
  function setLang(lang) {
    try { localStorage.setItem(KEY, lang); } catch (e) {}
    apply(lang);
  }

  document.addEventListener("DOMContentLoaded", function () {
    apply(getLang());

    document.querySelectorAll(".lang-switch").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setLang(document.body.classList.contains("lang-ja") ? "en" : "ja");
      });
    });

    // highlight current nav link
    var here = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll("nav.main-nav a").forEach(function (a) {
      var href = a.getAttribute("href");
      if (href === here || (here === "" && href === "index.html")) a.classList.add("active");
    });

    // falling petals
    var field = document.querySelector(".petal-field");
    if (field) {
      var n = 14;
      for (var i = 0; i < n; i++) {
        var s = document.createElement("span");
        var size = 8 + Math.random() * 12;
        s.style.left = Math.random() * 100 + "vw";
        s.style.width = size + "px";
        s.style.height = size + "px";
        s.style.animationDuration = (7 + Math.random() * 9) + "s";
        s.style.animationDelay = (-Math.random() * 12) + "s";
        s.style.opacity = (0.3 + Math.random() * 0.4).toFixed(2);
        field.appendChild(s);
      }
    }
  });
})();
