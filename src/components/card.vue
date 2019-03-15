<template>
  <div>
    <p class="card">
      {{text}}
      自定义卡片
    </p>
  </div>
</template>

<script>
export default {
  props: ['text']
}
</script>

<style>
.card {
  padding: 10px;
}
</style>
