document.querySelector("button").onclick = function() {
    let name = document.querySelector(".name");
    let phone = document.querySelector(".phone");
    let mail = document.querySelector(".email");
    let comment = document.querySelector(".coment");

    checkAttr(name.value, /[A-Z]{1}[a-z]+/g, ".name");

    checkAttr(mail.value, /^[a-z]{2,6}(\-[a-z]{4})?(\.[a-z]{4})?@[a-z]{4}\.[a-z]{2}$/, ".email");

    checkAttr(phone.value, /^[+]{1}[0-9]{1}[(]{1}[0-9]{3}[)]{1}[0-9]{3}[-]{1}[0-9]{4}$/, ".phone");

    checkAttr(comment.value, /[a-zA-Z]+/, ".coment");



    }
    


function checkAttr(value, regexp, id) {
    const regexp1 =  regexp;
    if (!regexp1.test(value)) {
        document.querySelector(id).style.borderColor ="red";
    } else document.querySelector(id).style.borderColor ="green";
}