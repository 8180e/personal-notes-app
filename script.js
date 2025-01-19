const storage = localStorage.getItem("notes");
const notes = storage ? JSON.parse(storage).filter(Boolean) : [];

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function addNoteToList(i, note) {
  const li = document.createElement("li");
  const editIcon = document.createElement("i");
  const deleteIcon = document.createElement("i");
  const form = document.createElement("form");
  const input = document.createElement("input");
  const submit = document.createElement("button");

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

  document.getElementById("notes").appendChild(li);
}

function addNote(event) {
  const noteInput = document.getElementById("noteInput");
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
  const notification = document.getElementById("notification");

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
