<script setup lang="ts">
import {Editor, EditorContent} from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';

const editor = ref<Editor | null>(null);
const emit = defineEmits(['update:modelValue']);
const model = defineModel({default: ''});

watch(model, (value) => {
  const isSame = editor.value.getHTML() === value;

  if (isSame) {
    return;
  }

  editor.value?.commands.setContent(value);
});

onMounted(() => {
  editor.value = new Editor({
    content: model.value,
    extensions: [
      StarterKit,
    ],
    onUpdate: () => {
      emit('update:modelValue', editor.value.getHTML());
    },
  });
});

onBeforeUnmount(() => {
  editor.value?.destroy();
});
</script>

<template>
  <div>
    <div v-if="editor" class="editor-controls py-3">
      <v-btn size="small" @click="editor.chain().focus().toggleBold().run()" :disabled="!editor.can().chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
        <v-icon size="small">mdi-format-bold</v-icon>
      </v-btn>
      <v-btn size="small" @click="editor.chain().focus().toggleItalic().run()" :disabled="!editor.can().chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
        <v-icon size="small">mdi-format-italic</v-icon>
      </v-btn>
      <v-btn size="small" @click="editor.chain().focus().toggleStrike().run()" :disabled="!editor.can().chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
        <v-icon size="small">mdi-format-strikethrough</v-icon>
      </v-btn>
<!--      <v-btn size="small" @click="editor.chain().focus().toggleCode().run()" :disabled="!editor.can().chain().focus().toggleCode().run()" :class="{ 'is-active': editor.isActive('code') }">-->
<!--        <v-icon size="small">mdi-code-tags</v-icon>-->
<!--      </v-btn>-->
      <v-btn size="small" @click="editor.chain().focus().unsetAllMarks().run()">
        <v-icon size="small">mdi-format-clear</v-icon>
      </v-btn>
<!--      <v-bn  size="small" @click="editor.chain().focus().clearNodes().run()">-->
<!--        <v-  size="small"con>mdi-format-clear-all</v-icon>-->
<!--      </v-btn>-->
      <v-btn size="small" @click="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor.isActive('paragraph') }">
        <v-icon size="small">mdi-format-paragraph</v-icon>
      </v-btn>
      <v-btn size="small" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
        <v-icon size="small">mdi-format-header-1</v-icon>
      </v-btn>
      <v-btn size="small" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
        <v-icon size="small">mdi-format-header-2</v-icon>
      </v-btn>
      <v-btn size="small" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
        <v-icon size="small">mdi-format-header-3</v-icon>
      </v-btn>
      <v-btn size="small" @click="editor.chain().focus().toggleHeading({ level: 4 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
        <v-icon size="small">mdi-format-header-4</v-icon>
      </v-btn>
      <v-btn size="small" @click="editor.chain().focus().toggleHeading({ level: 5 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
        <v-icon size="small">mdi-format-header-5</v-icon>
      </v-btn>
      <v-btn size="small" @click="editor.chain().focus().toggleHeading({ level: 6 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">
        <v-icon size="small">mdi-format-header-6</v-icon>
      </v-btn>
      <v-btn size="small" @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
        <v-icon size="small">mdi-format-list-bulleted</v-icon>
      </v-btn>
      <v-btn size="small" @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }">
        <v-icon size="small">mdi-format-list-numbered</v-icon>
      </v-btn>
<!--      <v-btn size="small" @click="editor.chain().focus().toggleCodeBlock().run()" :class="{ 'is-active': editor.isActive('codeBlock') }">-->
<!--        <v-icon size="small">mdi-code-braces</v-icon>-->
<!--      </v-btn>-->
      <v-btn size="small" @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 'is-active': editor.isActive('blockquote') }">
        <v-icon size="small">mdi-format-quote-open</v-icon>
      </v-btn>
<!--      <v-btn @click="editor.chain().focus().setHorizontalRule().run()">-->
<!--        <v-icon>mdi-horizontal-rule</v-icon>-->
<!--      </v-btn>-->
      <v-btn size="small" @click="editor.chain().focus().setHardBreak().run()">
        <v-icon size="small">mdi-format-line-spacing</v-icon>
      </v-btn>
      <v-btn size="small" @click="editor.chain().focus().undo().run()" :disabled="!editor.can().chain().focus().undo().run()">
        <v-icon size="small">mdi-undo</v-icon>
      </v-btn>
      <v-btn size="small" @click="editor.chain().focus().redo().run()" :disabled="!editor.can().chain().focus().redo().run()">
        <v-icon size="small">mdi-redo</v-icon>
      </v-btn>
    </div>
    <editor-content :editor="editor" class="border rounded-lg pa-4"/>
  </div>
</template>

<style lang="scss">
/* Basic editor styles */
.tiptap {
  outline: none;

  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0D0D0D;
    color: #FFF;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0D0D0D, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0D0D0D, 0.1);
    margin: 2rem 0;
  }
}

.editor-controls {
  ::-webkit-scrollbar {
    width: 14px;
    height: 14px
  }

  ::-webkit-scrollbar-track {
    border: 4px solid transparent;
    background-clip: padding-box;
    border-radius: 8px;
    background-color: transparent
  }

  ::-webkit-scrollbar-thumb {
    border: 4px solid rgba(0,0,0,0);
    background-clip: padding-box;
    border-radius: 8px;
    background-color: #0000
  }

  :hover::-webkit-scrollbar-thumb {
    background-color: #0000001a
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #00000026
  }

  ::-webkit-scrollbar-button {
    display: none;
    width: 0;
    height: 0
  }

  ::-webkit-scrollbar-corner {
    background-color: transparent
  }

  button,input,select {
    font-size: inherit;
    font-family: inherit;
    color: #000;
    margin: .1rem;
    border-radius: .3rem;
    padding: .1rem .2rem;
    background: white;
    accent-color: black
  }

  button[disabled],input[disabled],select[disabled] {
    opacity: .3
  }

  .tiptap:focus {
    outline: none
  }

  .is-active {
    background: black;
    color: #fff
  }
}
</style>