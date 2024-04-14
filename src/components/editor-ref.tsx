import Link from "@tiptap/extension-link";
import { TextSelection } from "@tiptap/pm/state";
import { InputRule } from "@tiptap/react";

const refExpr = /(?:^|\s)(\[\[((?:[^[\]]+))]])$/;

export const Ref = Link.extend({
  name: "ref",
  inclusive: false,

  onUpdate() {
    // how to update the link?
  },

  addInputRules() {
    return [
      new InputRule({
        find: /\[$/,
        handler: ({ state, range }) => {
          const { tr } = state;

          if (range.from == range.to) {
            // Handle typing [[
            const before = state.doc.textBetween(range.from - 2, range.from);
            if (before.includes("[") && before !== "[[") {
              // We've confirmed that we have exactly two opening double-brackets
              tr.insertText("[]]", range.to);
              tr.addMark(
                range.from - 1,
                range.to + 3,
                this.type.create({
                  href: "#",
                  class: "ref",
                }),
              );
              tr.setSelection(TextSelection.create(tr.doc, range.from + 1));
            }
          } else {
            // Handle wrapping some text
            tr.insertText("[", range.from);
            tr.insertText("]", range.to + 1);

            // Extend the selection to include the new brackets, or if we have double-brackets,
            // move the cursor to the end
            if (refExpr.test(tr.doc.textBetween(range.from, range.to + 2))) {
              // Setting selection to end of brackets
              tr.setSelection(TextSelection.create(tr.doc, range.to + 2));
              tr.addMark(
                range.from - 1,
                range.to + 2,
                this.type.create({
                  href: "#",
                  class: "ref",
                }),
              );

              // Maybe insert space after brackets ??
              // tr.insertText(' ', range.to+2)
            } else {
              // Selected brackets
              tr.setSelection(
                TextSelection.create(tr.doc, range.from, range.to + 2),
              );
            }
          }
        },
      }),
    ];
  },
});
