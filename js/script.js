// ==================================================
// 1. CLASS OPTIONS & SHARED BOOKING STATE
// ==================================================
var C = [["Basic Stitching", "Beginners"], ["Blouse & Kurti Cutting", "Intermediate"], ["Advanced Designing", "Boutique skills"]];
var st =  {
    c: 1
}, WA = "916307132059";
var $ = function(i) {
    return document.getElementById(i)
};
// ==================================================
// 2. FORM VALUE HELPERS & WHATSAPP MESSAGE
// ==================================================
function val(i) {
    return $(i).value.trim()
}
function qv() {
    var r = document.querySelector("input[name=q]:checked");
    return r?r.value: ""
}
function msg() {
    return "Hello Archu Style, I want to book a seat.\nName: " + val("nm") + "\nPhone: " + val("ph") + "\nAddress: " + val("ad") + "\nAge: " + val("ag") + "\nGender: " + $("gn").value + "\nClass: " + C[st.c][0] + "\nTiming: 11 AM to 3 PM\nQuestion: " + (qv() === "yes"?val("qt"): "No questions")
}
function wa() {
    var u = "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg());
    $("ok").href = u;
    $("mw").href = u
}
function ready() {
    var v = qv();
    return v === "no" || (v === "yes" && val("qt").length >= 3)
}
// ==================================================
// 3. QUESTION FIELD & BOOKING CONFIRMATION STATE
// ==================================================
function sync() {
    var v = qv(), ok = ready(), t = "";
    $("qBox").hidden = v !== "yes";
    $("ok").setAttribute("aria-disabled", ok?"false": "true");
    $("ok").classList.toggle("dis", ! ok);
    if(v === "")t = "Please choose Yes or No under “Do you have any questions?” to confirm.";
    else if( ! ok)t = "Please type your question to confirm.";
    $("cn").textContent = t;
    $("cn").hidden = t === "";
    wa()
}
// ==================================================
// 4. RENDER CLASS OPTIONS & HANDLE CLASS SELECTION
// ==================================================
function draw() {
    $("cls").innerHTML = C.map(function(x, i) {
        return '<button type="button" class="pick" data-c="' + i + '" aria-pressed="' + (i == st.c) + '"><b>' + x[0].replace("&", "&amp;") + '</b><small>' + x[1] + ' · 11 AM to 3 PM</small></button>'
    }).join("");
    $("sum").textContent = "Class: " + C[st.c][0] + " · 11 AM to 3 PM";
    sync()
}
document.querySelectorAll("input[name=q]").forEach(function(r) {
    r.addEventListener("change", sync)
});
["nm", "ph", "ad", "ag", "qt"].forEach(function(i) {
    $(i).addEventListener("input", sync)
});
$("gn").addEventListener("change", sync);
document.addEventListener("click", function(e) {
    var a = e.target.closest("[data-pick]");if(a) {
        st.c =  + a.dataset.pick;draw()
    }
    var t = e.target.closest("button");if(t && t.dataset.c !== undefined) {
        st.c =  + t.dataset.c;draw()
    }
});
// ==================================================
// 5. RESET FORM & CLOSE BOOKING DIALOG
// ==================================================
function closeM() {
    $("md").hidden = true;
    ["nm", "ph", "ad", "ag", "gn", "qt"].forEach(function(i) {
        $(i).value = ""
    });
    document.querySelectorAll("input[name=q]").forEach(function(r) {
        r.checked = false
    });
    $("err").textContent = "";
    draw()
}
$("ok").addEventListener("click", function(e) {
    if($("ok").getAttribute("aria-disabled") === "true") {
        e.preventDefault();$("cn").hidden = false;return
    }
    var n = val("nm"), p = val("ph"), a = val("ad"), g =  + val("ag"), s = $("gn").value, m = "";
    if(n.length < 2)m = "Please enter your name.";
    else if( ! /^\d{10}$/.test(p))m = "Please enter a 10-digit mobile number.";
    else if(a.length < 5)m = "Please enter your address.";
    else if( ! (g >= 5 && g <= 80))m = "Please enter a valid age.";
    else if( ! s)m = "Please select gender.";
    $("err").textContent = m;if(m) {
        e.preventDefault();return
    }
    wa();
    $("mp").textContent = n + ", your booking details" + (qv() === "yes"?" and question": "") + " are ready in WhatsApp. Press Send there to deliver them to our team.";
    setTimeout// ==================================================
    // 9. OPEN SOCIAL LINKS IN ANDROID APPS WHEN SUPPORTED
    // ==================================================
    (function() {
        $("md").hidden = false;$("mo").focus()
    }, 450)
});
$("mo").onclick = closeM;
document.addEventListener("keydown", function(e) {
    if(e.key === "Escape" &&  ! $("md").hidden)closeM()
});
// ==================================================
// 6. CLASS CAROUSEL & MOBILE CARD EFFECTS
// ==================================================
var CS = $("cs"), DT = document.querySelectorAll("#cd button");
function cw() {
    return CS.children[0].offsetWidth + 14
}
function cdot() {
    var i = Math.min(2, Math.max(0, Math.round(CS.scrollLeft/cw())));
    DT.forEach(function(d, k) {
        d.classList.toggle("on", k === i)
    })
}
CS.addEventListener("scroll", cdot, {
    passive: true
});
DT.forEach(function(d, k) {
    d.onclick = function() {
        CS.scrollTo({
            left: k * cw(), behavior: "smooth"
        })
    }
});
var HI = document.querySelector(".hi");
document.querySelectorAll(".cai:not(.own),.fi:not(.own)").forEach(function(a) {
    a.style.backgroundImage = 'url("' + HI.src + '")'
});
var MQ = window.matchMedia("(max-width:760px)"), raf = 0;
function cz() {
    raf = 0;
    var r = CS.getBoundingClientRect(), m = r.left + r.width/2;
    Array.prototype.forEach.call(CS.children, function(c) {
        if( ! MQ.matches) {
            c.style.transform = "";c.style.opacity = "";return
        }
        var b = c.getBoundingClientRect(), d = Math.min(Math.abs(b.left + b.width/2 - m)/b.width, 1);
        c.style.transform = "scale(" + (1 - d * 0.14).toFixed(3) + ")";c.style.opacity = (1 - d * 0.45).toFixed(3)
    })
}
function czq() {
    if( ! raf)raf = requestAnimationFrame(cz)
}
CS.addEventListener("scroll", czq, {
    passive: true
});
window.addEventListener("resize", czq);
window.addEventListener("load", czq);
cz();
// ==================================================
// 7. HOW-IT-WORKS TIMELINE SCROLL ANIMATION
// ==================================================
var TL = $("tl"), STP = TL.querySelectorAll(".st"), pv = 0, pt = 0, tk = false, LB = "", VM = window.matchMedia("(max-width:760px)"), RM = window.matchMedia("(prefers-reduced-motion:reduce)"), TH = [0.004, 0.5, 0.985];
function tgt() {
    var vh = window.innerHeight, r = TL.getBoundingClientRect(), p;
    if(VM.matches) {
        var a = STP[0].querySelector(".ic").getBoundingClientRect(), z = STP[2].querySelector(".ic").getBoundingClientRect(), y0 = a.top + a.height/2, y1 = z.top + z.height/2;
        var lb = Math.round(r.bottom - y1);
        if(lb !== LB) {
            LB = lb;
            TL.style.setProperty("--lb", lb + "px")
        }
        p = (vh * 0.62 - y0)/(y1 - y0)
    }
    else {
        if(LB !== "") {
            LB = "";
            TL.style.removeProperty("--lb")
        }
        p = (vh * 0.85 - r.top)/(vh * 0.55)
    }
    return Math.max(0, Math.min(1, p))
}
function fr() {
    pt = tgt();
    pv = RM.matches?pt: pv + (pt - pv) * 0.12;
    if(Math.abs(pt - pv) < 0.0015)pv = pt;
    TL.style.setProperty("--p", pv.toFixed(4));
    TL.classList.toggle("live", pv > 0.004 && pv < 0.995);
    STP.forEach(function(s, i) {
        s.classList.toggle("on", pv >= TH[i])
    });
    if(pv !== pt)requestAnimationFrame(fr);
    else tk = false
}
function kick() {
    if( ! tk) {
        tk = true;
        requestAnimationFrame(fr)
    }
}
window.addEventListener("scroll", kick, {
    passive: true
});
window.addEventListener("resize", kick);
window.addEventListener("load", kick);
setTimeout(kick, 900);
kick();
// ==================================================
// 8. CONTACT SECTION REVEAL
// ==================================================
var CT = $("ctw");
if("IntersectionObserver" in window) {
    var io3 = new IntersectionObserver(function(es) {
        es.forEach(function(e) {
            if(e.isIntersecting) {
                CT.classList.add("go");io3.disconnect()
            }
        })
    }, {
        threshold: .2
    });
    io3.observe(CT)
}
else {
    CT.classList.add("go")
}
(function() {
    var ua = navigator.userAgent || "";
    var okAndroid = /Android/i.test(ua) && /Chrome\//.test(ua)&&!/; wv\)|FBAN|FBAV|Instagram|Line\/|Firefox/i.test(ua);
    if( ! okAndroid)return;
    function it(host, path, pkg, web) {
        return "intent://" + host + path + "#Intent;package=" + pkg + ";scheme=https;S.browser_fallback_url=" + encodeURIComponent(web) + ";end"
    }
    document.querySelectorAll('a[href*="instagram.com/archu_style"]').forEach(function(a) {
        a.href = it("instagram.com", "/_u/archu_style", "com.instagram.android", "https://www.instagram.com/archu_style")
    });
    document.querySelectorAll('a[href*="youtube.com/@archu_style"]').forEach(function(a) {
        a.href = it("www.youtube.com", "/@archu_style", "com.google.android.youtube", "https://youtube.com/@archu_style")
    });
})();
cdot();
sync();
// ==================================================
// 10. MOBILE MENU, ACTIVE NAVIGATION & HEADER STATE
// ==================================================
var L = $("links"), M = $("menu");
function tog(o) {
    $("bd").classList.toggle("open", o);
    L.classList.toggle("open", o);
    M.setAttribute("aria-expanded", o);
    M.setAttribute("aria-label", o?"Close menu": "Open menu")
}
M.onclick = function() {
    tog( ! L.classList.contains("open"))
};
L.addEventListener("click", function(e) {
    if(e.target.closest("a"))tog(false)
});
document.addEventListener("keydown", function(e) {
    if(e.key === "Escape")tog(false)
});
var ids = ["about", "classes", "how", "book", "follow", "contact"];
function spy() {
    var y = window.scrollY + 120, cur = "";
    ids.forEach(function(i) {
        if($(i).offsetTop <= y)cur = i
    });
    L.querySelectorAll("a").forEach(function(a) {
        var on = a.getAttribute("href") === "#" + cur;a.classList.toggle("on", on);if(on)a.setAttribute("aria-current", "true");else a.removeAttribute("aria-current")
    })
}
window.addEventListener("scroll", spy, {
    passive: true
});
window.addEventListener("resize", function() {
    if(window.innerWidth > 1000)tog(false)
});
spy();
var H = document.querySelector("header");
function sc() {
    H.classList.toggle("sc", window.scrollY > 8)
}
window.addEventListener("scroll", sc, {
    passive: true
});
sc();
document.querySelectorAll("#classes .card,#how .card,#contact .card").forEach(function(c) {
    c.classList.add("hv")
});
// ==================================================
// 11. SCROLL-REVEAL ANIMATIONS
// ==================================================
var T = [];
document.querySelectorAll("section:not(.hero) .w").forEach(function(w) {
    Array.prototype.forEach.call(w.children, function(c) {
        var k = (c.classList.contains("g") || c.classList.contains("fg"))?Array.prototype.slice.call(c.children): [c];
        k.forEach(function(e, i) {
            if(e.hidden)return;e.classList.add("rv");e.style.setProperty("--d", (i * 0.1) + "s");T.push(e)
        })
    })
});
function show(e) {
    e.classList.add("in");
    var d = function(ev) {
        if(ev.propertyName === "opacity") {
            e.classList.remove("rv", "in");
            e.style.removeProperty("--d");
            e.removeEventListener("transitionend", d)
        }
    };
    e.addEventListener("transitionend", d)
}
if("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function(es) {
        es.forEach(function(x) {
            if(x.isIntersecting) {
                show(x.target);io.unobserve(x.target)
            }
        })
    }, {
        threshold: .12, rootMargin: "0px 0px -6% 0px"
    });
    T.forEach(function(e) {
        io.observe(e)
    })
}
else {
    T.forEach(show)
}
var TB = document.querySelectorAll(".tb a"), TBX = document.querySelector(".tb"), lock = false, lt;
var TI =  {
    top: 0, classes: 1, about: 2, book: 3, contact: 4
};
function setTab(cur) {
    TB.forEach(function(a) {
        var on = a.getAttribute("href") === "#" + cur;a.classList.toggle("on", on);if(on)a.setAttribute("aria-current", "true");else a.removeAttribute("aria-current")
    });
    TBX.style.setProperty("--i", TI[cur] || 0)
}
function spy2() {
    if(lock) {
        clearTimeout(lt);
        lt = setTimeout(function() {
            lock = false;spy2()
        }, 160);
        return
    }
    var y = window.scrollY + 120, cur = "top";
    ["about", "classes", "how", "book", "follow", "contact"].forEach(function(i) {
        if($(i).offsetTop <= y)cur = i
    });
    cur = ({
        how: "classes", follow: "contact"
    })[cur] || cur;
    if(window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4)cur = "contact";
    setTab(cur)
}
TB.forEach(function(a) {
    a.addEventListener("click", function() {
        lock = true;setTab(a.getAttribute("href").slice(1));clearTimeout(lt);lt = setTimeout(function() {
            lock = false;spy2()
        }, 800)
    })
});
window.addEventListener("scroll", spy2, {
    passive: true
});
spy2();
$("bd").onclick = function() {
    tog(false)
};
if("IntersectionObserver" in window) {
    new IntersectionObserver(function(es) {
        es.forEach(function(e) {
            TBX.classList.toggle("hide", e.isIntersecting)
        })
    }, {
        threshold: 0
    }).observe(document.querySelector("footer"))
}
draw();
