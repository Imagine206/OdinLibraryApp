const addBookBtn = document.getElementById('addBookBtn');
const modalContainer = document.getElementById('modalContainer');
const submitBook = document.getElementById('submitBook');
const cancelBtn = document.getElementById('cancelBtn');
const readBtn = document.getElementById('read');

// The object Constructer 
function Book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

// Adding the users info from the form to the empty array
const bookArr = []


// When the add book button is clicked, run this function
function displayModal(){
    //Showing the modal Form to the user
    modalContainer.style.display = 'block';
}


// Book.prototype.readBook = function (){
//     if (this.hasRead){
//         return "Read";
//     }else {
//         return "Not Read"
//     }
// }


// When User clicks submit run this Function
function submitNewBook(e){
    
    // Prevent the browser from submitting to the server
    e.preventDefault();

    

    // Grab the value of the users input
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = parseInt(document.getElementById('pages').value);
    const read = document.getElementById('read').checked;

    // Check if the input value are empty and the pages input is a number
    if (title !== '' && author !== '' && !isNaN(pages) && pages > 0){
        // Create a new instance of the book
        const newBook = new Book(title, author, pages, read ? "Read" : "Not Read");
        
        
        // push the new book to the empty array
        bookArr.push(newBook);
        console.log(bookArr)
        // update the display to show the new book
        
        displayBooks(bookArr);

        // Display the modal as none to hide
        modalContainer.style.display = "none";

        // Set the input values of the modal to empty string to clear
        document.getElementById("title").value = '';
        document.getElementById("author").value = '';
        document.getElementById("pages").value = '';
        document.getElementById("read").value = '';
    }else {
        // If entered incorrectly alert the user
        alert("Please fill out the required fields correctly")
    }


    // Trying to Update the card with the read status
}

// This function displays the users book on the page
function displayBooks(arr){
    //Select our container of the card
    const booksContainer = document.querySelector(".bookContainer .book-content")
    //make sure the container is empty
    booksContainer.innerHTML = '';

    // Loop over the bookArr and create a card to display each book that is created
    for (let i = 0; i < arr.length; i++){
        // Index of the bookArr set to book
        const book = arr[i];

        // Creating the cards container
        const bookDiv = document.createElement("div");
        // Adding the class book to style the card
        bookDiv.classList.add('book');

        // Creating a Date object
        const currentDate = new Date();

        const formattedDate = currentDate.toLocaleDateString();

        // Create the card information 
        bookDiv.innerHTML = `
                <div class="card" data-index="${i}">
                    <h1 class="card__title"><em>${book.title}</em></h1>
                    <p class="card__content">${book.pages} pages</p>
                    <div class="card__date">
                        <p>By ${book.author}</p>
                        <p>Created on ${formattedDate}</p>
                    </div>
                    
                    <div class="card__arrow")>
                        <i class="fa-solid fa-trash trash-icon deleteBtn"></i>
                    </div>
                    <div class="readStatusWrapper">
                        <span class="readStatus">${book.read}</span>
                    </div>
                </div>
        `
        
        // Appending teh bookDiv to booksContainer to show the div on the webpage
        booksContainer.appendChild(bookDiv);

        const readEl = document.querySelector('.readStatus');
        if (readEl.innerHTML === "Read"){
            readEl.style.backgroundColor = "#0ddf05"
        }else if (readEl.innerHTML === "Not Read"){
            readEl.style.backgroundColor = "red"
        }
    }
}

//Creating a delete function
function deleteBook(e){
    // Getting the target of the books div
    const bookCard = e.target.closest('.card')

    // Checking if the bookCard is the books div if so run the below code
    if (bookCard){
        //Getting the current book being clicked on with data-index
        const index = parseInt(bookCard.getAttribute('data-index'), 10)

        console.log("Index:", index)

        //if index is a number and index is greater than or equal to 0 and index is less than the book arrays length
        if (!isNaN(index) && index >= 0 && index < bookArr.length){
            //if
            bookArr.splice(index, 1);
            displayBooks(bookArr);
        }
    }
    console.log("Updated bookArr", bookArr)
}

// function changeReadStatus(e){
//     const button = e.target
//     console.log(button)

//     if (button === "Read"){
//         button.style.backgroundColor = "red";
//     }else {
//         button.style.backgroundColor = "green"
//     }
// }


addBookBtn.addEventListener('click', displayModal)
submitBook.addEventListener('click', submitNewBook);
cancelBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modalContainer.style.display = 'none'
});
document.getElementById('bookContent').addEventListener('click', (e) => {
    const deleteIcon = e.target.closest('.deleteBtn');
    if (deleteIcon){
        deleteBook(e)
    }

    const readStatus = e.target.closest('.readStatus')
    if(readStatus){
        const readStatus = e.target

        console.log(readStatus)
        if(readStatus.innerHTML === "Read"){
            readStatus.style.backgroundColor = "red";
            readStatus.textContent = "Not Read"
        }else if(readStatus.innerHTML === "Not Read"){
            readStatus.style.backgroundColor = "#0ddf05";
            readStatus.textContent = "Read"
        }
    }
})

