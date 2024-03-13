const gridProfiles = document.querySelector(".user-profiles");
let btnDelete;

let datas = JSON.parse(localStorage.getItem("users"));

function updateUi() {
	datas.forEach((data, index) => {
		gridProfiles.innerHTML = "";
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
        <a href="" class="del-btn">Delete</a>
        <div>
      `;

		gridProfiles.insertAdjacentHTML("afterbegin", template);
	});

  if (datas.length===0){
    gridProfiles.innerHTML = "";
    gridProfiles.insertAdjacentHTML("afterbegin", "<p class='no-data'>No data</p>")
  }

  btnDelete = document.querySelectorAll(".del-btn");
}

function deleteUser(index){
  const filteredData = datas.filter((data,i)=>{
    if (index!==i) return data
  })

  localStorage.setItem('users', JSON.stringify(filteredData));
  datas = filteredData;
  updateUi();
}

updateUi();

btnDelete.forEach((btn,index)=>{
  btn.addEventListener('click', ()=>{deleteUser(index)});
  console.log(btn);
})

console.log(btnDelete);
