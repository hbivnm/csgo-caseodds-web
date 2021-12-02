import cases from "../data/CaseContents.js";

function docRdy(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive")
        setTimeout(fn, 1);
    else
        document.addEventListener("DOMContentLoaded", fn);
}

docRdy(() => {
    // Set random background
    let num = Math.floor(Math.random() * 21) + 1
    document.getElementsByClassName("bg-image")[0].style.backgroundImage = "url(images/backgrounds/bg_" + num + ".png)"

    // Event listeners
    document.getElementById("select-container-type").addEventListener("change", updateOdds)
    document.getElementById("select-souvenir-tier").addEventListener("change", collectionChange)
})

function updateOdds() {
    // Select container type (case, package, capsule etc.)
    let containerTypeSelect = document.getElementById("select-container-type");

    // Hide all tables
    document.getElementById("table-case").style.display = "none";

    document.getElementById("table-xray").style.display = "none";

    document.getElementById("select-souvenir-tier-wrapper").style.display = "none";
    document.getElementById("select-souvenir-tier").style.display = "none";
    document.getElementById("table-souvenir").style.display = "none";
    document.getElementById("table-pin").style.display = "none";
    
    document.getElementById("img-container").src = "";

    switch(containerTypeSelect.value) {
        case "case":
            // Show table, calculate data, insert data
            document.getElementById("table-case").style.display = "table";

            document.getElementById("img-container").src = "images/cases/casebynum/" + (Math.floor(Math.random() * 36) + 1) + ".png"

            let exceedinglyRare = 2;
            let covert = exceedinglyRare * 2.5; // 2:5
            let classified = covert * 5;        // 1:5
            let restricted = classified * 5;    // 1:5
            let milspec = restricted * 5;       // 1:5

            let total = exceedinglyRare + covert + classified + restricted + milspec;

            let exceedinglyRareProbability = exceedinglyRare / total;
            let covertProbability = covert / total;
            let classifiedProbability = classified / total;
            let restrictedProbability = restricted / total;
            let milspecProbability = milspec / total;


            document.getElementById("table-prob-exceedinglyrare").innerText = (exceedinglyRareProbability * 100).toFixed(4) + "%";
            document.getElementById("table-prob-covert").innerText = (covertProbability * 100).toFixed(4) + "%";
            document.getElementById("table-prob-classified").innerText = (classifiedProbability * 100).toFixed(4) + "%";
            document.getElementById("table-prob-restricted").innerText = (restrictedProbability * 100).toFixed(4) + "%";
            document.getElementById("table-prob-milspec").innerText = (milspecProbability * 100).toFixed(4) + "%";

            document.getElementById("table-prob-exceedinglyrare-stattrak").innerText = ((exceedinglyRareProbability * (1 / 11)) * 100).toFixed(5) + "%";
            document.getElementById("table-prob-covert-stattrak").innerText = ((covertProbability * (1 / 11)) * 100).toFixed(5) + "%";
            document.getElementById("table-prob-classified-stattrak").innerText = ((classifiedProbability * (1 / 11)) * 100).toFixed(5) + "%";
            document.getElementById("table-prob-restricted-stattrak").innerText = ((restrictedProbability * (1 / 11)) * 100).toFixed(5) + "%";
            document.getElementById("table-prob-milspec-stattrak").innerText = ((milspecProbability * (1 / 11)) * 100).toFixed(5) + "%";
            return
        case "xrayp250package":
            document.getElementById("table-xray").style.display = "table";

            document.getElementById("img-container").src = "images/cases/xrayp250package.png"

            const factorynewRange = 0.07;
            const minimalwearRange = 0.08;
            const fieldtestedRange = 0.15;
            
            let floatRange = factorynewRange + minimalwearRange + fieldtestedRange;

            document.getElementById("table-prob-factorynew").innerText = ((factorynewRange/floatRange) * 100).toFixed(3) + "%";
            document.getElementById("table-prob-minimalwear").innerText = ((minimalwearRange/floatRange) * 100).toFixed(3) + "%";
            document.getElementById("table-prob-fieldtested").innerText = ((fieldtestedRange/floatRange) * 100).toFixed(3) + "%";
            document.getElementById("table-prob-wellworn").innerText = "Not Possible";
            document.getElementById("table-prob-battlescarred").innerText = "Not Possible";

            document.getElementById("table-prob-factorynew-stattrak").innerText = (((factorynewRange/floatRange) * (1 / 11)) * 100).toFixed(3) + "%";
            document.getElementById("table-prob-minimalwear-stattrak").innerText = (((minimalwearRange/floatRange) * (1 / 11)) * 100).toFixed(3) + "%";
            document.getElementById("table-prob-fieldtested-stattrak").innerText = (((fieldtestedRange/floatRange) * (1 / 11)) * 100).toFixed(3) + "%";
            document.getElementById("table-prob-wellworn-stattrak").innerText = "Not Possible";
            document.getElementById("table-prob-battlescarred-stattrak").innerText = "Not Possible";
            return
        case "souvenirpackages":
            document.getElementById("select-souvenir-tier-wrapper").style.display = "block";
            document.getElementById("select-souvenir-tier").style.display = "block";
            document.getElementById("table-souvenir").style.display = "table";
            collectionChange()
            return
        case "pincapsules":
            document.getElementById("table-pin").style.display = "block";

            document.getElementById("img-container").src = "images/pincapsules/" + (Math.floor(Math.random() * 4) + 1) + ".png"

            let extraordinaryPin = 1;
            let exoticPin = extraordinaryPin * 2; // 1:2
            let remarkablePin = exoticPin * 2; // 1:2
            let highgradePin = remarkablePin * 2; // 1:2

            let totalPin = extraordinaryPin + exoticPin + remarkablePin + highgradePin;

            document.getElementById("table-prob-extraordinary-pin").innerText = ((extraordinaryPin / totalPin) * 100).toFixed(3);
            document.getElementById("table-prob-exotic-pin").innerText = ((exoticPin / totalPin) * 100).toFixed(3);
            document.getElementById("table-prob-remarkable-pin").innerText = ((remarkablePin / totalPin) * 100).toFixed(3);
            document.getElementById("table-prob-highgrade-pin").innerText = ((highgradePin / totalPin) * 100).toFixed(3);
            return
        case "stickercapsule":
            return
        case "autographcapsule":
            return
        default:
            return
    }
}

