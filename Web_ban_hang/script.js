document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("cart-items")) {
        updateCart();
    }
});

function updateCart() {
    let cartList = document.getElementById("cart-items");
    let totalPrice = document.getElementById("total-price");
    let totalQuantity = document.getElementById("total-quantity");

    if (!cartList || !totalPrice || !totalQuantity) {
        console.error("Không tìm thấy phần tử giỏ hàng.");
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartList.innerHTML = "";
    let total = 0;
    let quantityCount = 0;

    cart.forEach((item, index) => {
        let li = document.createElement("li");
        li.textContent = `${item.product} x${item.quantity} - ${item.price * item.quantity} VNĐ`;

        let removeBtn = document.createElement("button");
        removeBtn.textContent = "Xóa";
        removeBtn.onclick = () => removeFromCart(index);

        li.appendChild(removeBtn);
        cartList.appendChild(li);

        total += item.price * item.quantity;
        quantityCount += item.quantity;
    });

    totalPrice.textContent = `Tổng giá: ${total} VNĐ`;
    totalQuantity.textContent = `Số lượng mặt hàng: ${quantityCount}`;
}

function addToCart(product, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existingItem = cart.find(item => item.product === product);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ product, price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product} đã được thêm vào giỏ hàng!`);

    // Hiệu ứng rung giỏ hàng nếu có
    let cartIcon = document.getElementById("cart-icon");
    if (cartIcon) {
        cartIcon.classList.add("shake");
        setTimeout(() => cartIcon.classList.remove("shake"), 500);
    }
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

function clearCart() {
    localStorage.removeItem("cart");
    updateCart();
    alert("Giỏ hàng đã được xóa.");
}
