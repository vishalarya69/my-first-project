// Define Variables

let renderData = document.querySelector(".renderData");
let renderCartData = document.querySelector(".renderCartData");
let dynamic_count = document.querySelector(".dynamic-count");
let tContainer = document.querySelector(".tContainer");
let line = document.querySelector(".line");
let total_price = document.getElementById("total_price");
let emptyCart = document.querySelector(".emptyCart");
let cItems = document.querySelector(".cItems");
let emptyC = false;
let arrr = [];
let calculateTotal = [];
// Get Data From Api

async function getData() {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();


  data.map((ele) => {
    let productMainDiv = document.createElement("div");
    let createImgEle = document.createElement("img");
    let createTitle = document.createElement("p");
    let createPriceEle = document.createElement("p");
    let btnEle = document.createElement("button");
    let btnText = document.createTextNode("Add to Cart");
    let createPriceText = document.createTextNode(`Price : $${ele.price}`);
    let createTextTitle = document.createTextNode(`${ele.title.slice(0,35)}...`);
    createImgEle.setAttribute("src", ele.image);
    createImgEle.setAttribute("class", "myImages");
    productMainDiv.setAttribute("class" , "box-main")
    createTitle.appendChild(createTextTitle);
    createPriceEle.setAttribute("class" , 'price-element')
    btnEle.setAttribute("class" , "btn-element")
    createPriceEle.appendChild(createPriceText);
    createTitle.setAttribute("class" , 'productTitle')
    btnEle.appendChild(btnText);
    productMainDiv.appendChild(createImgEle);
    productMainDiv.appendChild(createTitle);
    productMainDiv.appendChild(createPriceEle);
    productMainDiv.appendChild(btnEle);
    renderData.appendChild(productMainDiv);


    function addToCart(img, price) {
    arrr.push({ii : img , pp : price});
      alert("Product Added to Cart")
      dynamic_count.innerHTML++;
      emptyC = true
      if(emptyC){
        cItems.style.display = "flex";
        emptyCart.style.display = "none";
      }
      let cartMDiv = document.createElement("div");
      let cartImgEle = document.createElement("img");
      let cartTrashBtn = document.createElement("i");
      cartTrashBtn.setAttribute("class", "fa-solid fa-trash");
      tContainer.style.display = "flex";
      line.style.display = "block";

      cartTrashBtn.addEventListener("click" , () => deleteItem(price));
      cartImgEle.setAttribute("src", img);
      cartImgEle.setAttribute("class", "cartImgElement");
      cartMDiv.setAttribute("class" , "cart-styling")
      let cartPriceEle = document.createElement("p");
      let cartPriceText = document.createTextNode(`$${price}`);
      cartPriceEle.setAttribute("class" , "cart-pprice")
      cartPriceEle.appendChild(cartPriceText);
      cartMDiv.appendChild(cartImgEle);
      cartMDiv.appendChild(cartPriceEle);
      cartMDiv.appendChild(cartTrashBtn);
      renderCartData.appendChild(cartMDiv);
      calculateTotal.push(price);
      let myTotal = calculateTotal.reduce((accum , curVal) => {
        return accum + curVal
     })
     total_price.innerHTML = `Total Price : $${myTotal.toFixed(2)}`
      function deleteItem(pr){
        cartMDiv.remove();
        console.log(pr)
        myTotal = myTotal - pr;
        total_price.innerHTML = `Total Price : $${myTotal}`
        dynamic_count.innerHTML--;
      }
    
    }
    btnEle.addEventListener("click", () => addToCart(ele.image, ele.price));
  });
}

getData();
