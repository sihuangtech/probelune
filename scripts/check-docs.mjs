import { access, readdir, readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const required = ['README.md', 'README.zh-CN.md', 'PRD.md', 'LICENSE',
  'CHANGELOG.md', 'CONTRIBUTING.md', 'CODE_OF_CONDUCT.md', 'SECURITY.md'];
for (const file of required) await access(resolve(root, file));

async function markdownFiles(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = resolve(dir, entry.name);
    if (entry.isDirectory()) files.push(...await markdownFiles(path));
    else if (entry.name.endsWith('.md')) files.push(path);
  }
  return files;
}

const files = [...required.filter(file => file.endsWith('.md')).map(file => resolve(root, file)),
  ...await markdownFiles(resolve(root, 'docs')),
  ...await markdownFiles(resolve(root, '.github'))];
let links = 0;
for (const file of files) {
  // 只校验本仓库的相对链接；远程仓库和标题锚点不当作本地文件。
  const source = (await readFile(file, 'utf8')).replace(/```[\s\S]*?```/g, '');
  for (const match of source.matchAll(/!?\[[^\]]*\]\(([^\s)]+)(?:\s+"[^"]*")?\)/g)) {
    const target = match[1].replace(/^<|>$/g, '').split('#')[0];
    if (!target || /^[a-z][a-z\d+.-]*:/i.test(target)) continue;
    try {
      await access(resolve(dirname(file), decodeURIComponent(target)));
    } catch {
      throw new Error(`Broken local link in ${file}: ${target}`);
    }
    links++;
  }
}
console.log(`Validated ${files.length} Markdown files and ${links} local links.`);
