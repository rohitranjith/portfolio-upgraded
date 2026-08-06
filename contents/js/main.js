(function () {
    "use strict";

    /* Scroll reveal */
    var revealEls = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        revealEls.forEach(function (el) { io.observe(el); });
    } else {
        revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    }

    /* Counter animation */
    var counters = document.querySelectorAll("[data-counter]");
    var counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            var el = entry.target;
            var target = parseInt(el.getAttribute("data-counter"), 10) || 0;
            var duration = 1400;
            var start = null;

            function step(ts) {
                if (!start) start = ts;
                var progress = Math.min((ts - start) / duration, 1);
                var eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.floor(eased * target);
                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    el.textContent = target;
                }
            }
            requestAnimationFrame(step);
            counterObserver.unobserve(el);
        });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { counterObserver.observe(el); });

    /* Back to top */
    var backToTop = document.getElementById("cs-back-to-top");
    if (backToTop) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 500) {
                backToTop.classList.add("is-active");
            } else {
                backToTop.classList.remove("is-active");
            }
        });
        backToTop.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    /* Contact form (front-end only demo handler) */
    var form = document.getElementById("cs-contact-form");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            var btn = form.querySelector("button[type=submit]");
            var originalText = btn.textContent;
            btn.textContent = "Message Sent!";
            btn.disabled = true;
            var name = form.querySelector("#cs-name").value.trim();
            var email = form.querySelector("#cs-email").value.trim();
            var message = form.querySelector("#cs-message").value.trim();
            var mailto = "mailto:ranjithplus3344@gmail.com?subject=" +
                encodeURIComponent("Portfolio enquiry from " + (name || "Website Visitor")) +
                "&body=" + encodeURIComponent(message + "\n\nFrom: " + name + " (" + email + ")");
            setTimeout(function () {
                window.location.href = mailto;
                btn.textContent = originalText;
                btn.disabled = false;
                form.reset();
            }, 700);
        });
    }

    /* Current year in footer */
    var yearEl = document.getElementById("cs-year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
