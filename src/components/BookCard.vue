<template>
  <div class="card book-card">
    <img :src="book.cover" class="card-img-top" alt="Book Cover" />
    <div class="card-body">
      <h5 class="card-title">{{ book.title }}</h5>
      <p class="card-text">By {{ book.author }}</p>
      <p class="card-text">
        <small
          >Status: <strong>{{ book.status }}</strong></small
        >
      </p>
      <div class="d-flex justify-content-between">
        <button
          class="btn btn-primary"
          v-if="book.status === 'Available'"
          @click="borrowBook(book.id)"
        >
          Borrow
        </button>
        <button
          class="btn btn-warning"
          v-if="book.status === 'Borrowed'"
          @click="returnBook(book.id)"
        >
          Return
        </button>
        <button class="btn btn-danger" @click="deleteBook(book.id)">Remove</button>
      </div>
    </div>
  </div>
</template>

<script>
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'

export default {
  name: 'BookCard',
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async borrowBook(bookId) {
      try {
        const bookRef = doc(db, 'books', bookId)
        await updateDoc(bookRef, { status: 'Borrowed' })
        this.$emit('bookUpdated', { id: bookId, status: 'Borrowed' })

        alert('Book borrowed successfully!')
      } catch (error) {
        console.error('Error borrowing book: ', error)
      }
    },
    async returnBook(bookId) {
      try {
        const bookRef = doc(db, 'books', bookId)
        await updateDoc(bookRef, { status: 'Available' })
        this.$emit('bookUpdated', { id: bookId, status: 'Available' })
        alert('Book returned successfully!')
      } catch (error) {
        console.error('Error returning book: ', error)
      }
    },
    async deleteBook(bookId) {
      if (confirm('Are you sure you want to delete this book?')) {
        try {
          const bookRef = doc(db, 'books', bookId)
          await deleteDoc(bookRef)
          this.$emit('bookDeleted', bookId)
          alert('Book removed successfully!')
        } catch (error) {
          console.error('Error deleting book: ', error)
        }
      }
    },
  },
}
</script>
<style scoped>
.book-card {
  margin-bottom: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.card-img-top {
  height: 200px;
  object-fit: cover;
}

.card-body {
  padding: 1rem;
}

button {
  border-radius: 20px;
}
</style>
