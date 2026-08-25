import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/Container";

interface ReportDetailPageProps {
  params: Promise<{ slug: string }>;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function resolvePublicAssetPath(src: string): string {
  const normalized = src.replace(/\\/g, "/");

  if (normalized.startsWith("/")) return normalized;
  if (normalized.startsWith("../public/")) return `/${normalized.replace(/^\.\.\/public\//, "")}`;
  if (normalized.startsWith("public/")) return `/${normalized}`;
  if (normalized.startsWith("./")) return `/${normalized.replace(/^\.\//, "")}`;
  if (normalized.startsWith("../")) return `/${normalized.replace(/^\.\.\//, "")}`;

  return src;
}

function renderInlineMarkdown(value: string): string {
  let html = escapeHtml(value);

  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  html = html.replace(/\[([^\]]+)\]\((\/[^)]+)\)/g, '<a href="$2">$1</a>');

  return html;
}

function markdownToHtml(markdown: string): string {
  const normalized = markdown.replace(/\r\n/g, "\n").trim();
  const blocks = normalized.split(/\n\s*\n/);
  const html: string[] = [];

  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith("### ")) {
      html.push(`<h3>${renderInlineMarkdown(trimmed.replace(/^###\s*/, ""))}</h3>`);
      continue;
    }

    if (trimmed.startsWith("## ")) {
      html.push(`<h2>${renderInlineMarkdown(trimmed.replace(/^##\s*/, ""))}</h2>`);
      continue;
    }

    if (trimmed.startsWith("# ")) {
      html.push(`<h1>${renderInlineMarkdown(trimmed.replace(/^#\s*/, ""))}</h1>`);
      continue;
    }

    if (trimmed.startsWith("---")) {
      html.push("<hr />");
      continue;
    }

    if (trimmed.startsWith("![")) {
      const match = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (match) {
        const [, alt, src] = match;
        const publicSrc = resolvePublicAssetPath(src);
        html.push(
          `<figure class="my-6 overflow-hidden rounded-[var(--radius)] border border-card-border bg-card"><img src="${publicSrc}" alt="${escapeHtml(alt)}" class="w-full rounded-[var(--radius)] object-contain bg-white p-4" /><figcaption class="px-4 pb-4 pt-2 text-sm text-muted">${renderInlineMarkdown(alt)}</figcaption></figure>`,
        );
        continue;
      }
    }

    if (trimmed.startsWith("|")) {
      const rows = trimmed
        .split("\n")
        .map((r) => r.trim())
        .filter(Boolean);
      const headers = rows[0].split("|").slice(1, -1).map((cell) => cell.trim());
      const body = rows.slice(2).map((row) => row.split("|").slice(1, -1).map((cell) => cell.trim()));

      if (headers.length > 0 && body.length >= 0) {
        const headerHtml = headers.map((header) => `<th>${renderInlineMarkdown(header)}</th>`).join("");
        const bodyHtml = body
          .map(
            (row) =>
              `<tr>${row.map((cell) => `<td>${renderInlineMarkdown(cell)}</td>`).join("")}</tr>`,
          )
          .join("");

        html.push(
          `<table class="my-6 w-full overflow-hidden rounded-[var(--radius)] border border-card-border text-left text-sm"><thead><tr>${headerHtml}</tr></thead><tbody>${bodyHtml}</tbody></table>`,
        );
        continue;
      }
    }

    if (/^(?:- |\* )/m.test(trimmed)) {
      const items = trimmed
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => /^[-*]\s+/.test(line))
        .map((line) => `<li>${renderInlineMarkdown(line.replace(/^[-*]\s+/, ""))}</li>`)
        .join("");

      html.push(`<ul class="my-4 list-disc space-y-2 pl-6 text-muted">${items}</ul>`);
      continue;
    }

    if (/^>\s+/.test(trimmed)) {
      const quote = trimmed
        .split("\n")
        .map((line) => renderInlineMarkdown(line.replace(/^>\s?/, "")))
        .join("<br />");
      html.push(`<blockquote class="my-6 border-l-2 border-accent pl-4 italic text-muted">${quote}</blockquote>`);
      continue;
    }

    const paragraph = trimmed
      .split("\n")
      .map((line) => renderInlineMarkdown(line.trim()))
      .join("<br />");
    html.push(`<p class="my-4 leading-relaxed text-muted">${paragraph}</p>`);
  }

  return html.join("");
}

export async function generateStaticParams() {
  const docsDir = path.join(process.cwd(), "docs");
  const files = fs.existsSync(docsDir)
    ? fs.readdirSync(docsDir).filter((file) => file.endsWith(".md"))
    : [];

  return files.map((file) => ({ slug: file.replace(/\.md$/, "") }));
}

export default async function ReportDetailPage({ params }: ReportDetailPageProps) {
  const { slug } = await params;
  const reportPath = path.join(process.cwd(), "docs", `${slug}.md`);

  if (!fs.existsSync(reportPath)) {
    notFound();
  }

  const source = fs.readFileSync(reportPath, "utf8");
  const html = markdownToHtml(source);

  const title = source
    .split("\n")
    .find((line) => line.startsWith("# "))
    ?.replace(/^#\s*/, "")
    .trim();

  return (
    <article className="py-12 md:py-16">
      <Container>
        <Link
          href="/stages/stage-idconseil"
          className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Retour au stage
        </Link>

        <header className="mt-6 max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-accent">
            Rapport de stage
          </p>
          <h1 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">
            {title ?? slug}
          </h1>
        </header>

        <div className="mt-8 rounded-[var(--radius)] border border-card-border bg-card p-4 md:p-6">
          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>

        <div className="mt-8">
          <Link
            href="/stages/stage-idconseil#acces-aux-rapports"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover"
          >
            <ExternalLink className="h-4 w-4" aria-hidden />
            Revenir à la liste des rapports
          </Link>
        </div>
      </Container>
    </article>
  );
}
