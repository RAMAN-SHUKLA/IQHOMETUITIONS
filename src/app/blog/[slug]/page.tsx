import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import { MessageCircle, ArrowLeft, Calendar, Tag } from "lucide-react";
import Link from "next/link";
import { SITE_CONFIG } from "@/config/site";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const blogDir = "src/content/blog";
  const files = fs.readdirSync(path.join(process.cwd(), blogDir));
  return files.map((filename) => ({
    slug: filename.replace(".mdx", ""),
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), "src/content/blog", `${slug}.mdx`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data: frontmatter } = matter(fileContent);

  return {
    title: `${frontmatter.title} | IQ Hometutions`,
    description: frontmatter.description || frontmatter.excerpt,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), "src/content/blog", `${slug}.mdx`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data: frontmatter, content } = matter(fileContent);

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-3xl">
        <Link href="/blog" className="flex items-center text-muted hover:text-primary transition-colors mb-12 group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Blog</span>
        </Link>

        <header className="mb-12">
          <div className="flex items-center space-x-4 mb-6">
            <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              {frontmatter.category || "Education"}
            </span>
            <span className="flex items-center text-muted text-sm">
              <Calendar className="w-4 h-4 mr-2" />
              {frontmatter.publishedAt || frontmatter.date}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
            {frontmatter.title}
          </h1>
          {frontmatter.image && (
            <div className="relative w-full h-[400px] rounded-3xl overflow-hidden mb-12 border border-white/10">
              <Image src={frontmatter.image} alt={frontmatter.title} fill className="object-cover" unoptimized={true} />
            </div>
          )}
        </header>

        <article className="prose prose-invert prose-orange max-w-none mb-20 prose-headings:text-white prose-p:text-muted prose-strong:text-white prose-a:text-primary">
          <MDXRemote source={content} />
        </article>

        {/* Post CTA */}
        <div className="glass-card p-10 rounded-[2.5rem] border border-white/5 text-center">
          <h3 className="text-2xl font-bold text-white mb-6">Found this helpful?</h3>
          <p className="text-muted mb-8 italic">Find the perfect home tutor for your child today.</p>
          <Link
            href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
            className="inline-flex items-center space-x-3 bg-primary text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transition-all shadow-lg"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Consult on WhatsApp</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
