import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ArticleContentProps {
  content: string;
}

export const ArticleContent = ({ content }: ArticleContentProps) => {
  return (
    <article className="prose prose-invert md:prose-lg max-w-none
      prose-headings:text-foreground prose-headings:font-bold
      prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
      prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
      prose-p:text-muted-foreground prose-p:leading-relaxed
      prose-a:text-primary prose-a:no-underline hover:prose-a:underline
      prose-strong:text-foreground
      prose-ul:text-muted-foreground prose-ol:text-muted-foreground
      prose-li:marker:text-primary
      prose-blockquote:border-primary prose-blockquote:text-muted-foreground
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
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
};
