document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "edit") {
    const id = event.target.dataset.id;
    const titleDefault = event.target.closest("li").children[0].textContent;
    const newTitle = prompt("Введите новое название", [titleDefault]);
    if (newTitle !== null) {
      edit(id, newTitle).then(() => {
        event.target.closest("li").children[0].textContent = newTitle;
      });
    }
  }
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;

    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}

async function edit(id, newTitle) {
  await fetch(`/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: newTitle }),
  });
}
