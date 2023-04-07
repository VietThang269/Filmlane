import {
  ref,
  onValue,
  set,
} from "https://www.gstatic.com/firebasejs/9.19.0/firebase-database.js";
import { database } from "./global.js";

// Get Data
const dataMovies = ref(database, "movies");
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
getDataSeries();

// Get data comment
const dataComment = document.querySelector(".comment_input");
const btnSendComment = document.getElementById("send_comment");
const listComment = document.querySelector(".list-comment");
const dataComments = ref(database, "comments");
function getDataComment() {
  onValue(dataComments, (snapshot) => {
    const dataArray = [];
    const data = snapshot.val();
    for (const key in data) {
      dataArray.push(data[key]);
    }
    const payload = dataArray.reverse().map(
      (item, _) => `
       <div class="item-comment">
         <img src="assets/images/Avatar.png" alt="">
         <div class="people-comment">
           <h1 class="people-name">${item.email}</h1>
           <p class="time-comment">${item.time}</p>
           <p class="text-comment">${item.content}</p>
         </div>
       </div>
    `
    );
    const newPayload = payload.join("");
    listComment.innerHTML = newPayload;
  });
}
getDataComment();

// Send data comment
btnSendComment.addEventListener("click", function () {
  const id = localStorage.getItem("user");
  const email = localStorage.getItem("email");
  const time = new Date().toUTCString();

  if (!id || !email) {
    alert("Please login first!");
    return;
  }

  if (dataComment.value.length <= 0) {
    alert("Please enter comment first!");
    return;
  }

  set(ref(database, "comments/" + time), {
    content: dataComment.value,
    email,
    time,
  });

  dataComment.value = "";
});
