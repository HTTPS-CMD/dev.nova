<script lang="ts" setup>
import { Placeholder } from "@tiptap/extension-placeholder";
import { TextAlign } from "@tiptap/extension-text-align";
import { Underline } from "@tiptap/extension-underline";

interface IProps {
  modelValue?: string;
  placeholder?: string;
}

const props = defineProps<IProps>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): string;
}>();

const editor = useEditor({
  extensions: [
    TiptapStarterKit,
    TiptapLink.configure({
      openOnClick: false,
      autolink: true,
      defaultProtocol: "https",
    }),
    Placeholder.configure({
      // emptyEditorClass: 'is-editor-empty',
      placeholder: props.placeholder || "Enter Your content",
    }),
    Underline,
    TextAlign.configure({
      defaultAlignment: "right",
    }),
  ],
});

watch(
  () => editor.value?.getHTML(),
  (v) => {
    if (v) emit("update:modelValue", v);
  }
);

onMounted(() => {
  if (!!unref(editor) && !!props.modelValue) {
    unref(editor)?.commands.setContent(props.modelValue);
  }
});

onBeforeUnmount(() => {
  unref(editor)!.destroy();
});

const basics = computed(() => [
  {
    icon: "i-heroicons-bold-20-solid",
    click: () => editor.value?.chain().focus().toggleBold().run(),
    disabled: !editor.value?.can().chain().focus().toggleBold().run(),
    active: editor.value?.isActive("bold"),
  },
  {
    icon: "i-heroicons-italic-20-solid",
    click: () => editor.value?.chain().focus().toggleItalic().run(),
    disabled: !editor.value?.can().chain().focus().toggleItalic().run(),
    active: editor.value?.isActive("italic"),
  },
  {
    icon: "i-heroicons-underline-20-solid",
    click: () => editor.value?.chain().focus().toggleUnderline().run(),
    disabled: !editor.value?.can().chain().focus().toggleUnderline().run(),
    active: editor.value?.isActive("underline"),
  },
  {
    icon: "i-heroicons-strikethrough-20-solid",
    click: () => editor.value?.chain().focus().toggleStrike().run(),
    disabled: !editor.value?.can().chain().focus().toggleStrike().run(),
    active: editor.value?.isActive("strike"),
  },
]);

const alignments = computed(() => [
  {
    label: "Right",
    onSelect: () => editor.value?.commands.setTextAlign("right"),
    badge: "Shift R",
    icon: "fluent:text-align-right-20-regular",
    active: editor.value?.isActive("right"),
  },
  {
    label: "Center",
    onSelect: () => editor.value?.commands.setTextAlign("center"),
    badge: "Shift E",
    icon: "fluent:text-align-center-20-regular",
  },
  {
    label: "Left",
    onSelect: () => editor.value?.commands.setTextAlign("left"),
    badge: "Shift L",
    icon: "fluent:text-align-left-20-regular",
  },
  {
    label: "Justify",
    onSelect: () => editor.value?.commands.setTextAlign("justify"),
    badge: "Shift J",
    icon: "fluent:text-align-justify-20-regular",
  },
]);

const heading = computed(() => [
  {
    label: "Heading 1",
    active: editor.value?.isActive("heading", { level: 1 }) || false,
    click: () =>
      editor.value?.chain().focus().toggleHeading({ level: 1 }).run(),
    icon: "i-heroicons-h1-20-solid",
  },
  {
    label: "Heading 2",
    active: editor.value?.isActive("heading", { level: 2 }) || false,
    click: () =>
      editor.value?.chain().focus().toggleHeading({ level: 2 }).run(),
    icon: "i-heroicons-h2-20-solid",
  },
  {
    label: "Heading 3",
    active: editor.value?.isActive("heading", { level: 3 }) || false,
    click: () =>
      editor.value?.chain().focus().toggleHeading({ level: 3 }).run(),
    icon: "i-heroicons-h3-20-solid",
  },
  {
    label: "Heading 4",
    active: editor.value?.isActive("heading", { level: 4 }) || false,
    click: () =>
      editor.value?.chain().focus().toggleHeading({ level: 4 }).run(),
    icon: "i-heroicons-h4-20-solid",
  },
  {
    label: "Heading 5",
    active: editor.value?.isActive("heading", { level: 5 }) || false,
    click: () =>
      editor.value?.chain().focus().toggleHeading({ level: 5 }).run(),
    icon: "i-heroicons-h5-20-solid",
  },
  {
    label: "Heading 6",
    active: editor.value?.isActive("heading", { level: 6 }) || false,
    click: () =>
      editor.value?.chain().focus().toggleHeading({ level: 6 }).run(),
    icon: "i-heroicons-h6-20-solid",
  },
]);

