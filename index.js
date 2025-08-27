let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let createbtn = document.getElementById('createbtn');
let count = document.getElementById('count');
let category = document.getElementById('category');
let mood = "create";
let tmp;
function calculate() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = 'green';
    }
    else {
        total.innerHTML = '';
        total.style.background = 'red';
    }
}


//create function  
let datapro;

if (localStorage.getItem('product') != null) {

    datapro = JSON.parse(localStorage.getItem('product'));
}
else {
    datapro = [];
}

createbtn.onclick = function () {
    let data = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()
    }


    if (title.value != '' && price.value != '' && category.value != '' && data.count < 100) {

        if (mood === "create") {

            if (data.count > 1) {
                for (let i = 0; i < data.count; i++) {
                    datapro.push(data);
                }
            }
            else {
                datapro.push(data);
            }
            localStorage.setItem('product', JSON.stringify(datapro));


            clearform();
            display();

        }
        else {
            datapro[tmp] = data;
            mood = "create";
            count.style.display = 'block';
            createbtn.innerHTML = 'create';
            display();
            clearform();

        }

    }


}

function clearform() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

function display() {
    let table = '';
    for (let i = 0; i < datapro.length; i++) {
        table += `<tr>
        <td>${i+1}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].count}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick="update(${i})">update</button></td>
        <td><button onclick="deleteitem(${i})">delete</button></td>
        </tr>`
    }
    document.getElementById('tbody').innerHTML = table;
    let btndelete = document.getElementById('deletebtn');
    if (datapro.length > 0) {
        deletebtn.innerHTML = `<button onclick="deleteALL()" >Delete All(${datapro.length})</button>`;

    }
    else {
        deletebtn.innerHTML = '';
    }


}



function deleteitem(i) {
    datapro.splice(i, 1);
    localStorage.product = JSON.stringify(datapro);
    display();
}


function deleteALL() {
    localStorage.clear();
    datapro.splice(0);

    //deletebtn.style.display = 'none';
    display();
}
function update(i) {

    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    count.style.display = 'none';
    total.innerHTML = datapro[i].total;
    calculate();
    category.value = datapro[i].category;
    createbtn.innerHTML = 'update';
    mood = "update";
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth'
    });
    display();

}
display();

//search
let searchmood = 'title';
function searchfunction(id) {
    let search = document.getElementById('search');

    if (id == 'searchtitle') {
        searchmood = 'title';
        search.placeholder = 'search by title';
        search.value = '';
        display();
    }
    else {
        searchmood = 'category';
        search.placeholder = 'search by category';
        search.value = '';
        display();
    }

}
function searchdata(value) {
    if (searchmood == 'title') {
        let table = '';
        for (let i = 0; i < datapro.length; i++) {
            if (datapro[i].title.includes(value.toLowerCase())) {
                table += `<tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].count}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="update(${i})">update</button></td>
                <td><button onclick="deleteitem(${i})">delete</button></td>
                </tr>`
            }
        }
        document.getElementById('tbody').innerHTML = table;
    }
    else {
        let table = '';
        for (let i = 0; i < datapro.length; i++) {
            if (datapro[i].category.includes(value.toLowerCase())) {
                table += `<tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].count}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="update(${i})">update</button></td>
                <td><button onclick="deleteitem(${i})">delete</button></td>
                </tr>`
            }
        }
        document.getElementById('tbody').innerHTML = table;
    }
}

