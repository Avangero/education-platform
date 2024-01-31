<template>
    <FileUpload
        name="answer"
        style="background: #176EF2"
        :customUpload="true"
        @uploader="$emit('upload', $event)"
        @error="$emit('error', $event)"
        :multiple="true"
        :maxFileSize="1000000"
    >
        <template #empty>
            <p>Перетащите файл.</p>
        </template>
    </FileUpload>
</template>

<script>
import FileUpload from 'primevue/fileupload';

export default {
    components: { FileUpload }
};
</script>
