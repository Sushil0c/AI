document.addEventListener("DOMContentLoaded", async function() {
  const newsList = document.getElementById("newsList");

  // Function to scrape news data from a website
  async function scrapeNews(url) {
    try {
      const response = await axios.get(url);
      const newsData = parseNews(response.data); // Parsing using DOMParser
      return newsData;
    } catch (error) {
      console.error("Error scraping news:", error);
      return [];
    }
  }

  // Array of URLs to scrape news data from
  const newsSources = [
    "https://www.example1.com/news",
    "https://www.example2.com/news",
    "https://www.techpana.com/",
    // Add more URLs here
  ];

  // Scrape news data from each source and render
  for (const source of newsSources) {
    const newsData = await scrapeNews(source);
    renderNews(newsData);
  }

  // Function to render news articles
  function renderNews(newsData) {
    newsData.forEach(news => {
      const article = document.createElement("div");
      article.classList.add("article");
      article.innerHTML = `
        <h2>${news.title}</h2>
        <p>${news.content}</p>
        <p><em>Published by ${news.author}</em></p>
      `;
      newsList.appendChild(article);
    });
  }

  // Function to parse news data from HTML using DOMParser
  function parseNews(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Implement parsing logic using standard DOM manipulation
    const news = [];
    const newsElements = doc.querySelectorAll('.news-item');
    newsElements.forEach(element => {
      const title = element.querySelector('h2').textContent;
      const content = element.querySelector('p').textContent;
      const author = element.querySelector('.author').textContent; // Assuming author's name is inside an element with class "author"
      news.push({ title, content, author });
    });

    return news;
  }
});