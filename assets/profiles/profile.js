const gridProfiles = document.querySelector(".user-profiles");
let btnDelete;

let datas = JSON.parse(localStorage.getItem("users"));

function updateUi() {
  gridProfiles.innerHTML = "";
	datas.forEach((data, index) => {
    console.log(data);
		const template = `
      <div class="user">
        <div class="user-info">
          <img src="${data.image}" alt="" class="user-img" />
          <div class="details">
            <p class="name"><span class="label">Name: </span>${data.name}</p>
            <p class="email"><span class="label">Email: </span>${data.email}</p>
            <p class="number"><span class="label">Number: </span>${data.number}</p>
            <p class="dob"><span class="label">Date of Birth: </span>${data.date}</p>
          </div>
        </div>
        <button href="#" class="del-btn">Delete</button>
        <div>
      `;

		gridProfiles.insertAdjacentHTML("afterbegin", template);
	});

  if (datas.length===0){
    gridProfiles.innerHTML = "";
    gridProfiles.insertAdjacentHTML("afterbegin", "<p class='no-data'>No data</p>")
  }

  btnDelete = document.querySelectorAll(".del-btn");
  btnUpdate()
}

function deleteUser(index){
  const filteredData = datas.filter((data,i)=>{
    if (index!==i) return data
  })

  localStorage.setItem('users', JSON.stringify(filteredData));
  datas = filteredData;
  updateUi();
}

function btnUpdate(){
  btnDelete.forEach((btn,index)=>{
    btn.addEventListener('click', ()=>{deleteUser(index)});
    console.log(btn);
  })
}


updateUi();
