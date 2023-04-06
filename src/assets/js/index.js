import {
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.19.0/firebase-database.js";
import { database } from "./global.js";

// Get Data
const dataMovies = ref(database, "movies");

// Upcomming
function getDataUpcomming() {
  onValue(dataMovies, (snapshot) => {
    const data = snapshot.val();
    const upcommingContent = document.querySelector(".upcoming_content");
    const filterData = data.slice(8, 12);
    // template string
    filterData.map((item, _) => {
      const data = `
      <div class="movie_item">
              <a href="movie_detail.html" class="movie_item_link">
                <img
                  src=${item.image}
                  alt=""
                  class="movie_item_img"
                />
              </a>

              <div class="movie_title_wrapper">
                <a href="#" class="movie_title">${item.title}</a>
                <p class="movie_time">${item.year}</p>
              </div>

              <div class="movie_meta">
                <div class="badge_outline">${item.quanity}</div>

                <div class="movie_meta_right">
                  <div class="movie_meta_duration">
                    <img
                      src="./assets/icons/icon_clock.svg"
                      alt=""
                      style="width: 13px; height: 13px"
                    />
                    <p>${item.minute} min</p>
                  </div>
                  <div class="movie_meta_rate">
                    <img
                      src="./assets/icons/star-fill.svg"
                      alt=""
                      style="width: 13px; height: 13px"
                    />
                    <p>${item.rate}</p>
                  </div>
                </div>
              </div>
            </div>
      `;
      upcommingContent.insertAdjacentHTML("beforeend", data);
    });
  });
}

// Top Rating
function getDataTopRating() {
  onValue(dataMovies, (snapshot) => {
    const data = snapshot.val();
    const topContent = document.querySelector(".top_content");
    const filterData = data.slice(0, 8);
    filterData.map((item, _) => {
      const data = `
      <div class="movie_item">
              <a href="movie_detail.html" class="movie_item_link">
                <img
                  src=${item.image}
                  alt=""
                  class="movie_item_img"
                />
              </a>

              <div class="movie_title_wrapper">
                <a href="#" class="movie_title">${item.title}</a>
                <p class="movie_time">${item.year}</p>
              </div>

              <div class="movie_meta">
                <div class="badge_outline">${item.quanity}</div>

                <div class="movie_meta_right">
                  <div class="movie_meta_duration">
                    <img
                      src="./assets/icons/icon_clock.svg"
                      alt=""
                      style="width: 13px; height: 13px"
                    />
                    <p>${item.minute} min</p>
                  </div>
                  <div class="movie_meta_rate">
                    <img
                      src="./assets/icons/star-fill.svg"
                      alt=""
                      style="width: 13px; height: 13px"
                    />
                    <p>${item.rate}</p>
                  </div>
                </div>
              </div>
            </div>
      `;
      topContent.insertAdjacentHTML("beforeend", data);
    });
  });
}

// Series Content
function getDataSeries() {
  onValue(dataMovies, (snapshot) => {
    const data = snapshot.val();
    const seriesContent = document.querySelector(".series_content");
    const filterData = data.slice(12, 16);
    filterData.map((item, _) => {
      const data = `
      <div class="movie_item">
              <a href="movie_detail.html" class="movie_item_link">
                <img
                  src=${item.image}
                  alt=""
                  class="movie_item_img"
                />
              </a>

              <div class="movie_title_wrapper">
                <a href="#" class="movie_title">${item.title}</a>
                <p class="movie_time">${item.year}</p>
              </div>

              <div class="movie_meta">
                <div class="badge_outline">${item.quanity}</div>

                <div class="movie_meta_right">
                  <div class="movie_meta_duration">
                    <img
                      src="./assets/icons/icon_clock.svg"
                      alt=""
                      style="width: 13px; height: 13px"
                    />
                    <p>${item.minute} min</p>
                  </div>
                  <div class="movie_meta_rate">
                    <img
                      src="./assets/icons/star-fill.svg"
                      alt=""
                      style="width: 13px; height: 13px"
                    />
                    <p>${item.rate}</p>
                  </div>
                </div>
              </div>
            </div>
      `;
      seriesContent.insertAdjacentHTML("beforeend", data);
    });
  });
}

getDataUpcomming();
getDataTopRating();
getDataSeries();
