<template>
    <section class="mt-6 ml-2">
        <slot>
            <!-- fallback content -->
            Dense view
        </slot>
    </section>

</template>

<script setup lang="ts">
/* const { signIn } = useSession() */
onMounted(() => { })
const props = defineProps({
    headers: {
        type: Array,
        required: false
    }
})
</script>
<style>
section {
    display: table;
    width: 100%;
}

section>* {
    display: table-row;
}

section .v-col.dense {
    display: table-cell;
    vertical-align: middle;
}
</style>