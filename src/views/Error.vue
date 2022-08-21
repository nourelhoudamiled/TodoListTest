<template>
  <div class="error-page">
    <div class="emo">
      :-/
    </div>
    <div class="text">
      404 not found
    </div>
    <router-link to="/" v-slot="{ navigate }" custom>
      <button @click="navigate">Acceuil</button>
    </router-link>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.error-page {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .emo {
    display: block;
    position: relative;
    line-height: 70px;
    font-size: 70px;
    font-weight: 700;
  }
  .text {
    display: block;
    position: relative;
    font-size: 20px;
    line-height: 35px;
    margin-top: 20px;
  }
  button {
    margin-top: 20px;
    background: #212533;
    padding: 5px;
    color: #fff;
    border-radius: 3px;
    border: 2px solid #212533;
    cursor: pointer;
    transition: all 0.1s ease;
    &:hover {
      background: #585d71;
      border: 2px solid #585d71;
    }
  }
}
</style>
