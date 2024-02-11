<template>
  <div class="task-header">
    <h1 class="task-title">{{ task.title }}</h1>
    <div class="user-info">
      <div class="name-role">
        <div class="name">{{ mentorInfo.name + ' ' + mentorInfo.surname }}</div>
        <div class="role">
          <span>{{ mentorInfo.role }}</span>
        </div>
      </div>
      <div class="user-photo">
        <div class="user-photo-text">{{ mentorInfo.name?.charAt(0) }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    task: Object,
    mentorInfo: Object
  }
};
</script>

<style scoped lang="scss">
@import '../../styles/variables';

.task-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-grow: 0;
  height: 10%;
  border-radius: 24px;
}

.user-info {
  display: flex;
  align-items: center;
}

.name-role {
  display: flex;
  flex-direction: column;
  margin-right: 10px;
}

.task-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: $text-main;
  margin-right: auto;
}

.name {
  font-size: 18px;
  font-weight: 800;
  color: $text-main;
}

.role {
  font-size: 14px;
  font-weight: 400;
}

.user-photo {
  background: $soft-main;
  width: 50px;
  height: 50px;
  overflow: hidden;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-photo-text {
  font-size: 18px;
  font-weight: 800;
  color: white;
}

.task-info {
  display: flex;
  align-items: center;
}
</style>
