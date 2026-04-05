(function () {
  var data = window.portfolioData || { experiences: [], certifications: [] };

  function clearAndAppend(root, children) {
    root.textContent = "";
    children.forEach(function (el) {
      root.appendChild(el);
    });
  }

  function renderExperiences() {
    var root = document.getElementById("experiences-root");
    if (!root) return;
    var items = data.experiences || [];
    if (!items.length) {
      root.innerHTML = "<p>No experiences added yet. Edit <code>portfolio-data.js</code>.</p>";
      return;
    }
    var articles = items.map(function (exp) {
      var article = document.createElement("article");
      article.className = "data-card";
      var h3 = document.createElement("h3");
      h3.textContent = exp.title || "";
      var meta = document.createElement("p");
      meta.className = "data-meta";
      var company = exp.company || "";
      var period = exp.period || "";
      meta.textContent = [company, period].filter(Boolean).join(" · ");
      article.appendChild(h3);
      article.appendChild(meta);
      if (exp.summary) {
        var p = document.createElement("p");
        p.textContent = exp.summary;
        article.appendChild(p);
      }
      return article;
    });
    clearAndAppend(root, articles);
  }

  function renderCertifications() {
    var root = document.getElementById("certifications-root");
    if (!root) return;
    var items = data.certifications || [];
    if (!items.length) {
      root.innerHTML = "<p>No certifications added yet. Edit <code>portfolio-data.js</code>.</p>";
      return;
    }
    var list = document.createElement("ul");
    list.className = "cert-list";
    items.forEach(function (c) {
      var li = document.createElement("li");
      var strong = document.createElement("strong");
      strong.textContent = c.name || "";
      li.appendChild(strong);
      var parts = [];
      if (c.issuer) parts.push(c.issuer);
      if (c.year) parts.push(c.year);
      if (parts.length) {
        var span = document.createElement("span");
        span.className = "data-meta";
        span.textContent = " — " + parts.join(", ");
        li.appendChild(span);
      }
      list.appendChild(li);
    });
    clearAndAppend(root, [list]);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      renderExperiences();
      renderCertifications();
    });
  } else {
    renderExperiences();
    renderCertifications();
  }
})();
