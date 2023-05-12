// Globalna varijabla za ukupan zbroj u kosarici
let allTotal = 0;

function addToCart(element) {
    let mainEl = element.closest('.single-item');
    let price = mainEl.querySelector('.price').innerText;
    let name = mainEl.querySelector('h3').innerText;
    let quantity = mainEl.querySelector('input').value;
    let cartItems = document.querySelector('.cart-items');

    // Uvjet koji odreduje da obavezno barem 1 kolicinu povrca dodati u kosaricu (nije moguce staviti 0).
    if (parseInt(quantity) > 0 ) {

        // Pomocu substringa dobivamo samo broj 10 i makivamo znamenku $.
        price = price.substring(1); 
        
        // Pretvaramo string u int zbog manipulacije sa brojevima.
        price = parseInt(price);

        // total - izracun ukupne vrijednosti prizvoda
        let total = price * quantity;

        // Ukupna cijena cijele kosarice
        allTotal += total;

        // Tekst koji ce se ispisati nakon sto ubacimo u kosaricu [ime proizvoda, cijena, kolicina i ukupna cijena]
        cartItems.innerHTML += `<div class="cart-single-item"> 
                                <h3>${name}</h3>
                                <p>€${price} x ${quantity} = €<span>${total}</span></p>
                                <button onclick="removeFromCart(this)" class="remove-item">Remove Item</button>
                                </div>`;

        document.querySelector('.total').innerText = `Total: €${allTotal}`;                        
        
        // Kada se povrce stavi u kosaricu javlja se tekst koji nam naznacuje da je ubaceno
        element.innerText = 'Added';
        
        // Kada se povrće stavi u kosaricu gumb se ugasi i nije vise moguce dodavati.
        element.setAttribute('disabled', 'true'); 

    } else {
        alert('Select the quantity'); 
    }

   
}

// Funkcija za uklanjanje stvari iz kosarice
function removeFromCart(element) {

    let mainEl = element.closest('.cart-single-item');
    
    // Ciljamo cijenu proizvoda u kosarici
    let price = mainEl.querySelector('p span').innerText;

    let name = mainEl.querySelector('h3').innerText;

    let vegetables = document.querySelectorAll('.single-item');


    // Pretvaramo cijenu u string zbog manipulacije brojeva
    price = parseInt(price);

    // Oduzimanje cijene iz kosarice kada maknemo odredeni prizvod
    allTotal -= price;

    document.querySelector('.total').innerText = `Total: $${allTotal}`; 

    mainEl.remove();


    // ForEach petlja kada izbacimo iz kosarice proizvode, resetira ih na 0 i moguce je ponovno postavljanje u kosaricu.
    vegetables.forEach(function (vege) {
        let itemName = vege.querySelector('.si-content h3').innerText;
        
        if (itemName === name) {
            vege.querySelector('.actions input').value = 0;
            vege.querySelector('.actions button').removeAttribute('disabled');
            vege.querySelector('.actions button').innerText = 'Add';
        }

    });


    
}