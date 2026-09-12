import decode from "./tokendecode.js"
import { authBari } from "./barear.js";
import baseUrl from "./baseUrl.js"
const form = document.getElementById("fom")
form.classList.add("hide")
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const searchInput = document.getElementById("searchInput");
const payload = decode()
const authCheck = async ()=>{
  const token = localStorage.getItem("AUTHtoken")
  if(!token){
    return location.replace("login.html")
  }
}

authCheck()

const userName = document.querySelector("#userName")
userName.innerHTML= payload.name;
const h1heding =document.querySelector("#h1heding").innerHTML=`Wlcome to ${payload.name}`


function toggleMenu() {
  sidebar.classList.toggle("open");
  overlay.classList.toggle("show");
}



document.querySelector(".upgrade button").addEventListener("click", () => {
  alert("Upgrade feature coming soon!");
});

document.querySelector(".floating-cart").addEventListener("click", () => {
  alert("Your cart has 2 items.");
});

document.getElementById("profileBtn").addEventListener("click", () => {
  alert("Profile menu coming soon!");
});


const showForm=()=>{
  form.classList.remove("hide")
  form.innerHTML =`  <div class="product-form">

    <h2>Create Product</h2>
    <p class="form-subtitle">Enter your product details</p>

    <div class="form-group">
      <input
        type="text"
        id="title"
        name="title"
        placeholder="Enter product title"
        required
      >
    </div>

    <div class="form-group">
      <textarea
        id="des"
        name="description"
        placeholder="Enter product description"
        rows="5"
        required
      ></textarea>
    </div>

    <div class="form-group">
      <input
        type="number"
        id="price"
        name="price"
        placeholder="Enter product price"
        required
      >
    </div>

    <div class="form-group">
      <select id="condition" name="condition" required>
        <option value="">Select condition</option>
        <option value="new">New</option>
        <option value="used">Used</option>
      </select>
    </div>

    <div class="form-group">
      <input
        type="text"
        id="location"
        name="location"
        placeholder="Enter your location"
        required
      >
    </div>

    <div class="form-group">
      <input
        type="file"
        id="image"
        name="image"
        accept="image/*"
        required
      >
    </div>

    <button onclick="createProduct()" class="create-btn">
      Create Product
    </button>

  </div>`
}


const createProduct =async ()=>{
  try {
  const title = document.getElementById("title").value
  const des = document.getElementById("des").value
  const price = document.getElementById("price").value
  const condition = document.getElementById("condition").value
  const location = document.getElementById("location").value
  const image = document.getElementById("image").files[0]
  const token = authBari()

  if(!title || ! des || !price || !condition || !location || !image || !token){
  return alert("required filed or missing")
  }
const formData = new FormData();

formData.append("title",title)
formData.append("des",des)
formData.append("price",price)
formData.append("condition",condition)
formData.append("location",location)
formData.append("image",image)

 
  const data = await fetch(`${baseUrl}/create_product` ,{
    method:"POST",
    headers:{
      "Authorization":token,
    },
    body:formData
  }).then(data=>data.json())

  if(data.status){
    alert(data.message)
  }


  } catch (error) {
    console.log(error.message)
    // alert(data.message)
  }
  form.innerHTML="";
  form.classList.add("hide");
allProduct()
}

let products;

const allProduct =async ()=>{
  try {
    const token = authBari()
    console.log(payload.userId)
    const responce = await fetch(`${baseUrl}/get_AllProduct?userId=${payload.userId}`,{
      headers:{
        "Authorization":token
      }
    }).then(responce=>responce.json())

if(responce.status){
  console.log(responce)
  products = responce.products
  renderProducts()
}else{
  console.log(responce.message, responce)
}

  } catch (error) {
    console.log(error.message)
  }
}

allProduct()

const grid = document.getElementById("productGrid");




