<template>
  <div class="learning-progress">
    <div class="progress-header">
      <div class="progress-text">Прогресс изучения курса</div>
      <div class="additional-text">{{ formattedProgressPercent }}</div>
    </div>
    <ProgressBar
      :value="progressPercent"
      :showValue="false"
      style="height: 5px"
    ></ProgressBar>
  </div>
</template>

<script>
import ProgressBar from 'primevue/progressbar';

export default {
  name: 'EPProgressBar',
  components: {
    ProgressBar
  },
  props: {
    progressPercent: {
      type: Number,
      required: true,
      default: 0
    }
  },
  computed: {
    formattedProgressPercent() {
      return `${this.progressPercent}%`;
    }
  }
};
</script>

<style scoped lang="scss">
@import '../styles/variables';

.learning-progress {
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.progress-label {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 5px;
}

.progress-text {
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
}

.additional-text {
  color: $main;
  font-size: 1rem;
  font-weight: 700;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
</style>
