import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function navigateTo(pageId) {
  document.getElementById("home-page").style.display = "none";
  document.getElementById("review-page").style.display = "none";
  document.getElementById(pageId).style.display = "block";

  if (pageId === "review-page") {
    fetchReviews();
  }
}

async function fetchReviews() {
  const reviewsContainer = document.getElementById("reviews-container");
  reviewsContainer.innerHTML = "<p>Loading reviews...</p>";

  try {
    const querySnapshot = await getDocs(collection(db, "reviews"));
    reviewsContainer.innerHTML = ""; 

    querySnapshot.forEach((doc) => {
      const review = doc.data();
      const reviewElement = document.createElement("div");
      reviewElement.innerHTML = `<strong>${review.name}</strong>: ${review.comment}`;
      reviewsContainer.appendChild(reviewElement);
    });
  } catch (error) {
    reviewsContainer.innerHTML = "<p>Error loading reviews. Please try again later.</p>";
    console.error("Error fetching reviews: ", error);
  }
}