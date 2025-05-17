import fs from 'fs';
import path from 'path';

/**
 * Interface for article information
 */
export interface ArticleInfo {
  title: string;
  description: string;
  category: string;
  date: string;
  link: string;
  tags: string[];
}

/**
 * Simple Article Search Engine
 * This mimics AI-powered article suggestions for demo purposes
 */
export class ArticleSuggester {
  // Database of articles - in a real app this would be fetched from an actual database
  private articleDatabase: ArticleInfo[] = [
    {
      title: "The Impact of Bibliometrics on Academic Research",
      description: "This article explores how bibliometric analysis influences research priorities and academic publishing.",
      category: "Research Methods",
      date: "May 2, 2025",
      link: "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=bibliometrics+academic+research+impact&btnG=",
      tags: ["bibliometrics", "academic research", "research evaluation", "citation analysis"]
    },
    {
      title: "Advanced Techniques in Scientometric Analysis",
      description: "A comprehensive overview of cutting-edge scientometric methods and their applications in academic research.",
      category: "Data Analysis",
      date: "April 15, 2025",
      link: "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=scientometric+analysis+techniques&btnG=",
      tags: ["scientometrics", "data visualization", "research mapping", "citation networks"]
    },
    {
      title: "Linguistic Corpora Analysis in Educational Research",
      description: "How linguistic data analysis can inform educational practice and policy through evidence-based research.",
      category: "Education",
      date: "March 21, 2025",
      link: "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=linguistic+corpora+educational+research&btnG=",
      tags: ["linguistics", "education", "corpus analysis", "language teaching"]
    },
    {
      title: "Big Data Analytics in Higher Education Assessment",
      description: "Exploring the potential of big data to transform assessment practices in higher education institutions.",
      category: "Educational Technology",
      date: "February 8, 2025",
      link: "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=big+data+analytics+higher+education+assessment&btnG=",
      tags: ["big data", "assessment", "higher education", "analytics"]
    },
    {
      title: "Systematic Literature Reviews: Methodological Approaches",
      description: "A detailed guide to conducting rigorous systematic literature reviews in educational and social sciences.",
      category: "Research Methods",
      date: "January 25, 2025",
      link: "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=systematic+literature+reviews+methodological+approaches&btnG=",
      tags: ["systematic review", "literature review", "research methodology", "meta-analysis"]
    },
    {
      title: "Natural Language Processing for Research Paper Classification",
      description: "Innovative approaches to automatically categorizing research papers using NLP and machine learning techniques.",
      category: "Data Science",
      date: "December 12, 2024",
      link: "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=natural+language+processing+research+paper+classification&btnG=",
      tags: ["NLP", "machine learning", "paper classification", "academic publishing"]
    },
    {
      title: "Citation Network Analysis in Bibliometric Research",
      description: "Understanding scholarly communication patterns through the study of citation networks and their structures.",
      category: "Network Analysis",
      date: "November 5, 2024",
      link: "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=citation+network+analysis+bibliometric&btnG=",
      tags: ["citation networks", "network analysis", "bibliometrics", "scholarly communication"]
    },
    {
      title: "Research Impact Evaluation: Beyond Citation Counts",
      description: "Exploring alternative metrics and methods for assessing the broader societal impact of academic research.",
      category: "Research Evaluation",
      date: "October 18, 2024",
      link: "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=research+impact+evaluation+beyond+citation+counts&btnG=",
      tags: ["research impact", "altmetrics", "societal impact", "research evaluation"]
    },
    {
      title: "Educational Data Mining: Trends and Applications",
      description: "Current developments in using data mining techniques to enhance teaching, learning, and educational management.",
      category: "Educational Technology",
      date: "September 30, 2024",
      link: "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=educational+data+mining+trends+applications&btnG=",
      tags: ["educational data mining", "learning analytics", "education technology", "student performance"]
    },
    {
      title: "Comparative Analysis of Bibliometric Databases",
      description: "A comprehensive comparison of Web of Science, Scopus, and Google Scholar for bibliometric research purposes.",
      category: "Data Sources",
      date: "August 15, 2024",
      link: "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=comparative+analysis+bibliometric+databases+web+of+science+scopus&btnG=",
      tags: ["bibliometric databases", "Web of Science", "Scopus", "Google Scholar", "comparative analysis"]
    }
  ];

  /**
   * Search for articles related to a specific topic
   * @param topic The topic to search for
   * @param limit Maximum number of results to return
   * @returns Array of relevant articles
   */
  public findArticlesByTopic(topic: string, limit: number = 5): ArticleInfo[] {
    // Convert topic to lowercase for case-insensitive matching
    const topicLower = topic.toLowerCase();
    
    // Calculate relevance score for each article
    const scoredArticles = this.articleDatabase.map(article => {
      let score = 0;
      
      // Check title for matches
      if (article.title.toLowerCase().includes(topicLower)) {
        score += 3;
      }
      
      // Check description for matches
      if (article.description.toLowerCase().includes(topicLower)) {
        score += 2;
      }
      
      // Check category for matches
      if (article.category.toLowerCase().includes(topicLower)) {
        score += 2;
      }
      
      // Check tags for matches
      article.tags.forEach(tag => {
        if (tag.toLowerCase().includes(topicLower) || topicLower.includes(tag.toLowerCase())) {
          score += 1;
        }
      });
      
      return { article, score };
    });
    
    // Sort by score (descending) and take the top 'limit' results
    const sortedArticles = scoredArticles
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.article);
    
    // If no matching articles, return some random ones as "recommendations"
    if (sortedArticles.length === 0) {
      const shuffled = [...this.articleDatabase].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, limit);
    }
    
    return sortedArticles;
  }

  /**
   * Get all available articles
   * @returns All articles in the database
   */
  public getAllArticles(): ArticleInfo[] {
    return this.articleDatabase;
  }
}

// Create a singleton instance
export const articleSuggester = new ArticleSuggester();