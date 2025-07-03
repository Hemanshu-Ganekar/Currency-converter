let select = document.querySelectorAll("select")
let baseurl = "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_f7mLRWbjFdQSt9Omqu5aVJJgqALLeRMdRAaDvSDK&currencies=";
let btn = document.querySelector("form button");
let fromcurr = document.querySelector("#selectFrom");
let tocurr = document.querySelector("#selectTo");
let rate;
let Msg = document.querySelector(".msg");
let amt = document.querySelector("#input");
let updateImg = (i) => {
    let country = countryList[i.value];
    console.log(country);
    let newSrc = `https://flagsapi.com/${country}/flat/64.png`;
    let img = i.parentElement.querySelector("img");
    img.src = newSrc;
}
for (let opt of select) {
    for (let countryCurrency in countryList) {

        let newOpt = document.createElement("option");
        newOpt.innerText = countryCurrency;
        newOpt.value = countryCurrency;
        opt.append(newOpt)
        if (opt.name == "from" && countryCurrency == "USD") {
            newOpt.selected = true;
        }
        if (opt.name == "to" && countryCurrency == "INR") {
            newOpt.selected = true;
        }
    }
    opt.addEventListener("change", () => {
        updateImg(opt);
    });
}
let updateMsg = () => {
    amtvalue = amt.value;
    Msg.innerHTML = `${amtvalue} ${fromcurr.value} = ${rate * amtvalue} ${tocurr.value}`;
}
btn.addEventListener("click", async (event) => {
    event.preventDefault();

    const from = fromcurr.value;
    const to = tocurr.value;
    const url = `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_f7mLRWbjFdQSt9Omqu5aVJJgqALLeRMdRAaDvSDK&base_currency=${from}&currencies=${to}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.data && data.data[to]) {
            rate = data.data[to];
            updateMsg();
        } else {
            Msg.innerHTML = "Invalid response. Please check currency codes.";
        }
    } catch (err) {
        console.error("Fetch error:", err);
        Msg.innerHTML = "Error fetching exchange rate.";
    }
});
