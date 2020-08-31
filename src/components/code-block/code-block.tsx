import * as React from 'react';
import { CodeBlock as CodeBlockBase, CodeBlockProps } from '@stacks/ui';
// @ts-ignore
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import { clarity } from '@components/code-block/clarity';
clarity(Prism);
const CodeBlock = (props: Omit<CodeBlockProps, 'Prism'>) => {
  return <CodeBlockBase Prism={Prism as any} {...props} />;
};

export default CodeBlock;
