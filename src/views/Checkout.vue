<template>
    <EcHeader />
    <div class="page-checkout">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Checkout</h1>
            </div>

            <div class="column is-12 box">
                <table class="table is-fullwidth">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr
                            v-for="item in cart.items"
                            v-bind:key="item.product.id"
                        >
                            <td>{{ item.product.name }}</td>
                            <td>${{ item.product.price }}</td>
                            <td>{{ item.quantity }}</td>
                            <td>${{ getItemTotal(item).toFixed(2) }}</td>
                        </tr>
                    </tbody>

                    <tfoot>
                        <tr>
                            <td colspan="2">Total</td>
                            <td>{{ cartTotalLength }}</td>
                            <td>${{ cartTotalPrice.toFixed(2) }}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <div class="column is-12 box">
                <h2 class="subtitle">Shipping details</h2>

                <p class="has-text-grey mb-4">* All fields are required</p>

                <div class="columns is-multiline">
                    <div class="column is-6">
                        <div class="field">
                            <label>First name*</label>
                            <div class="control">
                                <input type="text" class="input" v-model="first_name">
                            </div>
                        </div>

                        <div class="field">
                            <label>Last name*</label>
                            <div class="control">
                                <input type="text" class="input" v-model="last_name">
                            </div>
                        </div>

                        <div class="field">
                            <label>E-mail*</label>
                            <div class="control">
                                <input type="email" class="input" v-model="email">
                            </div>
                        </div>

                        <div class="field">
                            <label>Phone*</label>
                            <div class="control">
                                <input type="text" class="input" v-model="phone">
                            </div>
                        </div>
                    </div>

                    <div class="column is-6">
                        <div class="field">
                            <label>Address*</label>
                            <div class="control">
                                <input type="text" class="input" v-model="address">
                            </div>
                        </div>

                        <div class="field">
                            <label>Zip code*</label>
                            <div class="control">
                                <input type="text" class="input" v-model="zipcode">
                            </div>
                        </div>

                        <div class="field">
                            <label>Place*</label>
                            <div class="control">
                                <input type="text" class="input" v-model="place">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="notification is-danger mt-4" v-if="errors.length">
                    <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                </div>

                <hr>

                <div id="card-element" class="mb-5"></div>

                <template v-if="cartTotalLength">
                    <hr>

                    <button class="btn btn-success" @click="submitForm">Pay with Mpesa</button>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import EcHeader from '@/components/EcHeader.vue'
export default {
    name: 'EcCheckout',
    data() {
        return {
            cart: {
                items: []
            },

            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            address: '',
            zipcode: '',
            place: '',
            errors: []
        }
    },
    components:{
        EcHeader
    },

    mounted() {
        document.title = 'Checkout | eShop'

        this.cart = this.$store.state.cart;
    },

    methods: {
        getItemTotal(item) {
            return item.quantity * item.product.price
        },
        async submitForm() {
            this.errors = []

            if (this.first_name === '') {
                this.errors.push('The first name field is missing!')
            }

            if (this.last_name === '') {
                this.errors.push('The last name field is missing!')
            }

            if (this.email === '') {
                this.errors.push('The email field is missing!')
            }

            if (this.phone === '') {
                this.errors.push('The phone field is missing!')
            }

            if (this.address === '') {
                this.errors.push('The address field is missing!')
            }

            if (this.zipcode === '') {
                this.errors.push('The zip code field is missing!')
            }

            if (this.place === '') {
                this.errors.push('The place field is missing!')
            }

            if (!this.errors.length) {
                this.$store.commit('setIsLoading', true)

              try {
                // Make an HTTP request to your Django backend to initiate STK Push
                const stkPushResponse = await axios.post('/initiate-stk-push/', {
                // Pass necessary data to the backend for STK Push initiation
                // Assuming you need the phone number, amount, etc.
                phone: this.phone,
                amount: this.cartTotalPrice,
                // Add any other data required for STK Push initiation
                });

                // Handle the response from the backend
                if (stkPushResponse.data.CheckoutRequestID) {
                // The STK Push initiation was successful
                // Use the response data to display a confirmation message, etc.
                } else {
                // STK Push initiation failed
                this.errors.push('STK Push initiation failed. Please try again later.');
                }
                this.$store.commit('setIsLoading', false)

                } catch (error) {
                // Handle any errors from the backend or network errors
                this.errors.push('Error initiating STK Push. Please try again later.');
                console.error(error);
              }
            }
        },
        // async checkStkStatus() {
        //     // ... your existing methods to check STK status

        //     // Make an HTTP request to your Django backend to query STK status
        //     try {
        //         const queryStkResponse = await axios.post('/query-stk-status/', {
        //         // Pass necessary data to the backend for STK status query
        //         // For example, checkout request ID or any other relevant data
        //         checkoutRequestID: 'ws_CO_03072023054410314768168060',
        //         // Add any other data required for STK status query
        //         });

        //         // Handle the response from the backend
        //         if (queryStkResponse.data.message) {
        //         // Use the message in the response to display the STK status to the user
        //         console.log(queryStkResponse.data.message);
        //         } else {
        //         // Response from the backend is not as expected
        //         console.log('Error in querying STK status.');
        //         }

        //         await axios
        //         .post('/api/v2/checkout/', data)
        //         .then(response => {
        //             this.$store.commit('clearCart')
        //             this.$router.push('/cart/success')
        //             console.log(response.data)
        //         })
        //         .catch(error => {
        //             this.errors.push('Something went wrong. Please try again')

        //             console.log(error)
        //         })

        //         this.$store.commit('setIsLoading', false)
         
        //     } catch (error) {
        //         // Handle any errors from the backend or network errors
        //         console.error('Error querying STK status.', error);
        //     }
        //     },
    //     },
        
    //     computed: {
    //     cartTotalPrice() {
    //         return this.cart.items.reduce((acc, curVal) => {
    //             return acc += curVal.product.price * curVal.quantity
    //         }, 0)
    //     },
    //     cartTotalLength() {
    //         return this.cart.items.reduce((acc, curVal) => {
    //             return acc += curVal.quantity
    //         }, 0)
    //     }
       }
    }

</script>