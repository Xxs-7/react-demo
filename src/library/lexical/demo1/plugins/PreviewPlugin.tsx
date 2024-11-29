import { useEffect, useState } from "react";
import { $generateHtmlFromNodes } from "@lexical/html";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

const EditorWithPreview = () => {
  const [editor] = useLexicalComposerContext();
  const [previewContent, setPreviewContent] = useState("");

  useEffect(() => {
    const unregister = editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const htmlString = $generateHtmlFromNodes(editor, null);
        setPreviewContent(htmlString);
      });
    });

    return () => unregister();
  }, [editor]);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: previewContent }}
      className='editor-preview' // 给预览内容添加类
      style={{ border: "1px solid #ccc", padding: "10px" }}
    />
  );
};

export default EditorWithPreview;
