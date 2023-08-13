const URL = "https://jsonplaceholder.typicode.com/posts";

const $body = document.getElementById("body");
const $title = document.getElementById("title");
const $id = document.getElementById("id");
const $paragraph = document.getElementById("paragraph");
const state = {
  todos: [],
};

const fetchData = async () => {
  try {
    const response = await fetch(URL);
    const result = await response.json();
    if (response.ok) {
      state.todos = result;
    } else {
      console.error("Error 1001");
    }
  } catch (error) {
    console.error();
  }
};

const render = (currentPage) => {
  $body.innerHTML = "";

  const cardsPerPage = 10;
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;

  for (let i = startIndex; i < endIndex && i < state.todos.length; i++) {
    const item = state.todos[i];
    $body.innerHTML += `
        <div class="relative flex w-auto max-w-md flex-col items-start gap-2 overflow-hidden rounded-lg p-4 shadow-lg">
          <h2 class="text-2xl font-semibold">${item.title}</h2>
          <p class="text-base">${item.body}</p>
          <span class="absolute top-0 right-0 w-7 h-7 bg-red-500 text-center flex item-center justify-center rounded-full">${item.id}</span>
           <button class="rounded-md bg-blue-600 px-5 py-2 text-white shadow-xl transition-all duration-300 hover:bg-blue-700">Button</button>
          </div>
      `;
  }
};

const renderPaginationLinks = (currentPage, totalPages) => {
  const $pagination = document.getElementById("pagination");
  $pagination.innerHTML = "";

  for (let page = 1; page <= totalPages; page++) {
    const linkClass =
      page === currentPage
        ? "bg-blue-50 text-blue-600"
        : "text-gray-500 hover:text-gray-700";
    $pagination.innerHTML += `
        <li>
          <a href="#" class="bg-white border border-gray-300 ${linkClass} py-2 px-3 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" data-page="${page}">${page}</a>
        </li>
      `;
  }
};

const init = async () => {
  await fetchData();
  const totalPages = Math.ceil(state.todos.length / 10);
  render(1);
  renderPaginationLinks(1, totalPages);
};


document.getElementById("pagination").addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    const newPage = parseInt(event.target.dataset.page);
    const totalPages = Math.ceil(state.todos.length / 10);
    if (newPage >= 1 && newPage <= totalPages) {
      render(newPage);
      renderPaginationLinks(newPage, totalPages);
    }
  }
});

init();