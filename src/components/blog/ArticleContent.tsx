import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ArticleContentProps {
  content: string;
}

const stripSeoMetadata = (content: string): string => {
  // Remove SEO notes that start with **Primary Keyword or similar markers
  return content.replace(/\n\*\*Primary Keyword[\s\S]*$/i, '').trim();
};

export const ArticleContent = ({ content }: ArticleContentProps) => {
  const cleanContent = stripSeoMetadata(content);

  return (
    <article className="prose prose-invert md:prose-lg max-w-none
      prose-headings:text-foreground prose-headings:font-bold
      prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
      prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
      prose-p:text-muted-foreground prose-p:leading-relaxed
      prose-a:text-primary prose-a:no-underline
      prose-strong:text-foreground
      prose-ul:text-muted-foreground prose-ol:text-muted-foreground
      prose-li:marker:text-primary
      prose-blockquote:border-primary prose-blockquote:text-muted-foreground
      prose-blockquote:bg-primary/5 prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:pr-4 prose-blockquote:rounded-lg prose-blockquote:italic prose-blockquote:not-italic
      prose-code:text-primary prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
      prose-pre:bg-muted prose-pre:border prose-pre:border-border
      prose-img:rounded-xl prose-img:border prose-img:border-border
      prose-table:text-muted-foreground
      prose-th:text-foreground prose-th:border-border
      prose-td:border-border
      prose-hr:border-border
    ">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children, ...props }) => {
            const text = typeof children === 'string' ? children : String(children);
            const id = text.toLowerCase().replace(/[^\w]+/g, '-').replace(/^-|-$/g, '');
            return <h2 id={id} {...props}>{children}</h2>;
          },
          h3: ({ children, ...props }) => {
            const text = typeof children === 'string' ? children : String(children);
            const id = text.toLowerCase().replace(/[^\w]+/g, '-').replace(/^-|-$/g, '');
            return <h3 id={id} {...props}>{children}</h3>;
          },
          blockquote: ({ children, ...props }) => (
            <blockquote {...props} className="italic">
              {children}
            </blockquote>
          ),
        }}
      >
        {cleanContent}
      </ReactMarkdown>
    </article>
  );
};
