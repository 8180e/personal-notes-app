const storage = localStorage.getItem("notes");
const notes = storage ? JSON.parse(storage).filter(Boolean) : [];

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function createElement(element) {
  return document.createElement(element);
}

function getElementById(id) {
  return document.getElementById(id);
}

function addNoteToList(i, note) {
  const li = createElement("li");
  const editIcon = createElement("i");
  const deleteIcon = createElement("i");
  const form = createElement("form");
  const input = createElement("input");
  const submit = createElement("button");

  editIcon.className = "bi bi-pencil";
  editIcon.onclick = () => form.hidden = !form.hidden;

  deleteIcon.className = "bi bi-trash";
  deleteIcon.style.color = "red";
  deleteIcon.onclick = () => deleteNote(i, li);

  input.type = "text";
  input.value = note;

  submit.textContent = "Submit";
  submit.onclick = (event) => editNote(event, li.childNodes[0], i,
    input.value);

  form.hidden = true;
  form.style.width = "20%";

  form.appendChild(input);
  form.appendChild(submit);

  li.textContent = note;
  li.appendChild(editIcon);
  li.appendChild(deleteIcon);
  li.appendChild(form);

  getElementById("notes").appendChild(li);
}

function addNote(event) {
  const noteInput = getElementById("noteInput")
  const noteContent = noteInput.value;
  if (noteContent) {
    notes.push(noteContent);
    saveNotes();
    addNoteToList(notes.length - 1, noteContent);
    noteInput.value = null;
  }
  event.preventDefault();
}

function editNote(event, textNode, i, note) {
  notes[i] = note;
  saveNotes();
  textNode.nodeValue = note;
  event.preventDefault();
}

function deleteNote(i, li) {
  const notification = getElementById("notification");

  delete notes[i];
  li.remove();
  saveNotes();
  notification.classList.remove("animate");
  notification.style.display = "initial";
  void notification.offsetWidth;
  notification.classList.add("animate");
}

for (const [i, note] of notes.entries()) {
  addNoteToList(i, note);
}