const title = document.getElementById("title");
const price = document.getElementById("price");
const taxes = document.getElementById("taxes");
const ads = document.getElementById("ads");
const discount = document.getElementById("discount");
const total = document.getElementById("total");
const count = document.getElementById("count");
const cat = document.getElementById("cat");
const submit = document.getElementById("submit");
let mood = "Create";
let temp;

// get total price;
const getTotal = () => {
  if (price.value !== "") {
    const result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "#040";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "#3f3f3f";
  }
};

// create product & save to localStorage;
let dataProducts;
if (localStorage.getItem("Products") !== null)
  dataProducts = JSON.parse(localStorage.getItem("Products"));
else dataProducts = [];

submit.onclick = () => {
  let newProduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: cat.value.toLowerCase(),
  };

  if (
    title.value &&
    price.value &&
    taxes.value &&
    ads.value &&
    discount.value &&
    count.value < 50 &&
    cat.value
  ) {
    if (mood === "Create") {
      if (newProduct.count > 1) {
        for (let i = 0; i < newProduct.count; i++) {
          dataProducts.push(newProduct);
        }
      } else dataProducts.push(newProduct);
    } else {
      dataProducts[temp] = newProduct;
      mood = "Create";
      submit.innerHTML = "Create";
      count.style.display = "block";
    }
    clearData();
  }

  localStorage.setItem("Products", JSON.stringify(dataProducts));
  console.log(dataProducts);
  showData();
};

// clear inputs;
const clearData = () => {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  cat.value = "";
};

// read / show data;
const showData = () => {
  getTotal();
  let table = "";
  dataProducts.map(
    (eachProduct, index) =>
      (table += `<tr>
          <td>${index + 1}</td>
          <td>${eachProduct.title}</td>
          <td>${eachProduct.price}</td>
          <td>${eachProduct.taxes}</td>
          <td>${eachProduct.ads}</td>
          <td>${eachProduct.discount}</td>
          <td>${eachProduct.total}</td>
          <td>${eachProduct.category}</td>
          <td>
            <button id="update" onclick="updateData(${index})">Update</button>
          </td>
          <td>
            <button id="delete" onclick="deleteData(${index})">Delete</button>
          </td>
          </tr>`)
  );
  document.getElementById("tBody").innerHTML = table;

  let btnDleteAll = document.getElementById("deleteAll");
  if (dataProducts.length > 0)
    btnDleteAll.innerHTML = `<button id="btnDeleteAll" onclick="deleteAllData()">Delete All (${dataProducts.length})</button>`;
  else btnDleteAll.innerHTML = "";
};
showData();

// delete;
const deleteData = (index) => {
  dataProducts.splice(index, 1);
  localStorage.Products = JSON.stringify(dataProducts);
  showData();
};

// delete all;
const deleteAllData = () => {
  localStorage.clear();
  dataProducts.splice(0);
  showData();
};

// upddate;
const updateData = (index) => {
  title.value = dataProducts[index].title;
  price.value = dataProducts[index].price;
  taxes.value = dataProducts[index].taxes;
  ads.value = dataProducts[index].ads;
  discount.value = dataProducts[index].discount;
  count.style.display = "none";
  cat.value = dataProducts[index].category;
  getTotal();
  submit.innerHTML = "Update";
  mood = "Update";
  temp = index;
  scroll({
    top: 0,
    behavior: "smooth",
  });
};

// search;
let searchMood = "Title";
const getSearchMood = (id) => {
  let search = document.getElementById("search");
  if (id === "searchTitle") searchMood = "Title";
  else searchMood = "Category";

  search.placeholder = "Search by " + searchMood;
  search.focus();
  search.value = "";
  showData();
  console.log(searchMood);
};

const searchData = (val) => {
  let table = "";

  for (let i = 0; i < dataProducts.length; i++) {
    if (searchMood === "title") {
      if (dataProducts[i].title.includes(val.toLowerCase())) {
        table += `<tr>
     <td>${i + 1}</td>
     <td>${dataProducts[i].title}</td>
     <td>${dataProducts[i].price}</td>
     <td>${dataProducts[i].taxes}</td>
     <td>${dataProducts[i].ads}</td>
     <td>${dataProducts[i].discount}</td>
     <td>${dataProducts[i].total}</td>
     <td>${dataProducts[i].category}</td>
     <td>
       <button id="update" onclick="updateData(${i})">Update</button>
     </td>
     <td>
       <button id="delete" onclick="deleteData(${i})">Delete</button>
     </td>
     </tr>`;
      }
    } else {
      if (dataProducts[i].category.includes(val.toLowerCase())) {
        table += `<tr>
     <td>${i + 1}</td>
     <td>${dataProducts[i].title}</td>
     <td>${dataProducts[i].price}</td>
     <td>${dataProducts[i].taxes}</td>
     <td>${dataProducts[i].ads}</td>
     <td>${dataProducts[i].discount}</td>
     <td>${dataProducts[i].total}</td>
     <td>${dataProducts[i].category}</td>
     <td>
       <button id="update" onclick="updateData(${i})">Update</button>
     </td>
     <td>
       <button id="delete" onclick="deleteData(${i})">Delete</button>
     </td>
     </tr>`;
      }
    }
  }
  document.getElementById("tBody").innerHTML = table;
};
