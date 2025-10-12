// <-------------search bar--------------->
const searchInput = document.getElementById('searchInput');
  const items = document.querySelectorAll('.categories .item');
   console.log(items)
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();

    items.forEach(item => {
      const title = item.querySelector('h3').textContent.toLowerCase();
      
      if (title.includes(query) ) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      
      }
    });
  });



// add to card

const addToCartButtons1 = document.querySelectorAll('.add-to-cart');
const cartCountSpan = document.getElementById('cart-count');

// Load or initialize cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

cartCountSpan.textContent = cart.length; // Show count if already added

addToCartButtons1.forEach(button => {
  button.addEventListener('click', () => {
    const item = button.closest('.item');
    const product = {
      name: item.querySelector('h3').innerText,
      img: item.querySelector('img').src,
      price: item.querySelector('.price').innerText
    };

    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart count
    cartCountSpan.textContent = cart.length;

    alert(`${product.name} added to cart!`);
  });
});


// available stack
  let list = document.querySelectorAll(".item");

items.forEach((item, i) => {
  let stockText = item.querySelector(".stack");
  let buyBtn = item.querySelector(".cart-count");

  // Check saved stock or read from text
  let saved = localStorage.getItem("stock" + i);
  let stock = saved ? +saved : parseInt(stockText.textContent.replace(/\D/g, ""));

  // Show correct stock on load
  updateText();

  buyBtn.onclick = (e) => {
    e.preventDefault();
    if (stock > 0) {
      stock--;
      localStorage.setItem("stock" + i, stock);  
      updateText();
      window.location.href = "pay.html";
    }
  };

  function updateText() {
    if (stock <= 0) {
      stockText.textContent = "Out of Stock";
      stockText.style.color = "red";
      buyBtn.textContent = "Out of Stock";
      buyBtn.disabled = true;
    } else {
      stockText.textContent = "Available stock: " + stock;
      buyBtn.textContent = "Buy Now";
      buyBtn.disabled = false;
      stockText.style.color = "black";
    }
  }
});


   