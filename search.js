// Product Database
const products = [
  // Women Products
  { name: "Saint Laurent Court Classic SL/06", category: "Women", link: "womenproduct1.html", keywords: ["sneakers", "shoes", "обувки", "leather", "saint laurent", "sl/06"] },
  { name: "Dior Lady Dior Bag – Medium", category: "Women", link: "womenproduct2.html", keywords: ["bag", "dior", "lady dior", "purse", "handbag", "women bag"] },
  { name: "Loro Piana Кашмирено палто", category: "Women", link: "womenproduct3.html", keywords: ["coat", "палто", "cashmere", "loro piana", "warm", "women coat"] },
  { name: "Ralph Lauren Вълнено палто", category: "Women", link: "womenproduct4.html", keywords: ["coat", "палто", "wool", "ralph lauren", "warm", "women coat"] },
  { name: "Dior J'Adior Pumps", category: "Women", link: "womenproduct5.html", keywords: ["pumps", "heels", "dior", "shoes", "обувки", "jadior", "women shoes"] },
  { name: "YSL Kate Bag – Medium", category: "Women", link: "womenproduct6.html", keywords: ["bag", "ysl", "kate bag", "purse", "handbag", "women bag"] },
  { name: "Ralph Lauren Silk Dress", category: "Women", link: "womenproduct7.html", keywords: ["dress", "silk", "ralph lauren", "elegant", "women dress"] },

  // Men Products
  { name: "Пуловер с кабелна плетка", category: "Men", link: "menproduct1.html", keywords: ["sweater", "cable knit", "warm", "men sweater", "pullover"] },
  { name: "YSL Мокасини Le Loafer", category: "Men", link: "menproduct2.html", keywords: ["loafers", "мокасини", "ysl", "le loafer", "shoes", "обувки", "men shoes"] },
  { name: "Вълнено палто", category: "Men", link: "menproduct3.html", keywords: ["coat", "палто", "wool", "wool coat", "mens coat"] },
  { name: "Палто с двуредно закопчаване", category: "Men", link: "menproduct4.html", keywords: ["coat", "палто", "double breasted", "mens coat"] },
  { name: "Loro Piana Сникъри", category: "Men", link: "menproduct5.html", keywords: ["sneakers", "shoes", "обувки", "loro piana", "men shoes"] },
  { name: "Loro Piana Сникъри", category: "Men", link: "menproduct6.html", keywords: ["sneakers", "shoes", "обувки", "loro piana", "men shoes"] },

  // Kids Products
  { name: "Детски кашмирен пуловер", category: "Kids", link: "kidproduct1.html", keywords: ["sweater", "cashmere", "kids", "children", "warm"] },
  { name: "Палто от вълна и кашмир", category: "Kids", link: "kidproduct2.html", keywords: ["coat", "палто", "wool", "kids", "children", "warm", "kids coat"] },
  { name: "Loro Piana Детски Сникъри", category: "Kids", link: "kidproduct3.html", keywords: ["sneakers", "shoes", "обувки", "kids", "children", "kids shoes"] },
  { name: "Moncler Детско Яке", category: "Kids", link: "kidproduct4.html", keywords: ["jacket", "kids", "children", "warm", "kids jacket"] },
  { name: "Dior Детска Рокля", category: "Kids", link: "kidproduct5.html", keywords: ["dress", "dior", "kids", "children", "kids dress"] },
  { name: "Gucci Детски Мокасини", category: "Kids", link: "kidproduct6.html", keywords: ["loafers", "мокасини", "gucci", "kids", "children", "shoes", "обувки", "kids shoes"] },

  // Home Collection
  { name: "Кашмирена завивка", category: "Home", link: "homeproduct1.html", keywords: ["blanket", "cashmere", "home", "comfort", "bedding"] },
  { name: "Сатенени чаршафи LUXE", category: "Home", link: "homeproduct2.html", keywords: ["sheets", "satin", "luxe", "home", "bedding"] },
  { name: "Декоративни възглавници от коприна", category: "Home", link: "homeproduct3.html", keywords: ["pillows", "silk", "home", "decorative", "comfort"] },
  { name: "Tom Ford Private Blend Парфюмени Свещи", category: "Home", link: "homeproduct4.html", keywords: ["candle", "tom ford", "fragrance", "home", "scented"] },
  { name: "Декоративни вази от кристал", category: "Home", link: "homeproduct5.html", keywords: ["vase", "crystal", "home", "decorative", "art"] },

  // Gifts
  { name: "NISHANE ANI – Unisex", category: "Gifts", link: "gift1.html", keywords: ["perfume", "fragrance", "nishane", "ani", "unisex", "gift"] },
  { name: "Baccarat Rouge 540 – Unisex", category: "Gifts", link: "gift2.html", keywords: ["perfume", "fragrance", "baccarat", "unisex", "gift"] },
  { name: "Amouage Reflection 45 – Unisex", category: "Gifts", link: "gift3.html", keywords: ["perfume", "fragrance", "amouage", "unisex", "gift"] },
  { name: "Xerjoff Naxos – Unisex", category: "Gifts", link: "gift4.html", keywords: ["perfume", "fragrance", "xerjoff", "unisex", "gift"] },
  { name: "Колие от бяло злато – 14K", category: "Gifts", link: "gift5.html", keywords: ["necklace", "gold", "jewelry", "gift", "luxury"] },
];

