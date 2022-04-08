import { useRef } from 'react';
import MonacoEditor, { OnMount } from '@monaco-editor/react';
import {} from 'monaco-editor';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';

import Highlighter from 'monaco-jsx-highlighter';

import 'components/code-editor.css';
import 'components/syntax.css';

interface CodeEditorProps {
    initialValue: string;
    onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
    const editorRef = useRef<any>(null);

    const onEditorDidMount: OnMount = async (monacoEditor, monacoInstance) => {
        editorRef.current = monacoEditor;
        monacoEditor.onDidChangeModelContent(() => {
            onChange(monacoEditor.getModel()?.getValue() || '');
        });

        monacoEditor.getModel()?.updateOptions({ tabSize: 2 });

        const { default: traverse } = await import('@babel/traverse');
        const { parse } = await import('@babel/parser');

        const highlighter = new Highlighter(
            monacoInstance,
            parse,
            traverse,
            monacoEditor
        );

        highlighter.highLightOnDidChangeModelContent();
    };

    const onFormatClick = () => {
        // get current value from editor
        const unformatted = editorRef.current.getModel().getValue();
        // format the value
        const formatted = prettier
            .format(unformatted, {
                parser: 'babel',
                plugins: [parser],
                useTabs: false,
                semi: true,
                singleQuote: true,
            })
            .replace(/\n$/, '');

        // set the formatted value back in the editor
        editorRef.current.setValue(formatted);
    };

    return (
        <div className='editor-wrapper'>
            <button
                className='button button-format is-primary is-small'
                onClick={onFormatClick}>
                Format
            </button>
            <MonacoEditor
                // @ts-ignore
                onMount={onEditorDidMount}
                height='100%'
                language='javascript'
                theme='dark'
                value={initialValue}
                options={{
                    wordWrap: 'on',
                    minimap: { enabled: false },
                    showUnused: false,
                    folding: false,
                    lineNumbersMinChars: 3,
                    fontSize: 16,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                }}
            />
        </div>
    );
};

export default CodeEditor;
