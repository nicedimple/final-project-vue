<template>
  <div class="container mt-5">
    <h2 class="mb-4 text-center text-primary">Book Collection</h2>

    <!-- Add New Book Button -->
    <div class="mb-4 text-center">
      <button @click="openAddBookForm" class="btn btn-primary">Add New Book</button>
    </div>

    <!-- Book Cards Loop -->
    <div class="row">
      <div class="col-md-4 mb-4" v-for="book in books" :key="book.id">
        <div class="card shadow-sm border-light">
          <img
            v-if="book.imageUrl"
            :src="book.imageUrl"
            alt="Book Image"
            class="card-img-top"
            style="width: 100%; height: 600px; object-fit: cover"
          />
          <div class="card-body">
            <h5 class="card-title text-center">{{ book.title }}</h5>
            <p class="card-text"><strong>Author:</strong> {{ book.author }}</p>
            <div class="text-center">
              <button @click="borrowBook(book)" class="btn btn-primary btn-sm mr-2">Borrow</button>
              <button @click="purchaseBook(book)" class="btn btn-success btn-sm">Purchase</button>
              <button @click="editBook(book)" class="btn btn-warning btn-sm mt-2">Edit</button>
              <button @click="deleteBook(book.id)" class="btn btn-danger btn-sm mt-2">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for Borrow Form -->
    <div
      class="modal fade"
      id="borrowModal"
      tabindex="-1"
      aria-labelledby="borrowModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="borrowModalLabel">Borrow Book</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="closeBorrowModal"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitBorrowForm">
              <div class="mb-3">
                <label for="borrowerName" class="form-label">Name</label>
                <input
                  v-model="borrower.name"
                  type="text"
                  id="borrowerName"
                  class="form-control"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="borrowerContact" class="form-label">Contact</label>
                <input
                  v-model="borrower.contact"
                  type="text"
                  id="borrowerContact"
                  class="form-control"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="borrowDate" class="form-label">Date Borrowed</label>
                <input
                  v-model="borrower.dateBorrowed"
                  type="date"
                  id="borrowDate"
                  class="form-control"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal for Add/Edit Book -->
  <div
    class="modal fade"
    id="bookModal"
    tabindex="-1"
    aria-labelledby="bookModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="bookModalLabel">
            {{ isEditing ? 'Edit Book' : 'Add New Book' }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="cancelEditing"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitBookForm">
            <div class="mb-3">
              <label for="bookTitle" class="form-label">Title</label>
              <input
                v-model="editingBook.title"
                type="text"
                id="bookTitle"
                class="form-control"
                required
              />
            </div>
            <div class="mb-3">
              <label for="bookAuthor" class="form-label">Author</label>
              <input
                v-model="editingBook.author"
                type="text"
                id="bookAuthor"
                class="form-control"
                required
              />
            </div>
            <div class="mb-3">
              <label for="bookImageUrl" class="form-label">Image URL</label>
              <input
                v-model="editingBook.imageUrl"
                type="text"
                id="bookImageUrl"
                class="form-control"
              />
            </div>
            <button type="submit" class="btn btn-primary">
              {{ isEditing ? 'Update Book' : 'Add Book' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const books = ref([])

onMounted(() => {
  const storedBooks = JSON.parse(localStorage.getItem('books'))
  if (storedBooks) {
    books.value = storedBooks
  }
})

const isBorrowing = ref(false)
const isEditing = ref(false)
const isAdding = ref(false)
const editingBook = ref({
  id: null,
  title: '',
  author: '',
  imageUrl: '',
})

const borrower = ref({
  name: '',
  contact: '',
  dateBorrowed: '',
  book: null,
})

const borrowBook = (book) => {
  borrower.value.book = book
  const modal = new bootstrap.Modal(document.getElementById('borrowModal'))
  modal.show()
}

const submitBorrowForm = () => {
  if (borrower.value.name && borrower.value.contact && borrower.value.dateBorrowed) {
    const storedBorrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks')) || []
    storedBorrowedBooks.push({ ...borrower.value, id: Date.now() })
    localStorage.setItem('borrowedBooks', JSON.stringify(storedBorrowedBooks))

    borrower.value = { name: '', contact: '', dateBorrowed: '', book: null }
    isBorrowing.value = false
    alert('Book borrowed successfully!')
  } else {
    alert('Please fill out all fields.')
  }
}

const purchaseBook = (book) => {
  alert(`You have purchased "${book.title}"`)
}

const editBook = (book) => {
  editingBook.value = { ...book }
  isEditing.value = true
  isAdding.value = false
  const modal = new bootstrap.Modal(document.getElementById('bookModal'))
  modal.show()
}

const openAddBookForm = () => {
  editingBook.value = { id: null, title: '', author: '', imageUrl: '' }
  isAdding.value = true
  isEditing.value = false
  const modal = new bootstrap.Modal(document.getElementById('bookModal'))
  modal.show()
}

const submitBookForm = () => {
  if (editingBook.value.id) {
    const index = books.value.findIndex((book) => book.id === editingBook.value.id)
    if (index !== -1) {
      books.value[index] = { ...editingBook.value }
    }
  } else {
    editingBook.value.id = Date.now()
    books.value.push({ ...editingBook.value })
  }

  localStorage.setItem('books', JSON.stringify(books.value))

  editingBook.value = { id: null, title: '', author: '', imageUrl: '' }

  const modal = new bootstrap.Modal(document.getElementById('bookModal'))
  modal.hide()
}

const deleteBook = (id) => {
  books.value = books.value.filter((book) => book.id !== id)
  localStorage.setItem('books', JSON.stringify(books.value))
}

const cancelEditing = () => {
  const modal = new bootstrap.Modal(document.getElementById('bookModal'))
  modal.hide()
}

const closeBorrowModal = () => {
  borrower.value = { name: '', contact: '', dateBorrowed: '', book: null }
}
</script>

<style scoped>
/* General button styling for all buttons */
.card-body .btn {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border-radius: 4px; /* Slightly rounded corners */
  transition: all 0.3s ease;
  margin: 5px 0; /* Add space between buttons */
}

/* Borrow Button */
.btn-borrow {
  background-color: #007bff; /* Blue background for Borrow */
  color: white;
  border: 1px solid #007bff;
}

.btn-borrow:hover {
  background-color: #0056b3; /* Darker blue on hover */
  border-color: #0056b3;
  cursor: pointer;
}

/* Purchase Button */
.btn-purchase {
  background-color: #28a745; /* Green background for Purchase */
  color: white;
  border: 1px solid #28a745;
}

.btn-purchase:hover {
  background-color: #218838; /* Darker green on hover */
  border-color: #218838;
  cursor: pointer;
}

/* Edit Button */
.btn-edit {
  background-color: #ffc107; /* Yellow background for Edit */
  color: white;
  border: 1px solid #ffc107;
}

.btn-edit:hover {
  background-color: #e0a800; /* Darker yellow on hover */
  border-color: #e0a800;
  cursor: pointer;
}

/* Delete Button */
.btn-delete {
  background-color: #dc3545; /* Red background for Delete */
  color: white;
  border: 1px solid #dc3545;
}

.btn-delete:hover {
  background-color: #c82333; /* Darker red on hover */
  border-color: #c82333;
  cursor: pointer;
}

/* Extra styling for card body */
.card-body {
  text-align: center; /* Center the buttons and text */
}
</style>
