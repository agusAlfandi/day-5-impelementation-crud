function ContacMe() {
  let name = document.getElementById("input-full-name").value;
  let email = document.getElementById("input-email").value;
  let phone = document.getElementById("phone").value;
  let subject = document.getElementById("input-subject").value;
  let message = document.getElementById("desc-contact-me").value;

  //   console.log(name);
  //   console.log(email);
  //   console.log(phone);
  //   console.log(subject);
  //   console.log(message);

  if (name == "") {
    return alert("Opps nama tidak boleh kosong");
  } else if (email == "") {
    return alert("Opps email juga tidak boleh kosong");
  } else if (phone == "") {
    return alert("Opps phone juga tidak boleh kosong");
  } else if (subject == "") {
    return alert("Opps subject juga tidak boleh kosong");
  } else if (message == "") {
    return alert("Opps message juga tidak boleh kosong");
  }
  const emailReciver = "agusalfandi8@gmail.com";
  const a = document.createElement("a");

  a.href = `mailto: ${emailReciver}?subject= ${subject}&body= Hello my name ${name}, ${subject}, ${message}, may phone number ${phone}`;
  a.target = "_blank";
  a.click();
}