const renderProducts = () => {
 const parent = document.getElementById("products")
  parent.innerHTML = products.map((p, index) => `
    <article class="product" style="animation-delay:${index * 50}ms">
      <div class="product-img">
        ${p.title ? `<span class="tag">${p.title}</span>` : ""}
        <button class="heart" onclick="toggleHeart(this)">♡</button>
        <img src="${p.UrlImage}" alt="${p.title}">
      </div>
      <div class="product-info">
        <span class="category-name">${p.des}</span>
        <h3>${p.title}</h3>
        <div class="price">${p.price}</div>
        <div class="rating">★ ${p.rating} <span>(${p.reviews})</span></div>
        <div class="btn_con">
        <button class="order-btn" id="${p._id}" onclick="editTodo(this)">edit</button>
        <button class="order-btn" id="${p._id}" onclick="deletTodo(this)">Delete</button> 
        </div>
      </div>
    </article>
  `).join("");

  
}


const deletTodo =async (elm)=>{
  try {
    const id = elm.id
  const token = authBari()
    const responce = await fetch(`${baseUrl}/productDelet/${id}`,
      {
        method:"delete",
        headers:{
          "Authorization":token
        }
      }
    ).then(responce =>responce.json())


    if(responce.status){
      allProduct()
      alert(responce.message)
    }else{
      console.log(responce.message)
      throw new Error()
    }
  } catch (error) {
    console.log(error.message,)
    alert("product not found")
  }
}

const editTodo =async (elm)=>{
  try {
    const id = elm.id
    const card = elm.closest(".product");
    const title=card.querySelector("h3").innerHTML;
    const price= card.querySelector(".price").innerHTML;
    const des = card.querySelector(".category-name").innerHTML;

    price.trim()
    
    form.innerHTML="";
    form.classList.remove("hide")
    const from = `<div class="product-form">

    <h2>Update Product</h2>
    <p class="form-subtitle">Enter your product details</p>

    <div class="form-group">
      <input
        type="text"
        id="title"
        name="title"
        value="${title}"
        required
      >
    </div>

    <div class="form-group">
      <textarea
        id="des"
        name="description"
        rows="5"
        required
      >${des}</textarea>
    </div>

    <div class="form-group">
      <input
        type="number"
        id="price"
        name="price"
        value="${price}"
        required
      >
    </div>

    <div class="form-group">
      <select id="condition" name="condition" required>
      <option value="">Select condition</option>
        <option value="new">New</option>
        <option value="used">Used</option>
      </select>
    </div>
    
    <div class="form-group">
      <input
        type="text"
        id="location"
        name="location"
        placeholder="Enter your location"
        required
      >
    </div>


    <button id="${id}" onclick="update(this)" class="create-btn">
      Update Product
    </button>

    </div>`;
    
    form.innerHTML= from;
  } catch (error) {
    console.log(error)
  }

}


const update = async (elm)=>{

  try {
    const id = elm.id
    const title = document.getElementById("title").value
  const des = document.getElementById("des").value
  const price = document.getElementById("price").value
  const condition = document.getElementById("condition").value
  const location = document.getElementById("location").value
  
  const token = authBari()

  if(!title || ! des || !price || !condition || !location || !token){
  return alert("required filed or missing")
  }
// const formData = new FormData();

// formData.append("title",title)
// formData.append("des",des)
// formData.append("price",price)
// formData.append("condition",condition)
// formData.append("location",location)


 
  const data = await fetch(`${baseUrl}/updateProduct/${id}` ,{
    method:"PUT",
    headers:{
      "Content-Type":"application/json",
      "Authorization":token
    },
  
    body:JSON.stringify({
      title,
      des,
      price,
      condition,
      location
    })
  }).then(data=>data.json())

  if(data.status){
    console.log(data)
    alert(data.message)
    form.innerHTML="";
  form.classList.add("hide");
  allProduct()
  }else{
    alert(data.message)
    
  }
  

  } catch (error) {
    alert(error.message)
    console.log(error.message)
  }
  
  }
window.update =update
window.editTodo =editTodo
window.deletTodo =deletTodo
window.createProduct =createProduct
window.showForm = showForm