// Improved Fuzzy Search Function
function fuzzySearch(query, text) {
  query = query.toLowerCase();
  text = text.toLowerCase();
  
  // Exact substring match gets highest priority
  if (text.includes(query)) {
    return query.length * 10; // Very high score for substring match
  }
  
  // Fuzzy character matching
  let queryIdx = 0;
  let textIdx = 0;
  let score = 0;
  let consecutiveMatches = 0;

  while (queryIdx < query.length && textIdx < text.length) {
    if (query[queryIdx] === text[textIdx]) {
      consecutiveMatches++;
      score += 1 + consecutiveMatches; // Bonus for consecutive matches
      queryIdx++;
    } else {
      consecutiveMatches = 0;
    }
    textIdx++;
  }

  // Only return score if at least 60% of query was matched
  const matchPercentage = queryIdx / query.length;
  return matchPercentage >= 0.6 ? score : 0;
}

// Search Results Function
function searchProducts(query) {
  if (query.length < 2) return [];

  const results = [];

  products.forEach(product => {
    let score = 0;

    // Search in product name
    const nameScore = fuzzySearch(query, product.name);
    score += nameScore * 4; // Weight name highest

    // Search in keywords
    product.keywords.forEach(keyword => {
      const keywordScore = fuzzySearch(query, keyword);
      if (keywordScore > 0) {
        score += keywordScore * 3;
      }
    });

    // Search in category
    const categoryScore = fuzzySearch(query, product.category);
    if (categoryScore > 0) {
      score += categoryScore * 2;
    }

    // Only add if score is meaningful
    if (score > 0) {
      results.push({ ...product, score });
    }
  });

  // Sort by score (highest first) and limit to 8 results
  return results.sort((a, b) => b.score - a.score).slice(0, 8);
}

document.addEventListener("DOMContentLoaded", () => {
  const openSearch = document.getElementById("openSearch");
  const closeSearch = document.getElementById("closeSearch");
  const searchOverlay = document.getElementById("searchOverlay");
  const searchInput = searchOverlay?.querySelector("input");
  const searchResults = document.getElementById("searchResults");

  if (!openSearch || !closeSearch || !searchOverlay) return;

  // Open search
  openSearch.addEventListener("click", (e) => {
    e.preventDefault();
    searchOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      if (searchInput) searchInput.focus();
    }, 100);
  });

  // Close search
  closeSearch.addEventListener("click", () => {
    searchOverlay.classList.remove("active");
    document.body.style.overflow = "auto";
    if (searchInput) searchInput.value = "";
    if (searchResults) searchResults.innerHTML = "";
  });

  // Close with ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      searchOverlay.classList.remove("active");
      document.body.style.overflow = "auto";
      if (searchInput) searchInput.value = "";
      if (searchResults) searchResults.innerHTML = "";
    }
  });

  // Real-time search
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.trim();
      
      if (query.length < 2) {
        if (searchResults) {
          searchResults.innerHTML = `
            <div class="search-section">
              <p class="search-label">Trending Searches</p>
              <div class="trending">
                <span>Quarter Zip</span>
                <span>Cable Knit</span>
                <span>Coat</span>
                <span>Shoes</span>
              </div>
            </div>

            <div class="search-section">
              <p class="search-label">Popular Categories</p>
              <div class="categories">
                <a href="menproducts.html">MEN</a>
                <a href="womenproducts.html">WOMEN</a>
                <a href="kidsproducts.html">KIDS</a>
                <a href="homecollection.html">HOME</a>
                <a href="gifts.html">GIFTS</a>
              </div>
            </div>
          `;
        }
        return;
      }

      const results = searchProducts(query);

      if (results.length === 0) {
        if (searchResults) {
          searchResults.innerHTML = `
            <div class="search-no-results">
              <p>No products found matching "<strong>${query}</strong>"</p>
              <p style="font-size: 0.9rem; color: rgba(255,255,255,0.6);">Try different keywords or browse our categories</p>
            </div>
          `;
        }
      } else {
        let resultsHTML = `<div class="search-results-list">`;
        
        results.forEach(product => {
          resultsHTML += `
            <a href="${product.link}" class="search-result-item" onclick="closeSearch()">
              <div class="result-category">${product.category}</div>
              <div class="result-name">${product.name}</div>
            </a>
          `;
        });

        resultsHTML += `</div>`;

        if (searchResults) {
          searchResults.innerHTML = resultsHTML;
        }
      }
    });
  }

  // Click outside to close
  searchOverlay?.addEventListener("click", (e) => {
    if (e.target === searchOverlay) {
      searchOverlay.classList.remove("active");
      document.body.style.overflow = "auto";
      if (searchInput) searchInput.value = "";
      if (searchResults) searchResults.innerHTML = "";
    }
  });
});

function closeSearch() {
  const searchOverlay = document.getElementById("searchOverlay");
  if (searchOverlay) {
    searchOverlay.classList.remove("active");
    document.body.style.overflow = "auto";
  }
}

