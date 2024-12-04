<template>
  <form @submit.prevent="submitForm">
    <div class="mb-3">
      <label for="title" class="form-label">Book Title</label>
      <input v-model="book.title" type="text" id="title" class="form-control" required />
    </div>
    <div class="mb-3">
      <label for="author" class="form-label">Author</label>
      <input v-model="book.author" type="text" id="author" class="form-control" required />
    </div>
    <div class="mb-3">
      <label for="dateBorrowed" class="form-label">Date Borrowed</label>
      <input
        v-model="book.dateBorrowed"
        type="date"
        id="dateBorrowed"
        class="form-control"
        required
      />
    </div>
    <div class="mb-3">
      <label for="returnDate" class="form-label">Return Date</label>
      <input v-model="book.returnDate" type="date" id="returnDate" class="form-control" required />
    </div>
    <div class="mb-3">
      <label for="imageUrl" class="form-label">Book Image URL</label>
      <input
        v-model="book.imageUrl"
        type="text"
        id="imageUrl"
        class="form-control"
        placeholder="Enter image URL"
      />
    </div>
    <button type="submit" class="btn btn-primary">Add Book</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const book = ref({
  title: '',
  author: '',
  dateBorrowed: '',
  returnDate: '',
  imageUrl: '', // Store the image URL here
})

// Emit the book data when the form is submitted
const submitForm = () => {
  const newBook = { ...book.value, id: Date.now() }
  const storedBooks = JSON.parse(localStorage.getItem('books')) || []
  storedBooks.push(newBook)
  localStorage.setItem('books', JSON.stringify(storedBooks))

  // Emit the added book to the parent (Books.vue)
  emit('add-book', newBook)

  // Reset form after adding the book
  book.value = { title: '', author: '', dateBorrowed: '', returnDate: '', imageUrl: '' }
}
</script>
