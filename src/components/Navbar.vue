<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Library</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/books">Books</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
}
</script>

<style scoped>
.navbar {
  background-color: #f5e9d7; /* Light beige background */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
}

.navbar-brand {
  font-family: 'Georgia', serif;
  font-size: 1.5rem;
  color: #3e2723 !important; /* Dark brown color */
  font-weight: bold;
}

.nav-link {
  font-size: 1rem;
  color: #5d4037 !important; /* Medium brown color */
  margin-right: 1rem;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #795548 !important; /* Slightly darker brown on hover */
}
</style>
