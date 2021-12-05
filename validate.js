const name = document.querySelector(".name");
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const cpassword = document.querySelector(".cpassword");
const aboutYourself = document.querySelector(".about-yourself");

const eye = document.querySelector(".peye");
const ceye = document.querySelector(".ceye");
const form = document.querySelector(".myform");

const done = document.querySelector(".done");
const target = document.querySelector(".target");
const written = document.querySelector(".written");

let isNameValid = false;
let isEmailValid = false;
let isPasswordValid = false;
let isCpasswordValid = false;
let isAboutYourselfValid = false;

// for error
const error = function (input, msg) {
  const parent = input.closest(".form-input");
  parent.className = "form-input error";
  parent.querySelector(".message").innerHTML = msg;
};

// for success
const success = function (input) {
  const parent = input.closest(".form-input");
  parent.className = "form-input success";
  parent.querySelector(".message").innerHTML = "";
};

// Input name
const inputName = function (input) {
  const name = input.dataset.name.toLowerCase();
  return name.replace(name[0], name[0].toUpperCase());
};
// capitaliza name
const capitalizeName = function (name) {
  const capitalize = name.value.toLowerCase().split(" ");
  return capitalize
    .map((curr) => curr.replace(curr[0], curr[0].toUpperCase()))
    .join(" ");
};
// for check field
const checkField = function (input) {
  if (input.value === "" || input.value.trim() === "") {
    error(input, `${inputName(input)} Field cannot be blank`);
    return false;
  }
  return true;
};

// for name field
const nameValidator = function (name) {
  if (!checkField(name)) return;
  if (name.value.length >= 3) {
    isNameValid = true;
    success(name);
  } else {
    isNameValid = false;
    error(name, `${inputName(name)} must be 3 character long`);
  }
};

// for email field
const emailValidator = function (email) {
  if (!checkField(email)) return;
  if (email.value.includes("@") && email.value.endsWith(".com")) {
    isEmailValid = true;
    success(email);
  } else {
    error(email, `${inputName(email)} is not valid please include @ or .com`);
  }
};

//for checking special char
const checkSpecialChar = function (value) {
  let isNumberFound;
  let isCapitalLetterFound;
  let isSmallCapitalLetterFound;
  let isSpecialCharFound;
  const special_char = ["@", "!", "#", "$", "&", "%", "*"];
  [...value].forEach((curr) => {
    const ascii = curr.charCodeAt(0);
    if (special_char.includes(curr)) {
      isSpecialCharFound = true;
    }
    if (ascii >= 65 && ascii <= 90) {
      isCapitalLetterFound = true;
    }
    if (ascii >= 48 && ascii <= 57) {
      isNumberFound = true;
    }
    if (ascii >= 97 && ascii <= 122) {
      isSmallCapitalLetterFound = true;
    }
  });
  if (
    isSmallCapitalLetterFound &&
    isSpecialCharFound &&
    isNumberFound &&
    isSmallCapitalLetterFound
  ) {
    return true;
  } else {
    return false;
  }
};

//for password field
const passwordValidator = function (password) {
  if (!checkField(password)) return;
  if (password.value.length >= 8) {
    if (checkSpecialChar(password.value)) {
      isPasswordValid = true;
      success(password);
    } else {
      error(
        password,
        `${inputName(password)}
            must contain at least 1 number,1 capital letter , 1 small letter and 1 special char between (@, !, #, $, &, %, *)`
      );
    }
  } else {
    error(password, `${inputName(password)} must be 8 character long`);
  }
};

const passwordMatchValidator = function (password1, password2) {
  if (!checkField(password2)) return;
  if (password1.value === password2.value) {
    isCpasswordValid = true;
    success(password2);
  } else {
    error(password2, `${inputName(password2)} doesn't match`);
  }
};

const isTargetDone = function (textarea) {
  const target1 = target.textContent;
  if (textarea.value.length >= target1) {
    return true;
  } else {
    return false;
  }
};
const aboutYourselfValidator = function (textarea) {
  if (!checkField(textarea)) return;
  if (isTargetDone(textarea)) {
    success(aboutYourself);
    written.style.display = "none";
    isAboutYourselfValid = true;
  } else {
    written.style.display = "block";
    error(
      textarea,
      `${inputName(textarea)} must be ${target.textContent} Character long`
    );
  }
};
// Event Handler
form.addEventListener("submit", function (e) {
  e.preventDefault();
  nameValidator(name);
  emailValidator(email);
  passwordValidator(password);
  passwordMatchValidator(password, cpassword);
  aboutYourselfValidator(aboutYourself);
  if (
    isNameValid &&
    isEmailValid &&
    isPasswordValid &&
    isCpasswordValid &&
    isAboutYourselfValid
  ) {
    localStorage.setItem("name", `${name.value}`);
    window.location = "welcome.html";
  }
});

name.addEventListener("change", function (e) {
  nameValidator(name);
  if (isNameValid) name.value = capitalizeName(name);
});
email.addEventListener("change", function (e) {
  emailValidator(email);
});
password.addEventListener("input", function (e) {
  passwordValidator(password);
});
cpassword.addEventListener("input", function (e) {
  passwordMatchValidator(password, cpassword);
});

aboutYourself.addEventListener("change", function (e) {
  aboutYourselfValidator(aboutYourself);
});

aboutYourself.addEventListener("input", function () {
  done.innerHTML = aboutYourself.value.length;
  aboutYourselfValidator(aboutYourself);
});

// For visible password
let isPasswordVisible = false;
let isCPasswordVisible = false;

eye.addEventListener("click", function (e) {
  if (isPasswordVisible) {
    password.setAttribute("type", "password");
    eye.style.color = "#c3c2c2";
    isPasswordVisible = false;
  } else {
    password.setAttribute("type", "text");
    eye.style.color = "#000";
    isPasswordVisible = true;
  }
});
ceye.addEventListener("click", function (e) {
  if (isCPasswordVisible) {
    cpassword.setAttribute("type", "password");
    ceye.style.color = "#c3c2c2";
    isCPasswordVisible = false;
  } else {
    cpassword.setAttribute("type", "text");
    ceye.style.color = "#000";
    isCPasswordVisible = true;
  }
});
