import { ExternalLink, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Veille Technologique",
  description: "Actualités tech reconnus : Hacker News, TechCrunch, et Medium",
  path: "/veille",
});

interface HNItem {
  id: number;
  type: string;
  title: string;
  url?: string;
  score: number;
  by: string;
  time: number;
  descendants: number;
}

interface Article {
  id: string | number;
  title: string;
  url: string;
  source: "hackernews";
  score: number;
  author: string;
  timestamp: number;
  comments?: number;
  image?: string;
}

async function getHackerNewsArticles(): Promise<Article[]> {
  try {
    const topStoriesRes = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json", {
      next: { revalidate: 1800 }, // Revalidate every 30 minutes
    });
    const topStories = (await topStoriesRes.json()).slice(0, 30);

    const articles: Article[] = [];

    for (const id of topStories.slice(0, 12)) {
      const itemRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
      const item: HNItem = await itemRes.json();

      if (item.type === "story" && item.url && item.title) {
        let image: string | undefined;
        
        // Try to fetch image from Microlink API
        try {
          const microlinkRes = await fetch(
            `https://api.microlink.io?url=${encodeURIComponent(item.url)}`
          );
          const microlinkData = await microlinkRes.json();
          if (microlinkData.data?.image?.url) {
            image = microlinkData.data.image.url;
          }
        } catch (e) {
          // Microlink failed, continue without image
        }

        articles.push({
          id: item.id,
          title: item.title,
          url: item.url,
          source: "hackernews",
          score: item.score,
          author: item.by,
          timestamp: item.time * 1000,
          comments: item.descendants,
          image,
        });
      }
    }

    return articles;
  } catch (error) {
    console.error("Error fetching HackerNews:", error);
    return [];
  }
}

async function getLatestArticles() {
  const hackerNewsArticles = await getHackerNewsArticles();
  return hackerNewsArticles.sort((a, b) => b.timestamp - a.timestamp);
}

function formatDate(timestamp: number) {
  const date = new Date(timestamp);
  return date.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getDomain(url: string): string {
  try {
    const domain = new URL(url).hostname;
    return domain.replace("www.", "");
  } catch {
    return "Lien externe";
  }
}

export default async function VeillePage() {
  const articles = await getLatestArticles();

  return (
    <article>
      <Container className="py-12 md:py-16">
        <header className="max-w-3xl">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-accent" aria-hidden />
            <Badge variant="accent">Veille Technologique</Badge>
          </div>
          <h1 className="mt-4 text-3xl font-bold text-foreground md:text-4xl">
            Actualités Informatiques
          </h1>
          <p className="mt-2 text-lg text-muted">
            Les meilleures actualités tech et scientifiques du moment, sélectionnées par la
            communauté de Hacker News.
          </p>
        </header>

        {articles.length > 0 ? (
          <div className="mt-12 space-y-4">
            {articles.map((article: Article) => (
              <article
                key={article.id}
                className="group rounded-[var(--radius)] border border-card-border bg-card overflow-hidden transition-all hover:border-accent hover:shadow-lg"
              >
                <div className="flex flex-col md:flex-row gap-0 h-full">
                  {article.image && (
                    <div className="md:w-48 md:h-40 flex-shrink-0 overflow-hidden bg-muted-bg">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                  )}
                  
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="inline-block px-2 py-1 text-xs font-semibold uppercase tracking-[0.12em] rounded-full bg-accent-muted text-accent">
                          Hacker News
                        </span>
                        <span className="text-xs text-muted">{getDomain(article.url)}</span>
                      </div>

                      <h2 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                        <Link
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline break-words"
                        >
                          {article.title}
                        </Link>
                      </h2>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
                        <span className="flex items-center gap-1">👤 {article.author}</span>
                        <span>•</span>
                        <time dateTime={new Date(article.timestamp).toISOString()}>
                          {formatDate(article.timestamp)}
                        </time>
                        {article.comments !== undefined && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1">💬 {article.comments}</span>
                          </>
                        )}
                        <span>•</span>
                        <span className="flex items-center gap-1">⭐ {article.score}</span>
                      </div>

                      <Link
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-hover transition-colors whitespace-nowrap"
                      >
                        Lire <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-[var(--radius)] border border-card-border bg-card p-8 text-center">
            <p className="text-muted">
              Impossible de charger les actualités. Veuillez réessayer plus tard.
            </p>
          </div>
        )}

        <div className="mt-12 rounded-[var(--radius)] border border-card-border bg-accent-muted/30 p-6">
          <h2 className="font-semibold text-foreground">À propos de cette veille</h2>
          <p className="mt-2 text-sm text-muted">
            Cette page affiche les sujets les plus populaires de{" "}
            <Link
              href="https://news.ycombinator.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-hover"
            >
              Hacker News
            </Link>
            , une plateforme reconnue et fondée par{" "}
            <Link
              href="https://www.ycombinator.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-hover"
            >
              Y Combinator
            </Link>
            . Les articles sont sélectionnés et votés par une communauté de développeurs,
            entrepreneurs et passionnés de technologie du monde entier.
          </p>
        </div>
      </Container>
    </article>
  );
}