function updateContainerImage(imagePath) {
    let imgNode = document.getElementById("img-container")

    if (imagePath === "hide")
        imgNode.src = ""
    else if (imagePath === "random-case")
        imgNode.src = "images/cases/casebynum/" + (Math.floor(Math.random() * 36) + 1) + ".png"
    
    if (imagePath !== undefined)
        imgNode.src = "images/" + imagePath
    else
        imgNode.src = "images/cases/" + document.getElementById("select-container").value + ".png";
}

function collectionChange() {
    let souvenirTierSelect = document.getElementById("select-souvenir-tier");
    let category = souvenirTierSelect.value;

    document.getElementById("img-container").src = "images/collections/" + souvenirTierSelect.options[souvenirTierSelect.selectedIndex].text + ".png"

    switch(category) {
        case "CIM":
            let milspecCIM = 1
            let industrialgradeCIM = milspecCIM * 4.8;         // 5:24
            let consumergradeCIM = industrialgradeCIM * 5;    // 1:5

            let totalCIM = milspecCIM + industrialgradeCIM + consumergradeCIM;

            document.getElementById("table-prob-covert-souvenir").innerText = "Not Possible";
            document.getElementById("table-prob-classified-souvenir").innerText = "Not Possible";
            document.getElementById("table-prob-restricted-souvenir").innerText = "Not Possible";
            document.getElementById("table-prob-milspec-souvenir").innerText = ((milspecCIM / totalCIM) * 100).toFixed(4) + "%";
            document.getElementById("table-prob-industrialgrade-souvenir").innerText = ((industrialgradeCIM / totalCIM) * 100).toFixed(4) + "%";
            document.getElementById("table-prob-consumergrade-souvenir").innerText = ((consumergradeCIM / totalCIM) * 100).toFixed(4) + "%";
            return
        case "IMR":
            let restrictedIMR = 1
            let milspecIMR = restrictedIMR * 5;         // 1:5
            let industrialgradeIMR = milspecIMR * 4.8;    // 5:24

            let totalIMR = restrictedIMR + milspecIMR + industrialgradeIMR;

            document.getElementById("table-prob-covert-souvenir").innerText = "Not Possible";
            document.getElementById("table-prob-classified-souvenir").innerText = "Not Possible";
            document.getElementById("table-prob-restricted-souvenir").innerText = ((restrictedIMR / totalIMR) * 100).toFixed(4) + "%";
            document.getElementById("table-prob-milspec-souvenir").innerText = ((milspecIMR / totalIMR) * 100).toFixed(4) + "%";
            document.getElementById("table-prob-industrialgrade-souvenir").innerText = ((industrialgradeIMR / totalIMR) * 100).toFixed(4) + "%";
            document.getElementById("table-prob-consumergrade-souvenir").innerText = "Not Possible";
            return
        case "CIMR":
            let restrictedCIMR = 1;
            let milspecCIMR = restrictedCIMR * 5; // 1:5
            let industrialgradeCIMR = milspecCIMR * 4.8; // 5:24
            let consumergradeCIMR = industrialgradeCIMR * 5; // 1:5

            let totalCIMR = restrictedCIMR + milspecCIMR + industrialgradeCIMR + consumergradeCIMR;

            document.getElementById("table-prob-covert-souvenir").innerText = "Not Possible";
            document.getElementById("table-prob-classified-souvenir").innerText = "Not Possible";
            document.getElementById("table-prob-restricted-souvenir").innerText = ((restrictedCIMR / totalCIMR) * 100).toFixed(4) + "%";
            document.getElementById("table-prob-milspec-souvenir").innerText = ((milspecCIMR / totalCIMR) * 100).toFixed(4) + "%";
            document.getElementById("table-prob-industrialgrade-souvenir").innerText = ((industrialgradeCIMR / totalCIMR) * 100).toFixed(4) + "%";
            document.getElementById("table-prob-consumergrade-souvenir").innerText = ((consumergradeCIMR / totalCIMR) * 100).toFixed(4) + "%";
            return
        case "CIMRC":
            let classifiedCIMRC = 1;
            let restrictedCIMRC = classifiedCIMRC * 5; // 1:5
            let milspecCIMRC = restrictedCIMRC * 5; // 1:5
            let industrialgradeCIMRC = milspecCIMRC * 4.8; // 5:24
            let consumergradeCIMRC = industrialgradeCIMRC * 5; // 1:5

            let totalCIMRC = classifiedCIMRC + restrictedCIMRC + milspecCIMRC + industrialgradeCIMRC + consumergradeCIMRC;

            document.getElementById("table-prob-covert-souvenir").innerText = "Not Possible";
            document.getElementById("table-prob-classified-souvenir").innerText = ((classifiedCIMRC / totalCIMRC) * 100).toFixed(4) + "%";
            document.getElementById("table-prob-restricted-souvenir").innerText = ((restrictedCIMRC / totalCIMRC) * 100).toFixed(4) + "%";
            document.getElementById("table-prob-milspec-souvenir").innerText = ((milspecCIMRC / totalCIMRC) * 100).toFixed(4) + "%";
            document.getElementById("table-prob-industrialgrade-souvenir").innerText = ((industrialgradeCIMRC / totalCIMRC) * 100).toFixed(4) + "%";
            document.getElementById("table-prob-consumergrade-souvenir").innerText = ((consumergradeCIMRC / totalCIMRC) * 100).toFixed(4) + "%";
            return
        case "CIMRCC":
            let covertCIMRCC = 1;
            let classifiedCIMRCC = covertCIMRCC * 5; // 1:5
            let restrictedCIMRCC = classifiedCIMRCC * 5; // 1:5
            let milspecCIMRCC = restrictedCIMRCC * 5; // 1:5
            let industrialgradeCIMRCC = milspecCIMRCC * 4.8; // 5:24
            let consumergradeCIMRCC = industrialgradeCIMRCC * 5; // 1:5

            let totalCIMRCC = covertCIMRCC + classifiedCIMRCC + restrictedCIMRCC + milspecCIMRCC + industrialgradeCIMRCC + consumergradeCIMRCC;

            document.getElementById("table-prob-covert-souvenir").innerText = ((covertCIMRCC / totalCIMRCC) * 100).toFixed(4) + "%";
            document.getElementById("table-prob-classified-souvenir").innerText = ((classifiedCIMRCC / totalCIMRCC) * 100).toFixed(4) + "%";
            document.getElementById("table-prob-restricted-souvenir").innerText = ((restrictedCIMRCC / totalCIMRCC) * 100).toFixed(4) + "%";
            document.getElementById("table-prob-milspec-souvenir").innerText = ((milspecCIMRCC / totalCIMRCC) * 100).toFixed(4) + "%";
            document.getElementById("table-prob-industrialgrade-souvenir").innerText = ((industrialgradeCIMRCC / totalCIMRCC) * 100).toFixed(4) + "%";
            document.getElementById("table-prob-consumergrade-souvenir").innerText = ((consumergradeCIMRCC / totalCIMRCC) * 100).toFixed(4) + "%";
            return
        default:
            document.getElementById("img-container").src = "";
            return
    }
}