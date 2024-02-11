<template>
  <div class="task-comments-block comments-block">
    <div
      v-for="(comment, index) in comments"
      :key="comment.id"
      :class="['comment', { 'my-comment': comment.author === user.id }]"
    >
      <div class="comment-content">
        {{ comment.content }}
      </div>
      <div class="comment-date">{{ getDate(comment.created_at) }}</div>
    </div>
    <div ref="scrolledBlock"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  props: {
    comments: Array
  },
  updated() {
    this.scrollCommentsToBottom('smooth');
  },
  mounted() {
    this.scrollCommentsToBottom('instant');
  },
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  methods: {
    scrollCommentsToBottom(behavior) {
      const el = this.$refs.scrolledBlock;
      if (el) {
        el.scrollIntoView({
          behavior: behavior
        });
      }
    },
    getDate(dateString) {
      const date = new Date(dateString);
      const month = date.getMonth();
      const months = {
        0: 'января',
        1: 'февраля',
        2: 'марта',
        3: 'апреля',
        4: 'мая',
        5: 'июня',
        6: 'июля',
        7: 'августа',
        8: 'сентября',
        9: 'октября',
        10: 'ноября',
        11: 'декабря'
      };
      return `${date.getDate()} ${months[month]} ${date.getHours()}:${date.getMinutes()}`;
    }
  }
};
</script>

<style scoped lang="scss">
@import '../../styles/variables';

.task-comments-block {
  width: 100%;
}

.comments-block {
  height: 80%;
  overflow: auto;
  flex-grow: 1;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  padding: 0 25px;
}

.comment {
  position: relative;
  border-radius: 16px 16px 16px 0;
  margin-bottom: 20px;
  padding: 20px;
  font-weight: 200;
  font-size: 14px;
  align-self: flex-start;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: flex-start;
  max-width: 100%;

  &::before {
    content: url('../../images/comment_tail_blue.svg');
    position: absolute;
    bottom: 0;
    left: -15px;
    height: 20px;
    width: 20px;
    border-bottom-left-radius: 4px;
    overflow: hidden;
  }

  &:nth-last-child(-n + 2) {
    margin-bottom: 0;
  }

  &.my-comment {
    align-self: flex-end;
    background: #effdde;
    border-radius: 16px 16px 0 16px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: flex-end;

    &::before {
      content: url('../../images/comment_tail_green.svg');
      position: absolute;
      bottom: 0;
      left: unset;
      right: -15px;
      height: 20px;
      width: 20px;
      border-bottom-left-radius: 4px;
      transform: rotateY(180deg);
      overflow: hidden;
    }
  }
}

.comment-content {
  overflow-wrap: break-word;
  max-width: 100%;
}

.comment-date {
  font-size: 12px;
}
</style>
