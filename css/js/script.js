/* ========================================= */
/* Free Neet */
/* script.js */
/* الجزء الأول */
/* ========================================= */

const popup = document.getElementById("orderPopup");

const closePopup = document.getElementById("closePopup");

const selectedPackage = document.getElementById("selectedPackage");

const customerNumber = document.getElementById("customerNumber");

const sendOrder = document.getElementById("sendOrder");

const packageCards = document.querySelectorAll(".package-card");

let currentCompany = "";

let currentPackage = "";

let currentPrice = "";



/* ============================= */
/* فتح نافذة الطلب */
/* ============================= */

packageCards.forEach(card=>{

card.addEventListener("click",()=>{

currentCompany = card.dataset.company || "";

currentPackage = card.dataset.package || card.querySelector("h3").innerText;

currentPrice = card.dataset.price || card.querySelector("span").innerText;

selectedPackage.innerHTML=`

<strong>${currentCompany}</strong>

<br>

${currentPackage}

<br>

💰 ${currentPrice}

`;

customerNumber.value="";

popup.classList.add("active");

customerNumber.focus();

});

});



/* ============================= */
/* غلق النافذة */
/* ============================= */

closePopup.addEventListener("click",()=>{

popup.classList.remove("active");

});



window.addEventListener("click",(e)=>{

if(e.target===popup){

popup.classList.remove("active");

}

});



/* ============================= */
/* زر ESC */
/* ============================= */

document.addEventListener("keydown",(e)=>{

if(e.key==="Escape"){

popup.classList.remove("active");

}

});



/* ============================= */
/* تأثير ضغط الكارت */
/* ============================= */

packageCards.forEach(card=>{

card.addEventListener("mousedown",()=>{

card.style.transform="scale(.97)";

});

card.addEventListener("mouseup",()=>{

card.style.transform="";

});

card.addEventListener("mouseleave",()=>{

card.style.transform="";

});

});
/* ========================================= */
/* script.js */
/* الجزء الثاني */
/* ========================================= */

/* ============================= */
/* التحقق من رقم الهاتف */
/* ============================= */

function isValidPhone(number){

const phoneRegex=/^01[0125][0-9]{8}$/;

return phoneRegex.test(number);

}



/* ============================= */
/* السماح بالأرقام فقط */
/* ============================= */

customerNumber.addEventListener("input",()=>{

customerNumber.value=customerNumber.value.replace(/\D/g,"");

if(customerNumber.value.length>11){

customerNumber.value=customerNumber.value.slice(0,11);

}

});



/* ============================= */
/* عند الضغط على Enter */
/* ============================= */

customerNumber.addEventListener("keydown",(e)=>{

if(e.key==="Enter"){

sendOrder.click();

}

});



/* ============================= */
/* تجهيز بيانات الطلب */
/* ============================= */

function buildOrderData(){

return{

company:currentCompany,

package:currentPackage,

price:currentPrice,

phone:customerNumber.value.trim(),

date:new Date().toLocaleDateString("ar-EG"),

time:new Date().toLocaleTimeString("ar-EG")

};

}



/* ============================= */
/* التحقق قبل الإرسال */
/* ============================= */

function validateOrder(){

const phone=customerNumber.value.trim();

if(phone===""){

alert("من فضلك اكتب رقم الهاتف.");

customerNumber.focus();

return false;

}

if(phone.length!==11){

alert("رقم الهاتف يجب أن يكون 11 رقم.");

customerNumber.focus();

return false;

}

if(!isValidPhone(phone)){

alert("رقم الهاتف غير صحيح.");

customerNumber.focus();

return false;

}

return true;

}
/* ========================================= */
/* script.js */
/* الجزء الثالث */
/* ========================================= */

const whatsappNumber = "201001621853";

sendOrder.addEventListener("click", () => {

    if (!validateOrder()) return;

    const order = buildOrderData();

    const message =
`🛒 طلب جديد من الموقع

📱 الرقم:
${order.phone}

📦 الشركة:
${order.company}

🎁 الباقة:
${order.package}

💰 السعر:
${order.price}

📅 التاريخ:
${order.date}

🕒 الوقت:
${order.time}`;

    const url =
`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");

    popup.classList.remove("active");

});

/* ============================= */
/* تجهيز Firebase مستقبلاً */
/* ============================= */

function saveOrderToFirebase(order){

    console.log("جاهز للإرسال إلى Firebase", order);

}

/* ============================= */
/* تنظيف البيانات */
/* ============================= */

function resetOrder(){

    customerNumber.value = "";

    currentCompany = "";

    currentPackage = "";

    currentPrice = "";

}

/* ============================= */
/* بعد غلق النافذة */
/* ============================= */

popup.addEventListener("transitionend", () => {

    if(!popup.classList.contains("active")){

        resetOrder();

    }

});

console.log("Free Neet Loaded Successfully");

