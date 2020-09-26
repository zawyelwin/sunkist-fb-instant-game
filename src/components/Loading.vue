<template>
    <div
        v-bind:class="[containerClass ? containerClass : 'loading']"
        v-if="loading"
    >
        <div class="container" v-if="text">{{ text }}</div>
        <div class="container" v-else>
            <img src="assets/images/loading.svg" />
        </div>
    </div>
</template>

<script>
export default {
    name: "Loading",

    props: {
        loading: {
            type: Boolean,
            required: true
        },
        containerClass: String,
        text: String
    }
};
</script>
