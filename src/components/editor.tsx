import {
  EditorContent,
  useCurrentEditor,
  useEditor,
  EditorContext,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Ref } from "@/components/editor-ref.tsx";
import "./editor.scss";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group.tsx";
import { Underline } from "@tiptap/extension-underline";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { ListItem } from "@tiptap/extension-list-item";
import { TextStyle } from "@tiptap/extension-text-style";
import { Modifier } from "@/components/editor-modifiers.tsx";

// define your extension array
const extensions = [
  StarterKit.configure({
    bulletList: {
      HTMLAttributes: {
        class: "bullet_class",
      },
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
  Ref,
  Underline,
  Typography,
  ListItem,
  TextStyle,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
];

const content = "<p>Hello World!</p>";

const modifiers = Modifier.groups();

export function TextEditor() {
  const editor = useEditor({
    extensions,
    content,
  })!;

  return (
    <EditorContext.Provider value={{ editor }}>
      <div className="p-2">
        <div className="flex row space-x-2">
          <div className="flex flex-col space-y-3">
            {modifiers.map((group, i) => (
              <ToggleGroup
                key={i}
                type="multiple"
                size="sm"
                className="flex-col"
              >
                {group.map((modifier) => (
                  <ToggleButton key={modifier} modifier={modifier} />
                ))}
              </ToggleGroup>
            ))}
          </div>
          <EditorContent
            editor={editor}
            className="text-sm text-neutral-100 flex-grow"
          />
        </div>
      </div>
    </EditorContext.Provider>
  );
}

type ToggleButtonProps = {
  modifier: Modifier;
};

const ToggleButton = ({ modifier }: ToggleButtonProps) => {
  const context = useCurrentEditor();
  if (!context.editor) {
    return null;
  }

  const Icon = Modifier.Icon(modifier);

  return (
    <ToggleGroupItem
      value={modifier}
      onClick={() => Modifier.toggle(context.editor!, modifier)}
      data-state={Modifier.isActive(context.editor!, modifier) ? "on" : "off"}
      disabled={Modifier.isDisabled(context.editor!, modifier)}
    >
      <Icon className="h-4 w-4" fontSize="sm" />
    </ToggleGroupItem>
  );
};
