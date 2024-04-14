import { Editor } from "@tiptap/react";
import { JSXElementConstructor } from "react";
import {
  FormatAlignCenter,
  FormatAlignLeft,
  FormatAlignRight,
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatStrikethrough,
  FormatUnderlined,
} from "@mui/icons-material";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";

export enum Modifier {
  Bold = "bold",
  Italic = "italic",
  Underline = "underline",
  Strike = "strike",
  AlignLeft = "align-left",
  AlignCenter = "align-center",
  AlignRight = "align-right",
  BulletList = "bulletList",
  OrderedList = "orderedList",
  H1 = "heading-1",
  H2 = "heading-2",
  H3 = "heading-3",
}

export namespace Modifier {
  export function groups(): Modifier[][] {
    return [
      [Modifier.Bold, Modifier.Italic, Modifier.Underline, Modifier.Strike],
      [Modifier.BulletList, Modifier.OrderedList],
      [Modifier.AlignLeft, Modifier.AlignCenter, Modifier.AlignRight],
    ];
  }

  export function toggle(editor: Editor, state: Modifier): boolean {
    switch (state) {
      case Modifier.Bold:
        return editor.chain().focus().toggleBold().run();
      case Modifier.Italic:
        return editor.chain().focus().toggleItalic().run();
      case Modifier.Underline:
        return editor.chain().focus().toggleUnderline().run();
      case Modifier.Strike:
        return editor.chain().focus().toggleStrike().run();
      case Modifier.H1:
        return editor.chain().focus().toggleHeading({ level: 1 }).run();
      case Modifier.H2:
        return editor.chain().focus().toggleHeading({ level: 2 }).run();
      case Modifier.H3:
        return editor.chain().focus().toggleHeading({ level: 3 }).run();
      case Modifier.AlignLeft:
        return editor.chain().focus().setTextAlign("left").run();
      case Modifier.AlignCenter:
        return editor.chain().focus().setTextAlign("center").run();
      case Modifier.AlignRight:
        return editor.chain().focus().setTextAlign("right").run();
      case Modifier.BulletList:
        return editor.chain().focus().toggleBulletList().run();
      case Modifier.OrderedList:
        return editor.chain().focus().toggleOrderedList().run();
    }
  }

  export function isDisabled(editor: Editor, state: Modifier): boolean {
    switch (state) {
      case Modifier.Bold:
        return !editor.can().toggleBold();
      case Modifier.Italic:
        return !editor.can().toggleItalic();
      case Modifier.Underline:
        return !editor.can().toggleUnderline();
      case Modifier.Strike:
        return !editor.can().toggleStrike();
      case Modifier.H1:
        return !editor.can().setHeading({ level: 1 });
      case Modifier.H2:
        return !editor.can().setHeading({ level: 2 });
      case Modifier.H3:
        return !editor.can().setHeading({ level: 3 });
      case Modifier.AlignLeft:
        return !editor.can().setTextAlign("left");
      case Modifier.AlignCenter:
        return !editor.can().setTextAlign("center");
      case Modifier.AlignRight:
        return !editor.can().setTextAlign("right");
      case Modifier.BulletList:
        return !editor.can().toggleBulletList();
      case Modifier.OrderedList:
        return !editor.can().toggleOrderedList();
    }
  }

  export function Icon(state: Modifier): JSXElementConstructor<any> {
    switch (state) {
      case Modifier.Bold:
        return FormatBold;
      case Modifier.Italic:
        return FormatItalic;
      case Modifier.Underline:
        return FormatUnderlined;
      case Modifier.Strike:
        return FormatStrikethrough;
      case Modifier.AlignLeft:
        return FormatAlignLeft;
      case Modifier.AlignCenter:
        return FormatAlignCenter;
      case Modifier.AlignRight:
        return FormatAlignRight;
      case Modifier.BulletList:
        return FormatListBulleted;
      case Modifier.OrderedList:
        return FormatListNumberedIcon;
      default:
        return () => null;
    }
  }

  export function isActive(editor: Editor, state: Modifier): boolean {
    switch (state) {
      case Modifier.AlignLeft:
        return editor.isActive({ textAlign: "left" });
      case Modifier.AlignCenter:
        return editor.isActive({ textAlign: "center" });
      case Modifier.AlignRight:
        return editor.isActive({ textAlign: "right" });
      case Modifier.H1:
        return editor.isActive("heading", { level: 1 });
      case Modifier.H2:
        return editor.isActive("heading", { level: 2 });
      case Modifier.H3:
        return editor.isActive("heading", { level: 3 });
      default:
        return editor.isActive(state);
    }
  }
}
