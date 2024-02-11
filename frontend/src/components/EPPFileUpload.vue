<template>
  <FileUpload
    ref="fileUploadRef"
    name="answer"
    :customUpload="true"
    :multiple="false"
    :maxFileSize="1000000"
    @uploader="onFileUpload"
    :auto="true"
    :showUploadButton="false"
    :showCancelButton="false"
    chooseLabel="Выбрать"
  >
    <template #empty>
      <p>Перетащите файл.</p>
    </template>
    <template #content="{ files, uploadedFiles, removeFileCallback }">
      <div v-if="files.length > 0">
        <h5>Pending</h5>
        <div class="file-upload-content__group">
          <div
            v-for="(file, index) of files"
            :key="file.name + file.type + file.size"
            class="file-upload-content__item"
          >
            <div class="file-upload-content__left">
              <div class="file-upload-content__image">
                <img
                  v-if="file.type.includes('image/')"
                  role="presentation"
                  :alt="file.name"
                  :src="file.objectURL"
                  width="50"
                />
                <i v-else class="pi pi-file"></i>
              </div>
              <div class="file-upload-content__info">
                <span class="font-semibold">{{ file.name }}</span>
                <div>{{ formatSize(file.size) }}</div>
              </div>
            </div>
            <div class="file-upload-content__right">
              <Button
                icon="pi pi-times"
                @click="onRemoveTemplatingFile(file, removeFileCallback, index)"
                rounded
                text
                severity="danger"
              />
              <Badge value="Pending" severity="warning" />
            </div>
          </div>
        </div>
      </div>
      <div v-if="uploadedFiles.length > 0">
        <h5>Файлы:</h5>
        <div class="file-upload-content__group">
          <div
            v-for="(file, index) of uploadedFiles"
            :key="file.name + file.type + file.size"
            class="file-upload-content__item"
          >
            <div class="file-upload-content__left">
              <div class="file-upload-content__image">
                <img
                  v-if="file.type.includes('image/')"
                  role="presentation"
                  :alt="file.name"
                  :src="file.objectURL"
                  width="50"
                />
                <i v-else class="pi pi-file"></i>
              </div>
              <div class="file-upload-content__info">
                <span class="font-semibold">{{ file.name }}</span>
                <div>{{ formatSize(file.size) }}</div>
              </div>
            </div>
            <div class="file-upload-content__right">
              <a :href="file.objectURL" download>
                <i class="pi pi-download"></i>
              </a>
              <Button
                icon="pi pi-times"
                @click="onRemoveUploadedFile(file, index)"
                rounded
                text
                severity="danger"
              />
              <Badge value="Completed" severity="success" />
            </div>
          </div>
        </div>
      </div>
    </template>
  </FileUpload>
</template>

<script>
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import FileUpload from 'primevue/fileupload';
import Badge from 'primevue/badge';
import SplitButton from 'primevue/splitbutton';
import { mapActions } from 'vuex';

export default {
  name: 'EPPFileUpload',
  components: { FileUpload, Textarea, Button, Badge, SplitButton },

  props: {
    task: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      answerFile: null
    };
  },

  mounted() {
    this.addUploadedFiles();
  },

  methods: {
    ...mapActions({
      submitAnswer: 'tasks/submitAnswer',
      removeAnswer: 'tasks/removeAnswer'
    }),
    async onFileUpload(event) {
      const fileUploadComponent = this.$refs.fileUploadRef;
      const file = await this.readFileAsync(event.files[0]);
      await this.submitAnswer({ taskId: this.task.id, files: file }).then(
        (test) => {
          fileUploadComponent.uploadedFileCount++;
          fileUploadComponent.uploadedFiles.push(event.files[0]);
        }
      );
    },
    async onRemoveUploadedFile(file, fileIndex) {
      const fileName = file.name;
      await this.removeAnswer({ taskId: this.task.id, fileName: fileName })
        .then(() => {
          const fileUploadComponent = this.$refs.fileUploadRef;
          fileUploadComponent.uploadedFileCount--;
          fileUploadComponent.uploadedFiles.splice(fileIndex, 1);
        })
        .catch((error) => {
          this.toast.add({
            severity: 'error',
            summary: 'Произошла ошибка',
            detail: error.response.data.message,
            life: 3000
          });
        });
    },
    readFileAsync(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
          resolve({
            name: file.name,
            type: file.type,
            size: file.size,
            data: event.target.result
          });
        };

        reader.onerror = (error) => {
          reject(error);
        };

        reader.readAsDataURL(file);
      });
    },
    addUploadedFiles() {
      const fileUploadComponent = this.$refs.fileUploadRef;
      this.task.answers.forEach((file) => {
        const byteCharacters = atob(file.data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);

        const fileData = new File([byteArray], file.name, {
          type: this.getFileType(file.name)
        });
        const fileUrl = URL.createObjectURL(fileData);
        fileData.objectURL = fileUrl;
        fileUploadComponent.uploadedFiles.push(fileData);
      });
    },

    getFileType(fileName) {
      const fileExtension = fileName.split('.').pop().toLowerCase();

      const imageExtensions = ['png', 'jpg', 'jpeg', 'gif', 'bmp'];
      const documentExtensions = [
        'txt',
        'pdf',
        'doc',
        'docx',
        'xls',
        'xlsx',
        'ppt',
        'pptx'
      ];

      if (imageExtensions.includes(fileExtension)) {
        return 'image/' + fileExtension;
      } else if (documentExtensions.includes(fileExtension)) {
        return 'application/' + fileExtension;
      } else {
        return 'application/octet-stream';
      }
    },

    onRemoveTemplatingFile(file, removeFileCallback, index) {
      removeFileCallback(index);
      this.totalSize -= parseInt(this.formatSize(file.size));
      this.totalSizePercent = this.totalSize / 10;
    },

    formatSize(bytes) {
      const k = 1024;
      const dm = 3;
      const sizes = this.$primevue.config.locale.fileSizeTypes;

      if (bytes === 0) {
        return `0 ${sizes[0]}`;
      }

      const i = Math.floor(Math.log(bytes) / Math.log(k));
      const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

      return `${formattedSize} ${sizes[i]}`;
    }
  }
};
</script>

<style lang="scss">
.p-fileupload-content {
  padding: 0 1rem 1rem 1rem;
}
.file-upload-content {
  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__left {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__right {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__info {
    display: flex;
    flex-direction: column;
  }

  &__image {
    margin-right: 10px;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
