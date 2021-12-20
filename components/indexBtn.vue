<template>
  <div class="box">
    {{ title }}
  </div>
</template>

<script>
export default {
  props: ['title'],
}
</script>

<style lang="postcss">
@import url('https://fonts.googleapis.com/css2?family=Prompt&display=swap');
.box {
  min-width: 160px;
  min-height: 195px;
  left: 22px;
  top: 85px;
  background: #6cc4f7;
  border-radius: 19px;
  box-shadow: rgba(0, 0, 0, 0.014) 0px -23px 25px 0px inset,
    rgba(0, 0, 0, 0.062) 0px -36px 30px 0px inset,
    rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px,
    rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px,
    rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;

  font-family: 'Prompt', sans-serif;
  font-style: normal;
  font-weight: 900;
  font-size: 24px;
  line-height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #ffffff;
}
a {
  text-decoration: none;
}
</style>