const lists = computed(() => [
  {
    label: "bulletList",
    active: editor.value?.isActive("bulletList"),
    click: () => editor.value?.chain().focus().toggleBulletList().run(),
  },
  {
    label: "orderedList",
    active: editor.value?.isActive("orderedList"),
    click: () => editor.value?.chain().focus().toggleOrderedList().run(),
  },
]);

defineShortcuts({
  alt_shift_c: {
    handler: () => editor.value?.chain().focus().toggleCode().run(),
    // whenever: [
    //   computed(() => !editor.value?.can().chain().focus().toggleCode().run()),
    // ],
  },
  alt_shift_l: {
    handler: () => editor.value?.chain().focus().unsetAllMarks().run(),
    usingInput: true,
  },
});
</script>

<template>
  <UCard :ui="{ body: 'px-1 py-2 sm:p-3', header: 'px-1 py-2 sm:p-3' }">
    <template #header>
      <div v-if="editor" class="flex flex-wrap items-center gap-2">
        <UButton
          v-for="item in basics"
          :key="item.icon"
          :color="item.active ? 'primary' : 'neutral'"
          @click="item.click()"
          v-bind="_omit(item, ['active', 'click'])"
          variant="outline"
        />
        <USeparator orientation="vertical" class="h-8" />
        <UTooltip text="Clear Nodes">
          <UButton
            @click="editor.chain().focus().clearNodes().run()"
            color="neutral"
            icon="fluent:text-t-20-filled"
            variant="outline"
          />
        </UTooltip>
        <UButton
          :color="editor.isActive('paragraph') ? 'primary' : 'neutral'"
          @click="editor.chain().focus().setParagraph().run()"
          icon="icon-park-outline:paragraph-rectangle"
          variant="outline"
        />
        <USeparator orientation="vertical" class="h-8" />
        <UPopover>
          <UButton
            label="Alignment"
            color="neutral"
            icon="fluent:text-align-right-20-regular"
            trailing-icon="i-heroicons-chevron-down-20-solid"
          />
          <template #panel>
            <UNavigationMenu :items="alignments" orientation="vertical" />
          </template>
        </UPopover>
        <UPopover>
          <UButton
            label="Heading"
            color="neutral"
            icon="i-heroicons-h1-20-solid"
            trailing-icon="i-heroicons-chevron-down-20-solid"
          />
          <template #panel>
            <UNavigationMenu :items="heading" orientation="vertical" />
          </template>
        </UPopover>
        <USeparator orientation="vertical" class="h-8" />
        <UPopover>
          <UButton
            label="Lists"
            color="neutral"
            trailing-icon="i-heroicons-chevron-down-20-solid"
          />
          <template #panel>
            <UNavigationMenu :items="lists" orientation="vertical" />
          </template>
        </UPopover>
        <UTooltip text="blockquote">
          <UButton
            :color="editor.isActive('blockquote') ? 'primary' : 'neutral'"
            @click="editor.chain().focus().toggleBlockquote().run()"
            icon="tabler:blockquote"
            variant="outline"
          />
        </UTooltip>
        <USeparator orientation="vertical" class="h-8" />
        <UTooltip text="Redo">
          <UButton
            :disabled="!editor.can().chain().focus().redo().run()"
            @click="editor.chain().focus().redo().run()"
            color="neutral"
            icon="i-heroicons-arrow-uturn-right-20-solid"
            size="xs"
            variant="ghost"
          />
        </UTooltip>
        <UTooltip text="Undo">
          <UButton
            :disabled="!editor.can().chain().focus().undo().run()"
            @click="editor.chain().focus().undo().run()"
            color="neutral"
            icon="i-heroicons-arrow-uturn-left-20-solid"
            size="xs"
            variant="ghost"
          />
        </UTooltip>
        <UTooltip :kbds="['C', 'Shift', 'Alt']" text="Code">
          <UButton
            :color="editor.isActive('code') ? 'primary' : 'neutral'"
            :disabled="!editor.can().chain().focus().toggleCode().run()"
            @click="editor.chain().focus().toggleCode().run()"
            icon="i-heroicons-code-bracket-20-solid"
            variant="outline"
          />
        </UTooltip>
        <UTooltip :kbds="['L', 'Shift', 'Alt']" text="Clear Marks">
          <UButton
            @click="editor.chain().focus().unsetAllMarks().run()"
            color="neutral"
            icon="i-heroicons-backspace-20-solid"
            variant="ghost"
          />
        </UTooltip>
      </div>
    </template>
    <TiptapEditorContent :editor="editor" />
  </UCard>
</template>
