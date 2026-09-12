import baseUrl from "./baseUrl.js"
import {authBari} from "./barear.js"

let products;



let authArea = document.getElementById("authArea")

const checkAuth = () => {
    const token = localStorage.getItem("AUTHtoken");

    if (token) {
        // User logged in
        authArea.innerHTML = `
            <a href="./dashboard.html" class="auth-btn">
                Dashboard
            </a>

            <button id="logoutBtn" onclick="logOut()"  class="auth-btn">
                Logout
            </button>
        `;

        // document.getElementById("logoutBtn").addEventListener("click", () => {
            
          
  
        // });

    } else {
        // User not logged in
        authArea.innerHTML = `
            <a href="./login.html" class="auth-btn">
                Login
            </a>

            <a href="./singup.html" class="auth-btn">
                Singup
            </a>
        `;
    }
};

checkAuth();


const allProduct =async ()=>{
  try {
    const responce = await fetch(`${baseUrl}/get_AllProduct`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json"
      }
    }).then(responce=>responce.json())

if(responce.status){
  products = responce.products
  renderProducts()
}

  } catch (error) {
    console.log(error.message)
  }
}

allProduct()

const grid = document.getElementById("productGrid");




const renderProducts = () => {
  
  grid.innerHTML = products.map((p, index) => `
    <article class="product" style="animation-delay:${index * 50}ms">
      <div class="product-img">
        ${p.title ? `<span class="tag">${p.title}</span>` : ""}
        <button class="heart" onclick="toggleHeart(this)">♡</button>
        <img src="${p.UrlImage}" alt="${p.title}">
      </div>
      <div class="product-info">
        <span class="category-name">local</span>
        <h3>${p.title}</h3>
        <div class="price">$${p.price.toFixed(2)}</div>
        <div class="rating">★ ${p.rating} <span>(${p.reviews})</span></div>
        <button class="order-btn" onclick="orderProduct(${p._id})">Order Now</button>
      </div>
    </article>
  `).join("");

  
}


const toggleHeart = (button)=> {
  button.textContent = button.textContent === "♥" ? "♡" : "♥";
}

const logOut=()=>{
  console.log("hello")
    const token = localStorage.getItem("AUTHtoken");
    if(token){
      localStorage.removeItem("AUTHtoken")
      window.location.reload()
    }
      
}

window.logOut=logOut
window.toggleHeart =toggleHeart
