const submitBtn = document.querySelector(".btn-submit");
const nameInput = document.getElementById("name");
const mobileInput = document.getElementById("mobile-number");
const dateInput = document.getElementById("date");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const passIcon = document.querySelector(".pass-icon");
const passStrength = document.querySelector(".pass-strength");

const validateForm = (input,name,length)=>{
  if (input.value.length>length && !input.classList.contains('input-error')){
    confirm[name] = true;
  }
  else {
    confirm[name] = false;
  }

 if (confirm.nameBool && confirm.emailBool && confirm.dateBool && confirm.emailBool && confirm.passBool && confirm.numberBool){
  submitBtn.classList.remove('disabled')
 }
 else {
  submitBtn.classList.add('disabled');
 }
}

const submit = ()=>{
	!localStorage.getItem('users') && localStorage.setItem('users',JSON.stringify([]));


	if (!submitBtn.classList.contains('disabled')){
		const userDb = JSON.parse(localStorage.getItem('users'));
    const genNumber = Math.floor(Math.random()*3)+1;
		userDb.push({name: nameInput.value,number:mobileInput.value,date:dateInput.value,email:emailInput.value,password:passwordInput.value,image:`../images/dummy-${genNumber}.jpg`});
		
		localStorage.setItem('users',JSON.stringify(userDb))
    nameInput.value = "";
		dateInput.value = "";
		mobileInput.value = "";
		emailInput.value = "";
		passwordInput.value= "";
		confirm = {
			nameBool : false,
			emailBool : false,
			dateBool : false,
			emailBool : false,
			passBool: false,
			numberBool: false,
		}
		window.location.href = "assets/profiles/profile.html";
	}
}


const formValidate = (element) => {
	const checkNum = ["+", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ""];
	const checkPass = [
		"+",
		"~",
		"-",
		"#",
		"^",
		"*",
		"%",
		"$",
		"@",
		"!",
		"/",
		" ",
	];
	const selectedElement = document.querySelector(`.error.${element}`);
	let currValue;

	switch (element) {
		case "mobile-number":
			currValue = mobileInput.value;
			selectedElement.style.display = "none";
			mobileInput.classList.remove("input-error");

			for (value of currValue) {
				if (!checkNum.includes(value)) {
					displayError(selectedElement, "Please enter a valid number");
					mobileInput.classList.add("input-error");
				}
			}
      validateForm(mobileInput,'numberBool',0);

			break;

		case "date":
			currValue = dateInput.value;

			if (Number(currValue.split("-")[0]) > 2022 || currValue=="" || Number(currValue.split("-")[0]) < 1000) {
					displayError(selectedElement, "Please enter a valid date");
					dateInput.classList.add("input-error");
				}
			
			else {
				clearError(dateInput,selectedElement);
			} 
      validateForm(dateInput,'dateBool',0);
			break;
			

		case "email":
			currValue = emailInput.value.split("@");

			if (currValue.length < 2 && currValue[0] !== "") {
				displayError(selectedElement, "Must include @");
				emailInput.classList.add("input-error");
			} else if (currValue.length > 1 && !currValue[1].includes(".")) {
				displayError(selectedElement, "Please enter a valid email domain");
				emailInput.classList.add("input-error");
			}
			else {
				clearError(emailInput,selectedElement);
			}

      validateForm(emailInput,'emailBool',0);
			break;

		case "password":
			currValue = passwordInput.value;
			let passCount = 0;

			for (index in currValue) {
				checkPass.includes(currValue[index]) ? (passCount += 15) : passCount;
				currValue[index] === currValue[index].toUpperCase()
					? (passCount += 10)
					: passCount;

				if (index > 0) {
					currValue[index - 1] === currValue[index]
						? (passCount += 3)
						: (passCount += 7);
				}
			}
      
      if (passCount<80){
        passStrength.style.backgroundColor = 'red';
        selectedElement.style.color="red";
        displayError(selectedElement,'weak');
      }

      else if (passCount<180){
        passStrength.style.backgroundColor = 'orange';
        selectedElement.style.color="orange";
        displayError(selectedElement,'medium');
      }

      else {
        passStrength.style.backgroundColor = 'green';
        selectedElement.style.color="green";
        displayError(selectedElement,'secure');
      }

      passCount === 0 ? selectedElement.style.display = "none": '';
			passStrength.style.width = passCount > 379 ? "380px" : `${passCount}px`;
      validateForm(passwordInput,'passBool',4)
      break;
    
    case 'name':
      if (Number(nameInput.value)){
        displayError(selectedElement,'Please enter a valid name')
        nameInput.classList.add('input-error')
      }
			else {
				clearError(nameInput,selectedElement)
			}
      validateForm(nameInput,'nameBool',0)
      break;
	}
};

const displayError = (selectedElement, message) => {
	selectedElement.textContent = message;
	selectedElement.style.display = "block";
};

const clearError = (element, errorElement) => {
	element.classList.remove("input-error");
	errorElement.style.display = "none";
};


let confirm = {
  nameBool : false,
  emailBool : false,
  dateBool : false,
  emailBool : false,
  passBool: false,
  numberBool: false,
}

mobileInput.addEventListener("input", () => {
	formValidate("mobile-number");
});


dateInput.addEventListener("input", () => {
	formValidate("date");
});

passwordInput.addEventListener("input", () => {
	formValidate("password");
});
let checkPassVisible =false;
passIcon.addEventListener("click", () => {
	checkPassVisible ? passwordInput.type='password' : passwordInput.type="text";
  checkPassVisible ? passIcon.setAttribute('src','assets/images/eye-regular.svg'): passIcon.setAttribute('src','assets/images/eye-slash-regular.svg');
  checkPassVisible ? checkPassVisible = false: checkPassVisible=true;
});


emailInput.addEventListener("input", () => {
	formValidate("email");
});

nameInput.addEventListener("input", () => {
	formValidate("name");
});

submitBtn.addEventListener('click', submit);
