<template>
    <div class="">
        <div class="tab__header">
            <a href="#"
                class="tab__link p-4  color hover:bg-blue-darker no-underline text-white border-b-2 border-white flex justify-between"
                @click.prevent="active = !active">
                <strong>{{ title }}</strong>
                <strong>{{ date_de_soumission }}</strong>
                <strong>{{ auteur }}</strong>
                <span class="down-Arrow" v-show="!active">&#9660;</span>
                <span class="up-Arrow" v-show="active">&#9650;</span>
                <button title="générer pdf" v-title
                    class="py-2 px-4 overflow-hidden flex space-x-2 items-center text-xs font-semibold text-white uppercase  bg-primary focus:outline-none focus:shadow-outline"
                    @click="generateReport">
                    <span class="mx-2 text-sm font-semibold">generer pdf </span>
                </button>
            </a>
        </div>
        <div class="tab__content p-2 overflow-x-auto" v-show="active">
            <slot />
        </div>
    </div>
</template>


<script>

export default {
    props: [
        'title', 'date_de_soumission', 'auteur'
    ],
    data() {
        
        return {
            active: false,
        }
    },
    methods: {
        generateReport() {
            this.active = false
            this.$emit('generate-pdf')
            
        }
    }
}

</script>
<style>
.color {
    background-color: #2779BD;
}</style>