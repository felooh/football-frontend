<template>
  <EcHeader />
  <div class="home">
    <section class="hero is-medium is-dark mb-6">
        <div class="hero-body has-text-centered">
            <p class="title mb-6">
                Welcome to EFootall Shop
            </p>
            <p class="subtitle">
                The best online sports gear shop
            </p>
        </div>
    </section>

    <div class="columns is-multiline">
      <div class="column is-12">
          <h2 class="is-size-2 has-text-centered">Latest products</h2>
      </div>

      <ProductBox 
        v-for="product in latestProducts"
        v-bind:key="product.id"
        v-bind:product="product" />
    </div>
  </div>

  <footer class="footer">
    <p class="has-text-centered">Copyright (c) 2023</p>
  </footer>
</template>

<script>
import 'bulma'
import axios from 'axios'
import EcHeader from '@/components/EcHeader'
import ProductBox from '@/components/ProductBox'

export default {
  name: 'EcHome',
  data() {
    return {
      latestProducts: []
    }
  },
  components: {
    ProductBox,
    EcHeader,
  },
  mounted() {
    this.getLatestProducts()

    document.title = 'Home | eShop'
  },
  methods: {
    async getLatestProducts() {
      this.$store.commit('setIsLoading', true)

      await axios
        .get('/api/v2/latest-products/')
        .then(response => {
          this.latestProducts = response.data
        })
        .catch(error => {
          console.log(error)
        })

      this.$store.commit('setIsLoading', false)
    }
  }
}
</script>

<style>

</style>