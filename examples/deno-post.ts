import * as path from "https://deno.land/std@0.128.0/path/mod.ts";
import parseFrontMatter from "https://esm.sh/front-matter";
import invariant from "https://esm.sh/tiny-invariant";
import { marked } from "https://esm.sh/marked";
import { json } from "https://esm.sh/@remix-run/server-runtime?pin=v68";

export type Post = {
  slug: string;
  title: string;
};

export type PostMarkdownAttributes = {
  title: string;
};

const root = path.dirname(path.dirname(path.fromFileUrl(import.meta.url)))
const postsPath = path.join(root, "posts");

function isValidPostAttributes(
  attributes: any
): attributes is PostMarkdownAttributes {
  return attributes?.title;
}

async function toArray<T>(asyncIterator: AsyncIterable<T>){ 
  const arr = []; 
  for await(const i of asyncIterator) arr.push(i); 
  return arr;
}
  
export async function getPosts() {
  const dir = await toArray(await Deno.readDir(postsPath))
  return Promise.all(
    dir.map(async (entry) => {
      const file = await Deno.readTextFile(
        path.join(postsPath, entry.name)
      );
      const { attributes } = parseFrontMatter(file.toString());
      invariant(
        isValidPostAttributes(attributes),
        `${entry.name} has bad meta data!`
      );
      return {
        slug: entry.name.replace(/\.md$/, ""),
        title: attributes.title,
      };
    })
  );
}

export async function getPost(slug: string) {
  const filepath = path.join(postsPath, slug + ".md");
  const file = await Deno.readTextFile(filepath);
  const { attributes, body } = parseFrontMatter(file.toString());
  invariant(
    isValidPostAttributes(attributes),
    `Post ${filepath} is missing attributes`
  );
  const html = marked(body);
  return { slug, html, title: attributes.title };
}

type NewPost = {
  title: string;
  slug: string;
  markdown: string;
};

export async function createPost(post: NewPost) {
  const md = `---\ntitle: ${post.title}\n---\n\n${post.markdown}`;
  await Deno.writeTextFile(
    path.join(postsPath, post.slug + ".md"),
    md
  );
  return json(await getPost(post.slug));
}