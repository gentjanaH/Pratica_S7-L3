const bookUrl = " https://striveschool-api.herokuapp.com/books"

const getData = function () {
    fetch(bookUrl)
        .then((res) => {
            if (res.ok === true) {

                return res.json()
            } else {
                throw new Error("Errore nella risposta")
            }
        })
        .then((book) => {
            console.log("LIBRI", book)
            console.log(book[0].img)
            console.log(book[0].title)
            console.log(book[0].price)

            const bookShelf = document.getElementById("shelf")
            let cartItems = JSON.parse(localStorage.getItem("cart")) || []
            book.forEach((b) => {
                const newCol = document.createElement("div")
                newCol.className = "col col-6 col-md-4 col-lg-3"
                newCol.innerHTML = `
                <div class="card h-100 border-1 border-info d-flex flex-column justify-content-between">
                    <div>
                        <img src= "${b.img}" class="img-fluid rounded-top-1">
                    </div>
                    <div class="ms-2 mt-2">
                        <h6 class="card-title">${b.title}</h6>
                         <p class="fw-bold text-success">€ ${b.price}</p>
                    </div>

                    <div class="d-flex justify-content-between m-2">
                        <button type="button" class="btn btn-sm btn-outline-danger rounded-pill">Scarta</button>
                        <button type="button" class="btn btn-sm btn-outline-success rounded-pill">Compra ora</button>
                    </div>

                </div>

                `

                // bottone compra ora
                const cartList = document.getElementById("cartList")
                const buyNow = newCol.querySelector(".btn-outline-success")

                // salvo il carrello nel localStorage

                const salvaCart = () => {
                    cartList.innerHTML = ""
                    cartItems.forEach((b, i) => {

                        const lista = document.createElement("li")
                        lista.className = "list-group-item d-flex justify-content-between align-items-center"
                        lista.innerHTML = `
                <span>${b.title}</span>
                 <span>€ ${b.price}</span>
                 <button class="btn btn-sm btn-outline-danger rounded-pill" >Delete</button>
                 
                
                `

                        // bottone elimina dal carrello
                        const deleteBook = lista.querySelector(".btn-outline-danger")
                        deleteBook.addEventListener("click", () => {
                            console.log("bottone cliccato")
                            cartItems.splice(i, 1)
                            localStorage.setItem("cart", JSON.stringify(cartItems))
                            salvaCart()
                            updateCartCount()
                            // lista.remove()
                        })
                        cartList.appendChild(lista)
                    })
                }
                //   funzione per contare articoli
                const updateCartCount = () => {
                    const cartCount = document.getElementById("cartCount")
                    const currentCart = JSON.parse(localStorage.getItem("cart"))
                    cartCount.textContent = currentCart.length
                    cartCount.classList.add("badge", "rounded-pill", "bg-danger", "text-light")
                }

                buyNow.addEventListener("click", () => {

                    cartItems.push({ title: b.title, price: b.price })
                    localStorage.setItem("cart", JSON.stringify(cartItems))
                    salvaCart()
                    updateCartCount()

                })

                // bottone scarta
                const deleteCard = newCol.querySelector(".btn-outline-danger")
                deleteCard.addEventListener("click", () => {
                    console.log("bottone cliccato")
                    newCol.remove()
                })

                bookShelf.appendChild(newCol)

            })



        })
        .catch((err) => {
            console.log("ERRORE", err)

        })
}
getData()