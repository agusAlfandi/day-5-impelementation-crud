function ContacMe() {
  let name = document.getElementById("fullname").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let subject = document.getElementById("subject").value;
  let message = document.getElementById("description").value;

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
