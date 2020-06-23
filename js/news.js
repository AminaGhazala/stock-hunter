// to get news data from open-api server
function getNews(keyWord, category = "") {
  let searchUrl = "";

  if (category === "latest" || !keyWord) {
    searchUrl = urlLatestNews + newsApiKey;
  } else {
    searchUrl = urlAllArticlesSearch + keyWord + newsApiKey;
  }

  $.getJSON(searchUrl, (data) => {
    addNewsList(data);
  }).fail((jqxhr, textStatus, error) => {
    console.error(textStatus + ", " + error);
  });
}

// add news list for the selected ticker
function addNewsList(data) {
  let tempNewsContainer = "";

  // to show news data on the modal
  if (checkMobileSize() && checkModal()) {
    tempNewsContainer = newsContainerModal;
  } else {
    tempNewsContainer = newsContainer;
  }

  clearList(tempNewsContainer);

  // make news element up to 10
  for (let i = 0; i < data.news.length && i < 10; i++) {
    // news page link
    const a = document.createElement("a");
    a.href = data.news[i].url;
    a.target = "_blank";
    tempNewsContainer.appendChild(a);

    const divContainer = document.createElement("div");
    divContainer.className = classNewsContainer;
    a.appendChild(divContainer);

    // news image
    const img = document.createElement("img");
    img.className = classNewsImg;
    img.alt = "news image " + i;
    if (data.news[i].image !== "None") {
      img.src = data.news[i].image;
    } else {
      img.src = noImage;
    }

    // news content - category, title, text, time
    const divContent = document.createElement("div");
    divContent.className = classNewsContent;
    divContainer.appendChild(divContent);

    const newsCategory = document.createElement("strong");
    newsCategory.className = classNewsCategory;
    newsCategory.textContent = data.news[i].category[0];

    const newsTitle = document.createElement("h6");
    newsTitle.className = classNewsTitle;
    newsTitle.textContent = data.news[i].title.substr(0, 50) + "...";

    const newsText = document.createElement("p");
    newsText.className = classNewsText;
    newsText.style.maxWidth = "auto";
    newsText.textContent = data.news[i].description.substr(0, 80) + "...";

    const newsTime = document.createElement("div");
    newsTime.className = classNewsTime;
    newsTime.style.textTransform = "capitalize";
    newsTime.textContent =
      data.news[i].published.slice(0, data.news[i].published.indexOf("+")) +
      " - By " + data.news[i].author.substr(0, 25);

    divContent.append(newsCategory, newsTitle, newsText, newsTime);
    divContainer.append(img, divContent);
  }
}

getNews("latest");
