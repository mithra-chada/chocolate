import { useEffect } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeft, Clock, User } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { trpc } from "@/providers/trpc";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading } = trpc.blog.bySlug.useQuery({ slug: slug || "" });
  const { data: relatedPosts } = trpc.blog.list.useQuery();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (isLoading) {
    return (
      <div className="bg-[#1B0F0A] min-h-screen">
        <Navbar />
        <div className="pt-24 pb-16 max-w-3xl mx-auto px-6 animate-pulse">
          <div className="h-8 bg-[#2B1E16] rounded w-3/4 mb-4" />
          <div className="h-4 bg-[#2B1E16] rounded w-1/3 mb-8" />
          <div className="aspect-video bg-[#2B1E16] mb-8" />
          <div className="space-y-3">
            <div className="h-4 bg-[#2B1E16] rounded w-full" />
            <div className="h-4 bg-[#2B1E16] rounded w-full" />
            <div className="h-4 bg-[#2B1E16] rounded w-2/3" />
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="bg-[#1B0F0A] min-h-screen">
        <Navbar />
        <div className="pt-24 pb-16 max-w-3xl mx-auto px-6 text-center py-24">
          <p className="font-serif text-2xl text-[#F4EBE1]/40 mb-4">Article not found</p>
          <Link to="/journal" className="text-[#C9A46B] hover:text-[#F4EBE1] transition-colors text-sm">
            Back to journal
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const related = relatedPosts?.filter((p) => p.id !== post.id).slice(0, 3) || [];

  return (
    <div className="bg-[#1B0F0A] min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16">
        <article className="max-w-3xl mx-auto px-6">
          {/* Back */}
          <Link
            to="/journal"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.08em] text-[#F4EBE1]/50 hover:text-[#C9A46B] transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            Back to journal
          </Link>

          {/* Header */}
          {post.category && (
            <span className="text-[10px] uppercase tracking-[0.14em] text-[#C9A46B] mb-3 block">
              {post.category}
            </span>
          )}
          <h1 className="font-serif text-4xl md:text-5xl text-[#F4EBE1] mb-4 leading-tight">{post.title}</h1>
          <div className="flex items-center gap-4 mb-8 text-xs text-[#F4EBE1]/50">
            {post.author && (
              <span className="flex items-center gap-1">
                <User size={12} />
                {post.author}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          {/* Image */}
          {post.image && (
            <div className="aspect-video overflow-hidden mb-10">
              <div className="w-full h-full overflow-hidden bg-[#231008]" style={{ borderRadius: 'inherit' }}>
      <img src={post.image} alt={post.title} className="w-full h-full object-cover" onLoad={(e) => e.currentTarget.classList.add('img-loaded')} />
    </div>
            </div>
          )}

          {/* Content */}
          <div className="prose-custom">
            {post.excerpt && (
              <p className="font-serif text-xl text-[#F4EBE1]/80 italic mb-6 leading-relaxed">
                {post.excerpt}
              </p>
            )}
            <div className="text-base text-[#F4EBE1]/60 leading-relaxed font-light whitespace-pre-line">
              {post.content}
            </div>
          </div>
        </article>

        {/* Related */}
        {related.length > 0 && (
          <div className="max-w-3xl mx-auto px-6 mt-16 pt-16 border-t border-[#C9A46B]/10">
            <h3 className="font-serif text-2xl text-[#F4EBE1] mb-6">More from the journal</h3>
            <div className="space-y-6">
              {related.map((rp) => (
                <Link key={rp.id} to={`/journal/${rp.slug}`} className="flex gap-4 group">
                  <div className="w-24 h-16 bg-[#2B1E16] flex-shrink-0 overflow-hidden">
                    <div className="w-full h-full overflow-hidden bg-[#231008]" style={{ borderRadius: 'inherit' }}>
      <img src={rp.image || "/images/journal-ganache.jpg"} alt={rp.title} className="w-full h-full object-cover" onLoad={(e) => e.currentTarget.classList.add('img-loaded')} />
    </div>
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-[#F4EBE1] group-hover:text-[#C9A46B] transition-colors">
                      {rp.title}
                    </h4>
                    <p className="text-xs text-[#F4EBE1]/40 font-light line-clamp-1">{rp.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
