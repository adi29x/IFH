import React, { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import ImageTool from '@editorjs/image';
import CodeTool from '@editorjs/code';
import Table from '@editorjs/table';
import Quote from '@editorjs/quote';
import Embed from '@editorjs/embed';
import RawTool from '@editorjs/raw';
import InlineCode from '@editorjs/inline-code';
import Marker from '@editorjs/marker';
import Warning from '@editorjs/warning';
import Delimiter from '@editorjs/delimiter';
import Underline from '@editorjs/underline';
import Checklist from '@editorjs/checklist';
import AlignmentTuneTool from 'editorjs-text-alignment-blocktune';
import { supabase } from '../../utils/supabaseClient';

const EditorBlock = ({ data, onChange, holder }) => {
  const ejInstance = useRef();

  useEffect(() => {
    if (!ejInstance.current) {
      initEditor();
    }
    return () => {
      ejInstance.current?.destroy();
      ejInstance.current = null;
    };
  }, []);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: holder,
      data: data,
      onReady: () => {
        ejInstance.current = editor;
      },
      onChange: async () => {
        const content = await editor.save();
        onChange(content);
      },
      tools: {
        tunes: {
          alignment: {
            class: AlignmentTuneTool,
            config: {
              default: 'left',
              blocks: {
                header: 'center',
                list: 'left'
              }
            },
          }
        },
        header: {
          class: Header,
          inlineToolbar: true,
          tunes: ['alignment'],
          config: {
            placeholder: 'Enter a header',
            levels: [1, 2, 3, 4, 5, 6],
            defaultLevel: 2,
          }
        },
        paragraph: {
          tunes: ['alignment'],
          inlineToolbar: true,
        },
        list: {
          class: List,
          inlineToolbar: true,
          config: {
            defaultStyle: 'unordered'
          }
        },
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
        image: {
          class: ImageTool,
          config: {
            uploader: {
              async uploadByFile(file) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const filePath = `blog-content/${fileName}`;
                const { error: uploadError } = await supabase.storage.from('media').upload(filePath, file);
                if (uploadError) throw uploadError;
                const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(filePath);
                return { success: 1, file: { url: publicUrl } };
              }
            }
          }
        },
        code: CodeTool,
        table: {
          class: Table,
          inlineToolbar: true,
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
          config: {
            quotePlaceholder: 'Enter a quote',
            captionPlaceholder: 'Author',
          },
        },
        embed: {
          class: Embed,
          config: { services: { youtube: true, vimeo: true } }
        },
        marker: {
          class: Marker,
          shortcut: 'CMD+SHIFT+M',
        },
        underline: Underline,
        inlineCode: InlineCode,
        warning: Warning,
        delimiter: Delimiter,
        raw: RawTool,
      },
    });
  };

  return <div id={holder} className="prose prose-xl max-w-none min-h-[600px] cms-editor-white" />;
};

export default EditorBlock;
