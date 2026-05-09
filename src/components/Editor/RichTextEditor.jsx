import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const RichTextEditor = ({ value, onChange }) => {
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['clean'],
      ['code-block', 'blockquote']
    ],
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video', 'color', 'background', 'align', 'script', 'code-block'
  ];

  return (
    <div className="quill-editor-container">
      <ReactQuill 
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder="Start crafting your industrial masterpiece..."
        className="bg-white min-h-[600px] rounded-[32px] overflow-hidden"
      />
      <style>{`
        .ql-toolbar.ql-snow {
          border: none !important;
          background: #F9FAFB !important;
          padding: 20px !important;
          border-bottom: 1px solid #F3F4F6 !important;
          border-radius: 32px 32px 0 0 !important;
        }
        .ql-container.ql-snow {
          border: none !important;
          font-size: 18px !important;
          font-family: 'Inter', sans-serif !important;
          padding: 20px !important;
        }
        .ql-editor {
          min-h-[600px] !important;
          line-height: 1.6 !important;
        }
        .ql-editor h1 { font-weight: 800 !important; font-size: 3rem !important; }
        .ql-editor h2 { font-weight: 700 !important; font-size: 2.25rem !important; }
        .ql-editor p { margin-bottom: 1.5rem !important; color: #374151 !important; }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
