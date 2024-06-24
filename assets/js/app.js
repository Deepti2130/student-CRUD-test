const cl = console.log;

const stdform = document.getElementById("stdform");
const fnameControls = document.getElementById("fname");
const lnameControls = document.getElementById("lname");
const emailControls = document.getElementById("email");
const contactControls = document.getElementById("contact");
const submitbtn = document.getElementById("submitbtn");
const updatebtn = document.getElementById("updatebtn");
const stdcontainer = document.getElementById("stdcontainer");
const nostd = document.getElementById("nostd");



//But after refreshing the data will be gone, hence we need templating//

const templatingofstd = (arr) =>{
    let result = " ";

    arr.forEach ((std, i) =>{
    
      result +=         `<tr id="${std.stdId}">
                            <td>${i+1}</td>
                            <td>${std.fname}</td>
                            <td>${std.lname}</td>
                            <td>${std.email}</td>
                            <td>${std.contact}</td>
                            <td>
                            <button class="btn btn-primary" onclick="onEdit(this)">Edit</button>
                            </td>
                            <td>
                            <button class="btn btn-danger" onclick="onRemove(this)">Remove</button>
                            </td>
                        </tr>`
    
    })
    stdcontainer.innerHTML = result;  

}
let stdArr = JSON.parse(localStorage.getItem(`stdArr`)) || [];
if(stdArr.length > 0){
    templatingofstd(stdArr);
}else{
    stdcontainer.closest(`table`).classList.add(`d-none`);
    nostd.classList.remove(`d-none`);
}



const generateUuid = () => {
    return (
        String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
        const random = (Math.random() * 16) | 0;
        const value = character === "x" ? random : (random & 0x3) | 0x8;

        return value.toString(16);
    });
};


const onEdit = (ele) => {
    let editId = ele.closest("tr").id;

    localStorage.setItem(`editId`,editId);

    let getobj = stdArr.find(std => std.stdId === editId);
    // cl(getobj);

    //patch the data//
    fnameControls.value = getobj.fname;
    lnameControls.value = getobj.lname;
    emailControls.value = getobj.email;
    contactControls.value=getobj.contact

    submitbtn.classList.add(`d-none`);
    updatebtn.classList.remove(`d-none`);
}

 
const onupdate = () =>{
 let updateId = localStorage.getItem('editId');
 //cl(updateId);

 let updatedobj = {
    fname:fnameControls.value,
    lname:lnameControls.value,
    email:emailControls.value,
    contact:contactControls.value,
    stdId:updateId
 }

 let getIndex = stdArr.findIndex(std=> std.stdId === updateId);
 cl(getIndex);

 stdArr[getIndex] = updatedobj;

 localStorage.setItem(`stdArr`, JSON.stringify(stdArr));

 let tr = [...document.getElementById(updateId).children]
 //cl(tr);

 tr[1].innerHTML = updatedobj.fname;
 tr[2].innerHTML = updatedobj.lname;
 tr[3].innerHTML = updatedobj.email;
 tr[4].innerHTML = updatedobj.contact;

submitbtn.classList.remove(`d-none`);
updatebtn.classList.add(`d-none`);

swal.fire({
    title:`The student ${updateId} data is updated successfully `,
    timer:2500,
    icon:"success"
})

stdform.reset()

} 

const onRemove = (ele) => {
    let getconfirmation = confirm(`are you sure you want to remove the data?`);

    let removeId = ele.closest("tr").id;

    let getIndex = stdArr.findIndex(std => std.stdId === removeId);

    stdArr.splice(getIndex,1);

    localStorage.setItem(`stdArr`, JSON.stringify(stdArr));

    ele.closest("tr").remove()

    swal.fire({
        title:`The student ${removeId} data is remove successfully `,
        timer:2500,
        icon:"success"
    })

}



const onstdAdd = (eve) => { // callback function
 eve.preventDefault()
//  cl(`submitted!!!`)

//to create a object//
let newstd = {
    fname:fnameControls.value,
    lname:lnameControls.value,
    email:emailControls.value,
    contact:contactControls.value,
    stdId:generateUuid()
}

//the data push in array//
stdArr.push(newstd);

stdcontainer.closest(`table`).classList.remove(`d-none`);
nostd.classList.add(`d-none`);

//the data store in LS//
localStorage.setItem(`stdArr`, JSON.stringify(stdArr));

//templating of array//
// templatingofstd(stdArr);//recreate the data hence we need the refactor//

let tr = document.createElement("tr");

tr.id = newstd.stdId;

tr.innerHTML =         `<tr>
                            <td>${stdArr.length}</td>
                            <td>${newstd.fname}</td>
                            <td>${newstd.lname}</td>
                            <td>${newstd.email}</td>
                            <td>${newstd.contact}</td>
                            <td>
                            <button class="btn btn-primary" onclick="onEdit(this)">Edit</button>
                            </td>
                            <td>
                            <button class="btn btn-danger" onclick="onRemove(this)">Remove</button>
                            </td>
                        </tr>`

stdcontainer.append(tr)

stdform.reset()

swal.fire({
    title:`The student ${newstd.fname} ${newstd.lname} data is added successfully `,
    timer:2500,
    icon:"success"
})
}








stdform.addEventListener("submit", onstdAdd);
updatebtn.addEventListener("click", onupdate);