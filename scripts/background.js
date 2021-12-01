function documentReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive")
        setTimeout(fn, 1);
    else
        document.addEventListener("DOMContentLoaded", fn);
}

documentReady(() => {
    let num = Math.floor(Math.random() * 14) + 1
    document.getElementsByClassName("bg-image")[0].style.backgroundImage = "url(images/backgrounds/bg_" + num + ".png)"
})