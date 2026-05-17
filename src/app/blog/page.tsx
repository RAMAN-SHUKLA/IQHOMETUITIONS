import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Image from "next/image";
import { ArrowRight, Calendar, Tag } from "lucide-react";

export const metadata = {
  title: "Education Blog | IQ Hometutions Kanpur",
  description: "Latest tips, guides and news about home tuition and education in Kanpur.",
};

export default function BlogPage() {
  const blogDir = "src/content/blog";
  const files = fs.readdirSync(path.join(process.cwd(), blogDir));

  const posts = files.map((filename) => {
    const fileContent = fs.readFileSync(path.join(process.cwd(), blogDir, filename), "utf-8");
    const { data: frontmatter } = matter(fileContent);
    return {
      meta: frontmatter,
      slug: filename.replace(".mdx", ""),
    };
  }).sort((a, b) => new Date(b.meta.date || b.meta.publishedAt).getTime() - new Date(a.meta.date || a.meta.publishedAt).getTime());

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Our <span className="text-primary italic">Blog</span>
          </h1>
          <p className="text-muted text-xl max-w-2xl mx-auto">
            Insights, guides, and tips to help you and your child excel in their academic journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <Link 
              key={post.slug} 
              href={`/blog/${post.slug}`}
              className="group glass-card rounded-[2.5rem] border border-white/5 hover:border-primary/30 transition-all flex flex-col overflow-hidden"
            >
              {post.meta.image && (
                <div className="relative w-full h-48 bg-white/5">
                  <Image src={post.meta.image} alt={post.meta.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized={true} />
                </div>
              )}
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center space-x-4 mb-6">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {post.meta.category || "Education"}
                  </span>
                  <span className="flex items-center text-muted text-xs">
                    <Calendar className="w-3 h-3 mr-1" />
                    {post.meta.date || post.meta.publishedAt}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
                  {post.meta.title}
                </h2>
                <p className="text-muted text-sm leading-relaxed mb-8 flex-grow">
                  {post.meta.description || post.meta.excerpt}
                </p>
                <div className="flex items-center text-primary font-bold text-sm uppercase tracking-widest space-x-2">
                  <span>Read Full Post</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
